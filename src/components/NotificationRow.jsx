import { formatDate, formatAmount } from '../utils/formatters';

export const NotificationRow = ({ notification, onAction }) => {
  const { 
    transaction_date, 
    transaction_reference, 
    transaction_drcr_indicator, 
    transaction_amount, 
    transaction_narration,
    status
  } = notification;

  return (
    <tr className={`hover:bg-gray-50 ${status === 'processed' ? 'bg-gray-100 text-gray-500' : 'bg-white'}`}>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        {formatDate(transaction_date)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-mono bg-gray-200 px-2 py-1 rounded">
          {transaction_reference}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
        {transaction_narration}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          transaction_drcr_indicator === 'C' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {transaction_drcr_indicator === 'C' ? 'Crédit' : 'Débit'}
        </span>
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${status !== 'processed' ? 'text-gray-900' : ''}`}>
        {formatAmount(transaction_amount)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
        <button
          onClick={() => onAction(notification)}
          disabled={status === 'processed'}
          className={`px-4 py-2 rounded-md font-medium transition-colors w-40 text-center ${
            status === 'processed' 
              ? 'bg-green-200 text-green-800 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {status === 'processed' ? 'Paiement créé' : 'Créer un paiement'}
        </button>
      </td>
    </tr>
  );
};