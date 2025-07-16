import { UserIcon, ChevronDownIcon, CalendarDaysIcon } from '@heroicons/react/24/solid';

export const Filters = ({ 
  searchTerm, 
  setSearchTerm, 
  filterType, 
  setFilterType, 
  dateFilter, 
  setDateFilter, 
  counts
}) => {
  return (
    <div className="shadow-sm border-b" style={{ backgroundColor: '#FAFAFA' }}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-x-6 items-end">
          
          <div className="md:col-span-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-500 mb-1">
              Rechercher
            </label>
            <div className="relative">
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Référence, narration..."
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="md:col-span-1 mt-4 md:mt-0">
            <label htmlFor="type" className="block text-sm font-medium text-gray-500 mb-1">
              Type de transaction
            </label>
            <div className="relative">
              <select
                id="type"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="appearance-none w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Toutes</option>
                <option value="C">Crédit</option>
                <option value="D">Débit</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="md:col-span-2 mt-4 md:mt-0 grid grid-cols-2 gap-x-4">
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-500 mb-1">
                Date de début
              </label>
              <div className="relative">
                <input
                  id="start-date"
                  type="date"
                  value={dateFilter.start}
                  onChange={(e) => setDateFilter({ ...dateFilter, start: e.target.value })}
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="end-date" className="block text-sm font-medium text-gray-500 mb-1">
                Date de fin
              </label>
              <div className="relative">
                <input
                  id="end-date"
                  type="date"
                  value={dateFilter.end}
                  onChange={(e) => setDateFilter({ ...dateFilter, end: e.target.value })}
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          
<div className="md:col-span-1 flex flex-col w-full mt-6 md:mt-0 min-w-0">
  <div className="grid grid-cols-3 sm:flex sm:space-x-2 md:space-x-4 lg:space-x-6 justify-between sm:justify-end gap-x-1">
    <div className="text-center sm:text-right min-w-0">
      <p className="text-xs sm:text-sm md:text-xs lg:text-sm text-gray-500 whitespace-nowrap">À Traiter</p>
      <p className="text-sm sm:text-xl md:text-lg lg:text-2xl font-light text-orange-500 truncate">
        {new Intl.NumberFormat('fr-FR').format(counts.toProcess)}
      </p>
    </div>
    <div className="text-center sm:text-right min-w-0">
      <p className="text-xs sm:text-sm lg:text-sm text-gray-500 whitespace-nowrap">Traitées</p>
      <p className="text-sm sm:text-xl  lg:text-2xl font-light text-green-500 truncate">
        {new Intl.NumberFormat('fr-FR').format(counts.processed)}
      </p>
    </div>
    <div className="text-center sm:text-right min-w-0">
      <p className="text-xs sm:text-sm md:text-xs lg:text-sm text-gray-500 whitespace-nowrap">Total</p>
      <p className="text-sm sm:text-xl md:text-lg lg:text-2xl font-light text-slate-800 truncate">
        {new Intl.NumberFormat('fr-FR').format(counts.total)}
      </p>
    </div>
  </div>
</div>
        </div>
      </div>
    </div>
  );
};