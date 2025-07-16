import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { formatAmount, formatDate } from '../utils/formatters';

const mockProfileData = {
  client: [
    { id: 'cli_01', name: 'Alpha Entreprise' },
    { id: 'cli_02', name: 'Beta Solutions' },
    { id: 'cli_03', name: 'Gamma Innovations' },
  ],
  fournisseur: [
    { id: 'four_01', name: 'Global Office Supplies' },
    { id: 'four_02', name: 'Tech Services Inc.' },
    { id: 'four_03', name: 'Ateliers de mécanique Pro' },
  ],
  plan_comptable: [
    { id: 'pc_401', name: '401 - Fournisseurs' },
    { id: 'pc_411', name: '411 - Clients' },
    { id: 'pc_512', name: '512 - Banque' },
  ],
};

export const PaymentModal = ({ isOpen, onClose, notification, onSubmit }) => {
  if (!isOpen || !notification) {
    return null;
  }
  
  const [profileType, setProfileType] = useState('client');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const paymentDetails = {
      profile_type: formData.get('profile_type'),
      profile_id: formData.get('profile_id'),
    };
    onSubmit(notification.id, paymentDetails);
  };
  
  const currentOptions = mockProfileData[profileType] || [];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gray-100">
      
      {/* ===== En-tête bleu ===== */}
      <div 
        className="flex items-center justify-between px-4 sm:px-6 py-4 text-white shadow-md flex-shrink-0" 
        style={{ backgroundColor: '#3D769A' }}
      >
        <h2 className="text-xl sm:text-2xl font-semibold">
          Nouveau paiement [GulfAfrican Bank]
        </h2>
        <button 
          onClick={onClose} 
          className="p-1 rounded-full text-white hover:bg-white/20 transition-colors duration-200"
        >
          <XMarkIcon className="h-7 w-7" />
        </button>
      </div>

      {/* ===== Corps principal (scrollable) ===== */}
      <div className="flex-grow overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className=" mx-auto space-y-6">
          
          {/* ===== SECTION PROFIL SÉPARÉE ===== */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 relative z-30">
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-800">
                Profil
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full sm:w-1/3">
                  <select
                    name="profile_type"
                    value={profileType}
                    onChange={(e) => setProfileType(e.target.value)}
                    className="w-full py-3 px-4 text-sm border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  >
                    <option value="client">Client</option>
                    <option value="fournisseur">Fournisseur</option>
                    <option value="plan_comptable">Plan Comptable</option>
                  </select>
                </div>

                <div className="flex-grow">
                  <select
                    name="profile_id"
                    required
                    form="payment-form"
                    className="w-full py-3 px-4 text-sm border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  >
                    <option value="" disabled>Sélectionnez...</option>
                    {currentOptions.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* ===== SECTION DÉTAILS DE LA TRANSACTION ===== */}
          <form id="payment-form" onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg">
            <div className="p-6 sm:p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Détails de la transaction
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Date
                      </label>
                      <input 
                        type="text" 
                        value={formatDate(notification.transaction_date)} 
                        readOnly
                        className="w-full py-3 px-4 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Référence
                      </label>
                      <input 
                        type="text" 
                        value={notification.transaction_reference} 
                        readOnly
                        className="w-full py-3 px-4 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mt-6">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <input 
                      type="text" 
                      value={notification.transaction_narration} 
                      readOnly
                      className="w-full py-3 px-4 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Sens / Type
                      </label>
                      <input 
                        type="text" 
                        value={notification.transaction_drcr_indicator === 'C' ? 'Crédit' : 'Débit'} 
                        readOnly
                        className="w-full py-3 px-4 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Montant
                      </label>
                      <input 
                        type="text" 
                        value={formatAmount(notification.transaction_amount)} 
                        readOnly
                        className="w-full py-3 px-4 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- BOUTON D'ACTION --- */}
            <div className="bg-gray-50 px-6 sm:px-8 py-4 border-t border-gray-200 rounded-b-xl">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  Créer le Paiement
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};