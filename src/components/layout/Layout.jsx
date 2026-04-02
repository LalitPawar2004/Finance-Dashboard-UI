import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children, activePage, onPageChange }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header activePage={activePage} onPageChange={onPageChange} />
      <div className="flex">
        <div className="hidden md:block">
          <Sidebar activePage={activePage} onPageChange={onPageChange} />
        </div>
        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;