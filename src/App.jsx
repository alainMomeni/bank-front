import { useState } from 'react';
import { Header } from './components/Header';
import { Filters } from './components/Filters';
import { NotificationsTable } from './components/NotificationsTable';
import { PaymentModal } from './components/PaymentModal';
import { useNotifications } from './hooks/useNotifications';
import { useFilters } from './hooks/useFilters';
import { NotificationService } from './services/notificationService';

function App() {
  const { notifications, isLoading, error, refetch } = useNotifications();
  
  const {
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    dateFilter,
    setDateFilter,
    filteredNotifications,
    counts
  } = useFilters(notifications);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleOpenPaymentModal = (notification) => {
    if (notification.status !== 'processed') {
      setSelectedNotification(notification);
      setIsModalOpen(true);
    }
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
  };

  const handlePaymentSubmit = async (id, paymentDetails) => {
    console.log(`Soumission du paiement pour l'ID ${id}:`, paymentDetails);
    
    try {
      await NotificationService.updateNotificationStatus(id, 'processed');
      refetch();
      handleCloseModal();
    } catch (err) {
      console.error("Échec de la création du paiement pour la notification:", id, err);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 font-semibold mb-2">Erreur de connexion</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F0F2F5' }}>
      <Header />
      
      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        counts={counts}
      />
      
      <main className="py-8">
        <NotificationsTable
          notifications={filteredNotifications}
          isLoading={isLoading && notifications.length === 0}
          onAction={handleOpenPaymentModal}
        />
      </main>

      <PaymentModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handlePaymentSubmit}
        notification={selectedNotification}
      />
    </div>
  );
}

export default App;