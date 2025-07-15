import { formatTime } from '../utils/formatters';

export const Header = () => {
  return (
    <header className="text-white shadow" style={{ backgroundColor: '#3D769A' }}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl text-white">
              GAB Notifications Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 mt-1">
              Surveillance en temps réel des transactions
            </p>
          </div>
          
          <div className="flex items-center space-x-2 sm:ml-auto">
            <span className="text-xs sm:text-sm text-blue-100 hidden sm:inline">
              Dernière mise à jour:
            </span>
            <span className="text-xs sm:text-sm text-blue-100 sm:hidden">
              MAJ:
            </span>
            <span className="text-xs sm:text-sm font-medium text-white">
              {formatTime()}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};