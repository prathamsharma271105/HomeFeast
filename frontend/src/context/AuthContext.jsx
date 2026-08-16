import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';
import { geoLocator } from '../utils/geoLocator';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Current active user
  const [user, setUser] = useState(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('homefeast_token') : null;
    if (!token) {
      return {
        id: 'guest',
        name: 'Guest Foodie',
        email: '',
        phone: '',
        city: 'jaipur',
        area: 'Malviya Nagar',
        address: '',
        role: 'CUSTOMER'
      };
    }
    return {
      id: 'usr_customer_1',
      name: 'Aarav Sharma',
      email: 'customer@homefeast.test',
      phone: '+91 98290 20001',
      city: 'jaipur',
      area: 'Malviya Nagar',
      address: 'Flat 304, Royal Palms, Malviya Nagar Sector 3, Jaipur',
      role: 'CUSTOMER'
    };
  });

  // Active City and Location State
  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem('homefeast_city') || 'jaipur';
  });
  const [selectedLocality, setSelectedLocality] = useState(() => {
    return localStorage.getItem('homefeast_locality') || 'Malviya Nagar';
  });
  const [liveGpsInfo, setLiveGpsInfo] = useState(null);
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [allLocations, setAllLocations] = useState(null);

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login'); // 'login' | 'register'
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [isPlanCheckoutModalOpen, setIsPlanCheckoutModalOpen] = useState(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState(null);
  const [activeModalData, setActiveModalData] = useState(null);

  // Subscriptions & Notifications state
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [loadingSub, setLoadingSub] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifCount, setUnreadNotifCount] = useState(0);

  // Initialize profile, locations and notifications on mount
  useEffect(() => {
    async function init() {
      const locs = await api.getLocations();
      if (locs) setAllLocations(locs);

      // Check if existing token
      const token = localStorage.getItem('homefeast_token');
      if (token) {
        const profile = await api.getProfile();
        if (profile) setUser(profile);
      }

      fetchSubscription();
      fetchNotifications();
    }
    init();
  }, []);

  // Save selected city & locality to localStorage
  useEffect(() => {
    if (selectedCity) localStorage.setItem('homefeast_city', selectedCity);
    if (selectedLocality) localStorage.setItem('homefeast_locality', selectedLocality);
  }, [selectedCity, selectedLocality]);

  const fetchSubscription = async () => {
    try {
      setLoadingSub(true);
      const sub = await api.getActiveSubscription();
      if (sub) setActiveSubscription(sub);
    } catch (err) {
      console.warn('fetchSubscription error:', err);
    } finally {
      setLoadingSub(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const list = await api.getNotifications();
      if (Array.isArray(list)) {
        setNotifications(list);
        setUnreadNotifCount(list.filter(n => !n.isRead).length);
      }
    } catch (err) {
      console.warn('fetchNotifications error:', err);
    }
  };

  const markNotificationRead = async (id) => {
    await api.markNotificationRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    setUnreadNotifCount(prev => Math.max(0, prev - 1));
  };

  const markAllNotificationsRead = async () => {
    await api.markAllNotificationsRead();
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    setUnreadNotifCount(0);
  };

  const loginUser = (userData) => {
    setUser(userData);
    if (userData.city) setSelectedCity(userData.city);
    if (userData.area) setSelectedLocality(userData.area);
    setIsAuthModalOpen(false);
    fetchSubscription();
    fetchNotifications();
  };

  const logoutUser = async () => {
    await api.logout();
    setUser({
      id: 'guest',
      name: 'Guest Foodie',
      email: '',
      phone: '',
      city: selectedCity,
      area: selectedLocality,
      address: '',
      role: 'CUSTOMER'
    });
    setActiveSubscription(null);
  };

  // Quick 1-Click Role Switcher for instant demo testing
  const switchRole = async (targetRole) => {
    const roleUpper = targetRole.toUpperCase();
    let email = 'customer@homefeast.test';
    if (roleUpper === 'PROVIDER') email = 'provider@homefeast.test';
    if (roleUpper === 'ADMIN') email = 'admin@homefeast.test';
    if (roleUpper === 'RIDER') email = 'rider@homefeast.test';

    const res = await api.login(email, 'password123', roleUpper);
    const userObj = res.user || res.data;
    if (res.success && userObj) {
      loginUser(userObj);
      return userObj;
    }
    return null;
  };

  const switchLocation = (cityId, localityName, newAddress, gpsData = null) => {
    const cleanCityId = (cityId || 'jaipur').toLowerCase().replace(/\s+/g, '-');
    setSelectedCity(cleanCityId);
    setSelectedLocality(localityName || 'City Center');
    if (gpsData) setLiveGpsInfo(gpsData);

    if (user && user.id !== 'guest') {
      setUser(prev => ({
        ...prev,
        city: cleanCityId,
        area: localityName || 'City Center',
        address: newAddress || prev.address
      }));
    }
    setIsLocationModalOpen(false);
  };

  const detectLiveLocation = async () => {
    try {
      setIsDetectingGps(true);
      const data = await geoLocator.detectLiveLocation();
      const detectedCityKey = (data.cityName || 'jaipur').toLowerCase().replace(/\s+/g, '-');
      const locality = data.locality || 'Live GPS Location';
      const address = data.formattedAddress;

      setLiveGpsInfo(data);
      switchLocation(detectedCityKey, locality, address, data);
      setIsDetectingGps(false);
      return { success: true, data };
    } catch (err) {
      setIsDetectingGps(false);
      return { success: false, error: err.message };
    }
  };

  const openPlanCheckout = (plan) => {
    setSelectedPlanForCheckout(plan);
    setIsPlanCheckoutModalOpen(true);
  };

  const openReviewModal = (data = null) => {
    setActiveModalData(data);
    setIsReviewModalOpen(true);
  };

  const openComplaintModal = (data = null) => {
    setActiveModalData(data);
    setIsComplaintModalOpen(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loginUser,
        logoutUser,
        switchRole,
        selectedCity,
        selectedLocality,
        liveGpsInfo,
        isDetectingGps,
        detectLiveLocation,
        allLocations,
        switchLocation,
        // Modal states
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        isLocationModalOpen,
        setIsLocationModalOpen,
        isReviewModalOpen,
        setIsReviewModalOpen,
        openReviewModal,
        isComplaintModalOpen,
        setIsComplaintModalOpen,
        openComplaintModal,
        isPlanCheckoutModalOpen,
        setIsPlanCheckoutModalOpen,
        selectedPlanForCheckout,
        openPlanCheckout,
        activeModalData,
        // Subscriptions & Notifications
        activeSubscription,
        setActiveSubscription,
        fetchSubscription,
        loadingSub,
        notifications,
        unreadNotifCount,
        fetchNotifications,
        markNotificationRead,
        markAllNotificationsRead
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
