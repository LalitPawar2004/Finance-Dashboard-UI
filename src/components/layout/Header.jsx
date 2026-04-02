import RoleSwitcher from '../common/RoleSwitcher';
import { useAppContext } from '../../context/AppContext';
import { exportToCSV } from '../../utils/exportUtils';
import { Download } from 'lucide-react';
import toast from 'react-hot-toast';
import MobileMenu from './MobileMenu';

const Header = ({ activePage, onPageChange }) => {
  const { userRole, setUserRole, transactions } = useAppContext();
  const isAdmin = userRole === 'admin';

  const handleExport = () => {
    if (transactions.length === 0) {
      toast.error('No transactions to export');
      return;
    }
    exportToCSV(transactions);
    toast.success('Export successful!');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sticky top-0 z-40">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <MobileMenu activePage={activePage} onPageChange={onPageChange} />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Finance Dashboard
          </h1>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          {isAdmin && (
            <button
              onClick={handleExport}
              className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              title="Export Transactions"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Export</span>
            </button>
          )}
          <RoleSwitcher currentRole={userRole} onRoleChange={setUserRole} />
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            JD
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;