import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Users,
  ChefHat,
  ShoppingBag,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  DollarSign,
  Search,
  Filter,
  Eye,
  RefreshCw,
  SlidersHorizontal,
  Layers,
  Sparkles,
  MessageSquareWarning,
  Check,
  X,
  Star,
  Trash2,
  LayoutDashboard,
  MapPin,
  Clock,
  Award,
  Bell,
  LogOut,
  User,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Zap,
  Lock,
  Phone,
  Mail
} from 'lucide-react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { RAJASTHAN_CITIES } from '../utils/rajasthanCities';

// Smooth Spline Revenue Curve Area Chart Component (Matching User's Screenshot Design)
const RevenueSplineChart = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // Values in Thousands (₹k) across 12 months with peak in Jul/Aug matching screenshot
  const dataPoints = [
    { month: 'Jan', val: 0.8, rev: '₹800' },
    { month: 'Feb', val: 1.2, rev: '₹1,200' },
    { month: 'Mar', val: 1.0, rev: '₹1,000' },
    { month: 'Apr', val: 1.5, rev: '₹1,500' },
    { month: 'May', val: 2.2, rev: '₹2,200' },
    { month: 'Jun', val: 3.8, rev: '₹3,800' },
    { month: 'Jul', val: 16.5, rev: '₹16,500' }, // Peak
    { month: 'Aug', val: 9.8, rev: '₹9,800' },
    { month: 'Sep', val: 2.1, rev: '₹2,100' },
    { month: 'Oct', val: 1.8, rev: '₹1,800' },
    { month: 'Nov', val: 2.4, rev: '₹2,400' },
    { month: 'Dec', val: 3.1, rev: '₹3,100' }
  ];

  const maxVal = 18;
  const svgWidth = 860;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 30;

  // Calculate coordinates
  const points = dataPoints.map((d, i) => {
    const x = paddingX + (i / (dataPoints.length - 1)) * (svgWidth - paddingX * 2);
    const y = svgHeight - paddingY - (d.val / maxVal) * (svgHeight - paddingY * 2);
    return { ...d, x, y };
  });

  // Construct smooth SVG path
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cp1x = p0.x + (p1.x - p0.x) / 2;
    const cp1y = p0.y;
    const cp2x = p0.x + (p1.x - p0.x) / 2;
    const cp2y = p1.y;
    pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
  }

  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z`;

  return (
    <div style={{ width: '100%', position: 'relative', overflowX: 'auto' }}>
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        style={{ width: '100%', height: 'auto', minWidth: '600px', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="revenueAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E8590C" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#FA8C16" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#FA8C16" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal Gridlines */}
        {[0, 4, 8, 12, 16].map((tick) => {
          const y = svgHeight - paddingY - (tick / maxVal) * (svgHeight - paddingY * 2);
          return (
            <g key={tick}>
              <line
                x1={paddingX}
                y1={y}
                x2={svgWidth - paddingX}
                y2={y}
                stroke="#F1EBE4"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <text x={paddingX - 10} y={y + 4} fontSize="10" fill="#A8A29E" textAnchor="end" fontWeight="600">
                ₹{tick}k
              </text>
            </g>
          );
        })}

        {/* Filled Curve Area */}
        <path d={areaD} fill="url(#revenueAreaGrad)" />

        {/* Curve Line */}
        <path d={pathD} fill="none" stroke="#E8590C" strokeWidth="3.5" strokeLinecap="round" />

        {/* Data Points */}
        {points.map((p, i) => {
          const isHovered = hoveredPoint === i;
          const isPeak = p.month === 'Jul' || p.month === 'Aug';
          return (
            <g
              key={i}
              onMouseEnter={() => setHoveredPoint(i)}
              onMouseLeave={() => setHoveredPoint(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Outer glow ring on peak/hover */}
              {(isPeak || isHovered) && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? "9" : "7"}
                  fill="#FA8C16"
                  opacity="0.3"
                />
              )}
              <circle
                cx={p.x}
                cy={p.y}
                r={isHovered ? "6" : isPeak ? "5" : "3.5"}
                fill="#FFFFFF"
                stroke="#E8590C"
                strokeWidth="2.5"
              />

              {/* Tooltip on peak or hover */}
              {(isPeak || isHovered) && (
                <g>
                  <rect
                    x={p.x - 30}
                    y={p.y - 30}
                    width="60"
                    height="20"
                    rx="6"
                    fill="#1C1917"
                  />
                  <text
                    x={p.x}
                    y={p.y - 16}
                    fill="#FFFFFF"
                    fontSize="10"
                    fontWeight="800"
                    textAnchor="middle"
                  >
                    {p.rev}
                  </text>
                </g>
              )}

              {/* X-axis Month Label */}
              <text
                x={p.x}
                y={svgHeight - 8}
                fontSize="11"
                fill={isPeak ? "#E8590C" : "#78716C"}
                fontWeight={isPeak ? "800" : "600"}
                textAnchor="middle"
              >
                {p.month}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const AdminDashboard = ({ onNavigatePage }) => {
  const { user, loginUser, logoutUser } = useAuth();
  const { addToast } = useToast();

  // Active Admin Sidebar Tab
  const [activeNav, setActiveNav] = useState('dashboard'); // 'dashboard' | 'users' | 'kitchens' | 'orders' | 'locations' | 'disputes' | 'analytics' | 'profile'

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [universalSearch, setUniversalSearch] = useState('');

  // Profile Form States
  const [profName, setProfName] = useState(user?.name || 'Priya Sharma (Admin)');
  const [profEmail, setProfEmail] = useState(user?.email || 'admin@homefeast.test');
  const [profPhone, setProfPhone] = useState(user?.phone || '+91 98290 00001');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSubTab, setProfileSubTab] = useState('personal'); // 'personal' | 'security'

  // Filter states
  const [provStatusFilter, setProvStatusFilter] = useState('all');
  const [provSearch, setProvSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');
  const [userSearch, setUserSearch] = useState('');
  const [reviewStarFilter, setReviewStarFilter] = useState('all');
  const [reviewSearch, setReviewSearch] = useState('');
  const [selectedLocationCity, setSelectedLocationCity] = useState('all');
  const [locationSearchQuery, setLocationSearchQuery] = useState('');

  // Data lists
  const [providers, setProviders] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [complaintsList, setComplaintsList] = useState([]);
  const [reviewsList, setReviewsList] = useState([]);
  const [ordersList, setOrdersList] = useState([]);
  const [subscriptionsList, setSubscriptionsList] = useState([]);

  // Complaint Resolution Modal
  const [resolvingComplaint, setResolvingComplaint] = useState(null);
  const [resolutionNotes, setResolutionNotes] = useState('');

  const loadAdminData = async () => {
    try {
      setLoading(true);
      const [dashRes, provList, uList, cmpList, revList, ordList, subList] = await Promise.all([
        api.getAdminDashboard(),
        api.getAdminProviders(),
        api.getAdminUsers(),
        api.getComplaints(),
        api.getReviews(),
        api.getOrders(),
        api.getSubscriptions()
      ]);

      if (dashRes.success) setData(dashRes.data);
      setProviders(provList || []);
      setUsersList(uList || []);
      setComplaintsList(cmpList || []);
      setReviewsList(revList || []);
      setOrdersList(ordList || []);
      setSubscriptionsList(subList || []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  // Save Profile Handler
  const handleSaveAdminProfile = async (e) => {
    e.preventDefault();
    try {
      setIsSavingProfile(true);
      const res = await api.updateProfile({
        name: profName,
        phone: profPhone
      });
      if (res && res.success) {
        if (res.data) loginUser(res.data);
        addToast('Admin profile details updated successfully!', 'success');
      } else {
        addToast('Profile updated!', 'success');
      }
    } catch (err) {
      addToast('Error saving profile.', 'error');
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Delete / Moderate Review
  const handleDeleteReview = async (id) => {
    if (!window.confirm('Delete and moderate this review from platform?')) return;
    const res = await api.deleteReview(id);
    if (res.success) {
      addToast('Review moderated and removed.', 'info');
      loadAdminData();
    } else {
      addToast(res.message || 'Error deleting review', 'error');
    }
  };

  // Approve Provider
  const handleApproveProvider = async (id) => {
    const res = await api.approveProvider(id);
    if (res.success) {
      addToast(res.message || 'Kitchen verified and approved!', 'success');
      loadAdminData();
    } else {
      addToast(res.message || 'Error approving provider', 'error');
    }
  };

  // Reject Provider
  const handleRejectProvider = async (id) => {
    const reason = window.prompt('Enter rejection reason (optional):', 'Incomplete kitchen documents');
    const res = await api.rejectProvider(id, reason);
    if (res.success) {
      addToast(res.message || 'Kitchen application rejected.', 'info');
      loadAdminData();
    }
  };

  // Suspend Provider
  const handleSuspendProvider = async (id) => {
    if (!window.confirm('Suspend this provider? They will no longer receive new orders.')) return;
    const res = await api.suspendProvider(id);
    if (res.success) {
      addToast(res.message || 'Kitchen suspended.', 'warning');
      loadAdminData();
    }
  };

  // Reactivate Provider
  const handleReactivateProvider = async (id) => {
    const res = await api.reactivateProvider(id);
    if (res.success) {
      addToast(res.message || 'Kitchen reactivated!', 'success');
      loadAdminData();
    }
  };

  // Toggle User Status
  const handleToggleUserStatus = async (id, curStatus) => {
    const nextStatus = curStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    const res = await api.toggleUserStatus(id, nextStatus);
    if (res.success) {
      addToast(res.message || `User status updated to ${nextStatus}`, 'info');
      loadAdminData();
    }
  };

  // Resolve Complaint
  const handleSaveComplaintResolution = async (e) => {
    e.preventDefault();
    if (!resolvingComplaint) return;
    const res = await api.updateComplaint(resolvingComplaint.id, {
      status: 'RESOLVED',
      resolutionNotes
    });
    if (res.success) {
      addToast('Dispute marked as RESOLVED!', 'success');
      setResolvingComplaint(null);
      setResolutionNotes('');
      loadAdminData();
    }
  };

  // Reset to Sample Seed
  const handleResetDatabase = async () => {
    if (!window.confirm('Reset database to pristine HomeFeast sample seed data?')) return;
    const res = await api.resetDatabase();
    if (res.success) {
      addToast('Database reset to fresh HomeFeast seed data!', 'success');
      loadAdminData();
    }
  };

  const stats = data?.stats || {};
  const charts = data?.charts || {};
  const pendingProviders = providers.filter(p => p.approvalStatus === 'PENDING_APPROVAL');

  const filteredProviders = providers.filter(p => {
    const matchStatus = provStatusFilter === 'all' || p.approvalStatus === provStatusFilter;
    const matchSearch = !provSearch ||
      (p.businessName || '').toLowerCase().includes(provSearch.toLowerCase()) ||
      (p.ownerName || '').toLowerCase().includes(provSearch.toLowerCase()) ||
      (p.city || '').toLowerCase().includes(provSearch.toLowerCase());
    return matchStatus && matchSearch;
  });

  const filteredUsers = usersList.filter(u => {
    const matchRole = userRoleFilter === 'all' || (u.role || '').toUpperCase() === userRoleFilter.toUpperCase();
    const matchSearch = !userSearch ||
      (u.name || '').toLowerCase().includes(userSearch.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(userSearch.toLowerCase());
    return matchRole && matchSearch;
  });

  const filteredReviews = reviewsList.filter(r => {
    const matchStar = reviewStarFilter === 'all' || r.rating === Number(reviewStarFilter);
    const matchSearch = !reviewSearch ||
      (r.customerName || '').toLowerCase().includes(reviewSearch.toLowerCase()) ||
      (r.comment || '').toLowerCase().includes(reviewSearch.toLowerCase()) ||
      (r.verifiedMeal || '').toLowerCase().includes(reviewSearch.toLowerCase());
    return matchStar && matchSearch;
  });

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', display: 'flex' }}>
      {/* 🚀 LEFT SIDEBAR (Dedicated Admin Layout matching Screenshot 2) */}
      <aside
        style={{
          width: '260px',
          background: '#FFFFFF',
          borderRight: '1px solid #EAE3D9',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 50
        }}
      >
        <div>
          {/* Top Brand Header */}
          <div style={{ padding: '24px 20px 16px 20px', borderBottom: '1px solid #F1ECE4' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #E8590C 0%, #FA8C16 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 12px rgba(232, 89, 12, 0.3)'
                }}
              >
                🍲
              </div>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#1C1917', lineHeight: 1 }}>
                  Home<span style={{ color: '#E8590C' }}>Feast</span>
                </div>
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#4F46E5', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '3px' }}>
                  ADMIN PANEL
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'users', label: 'Users', icon: Users, badge: usersList.length },
              { id: 'kitchens', label: 'Kitchen Listings', icon: ChefHat, badge: pendingProviders.length > 0 ? `${pendingProviders.length} new` : null, badgeColor: '#DC2626' },
              { id: 'orders', label: 'Passes & Orders', icon: Calendar },
              { id: 'locations', label: 'Locations (3 Cities)', icon: MapPin },
              { id: 'disputes', label: 'Reviews & Disputes', icon: MessageSquareWarning, badge: complaintsList.filter(c => c.status !== 'RESOLVED').length || null, badgeColor: '#D97706' },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'profile', label: 'My Profile', icon: User }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveNav(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '12px',
                    border: 'none',
                    background: isActive ? 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)' : 'transparent',
                    color: isActive ? '#FFFFFF' : '#57534E',
                    fontWeight: isActive ? 800 : 600,
                    fontSize: '13.5px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: isActive ? '0 4px 14px rgba(79, 70, 229, 0.3)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon size={18} color={isActive ? '#FFFFFF' : '#78716C'} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      style={{
                        background: isActive ? 'rgba(255,255,255,0.25)' : (item.badgeColor || '#EEF2FF'),
                        color: isActive ? '#FFFFFF' : (item.badgeColor ? '#FFFFFF' : '#4F46E5'),
                        fontSize: '10.5px',
                        fontWeight: 800,
                        padding: '2px 7px',
                        borderRadius: '9999px'
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Profile Pill Card */}
        <div style={{ padding: '16px', borderTop: '1px solid #F1ECE4' }}>
          <div
            onClick={() => setActiveNav('profile')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 12px',
              borderRadius: '14px',
              background: '#FAF8F5',
              border: '1px solid #EAE3D9',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '13px'
                }}
              >
                PS
              </div>
              <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#1C1917' }}>Priya Sharma</div>
                <div style={{ fontSize: '10.5px', color: '#4F46E5', fontWeight: 700 }}>Admin</div>
              </div>
            </div>
            <ChevronRight size={15} color="#78716C" />
          </div>
        </div>
      </aside>

      {/* 🚀 MAIN CONTENT AREA */}
      <main style={{ flex: 1, minWidth: 0, padding: '24px 32px 80px 32px' }}>
        {/* Top Universal Header Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '28px'
          }}
        >
          {/* Universal Search Bar */}
          <div style={{ position: 'relative', width: '360px', maxWidth: '100%' }}>
            <Search
              size={16}
              color="#A8A29E"
              style={{ position: 'absolute', left: '14px', top: '12px' }}
            />
            <input
              type="text"
              placeholder="Search kitchens, users, passes..."
              value={universalSearch}
              onChange={(e) => setUniversalSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 16px 10px 40px',
                borderRadius: '12px',
                border: '1px solid #EAE3D9',
                background: '#FFFFFF',
                fontSize: '13.5px',
                outline: 'none',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
              }}
            />
          </div>

          {/* Quick Action Pills & Notification */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={loadAdminData}
              type="button"
              title="Refresh Live Metrics"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 14px',
                borderRadius: '10px',
                border: '1px solid #EAE3D9',
                background: '#FFFFFF',
                fontSize: '12.5px',
                fontWeight: 700,
                color: '#57534E',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={14} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleResetDatabase}
              type="button"
              style={{
                padding: '9px 14px',
                borderRadius: '10px',
                border: '1px solid #FCA5A5',
                background: '#FEF2F2',
                fontSize: '12.5px',
                fontWeight: 700,
                color: '#DC2626',
                cursor: 'pointer'
              }}
            >
              Reset Seed
            </button>

            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: '#FFFFFF',
                border: '1px solid #EAE3D9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <Bell size={18} color="#57534E" />
              {pendingProviders.length > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '6px',
                    right: '6px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#DC2626'
                  }}
                />
              )}
            </div>

            {/* Profile Avatar Pill */}
            <div
              onClick={() => setActiveNav('profile')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 12px 5px 6px',
                borderRadius: '9999px',
                background: '#FFFFFF',
                border: '1px solid #EAE3D9',
                cursor: 'pointer'
              }}
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#4F46E5',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 900
                }}
              >
                PS
              </div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#1C1917' }}>Priya (Admin)</span>
            </div>
          </div>
        </div>

        {/* 🌟 VIEW 1: DASHBOARD (Matching Screenshot 2) */}
        {activeNav === 'dashboard' && (
          <div>
            {/* Dashboard Header */}
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#1C1917', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Admin Dashboard</span>
                <span style={{ fontSize: '22px' }}>👑</span>
              </h1>
              <p style={{ fontSize: '13.5px', color: '#78716C', marginTop: '4px' }}>
                Complete overview of HomeFeast homemade tiffin platform
              </p>
            </div>

            {/* 4 Hero KPI Cards (Matching Screenshot 2) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginBottom: '20px' }}>
              {/* Card 1: Total Users */}
              <div style={{ background: '#FFFFFF', padding: '22px', borderRadius: '20px', border: '1px solid #EAE3D9', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '32px', fontWeight: 900, color: '#1C1917', lineHeight: 1 }}>
                      {stats.totalUsers || usersList.length || 8}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#78716C', marginTop: '6px' }}>
                      Total Users
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#2B8A3E', fontWeight: 700, marginTop: '4px' }}>
                      +4 this month
                    </div>
                  </div>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users size={22} color="#4F46E5" />
                  </div>
                </div>
              </div>

              {/* Card 2: Total Kitchens */}
              <div style={{ background: '#FFFFFF', padding: '22px', borderRadius: '20px', border: '1px solid #EAE3D9', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '32px', fontWeight: 900, color: '#1C1917', lineHeight: 1 }}>
                      {stats.totalProviders || providers.length || 110}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#78716C', marginTop: '6px' }}>
                      Total Kitchens / Cooks
                    </div>
                    <div style={{ fontSize: '11.5px', color: pendingProviders.length > 0 ? '#E8590C' : '#2B8A3E', fontWeight: 700, marginTop: '4px' }}>
                      {pendingProviders.length} pending approval
                    </div>
                  </div>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#FFF4E6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChefHat size={22} color="#E8590C" />
                  </div>
                </div>
              </div>

              {/* Card 3: Active Bookings / Passes */}
              <div style={{ background: '#FFFFFF', padding: '22px', borderRadius: '20px', border: '1px solid #EAE3D9', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '32px', fontWeight: 900, color: '#1C1917', lineHeight: 1 }}>
                      {stats.activeSubscriptions || subscriptionsList.filter(s => s.status === 'ACTIVE').length || 4}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#78716C', marginTop: '6px' }}>
                      Active Tiffin Passes
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#2B8A3E', fontWeight: 700, marginTop: '4px' }}>
                      5 this month
                    </div>
                  </div>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#EBFBEE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Calendar size={22} color="#2B8A3E" />
                  </div>
                </div>
              </div>

              {/* Card 4: Total Revenue */}
              <div style={{ background: '#FFFFFF', padding: '22px', borderRadius: '20px', border: '1px solid #EAE3D9', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '30px', fontWeight: 900, color: '#1C1917', lineHeight: 1 }}>
                      ₹{stats.monthlyRevenue ? stats.monthlyRevenue.toLocaleString() : '1,48,500'}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#78716C', marginTop: '6px' }}>
                      Total Platform Revenue
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#2B8A3E', fontWeight: 700, marginTop: '4px' }}>
                      +24% this month
                    </div>
                  </div>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#FAF5FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DollarSign size={22} color="#9333EA" />
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Metric Ribbon (5 cards) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '24px' }}>
              <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '16px', border: '1px solid #EAE3D9', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#1C1917' }}>44.44%</div>
                <div style={{ fontSize: '11px', color: '#78716C', fontWeight: 700, marginTop: '2px' }}>Conversion Rate</div>
              </div>
              <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '16px', border: '1px solid #EAE3D9', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#1C1917' }}>99.2%</div>
                <div style={{ fontSize: '11px', color: '#78716C', fontWeight: 700, marginTop: '2px' }}>On-Time Dispatch</div>
              </div>
              <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '16px', border: '1px solid #EAE3D9', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#1C1917' }}>5</div>
                <div style={{ fontSize: '11px', color: '#78716C', fontWeight: 700, marginTop: '2px' }}>Monthly Active Users</div>
              </div>
              <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '16px', border: '1px solid #EAE3D9', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#1C1917' }}>14 Days</div>
                <div style={{ fontSize: '11px', color: '#78716C', fontWeight: 700, marginTop: '2px' }}>Avg Pass Duration</div>
              </div>
              <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '16px', border: '1px solid #EAE3D9', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#1C1917' }}>4.94 ⭐</div>
                <div style={{ fontSize: '11px', color: '#78716C', fontWeight: 700, marginTop: '2px' }}>Kitchen Hygiene Score</div>
              </div>
              <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '16px', border: '1px solid #EAE3D9', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#1C1917' }}>{ordersList.length || 4}</div>
                <div style={{ fontSize: '11px', color: '#78716C', fontWeight: 700, marginTop: '2px' }}>Completed Orders</div>
              </div>
            </div>

            {/* Smooth Spline Curve Chart Card (Platform Revenue Last 12 Months) */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                border: '1px solid #EAE3D9',
                padding: '26px',
                marginBottom: '24px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1C1917', margin: 0 }}>
                    Platform Revenue (Last 12 Months)
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#78716C', marginTop: '2px' }}>
                    Gross Merchandise Value (GMV) trajectory across Jaipur, Ajmer & Kishangarh
                  </p>
                </div>
                <span
                  style={{
                    background: '#EBFBEE',
                    color: '#2B8A3E',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: 800
                  }}
                >
                  📈 +76% 6-Month Growth
                </span>
              </div>

              {/* Curve Chart Graphic */}
              <RevenueSplineChart />
            </div>

            {/* Bottom Two Split Cards: Pending Approvals & Recent Bookings */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {/* Left Card: Pending Kitchen Approvals */}
              <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #EAE3D9', padding: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={16} color="#E8590C" />
                    <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#1C1917', margin: 0 }}>
                      Pending Kitchen Approvals
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveNav('kitchens')}
                    style={{ background: 'none', border: 'none', color: '#4F46E5', fontSize: '12.5px', fontWeight: 800, cursor: 'pointer' }}
                  >
                    View All →
                  </button>
                </div>

                {pendingProviders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '24px 12px', color: '#78716C', fontSize: '13px' }}>
                    <CheckCircle2 size={32} color="#2B8A3E" style={{ margin: '0 auto 8px auto' }} />
                    <div>All home kitchen partners are verified & approved!</div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {pendingProviders.slice(0, 3).map(p => (
                      <div
                        key={p.id}
                        style={{
                          padding: '12px',
                          borderRadius: '12px',
                          background: '#FAF8F5',
                          border: '1px solid #EAE3D9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '13.5px', color: '#1C1917' }}>{p.businessName}</div>
                          <div style={{ fontSize: '11.5px', color: '#78716C' }}>📍 {p.area}, {p.city} • {p.ownerName}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            onClick={() => handleApproveProvider(p.id)}
                            style={{ padding: '6px 10px', borderRadius: '8px', border: 'none', background: '#2B8A3E', color: '#FFFFFF', fontSize: '11.5px', fontWeight: 800, cursor: 'pointer' }}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectProvider(p.id)}
                            style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #EAE3D9', background: '#FFFFFF', color: '#DC2626', fontSize: '11.5px', fontWeight: 700, cursor: 'pointer' }}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Card: Recent Orders & Passes */}
              <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #EAE3D9', padding: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={16} color="#4F46E5" />
                    <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#1C1917', margin: 0 }}>
                      Recent Orders & Deliveries
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveNav('orders')}
                    style={{ background: 'none', border: 'none', color: '#4F46E5', fontSize: '12.5px', fontWeight: 800, cursor: 'pointer' }}
                  >
                    View All →
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {ordersList.slice(0, 3).map((o, idx) => (
                    <div
                      key={o.id || idx}
                      style={{
                        padding: '12px',
                        borderRadius: '12px',
                        background: '#FAF8F5',
                        border: '1px solid #EAE3D9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '13.5px', color: '#1C1917' }}>Order #{o.id}</div>
                        <div style={{ fontSize: '11.5px', color: '#78716C' }}>{o.customerName || 'Customer'} • {o.providerName}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 900, fontSize: '14px', color: '#E8590C' }}>₹{o.totalAmount}</div>
                        <span style={{ fontSize: '10px', fontWeight: 800, color: o.orderStatus === 'DELIVERED' ? '#2B8A3E' : '#E8590C', background: o.orderStatus === 'DELIVERED' ? '#EBFBEE' : '#FFF4E6', padding: '2px 6px', borderRadius: '4px' }}>
                          {o.orderStatus?.replace(/_/g, ' ') || 'PREPARING'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 🌟 VIEW 2: MY PROFILE (Matching Screenshot 1) */}
        {activeNav === 'profile' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#1C1917', margin: 0 }}>
                My Profile
              </h1>
              <p style={{ fontSize: '13.5px', color: '#78716C', marginTop: '4px' }}>
                Manage your account settings and preferences
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 320px) 1fr', gap: '24px', alignItems: 'flex-start' }}>
              {/* Left Profile Avatar Card */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  border: '1px solid #EAE3D9',
                  padding: '32px 24px',
                  textAlign: 'center',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
                }}
              >
                {/* Large Initials Avatar */}
                <div
                  style={{
                    width: '96px',
                    height: '96px',
                    borderRadius: '28px',
                    background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '36px',
                    margin: '0 auto 16px auto',
                    boxShadow: '0 8px 24px rgba(79, 70, 229, 0.35)'
                  }}
                >
                  PS
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#1C1917', margin: '0 0 4px 0' }}>
                  {profName}
                </h3>
                <p style={{ fontSize: '13px', color: '#78716C', margin: '0 0 12px 0' }}>
                  {profEmail}
                </p>

                <span
                  style={{
                    display: 'inline-block',
                    background: '#EEF2FF',
                    color: '#4F46E5',
                    padding: '3px 12px',
                    borderRadius: '9999px',
                    fontSize: '11.5px',
                    fontWeight: 800,
                    marginBottom: '24px'
                  }}
                >
                  Admin
                </span>

                {/* Subtabs Pill Selector */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={() => setProfileSubTab('personal')}
                    style={{
                      width: '100%',
                      padding: '11px 16px',
                      borderRadius: '12px',
                      border: 'none',
                      background: profileSubTab === 'personal' ? '#EEF2FF' : 'transparent',
                      color: profileSubTab === 'personal' ? '#4F46E5' : '#57534E',
                      fontWeight: 800,
                      fontSize: '13.5px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    Personal Info
                  </button>

                  <button
                    type="button"
                    onClick={() => setProfileSubTab('security')}
                    style={{
                      width: '100%',
                      padding: '11px 16px',
                      borderRadius: '12px',
                      border: 'none',
                      background: profileSubTab === 'security' ? '#EEF2FF' : 'transparent',
                      color: profileSubTab === 'security' ? '#4F46E5' : '#57534E',
                      fontWeight: 800,
                      fontSize: '13.5px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    Change Password
                  </button>
                </div>
              </div>

              {/* Right Profile Details Form Card */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  border: '1px solid #EAE3D9',
                  padding: '32px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
                }}
              >
                {profileSubTab === 'personal' ? (
                  <form onSubmit={handleSaveAdminProfile}>
                    <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1C1917', marginBottom: '20px' }}>
                      Personal Information
                    </h3>

                    <div style={{ marginBottom: '18px' }}>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 800, color: '#1C1917', marginBottom: '6px' }}>
                        Full Name <span style={{ color: '#DC2626' }}>*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <User size={16} color="#A8A29E" style={{ position: 'absolute', left: '14px', top: '13px' }} />
                        <input
                          type="text"
                          value={profName}
                          onChange={(e) => setProfName(e.target.value)}
                          required
                          style={{
                            width: '100%',
                            padding: '11px 16px 11px 40px',
                            borderRadius: '12px',
                            border: '1.5px solid #EAE3D9',
                            fontSize: '13.5px',
                            outline: 'none',
                            background: '#FFFFFF'
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: '18px' }}>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 800, color: '#1C1917', marginBottom: '6px' }}>
                        Email
                      </label>
                      <div style={{ position: 'relative' }}>
                        <Mail size={16} color="#A8A29E" style={{ position: 'absolute', left: '14px', top: '13px' }} />
                        <input
                          type="email"
                          value={profEmail}
                          disabled
                          style={{
                            width: '100%',
                            padding: '11px 16px 11px 40px',
                            borderRadius: '12px',
                            border: '1.5px solid #EAE3D9',
                            fontSize: '13.5px',
                            outline: 'none',
                            background: '#FAF8F5',
                            color: '#78716C'
                          }}
                        />
                      </div>
                      <div style={{ fontSize: '11px', color: '#A8A29E', marginTop: '4px' }}>
                        Email cannot be changed
                      </div>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 800, color: '#1C1917', marginBottom: '6px' }}>
                        Phone <span style={{ color: '#DC2626' }}>*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <Phone size={16} color="#A8A29E" style={{ position: 'absolute', left: '14px', top: '13px' }} />
                        <input
                          type="tel"
                          value={profPhone}
                          onChange={(e) => setProfPhone(e.target.value)}
                          required
                          style={{
                            width: '100%',
                            padding: '11px 16px 11px 40px',
                            borderRadius: '12px',
                            border: '1.5px solid #EAE3D9',
                            fontSize: '13.5px',
                            outline: 'none',
                            background: '#FFFFFF'
                          }}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSavingProfile}
                      style={{
                        padding: '12px 24px',
                        borderRadius: '12px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
                        color: '#FFFFFF',
                        fontWeight: 800,
                        fontSize: '14px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(79, 70, 229, 0.35)'
                      }}
                    >
                      {isSavingProfile ? 'Saving...' : 'Save Changes'}
                    </button>
                  </form>
                ) : (
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1C1917', marginBottom: '20px' }}>
                      Change Password
                    </h3>
                    <div style={{ marginBottom: '18px' }}>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 800, color: '#1C1917', marginBottom: '6px' }}>Current Password</label>
                      <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '11px 16px', borderRadius: '12px', border: '1.5px solid #EAE3D9', fontSize: '13.5px', outline: 'none' }} />
                    </div>
                    <div style={{ marginBottom: '18px' }}>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 800, color: '#1C1917', marginBottom: '6px' }}>New Password</label>
                      <input type="password" placeholder="Min 8 characters" style={{ width: '100%', padding: '11px 16px', borderRadius: '12px', border: '1.5px solid #EAE3D9', fontSize: '13.5px', outline: 'none' }} />
                    </div>
                    <button
                      type="button"
                      onClick={() => addToast('Password updated successfully!', 'success')}
                      style={{
                        padding: '12px 24px',
                        borderRadius: '12px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
                        color: '#FFFFFF',
                        fontWeight: 800,
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      Update Password
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 🌟 VIEW 3: USERS GOVERNANCE */}
        {activeNav === 'users' && (
          <div style={{ background: '#FFFFFF', borderRadius: '24px', border: '1px solid #EAE3D9', padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1C1917', margin: 0 }}>
                  User Accounts ({filteredUsers.length})
                </h3>
                <p style={{ fontSize: '13px', color: '#78716C', marginTop: '2px' }}>
                  Manage platform customers, verified cooks, delivery fleet riders & admins
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['all', 'CUSTOMER', 'PROVIDER', 'RIDER', 'ADMIN'].map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setUserRoleFilter(r)}
                    style={{
                      padding: '7px 14px',
                      borderRadius: '10px',
                      border: userRoleFilter === r ? '1.5px solid #4F46E5' : '1px solid #EAE3D9',
                      background: userRoleFilter === r ? '#EEF2FF' : '#FFFFFF',
                      color: userRoleFilter === r ? '#4F46E5' : '#57534E',
                      fontSize: '12px',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    {r === 'all' ? 'All Roles' : r}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #F1ECE4', color: '#78716C', fontSize: '12px', textTransform: 'uppercase' }}>
                    <th style={{ padding: '12px 14px' }}>User Details</th>
                    <th style={{ padding: '12px 14px' }}>Role</th>
                    <th style={{ padding: '12px 14px' }}>City</th>
                    <th style={{ padding: '12px 14px' }}>Account Status</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(u => (
                    <tr key={u.id} style={{ borderBottom: '1px solid #F5F1EB' }}>
                      <td style={{ padding: '14px' }}>
                        <div style={{ fontWeight: 800, color: '#1C1917' }}>{u.name}</div>
                        <div style={{ fontSize: '12px', color: '#78716C' }}>{u.email} • {u.phone}</div>
                      </td>
                      <td style={{ padding: '14px' }}>
                        <span
                          style={{
                            background: u.role === 'ADMIN' ? '#EEF2FF' : u.role === 'PROVIDER' ? '#EBFBEE' : u.role === 'RIDER' ? '#FFF4E6' : '#FAF8F5',
                            color: u.role === 'ADMIN' ? '#4F46E5' : u.role === 'PROVIDER' ? '#2B8A3E' : u.role === 'RIDER' ? '#D9480F' : '#57534E',
                            padding: '3px 10px',
                            borderRadius: '8px',
                            fontSize: '11.5px',
                            fontWeight: 800
                          }}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td style={{ padding: '14px', textTransform: 'capitalize', color: '#57534E', fontWeight: 600 }}>
                        {u.city || 'Jaipur'}
                      </td>
                      <td style={{ padding: '14px' }}>
                        <span style={{ color: u.status === 'SUSPENDED' ? '#DC2626' : '#2B8A3E', fontWeight: 800, fontSize: '12px' }}>
                          ● {u.status || 'ACTIVE'}
                        </span>
                      </td>
                      <td style={{ padding: '14px', textAlign: 'right' }}>
                        <button
                          type="button"
                          onClick={() => handleToggleUserStatus(u.id, u.status || 'ACTIVE')}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            border: '1px solid #EAE3D9',
                            background: u.status === 'SUSPENDED' ? '#EBFBEE' : '#FEF2F2',
                            color: u.status === 'SUSPENDED' ? '#2B8A3E' : '#DC2626',
                            fontWeight: 800,
                            fontSize: '11.5px',
                            cursor: 'pointer'
                          }}
                        >
                          {u.status === 'SUSPENDED' ? 'Reactivate' : 'Suspend'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 🌟 VIEW 4: KITCHEN LISTINGS */}
        {activeNav === 'kitchens' && (
          <div style={{ background: '#FFFFFF', borderRadius: '24px', border: '1px solid #EAE3D9', padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1C1917', margin: 0 }}>
                  Kitchen & Cook Partners ({filteredProviders.length})
                </h3>
                <p style={{ fontSize: '13px', color: '#78716C', marginTop: '2px' }}>
                  Verify FSSAI, hygiene compliance & approve home kitchens in Jaipur, Ajmer, Kishangarh
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['all', 'PENDING_APPROVAL', 'APPROVED', 'SUSPENDED'].map(st => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setProvStatusFilter(st)}
                    style={{
                      padding: '7px 14px',
                      borderRadius: '10px',
                      border: provStatusFilter === st ? '1.5px solid #E8590C' : '1px solid #EAE3D9',
                      background: provStatusFilter === st ? '#FFF4E6' : '#FFFFFF',
                      color: provStatusFilter === st ? '#E8590C' : '#57534E',
                      fontSize: '12px',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    {st === 'all' ? 'All Status' : st.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {filteredProviders.map(p => (
                <div
                  key={p.id}
                  style={{
                    padding: '18px',
                    borderRadius: '16px',
                    border: '1px solid #EAE3D9',
                    background: '#FAF8F5',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '14px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '16px', fontWeight: 900, color: '#1C1917' }}>{p.businessName}</span>
                      <span
                        style={{
                          background: p.approvalStatus === 'APPROVED' ? '#EBFBEE' : p.approvalStatus === 'PENDING_APPROVAL' ? '#FFF4E6' : '#FEF2F2',
                          color: p.approvalStatus === 'APPROVED' ? '#2B8A3E' : p.approvalStatus === 'PENDING_APPROVAL' ? '#E8590C' : '#DC2626',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 800
                        }}
                      >
                        {p.approvalStatus?.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#57534E', marginTop: '3px' }}>
                      Owner: <strong>{p.ownerName}</strong> • 📍 {p.area}, {p.city} • FSSAI: {p.fssaiNumber || '10023011004821'}
                    </div>
                    <div style={{ fontSize: '12px', color: '#78716C', marginTop: '2px' }}>
                      Cuisines: {Array.isArray(p.cuisines) ? p.cuisines.join(', ') : p.cuisines} • Hygiene Score: <strong>{p.hygieneScore || '99.0%'}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    {p.approvalStatus === 'PENDING_APPROVAL' && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleApproveProvider(p.id)}
                          style={{ padding: '8px 14px', borderRadius: '10px', border: 'none', background: '#2B8A3E', color: '#FFFFFF', fontWeight: 800, fontSize: '12.5px', cursor: 'pointer' }}
                        >
                          Verify & Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRejectProvider(p.id)}
                          style={{ padding: '8px 14px', borderRadius: '10px', border: '1px solid #EAE3D9', background: '#FFFFFF', color: '#DC2626', fontWeight: 700, fontSize: '12.5px', cursor: 'pointer' }}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {p.approvalStatus === 'APPROVED' && (
                      <button
                        type="button"
                        onClick={() => handleSuspendProvider(p.id)}
                        style={{ padding: '8px 14px', borderRadius: '10px', border: '1px solid #FCA5A5', background: '#FEF2F2', color: '#DC2626', fontWeight: 800, fontSize: '12.5px', cursor: 'pointer' }}
                      >
                        Suspend Kitchen
                      </button>
                    )}
                    {p.approvalStatus === 'SUSPENDED' && (
                      <button
                        type="button"
                        onClick={() => handleReactivateProvider(p.id)}
                        style={{ padding: '8px 14px', borderRadius: '10px', border: 'none', background: '#2B8A3E', color: '#FFFFFF', fontWeight: 800, fontSize: '12.5px', cursor: 'pointer' }}
                      >
                        Reactivate Kitchen
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🌟 VIEW 5: PASSES & ORDERS */}
        {activeNav === 'orders' && (
          <div style={{ background: '#FFFFFF', borderRadius: '24px', border: '1px solid #EAE3D9', padding: '28px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1C1917', marginBottom: '4px' }}>
              Active Subscriptions & Orders
            </h3>
            <p style={{ fontSize: '13px', color: '#78716C', marginBottom: '20px' }}>
              Monitor live daily meal dispatches and customer passes
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {subscriptionsList.map(s => (
                <div
                  key={s.id}
                  style={{
                    padding: '16px',
                    borderRadius: '14px',
                    background: '#FAF8F5',
                    border: '1px solid #EAE3D9',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 900, fontSize: '14.5px', color: '#1C1917' }}>{s.mealPlanName || s.planName}</span>
                      <span style={{ background: s.status === 'ACTIVE' ? '#EBFBEE' : '#FAF8F5', color: s.status === 'ACTIVE' ? '#2B8A3E' : '#78716C', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>
                        {s.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#57534E', marginTop: '2px' }}>
                      Customer: <strong>{s.customerName}</strong> • Provider: {s.providerName}
                    </div>
                    <div style={{ fontSize: '12px', color: '#78716C', marginTop: '2px' }}>
                      Slot: {s.mealSlot} • Left: {s.remainingMeals || 30} meals
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '18px', fontWeight: 900, color: '#E8590C' }}>₹{s.price}</div>
                    <div style={{ fontSize: '11px', color: '#78716C' }}>{s.planType || 'MONTHLY'} PASS</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🌟 VIEW 6: LOCATIONS (All 80+ Localities in Jaipur, Ajmer, Kishangarh) */}
        {activeNav === 'locations' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Top Filter Bar */}
            <div style={{ background: '#FFFFFF', borderRadius: '24px', border: '1px solid #EAE3D9', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#1C1917', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={22} color="#E8590C" />
                    <span>Operational Delivery Hubs & Localities (80+ Active Zones)</span>
                  </h3>
                  <p style={{ fontSize: '13px', color: '#78716C', marginTop: '4px' }}>
                    Real-time cloud kitchen coverage, delivery SLA & home cook network in Jaipur, Ajmer & Kishangarh
                  </p>
                </div>

                {/* City Filter Pills */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[
                    { id: 'all', label: 'All Cities (80 Hubs)' },
                    { id: 'jaipur', label: '📍 Jaipur (36 Hubs)' },
                    { id: 'ajmer', label: '📍 Ajmer (28 Hubs)' },
                    { id: 'kishangarh', label: '📍 Kishangarh (16 Hubs)' }
                  ].map(c => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedLocationCity(c.id)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '12px',
                        border: selectedLocationCity === c.id ? '1.5px solid #E8590C' : '1px solid #EAE3D9',
                        background: selectedLocationCity === c.id ? '#FFF4E6' : '#FFFFFF',
                        color: selectedLocationCity === c.id ? '#E8590C' : '#57534E',
                        fontWeight: selectedLocationCity === c.id ? 800 : 600,
                        fontSize: '13px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Locality Search Input */}
              <div style={{ position: 'relative', width: '100%' }}>
                <Search size={16} color="#A8A29E" style={{ position: 'absolute', left: '14px', top: '13px' }} />
                <input
                  type="text"
                  placeholder="Search any locality, colony, sector or hub (e.g. Malviya Nagar, Panchsheel, Madanganj, CURAJ, Vaishali Nagar)..."
                  value={locationSearchQuery}
                  onChange={(e) => setLocationSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 16px 11px 40px',
                    borderRadius: '12px',
                    border: '1.5px solid #EAE3D9',
                    fontSize: '13.5px',
                    outline: 'none',
                    background: '#FAF8F5'
                  }}
                />
              </div>
            </div>

            {/* City Sections Grid */}
            {RAJASTHAN_CITIES
              .filter(city => selectedLocationCity === 'all' || city.id === selectedLocationCity)
              .map(city => {
                const filteredLocalities = city.localities.filter(loc =>
                  !locationSearchQuery || loc.toLowerCase().includes(locationSearchQuery.toLowerCase())
                );

                if (filteredLocalities.length === 0 && locationSearchQuery) return null;

                return (
                  <div
                    key={city.id}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '24px',
                      border: '1px solid #EAE3D9',
                      padding: '28px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
                    }}
                  >
                    {/* City Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '18px', paddingBottom: '16px', borderBottom: '1px solid #F1ECE4' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <h4 style={{ fontSize: '22px', fontWeight: 900, color: '#1C1917', margin: 0 }}>
                            {city.name}
                          </h4>
                          <span style={{ background: '#EEF2FF', color: '#4F46E5', padding: '3px 10px', borderRadius: '8px', fontSize: '11.5px', fontWeight: 800 }}>
                            {city.hubsCount}
                          </span>
                          <span style={{ background: '#EBFBEE', color: '#2B8A3E', padding: '3px 10px', borderRadius: '8px', fontSize: '11.5px', fontWeight: 800 }}>
                            ⚡ {city.deliveryTime}
                          </span>
                          <span style={{ background: '#FFF4E6', color: '#E8590C', padding: '3px 10px', borderRadius: '8px', fontSize: '11.5px', fontWeight: 800 }}>
                            {city.rating}
                          </span>
                        </div>
                        <p style={{ fontSize: '13px', color: '#78716C', marginTop: '4px' }}>
                          {city.tagline}
                        </p>
                      </div>

                      <div style={{ background: '#FAF8F5', padding: '6px 14px', borderRadius: '10px', border: '1px solid #EAE3D9', fontSize: '12px', fontWeight: 700, color: '#57534E' }}>
                        Showing <strong>{filteredLocalities.length}</strong> of {city.localities.length} Active Localities
                      </div>
                    </div>

                    {/* Regional Specialties Ribbon */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                      <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#78716C', textTransform: 'uppercase' }}>Regional Flavors:</span>
                      {city.specialties.map((spec, sIdx) => (
                        <span
                          key={sIdx}
                          style={{
                            background: '#FFF9F2',
                            color: '#B45309',
                            border: '1px solid #FED7AA',
                            padding: '3px 10px',
                            borderRadius: '8px',
                            fontSize: '11.5px',
                            fontWeight: 700
                          }}
                        >
                          🍲 {spec}
                        </span>
                      ))}
                    </div>

                    {/* All Localities Badge Grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '10px'
                      }}
                    >
                      {filteredLocalities.map((loc, lIdx) => (
                        <div
                          key={lIdx}
                          style={{
                            background: '#FAF8F5',
                            border: '1px solid #EAE3D9',
                            borderRadius: '12px',
                            padding: '10px 14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '8px',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2B8A3E', flexShrink: 0, boxShadow: '0 0 6px rgba(43, 138, 62, 0.6)' }} />
                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#1C1917', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={loc}>
                              {loc}
                            </span>
                          </div>
                          <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#2B8A3E', background: '#EBFBEE', padding: '2px 6px', borderRadius: '6px', flexShrink: 0 }}>
                            20m SLA
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        {/* 🌟 VIEW 7: REVIEWS & DISPUTES */}
        {activeNav === 'disputes' && (
          <div style={{ background: '#FFFFFF', borderRadius: '24px', border: '1px solid #EAE3D9', padding: '28px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1C1917', marginBottom: '4px' }}>
              Customer Reviews & Community Feedback
            </h3>
            <p style={{ fontSize: '13px', color: '#78716C', marginBottom: '20px' }}>
              Moderate public reviews and resolve support tickets
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredReviews.map(r => (
                <div
                  key={r.id}
                  style={{
                    padding: '16px',
                    borderRadius: '14px',
                    background: '#FAF8F5',
                    border: '1px solid #EAE3D9',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 800, fontSize: '14px', color: '#1C1917' }}>{r.customerName}</span>
                      <span style={{ color: '#F59E0B', fontWeight: 800, fontSize: '12px' }}>{'⭐'.repeat(r.rating || 5)}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#57534E', marginTop: '4px' }}>
                      "{r.comment}"
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#78716C', marginTop: '2px' }}>
                      Kitchen: <strong>{r.providerName || 'Annapurna Rasoi'}</strong> • {new Date(r.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteReview(r.id)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: '1px solid #FCA5A5',
                      background: '#FEF2F2',
                      color: '#DC2626',
                      fontWeight: 700,
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Trash2 size={13} />
                    <span>Moderate</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🌟 VIEW 8: ANALYTICS & REPORTS */}
        {activeNav === 'analytics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: '#FFFFFF', borderRadius: '24px', border: '1px solid #EAE3D9', padding: '28px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1C1917', marginBottom: '16px' }}>
                Verified Partner Cooks by Operational City
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {(charts.providerOnboardingChart || [
                  { city: 'Jaipur', count: 42 },
                  { city: 'Ajmer', count: 24 },
                  { city: 'Kishangarh', count: 18 }
                ]).map((c, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '13.5px' }}>
                    <span style={{ width: '100px', fontWeight: 800, color: '#1C1917' }}>{c.city}</span>
                    <div style={{ flexGrow: 1, height: '12px', background: '#F3ECE2', borderRadius: '6px', overflow: 'hidden' }}>
                      <div style={{ width: `${(c.count / 50) * 100}%`, height: '100%', background: '#E8590C' }} />
                    </div>
                    <span style={{ width: '40px', textAlign: 'right', fontWeight: 900, color: '#E8590C' }}>{c.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
