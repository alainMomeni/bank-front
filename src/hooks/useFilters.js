import { useState, useMemo } from 'react';
import { NotificationService } from '../services/notificationService';

export const useFilters = (notifications) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateFilter, setDateFilter] = useState({ start: '', end: '' });

  const filteredNotifications = useMemo(() => {
    return NotificationService.filterNotifications(notifications, {
      searchTerm,
      filterType,
      dateFilter
    });
  }, [notifications, searchTerm, filterType, dateFilter]);

  const counts = useMemo(() => {
    const totalToProcess = filteredNotifications.filter(n => n.status === 'pending').length;
    const totalProcessed = filteredNotifications.filter(n => n.status === 'processed').length;
    return {
      total: filteredNotifications.length,
      toProcess: totalToProcess,
      processed: totalProcessed
    };
  }, [filteredNotifications]);


  const resetFilters = () => {
    setSearchTerm('');
    setFilterType('all');
    setDateFilter({ start: '', end: '' });
  };

  return {
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    dateFilter,
    setDateFilter,
    filteredNotifications,
    counts,
    resetFilters
  };
};