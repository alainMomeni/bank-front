import { useState, useEffect } from 'react';
import { NotificationService } from '../services/notificationService';
import { API_CONFIG } from '../config/api';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    try {
      setError(null);
      const data = await NotificationService.fetchNotifications();
      setNotifications(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    
    const interval = setInterval(fetchNotifications, API_CONFIG.POLLING_INTERVAL);
    
    return () => clearInterval(interval);
  }, []);

  return {
    notifications,
    isLoading,
    error,
    refetch: fetchNotifications
  };
};