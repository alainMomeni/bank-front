import { NotificationRow } from './NotificationRow';

export const NotificationsTable = ({ notifications, isLoading, onAction }) => {
  const renderTableBody = () => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
            Chargement...
          </td>
        </tr>
      );
    }

    if (notifications.length === 0) {
      return (
        <tr>
          <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
            Aucune notification trouvée
          </td>
        </tr>
      );
    }

    return notifications.map((notification) => (
      <NotificationRow
        key={notification.id}
        notification={notification}
        onAction={onAction}
      />
    ));
  };

  return (
    <div className=" mx-auto px-4 sm:px-6 lg:px-8 pb-6">
      <div className="bg-white rounded-lg shadow overflow-hidden" >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider" style={{ backgroundColor: '#3D769A' }}>
                  Date
                </th>
                <th className="px-6 py-5 text-left text-xs font-medium text-white border-l uppercase tracking-wider" style={{ backgroundColor: '#3D769A' }}>
                  Référence
                </th>
                <th className="px-6 py-5 text-left text-xs font-medium text-white border-l uppercase tracking-wider" style={{ backgroundColor: '#3D769A' }}>
                  Description
                </th>
                <th className="px-6 py-5 text-left text-xs font-medium text-white border-l uppercase tracking-wider" style={{ backgroundColor: '#3D769A' }}>
                  Type
                </th>
                <th className="px-6 py-5 text-left text-xs font-medium text-white border-l uppercase tracking-wider" style={{ backgroundColor: '#3D769A' }}>
                  Montant
                </th>
                <th className="px-6 py-5 text-left text-xs font-medium text-white border-l uppercase tracking-wider" style={{ backgroundColor: '#3D769A' }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {renderTableBody()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};