import { API_CONFIG } from '../config/api';

export class NotificationService {
  static async fetchNotifications() {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.NOTIFICATIONS}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error);
      throw error;
    }
  }

  static async updateNotificationStatus(id, status) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.NOTIFICATIONS}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du statut pour la notification ${id}:`, error);
      throw error;
    }
  }

  static filterNotifications(notifications, filters) {
    const { searchTerm, filterType, dateFilter } = filters;
    let filtered = [...notifications];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(notif => 
        notif.transaction_reference.toLowerCase().includes(searchLower) ||
        notif.transaction_narration.toLowerCase().includes(searchLower) ||
        notif.user_name.toLowerCase().includes(searchLower)
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(notif => notif.transaction_drcr_indicator === filterType);
    }

    const { start, end } = dateFilter;
    if (start || end) {
      const startDate = start ? new Date(start) : null;
      const endDate = end ? new Date(end) : null;

      if (endDate) {
          endDate.setHours(23, 59, 59, 999);
      }
      
      filtered = filtered.filter(notif => {
        const notifDate = new Date(notif.transaction_date);
        
        const afterStartDate = startDate ? notifDate >= startDate : true;
        const beforeEndDate = endDate ? notifDate <= endDate : true;

        return afterStartDate && beforeEndDate;
      });
    }

    return filtered;
  }
}