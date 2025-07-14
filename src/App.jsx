import { useState, useEffect } from 'react';

const API_URL = 'https://bank-server-mzfl.onrender.com';


function App() {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    filterData();
  }, [notifications, searchTerm, filterType, dateFilter]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${API_URL}/api/gab-notifications`);
      const data = await response.json();
      setNotifications(data);
      setIsLoading(false);
    } catch (err) {
      console.error('Erreur:', err);
      setIsLoading(false);
    }
  };

  const filterData = () => {
    let filtered = [...notifications];

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(notif => 
        notif.transaction_reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notif.transaction_narration.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notif.user_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par type de transaction
    if (filterType !== 'all') {
      filtered = filtered.filter(notif => notif.transaction_drcr_indicator === filterType);
    }

    // Filtre par date
    if (dateFilter) {
      filtered = filtered.filter(notif => {
        const notifDate = new Date(notif.transaction_date).toDateString();
        const filterDate = new Date(dateFilter).toDateString();
        return notifDate === filterDate;
      });
    }

    setFilteredNotifications(filtered);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const handleAction = (id) => {
    console.log('Action clicked for notification:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">GAB Notifications Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Surveillance en temps réel des transactions</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Dernière mise à jour:</span>
              <span className="text-sm font-medium text-gray-900">
                {new Date().toLocaleTimeString('fr-FR')}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Filtres */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Recherche */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rechercher
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Référence, narration..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Type de transaction */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de transaction
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Toutes</option>
                <option value="C">Crédit</option>
                <option value="D">Débit</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Statistiques */}
            <div className="flex items-end">
              <div className="bg-blue-50 rounded-lg p-3 w-full">
                <p className="text-sm text-blue-600 font-medium">Total des transactions</p>
                <p className="text-2xl font-bold text-blue-900">{filteredNotifications.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Heure
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Référence
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilisateur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Montant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Narration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      Chargement...
                    </td>
                  </tr>
                ) : filteredNotifications.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      Aucune notification trouvée
                    </td>
                  </tr>
                ) : (
                  filteredNotifications.map((notif) => (
                    <tr key={notif.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(notif.transaction_date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                          {notif.transaction_reference}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {notif.user_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          notif.transaction_drcr_indicator === 'C' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {notif.transaction_drcr_indicator === 'C' ? 'Crédit' : 'Débit'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {formatAmount(notif.transaction_amount)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {notif.transaction_narration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleAction(notif.id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
                        >
                          Action
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;