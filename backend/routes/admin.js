import express from 'express';
import { db } from '../db.js';
import { requireAuth, requireRole, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// GET /api/admin/dashboard - High-level metrics & chart data
router.get('/dashboard', optionalAuth, (req, res) => {
  const store = db.get();
  const users = store.users || [];
  const providers = store.providers || [];
  const orders = store.orders || [];
  const subscriptions = store.subscriptions || [];
  const complaints = store.complaints || [];

  const pendingApprovals = providers.filter(p => p.approvalStatus === 'PENDING_APPROVAL').length;
  const approvedProviders = providers.filter(p => p.approvalStatus === 'APPROVED').length;
  const activeSubscriptions = subscriptions.filter(s => s.status === 'ACTIVE').length;

  const totalRevenue = orders.reduce((sum, o) => sum + (o.orderStatus !== 'CANCELLED' ? o.totalAmount : 0), 0) +
    subscriptions.reduce((sum, s) => sum + (s.status !== 'CANCELLED' && s.status !== 'REJECTED' ? s.price : 0), 0);

  const stats = {
    totalUsers: users.length,
    totalProviders: providers.length,
    pendingApprovals,
    approvedProviders,
    activeSubscriptions,
    totalOrders: orders.length,
    monthlyRevenue: totalRevenue || 148500,
    dailyRevenue: Math.round((totalRevenue || 148500) / 28),
    totalComplaints: complaints.length,
    openComplaints: complaints.filter(c => c.status === 'OPEN' || c.status === 'IN_REVIEW').length,
    customerRetentionRate: '94.6%',
    avgProviderRating: 4.94
  };

  // Chart data series
  const revenueChart = [
    { label: 'Sep', revenue: 95000, orders: 410 },
    { label: 'Oct', revenue: 112000, orders: 490 },
    { label: 'Nov', revenue: 128000, orders: 560 },
    { label: 'Dec', revenue: 139000, orders: 620 },
    { label: 'Jan', revenue: 145000, orders: 670 },
    { label: 'Feb (Current)', revenue: 168000, orders: 740 }
  ];

  const subscriptionGrowthChart = [
    { month: 'Sep', daily: 120, weekly: 85, monthly: 140 },
    { month: 'Oct', daily: 150, weekly: 110, monthly: 190 },
    { month: 'Nov', daily: 180, weekly: 135, monthly: 240 },
    { month: 'Dec', daily: 210, weekly: 160, monthly: 290 },
    { month: 'Jan', daily: 250, weekly: 190, monthly: 350 },
    { month: 'Feb', daily: 310, weekly: 240, monthly: 420 }
  ];

  const providerOnboardingChart = [
    { city: 'Jaipur', count: 42 },
    { city: 'Ajmer', count: 24 },
    { city: 'Kishangarh', count: 18 }
  ];

  res.json({
    success: true,
    data: {
      stats,
      charts: {
        revenueChart,
        subscriptionGrowthChart,
        providerOnboardingChart
      },
      recentOrders: orders.slice(0, 10),
      recentSubscriptions: subscriptions.slice(0, 10),
      pendingProviders: providers.filter(p => p.approvalStatus === 'PENDING_APPROVAL'),
      recentComplaints: complaints.slice(0, 5)
    }
  });
});

// GET /api/admin/providers - All providers with filters
router.get('/providers', (req, res) => {
  const { status, search, city } = req.query;
  const store = db.get();
  let list = [...(store.providers || [])];

  if (status && status !== 'all') {
    list = list.filter(p => p.approvalStatus === status);
  }
  if (city && city !== 'all') {
    list = list.filter(p => (p.city || '').toLowerCase() === city.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(p =>
      (p.businessName || '').toLowerCase().includes(q) ||
      (p.ownerName || '').toLowerCase().includes(q) ||
      (p.city || '').toLowerCase().includes(q)
    );
  }

  res.json({
    success: true,
    data: list
  });
});

// PUT /api/admin/providers/:id/approve - Approve provider
router.put('/providers/:id/approve', (req, res) => {
  const store = db.get();
  const provider = store.providers.find(p => p.id === req.params.id);

  if (!provider) {
    return res.status(404).json({ success: false, message: 'Provider not found.' });
  }

  provider.approvalStatus = 'APPROVED';
  provider.isAcceptingOrders = true;
  provider.updatedAt = new Date().toISOString();

  // Notify Provider
  store.notifications.unshift({
    id: `notif_${Date.now()}`,
    userId: provider.userId,
    role: 'PROVIDER',
    title: 'Profile Approved & Verified! 🎉',
    message: `Congratulations! ${provider.businessName} is now officially approved and visible on HomeFeast.`,
    type: 'provider_approval',
    targetId: provider.id,
    actionUrl: '#provider-dashboard',
    isRead: false,
    createdAt: new Date().toISOString()
  });

  if (store.adminStats) {
    store.adminStats.pendingApprovals = Math.max(0, (store.adminStats.pendingApprovals || 1) - 1);
    store.adminStats.approvedProviders = (store.adminStats.approvedProviders || 0) + 1;
  }

  db.save(store);

  res.json({
    success: true,
    message: `Provider "${provider.businessName}" has been approved and awarded the verification badge!`,
    data: provider
  });
});

// PUT /api/admin/providers/:id/reject - Reject provider
router.put('/providers/:id/reject', (req, res) => {
  const { reason } = req.body;
  const store = db.get();
  const provider = store.providers.find(p => p.id === req.params.id);

  if (!provider) {
    return res.status(404).json({ success: false, message: 'Provider not found.' });
  }

  provider.approvalStatus = 'REJECTED';
  provider.isAcceptingOrders = false;
  provider.rejectionReason = reason || 'Documentation incomplete';
  provider.updatedAt = new Date().toISOString();

  // Notify Provider
  store.notifications.unshift({
    id: `notif_${Date.now()}`,
    userId: provider.userId,
    role: 'PROVIDER',
    title: 'Registration Application Update',
    message: `Your kitchen application was not approved. Reason: ${provider.rejectionReason}. Please contact support.`,
    type: 'provider_approval',
    targetId: provider.id,
    actionUrl: '#profile',
    isRead: false,
    createdAt: new Date().toISOString()
  });

  if (store.adminStats) {
    store.adminStats.pendingApprovals = Math.max(0, (store.adminStats.pendingApprovals || 1) - 1);
  }

  db.save(store);

  res.json({
    success: true,
    message: `Provider "${provider.businessName}" registration rejected.`,
    data: provider
  });
});

// PUT /api/admin/providers/:id/suspend - Suspend provider
router.put('/providers/:id/suspend', (req, res) => {
  const store = db.get();
  const provider = store.providers.find(p => p.id === req.params.id);

  if (!provider) {
    return res.status(404).json({ success: false, message: 'Provider not found.' });
  }

  provider.approvalStatus = 'SUSPENDED';
  provider.isAcceptingOrders = false;
  provider.updatedAt = new Date().toISOString();

  db.save(store);

  res.json({
    success: true,
    message: `Provider "${provider.businessName}" suspended.`,
    data: provider
  });
});

// PUT /api/admin/providers/:id/reactivate - Reactivate provider
router.put('/providers/:id/reactivate', (req, res) => {
  const store = db.get();
  const provider = store.providers.find(p => p.id === req.params.id);

  if (!provider) {
    return res.status(404).json({ success: false, message: 'Provider not found.' });
  }

  provider.approvalStatus = 'APPROVED';
  provider.isAcceptingOrders = true;
  provider.updatedAt = new Date().toISOString();

  db.save(store);

  res.json({
    success: true,
    message: `Provider "${provider.businessName}" reactivated.`,
    data: provider
  });
});

// GET /api/admin/users - User management
router.get('/users', (req, res) => {
  const { role, status, search } = req.query;
  const store = db.get();
  let list = [...(store.users || [])];

  if (role && role !== 'all') {
    list = list.filter(u => (u.role || '').toUpperCase() === role.toUpperCase());
  }
  if (status && status !== 'all') {
    list = list.filter(u => u.status === status);
  }
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(u =>
      (u.name || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q) ||
      (u.phone || '').includes(q)
    );
  }

  res.json({
    success: true,
    data: list.map(u => ({ ...u, passwordHash: undefined }))
  });
});

// PUT /api/admin/users/:id/status - Toggle user status
router.put('/users/:id/status', (req, res) => {
  const { status } = req.body;
  const store = db.get();
  const user = store.users.find(u => u.id === req.params.id);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  user.status = status || (user.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE');
  user.updatedAt = new Date().toISOString();
  db.save(store);

  res.json({
    success: true,
    message: `User status changed to ${user.status}`,
    data: { ...user, passwordHash: undefined }
  });
});

// GET /api/admin/categories
router.get('/categories', (req, res) => {
  const store = db.get();
  res.json({ success: true, data: store.categories || [] });
});

// POST /api/admin/categories
router.post('/categories', (req, res) => {
  const { name, description, icon } = req.body;
  if (!name) return res.status(400).json({ success: false, message: 'Category name required.' });

  const store = db.get();
  const newCat = {
    id: `cat_${Date.now()}`,
    name,
    description: description || '',
    icon: icon || '🍲',
    status: 'ACTIVE'
  };

  store.categories.push(newCat);
  db.save(store);

  res.json({ success: true, message: 'Category added.', data: newCat });
});

// GET /api/admin/cuisines
router.get('/cuisines', (req, res) => {
  const store = db.get();
  res.json({ success: true, data: store.cuisines || [] });
});

// POST /api/admin/cuisines
router.post('/cuisines', (req, res) => {
  const { name, description, image } = req.body;
  if (!name) return res.status(400).json({ success: false, message: 'Cuisine name required.' });

  const store = db.get();
  const newCui = {
    id: `cui_${Date.now()}`,
    name,
    description: description || '',
    image: image || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80',
    status: 'ACTIVE'
  };

  store.cuisines.push(newCui);
  db.save(store);

  res.json({ success: true, message: 'Cuisine added.', data: newCui });
});

// POST /api/admin/reset-database - Reset to fresh seed
router.post('/reset-database', (req, res) => {
  const fresh = db.resetToSeed();
  res.json({
    success: true,
    message: 'Database reset to fresh HomeFeast seed data.',
    data: {
      usersCount: fresh.users.length,
      providersCount: fresh.providers.length,
      dishesCount: fresh.menuItems.length,
      plansCount: fresh.mealPlans.length
    }
  });
});

export default router;
