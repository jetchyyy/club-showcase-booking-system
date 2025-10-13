import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import AdminSidebar from './AdminSidebar';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    sessionStorage.removeItem('adminLoginTime');
    navigate('/admin');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#140f2d] to-black">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Logout Button */}
          <div className="flex justify-end mb-8">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>

          {/* Render child routes */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;