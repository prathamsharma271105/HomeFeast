// Full REST API Client for HomeFeast Platform with JWT Token Support
const API_BASE = '/api';

const getHeaders = (isJson = true) => {
  const headers = {};
  if (isJson) headers['Content-Type'] = 'application/json';
  const token = localStorage.getItem('homefeast_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  // 1. Authentication APIs
  async getProfile() {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, { headers: getHeaders() });
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('API error (getProfile):', err);
      return null;
    }
  },

  async login(phoneOrEmail, password, role) {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneOrEmail, email: phoneOrEmail, password, role })
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('homefeast_token', data.token);
      }
      return data;
    } catch (err) {
      return { success: false, message: 'Server connection error during login.' };
    }
  },

  async register(payload) {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('homefeast_token', data.token);
      }
      return data;
    } catch (err) {
      return { success: false, message: 'Server connection error during registration.' };
    }
  },

  async updateProfile(payload) {
    try {
      const res = await fetch(`${API_BASE}/auth/profile`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Could not update profile.' };
    }
  },

  async logout() {
    try {
      localStorage.removeItem('homefeast_token');
      await fetch(`${API_BASE}/auth/logout`, { method: 'POST', headers: getHeaders() });
      return { success: true };
    } catch (err) {
      return { success: true };
    }
  },

  // 2. Providers & Discovery APIs
  async getProviders(params = {}) {
    try {
      const qs = new URLSearchParams();
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
          qs.append(key, params[key]);
        }
      });
      const res = await fetch(`${API_BASE}/providers?${qs.toString()}`, { headers: getHeaders(false) });
      const data = await res.json();
      return data;
    } catch (err) {
      console.warn('API error (getProviders):', err);
      return { success: false, data: [], pagination: { total: 0 } };
    }
  },

  async getProvider(id) {
    try {
      const res = await fetch(`${API_BASE}/providers/${id}`, { headers: getHeaders(false) });
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('API error (getProvider):', err);
      return null;
    }
  },

  async updateProvider(id, payload) {
    try {
      const res = await fetch(`${API_BASE}/providers/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error updating provider profile.' };
    }
  },

  async updateServiceArea(id, payload) {
    try {
      const res = await fetch(`${API_BASE}/providers/${id}/service-area`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error updating service area.' };
    }
  },

  async getProviderDashboardStats(id) {
    try {
      const res = await fetch(`${API_BASE}/providers/${id}/dashboard-stats`, { headers: getHeaders() });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error fetching provider analytics.' };
    }
  },

  // 3. Menu Items APIs
  async getWeeklyMenu() {
    try {
      const res = await fetch(`${API_BASE}/menu/weekly`, { headers: getHeaders(false) });
      const data = await res.json();
      if (data && data.data) {
        return data.data;
      }
      return null;
    } catch (err) {
      console.warn('API error (getWeeklyMenu):', err);
      return null;
    }
  },

  async getThaliBuilder() {
    try {
      const res = await fetch(`${API_BASE}/menu/thali-builder`, { headers: getHeaders(false) });
      const data = await res.json();
      if (data && data.data) {
        return data.data;
      }
      return this.getDefaultThaliComponents();
    } catch (err) {
      console.warn('API error (getThaliBuilder):', err);
      return this.getDefaultThaliComponents();
    }
  },

  getDefaultThaliComponents() {
    return {
      curries: [
        { id: 'c-1', name: 'Shahi Paneer Makhani', img: '🥘', price: 45, cal: 260, type: 'veg' },
        { id: 'c-2', name: 'Rajasthani Govind Gatte', img: '🧆', price: 40, cal: 220, type: 'veg' },
        { id: 'c-3', name: 'Pindi Chole Masala', img: '🍲', price: 35, cal: 210, type: 'veg' },
        { id: 'c-4', name: 'Matar Paneer Homestyle', img: '🍛', price: 40, cal: 240, type: 'veg' },
        { id: 'c-5', name: 'Dhaba Murgh (Chicken Curry)', img: '🍗', price: 65, cal: 320, type: 'non_veg' },
        { id: 'c-6', name: 'Butter Chicken Gravy', img: '🥘', price: 70, cal: 340, type: 'non_veg' },
        { id: 'c-7', name: 'Satvik Lauki Chana Dal', img: '🥣', price: 30, cal: 180, type: 'jain' },
        { id: 'c-8', name: 'High-Protein Herb Grilled Paneer', img: '💪', price: 55, cal: 280, type: 'veg' }
      ],
      dals: [
        { id: 'd-1', name: 'Yellow Moong Dal Tadka (Desi Ghee)', img: '🥣', price: 25, cal: 160, type: 'veg' },
        { id: 'd-2', name: 'Dal Makhani Slow-Cooked', img: '🍲', price: 35, cal: 240, type: 'veg' },
        { id: 'd-3', name: 'Panchmel Rajasthani Dal', img: '🥣', price: 30, cal: 190, type: 'veg' },
        { id: 'd-4', name: 'Gujarati Khatti Meethi Dal', img: '🍛', price: 25, cal: 150, type: 'veg' }
      ],
      breadsAndRice: [
        { id: 'b-1', name: '4 Whole Wheat Desi Ghee Phulkas', img: '🫓', price: 25, cal: 240 },
        { id: 'b-2', name: '2 Hot Bajra Rotis with White Makhan', img: '🫓', price: 30, cal: 280 },
        { id: 'b-3', name: '2 Multigrain Jowar/Ragi Rotis', img: '🫓', price: 30, cal: 220 },
        { id: 'b-4', name: 'Steamed Long-Grain Basmati Rice', img: '🍚', price: 20, cal: 190 },
        { id: 'b-5', name: 'Aromatic Jeera Basmati Rice', img: '🍚', price: 25, cal: 210 }
      ],
      accompaniments: [
        { id: 'a-1', name: 'Boondi Raita & Roasted Papad', img: '🥗', price: 20, cal: 90 },
        { id: 'a-2', name: 'Fresh Green Salad & Mint Chutney', img: '🥒', price: 15, cal: 40 },
        { id: 'a-3', name: 'Warm Kesari Gulab Jamun (2 pcs)', img: '🍩', price: 30, cal: 210 },
        { id: 'a-4', name: 'Desi Ghee Rose Gond Churma', img: '🍯', price: 35, cal: 250 },
        { id: 'a-5', name: 'Spiced Buttermilk (Chaas)', img: '🥛', price: 15, cal: 50 }
      ]
    };
  },

  async getMenu(params = {}) {
    try {
      const qs = new URLSearchParams(params);
      const res = await fetch(`${API_BASE}/menu?${qs.toString()}`, { headers: getHeaders(false) });
      const data = await res.json();
      return data.data || [];
    } catch (err) {
      return [];
    }
  },

  async addDish(payload) {
    try {
      const res = await fetch(`${API_BASE}/menu`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error adding dish.' };
    }
  },

  async updateDish(id, payload) {
    try {
      const res = await fetch(`${API_BASE}/menu/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error updating dish.' };
    }
  },

  async toggleDishStock(id) {
    try {
      const res = await fetch(`${API_BASE}/menu/${id}/toggle-stock`, {
        method: 'PATCH',
        headers: getHeaders()
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error toggling dish stock.' };
    }
  },

  async deleteDish(id) {
    try {
      const res = await fetch(`${API_BASE}/menu/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error deleting dish.' };
    }
  },

  // 4. Meal Plans APIs
  async getPlans(params = {}) {
    try {
      const qs = new URLSearchParams(params);
      const res = await fetch(`${API_BASE}/plans?${qs.toString()}`, { headers: getHeaders(false) });
      const data = await res.json();
      return data.data || [];
    } catch (err) {
      return [];
    }
  },

  async addPlan(payload) {
    try {
      const res = await fetch(`${API_BASE}/plans`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error creating meal plan.' };
    }
  },

  async updatePlan(id, payload) {
    try {
      const res = await fetch(`${API_BASE}/plans/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error updating meal plan.' };
    }
  },

  async togglePlanStatus(id) {
    try {
      const res = await fetch(`${API_BASE}/plans/${id}/toggle-status`, {
        method: 'PATCH',
        headers: getHeaders()
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error toggling plan status.' };
    }
  },

  async deletePlan(id) {
    try {
      const res = await fetch(`${API_BASE}/plans/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error deleting plan.' };
    }
  },

  // 5. Orders APIs
  async getOrders(params = {}) {
    try {
      const qs = new URLSearchParams(params);
      const res = await fetch(`${API_BASE}/orders?${qs.toString()}`, { headers: getHeaders() });
      const data = await res.json();
      return data.data || [];
    } catch (err) {
      return [];
    }
  },

  async getOrder(id) {
    try {
      const res = await fetch(`${API_BASE}/orders/${id}`, { headers: getHeaders() });
      const data = await res.json();
      return data.data;
    } catch (err) {
      return null;
    }
  },

  async createOrder(payload) {
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Order could not be placed.' };
    }
  },

  async updateOrderStatus(id, status, riderInfo = null) {
    try {
      const res = await fetch(`${API_BASE}/orders/${id}/status`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ status, riderInfo })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error updating order status.' };
    }
  },

  async advanceOrderStatus(id) {
    try {
      const res = await fetch(`${API_BASE}/orders/${id}/advance-status`, {
        method: 'PATCH',
        headers: getHeaders()
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error advancing order status.' };
    }
  },

  async validateCoupon(couponCode, subtotal) {
    try {
      const res = await fetch(`${API_BASE}/orders/validate-coupon`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ couponCode, subtotal })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error validating coupon code.' };
    }
  },

  // 6. Subscriptions APIs
  async getSubscriptions(params = {}) {
    try {
      const qs = new URLSearchParams(params);
      const res = await fetch(`${API_BASE}/subscriptions?${qs.toString()}`, { headers: getHeaders() });
      const data = await res.json();
      return data.data || [];
    } catch (err) {
      return [];
    }
  },

  async getActiveSubscription() {
    try {
      const res = await fetch(`${API_BASE}/subscriptions/active`, { headers: getHeaders() });
      const data = await res.json();
      return data.data;
    } catch (err) {
      return null;
    }
  },

  async createSubscription(payload) {
    try {
      const res = await fetch(`${API_BASE}/subscriptions`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error activating subscription.' };
    }
  },

  async togglePauseDate(date, subscriptionId = null) {
    try {
      const res = await fetch(`${API_BASE}/subscriptions/pause-date`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ date, subscriptionId })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error updating pause date.' };
    }
  },

  async updateSubscriptionStatus(id, status, reason = '') {
    try {
      const res = await fetch(`${API_BASE}/subscriptions/${id}/status`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ status, reason })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error updating subscription status.' };
    }
  },

  // 7. Reviews & Ratings APIs
  async getReviews(providerId = null) {
    try {
      const qs = providerId ? `?providerId=${providerId}` : '';
      const res = await fetch(`${API_BASE}/reviews${qs}`, { headers: getHeaders(false) });
      const data = await res.json();
      return data.data || [];
    } catch (err) {
      return [];
    }
  },

  async submitReview(payload) {
    try {
      const res = await fetch(`${API_BASE}/reviews`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error submitting review.' };
    }
  },

  async replyReview(id, comment) {
    try {
      const res = await fetch(`${API_BASE}/reviews/${id}/reply`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ comment })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error posting reply.' };
    }
  },

  async deleteReview(id) {
    try {
      const res = await fetch(`${API_BASE}/reviews/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error deleting review.' };
    }
  },

  // 8. Complaints & Dispute APIs
  async getComplaints(params = {}) {
    try {
      const qs = new URLSearchParams(params);
      const res = await fetch(`${API_BASE}/complaints?${qs.toString()}`, { headers: getHeaders() });
      const data = await res.json();
      return data.data || [];
    } catch (err) {
      return [];
    }
  },

  async submitComplaint(payload) {
    try {
      const res = await fetch(`${API_BASE}/complaints`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error lodging complaint.' };
    }
  },

  async updateComplaint(id, payload) {
    try {
      const res = await fetch(`${API_BASE}/complaints/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error updating complaint.' };
    }
  },

  // 9. Notifications APIs
  async getNotifications() {
    try {
      const res = await fetch(`${API_BASE}/notifications`, { headers: getHeaders() });
      const data = await res.json();
      return data.data || [];
    } catch (err) {
      return [];
    }
  },

  async markNotificationRead(id) {
    try {
      const res = await fetch(`${API_BASE}/notifications/${id}/read`, {
        method: 'PATCH',
        headers: getHeaders()
      });
      return await res.json();
    } catch (err) {
      return { success: false };
    }
  },

  async markAllNotificationsRead() {
    try {
      const res = await fetch(`${API_BASE}/notifications/read-all`, {
        method: 'PATCH',
        headers: getHeaders()
      });
      return await res.json();
    } catch (err) {
      return { success: false };
    }
  },

  // 10. Admin Governance APIs
  async getAdminDashboard() {
    try {
      const res = await fetch(`${API_BASE}/admin/dashboard`, { headers: getHeaders() });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error fetching admin metrics.' };
    }
  },

  async getAdminProviders(params = {}) {
    try {
      const qs = new URLSearchParams(params);
      const res = await fetch(`${API_BASE}/admin/providers?${qs.toString()}`, { headers: getHeaders() });
      const data = await res.json();
      return data.data || [];
    } catch (err) {
      return [];
    }
  },

  async approveProvider(id) {
    try {
      const res = await fetch(`${API_BASE}/admin/providers/${id}/approve`, {
        method: 'PUT',
        headers: getHeaders()
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error approving provider.' };
    }
  },

  async rejectProvider(id, reason) {
    try {
      const res = await fetch(`${API_BASE}/admin/providers/${id}/reject`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ reason })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error rejecting provider.' };
    }
  },

  async suspendProvider(id) {
    try {
      const res = await fetch(`${API_BASE}/admin/providers/${id}/suspend`, {
        method: 'PUT',
        headers: getHeaders()
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error suspending provider.' };
    }
  },

  async reactivateProvider(id) {
    try {
      const res = await fetch(`${API_BASE}/admin/providers/${id}/reactivate`, {
        method: 'PUT',
        headers: getHeaders()
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error reactivating provider.' };
    }
  },

  async getAdminUsers(params = {}) {
    try {
      const qs = new URLSearchParams(params);
      const res = await fetch(`${API_BASE}/admin/users?${qs.toString()}`, { headers: getHeaders() });
      const data = await res.json();
      return data.data || [];
    } catch (err) {
      return [];
    }
  },

  async toggleUserStatus(id, status) {
    try {
      const res = await fetch(`${API_BASE}/admin/users/${id}/status`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ status })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error updating user status.' };
    }
  },

  async getCategories() {
    try {
      const res = await fetch(`${API_BASE}/admin/categories`, { headers: getHeaders(false) });
      const data = await res.json();
      return data.data || [];
    } catch (err) {
      return [];
    }
  },

  async getCuisines() {
    try {
      const res = await fetch(`${API_BASE}/admin/cuisines`, { headers: getHeaders(false) });
      const data = await res.json();
      return data.data || [];
    } catch (err) {
      return [];
    }
  },

  async resetDatabase() {
    try {
      const res = await fetch(`${API_BASE}/admin/reset-database`, {
        method: 'POST',
        headers: getHeaders()
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Error resetting database.' };
    }
  },

  // 11. Locations APIs
  async getLocations() {
    try {
      const res = await fetch(`${API_BASE}/locations`, { headers: getHeaders(false) });
      const data = await res.json();
      return data.data;
    } catch (err) {
      return null;
    }
  },

  // 12. Rider Portal APIs
  async getRiderDashboard() {
    try {
      const res = await fetch(`${API_BASE}/riders/overview`, { headers: getHeaders() });
      const data = await res.json();
      return data.data;
    } catch (err) {
      return null;
    }
  },

  async toggleRiderDuty(status) {
    try {
      const res = await fetch(`${API_BASE}/riders/duty-status`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ status })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Network error updating duty status.' };
    }
  },

  async riderPickupOrder(orderId) {
    try {
      const res = await fetch(`${API_BASE}/riders/orders/${orderId}/pickup`, {
        method: 'POST',
        headers: getHeaders()
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Network error confirming pickup.' };
    }
  },

  async riderDeliverOrder(orderId, otp) {
    try {
      const res = await fetch(`${API_BASE}/riders/orders/${orderId}/deliver`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ otp })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Network error confirming delivery.' };
    }
  },

  async riderCollectDabba(dabbaId, customerName) {
    try {
      const res = await fetch(`${API_BASE}/riders/dabbas/collect`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ dabbaId, customerName })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Network error collecting dabba.' };
    }
  },

  async simulateRiderOrder() {
    try {
      const res = await fetch(`${API_BASE}/riders/simulate-order`, {
        method: 'POST',
        headers: getHeaders()
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Network error simulating order.' };
    }
  },

  // Backward compatibility alias
  async getKitchens(city, type) {
    return this.getProviders({ city, mealType: type });
  }
};
