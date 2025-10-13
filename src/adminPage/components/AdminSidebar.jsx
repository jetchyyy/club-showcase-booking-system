import { Calendar, Users } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      name: 'Bookings',
      icon: Calendar,
      path: '/admin/dashboard/bookings',
      description: 'Manage table reservations'
    },
    {
      name: 'Events',
      icon: Users,
      path: '/admin/dashboard/events',
      description: 'Manage events'
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-950 border-r border-[#cccbd0]/20 min-h-screen p-6">
      {/* Logo/Brand */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">Admin Panel</h2>
        <p className="text-gray-400 text-sm">Management Dashboard</p>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-start gap-3 p-4 rounded-lg transition-all ${
                active
                  ? 'bg-[#cccbd0] text-[#140f2d]'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 mt-0.5 ${active ? 'text-[#140f2d]' : 'text-[#cccbd0]'}`} />
              <div className="text-left">
                <div className={`font-semibold ${active ? 'text-[#140f2d]' : 'text-white'}`}>
                  {item.name}
                </div>
                <div className={`text-xs mt-0.5 ${active ? 'text-[#140f2d]/70' : 'text-gray-500'}`}>
                  {item.description}
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="my-6 border-t border-gray-800"></div>

      {/* Footer Info */}
      <div className="text-gray-500 text-xs">
        <p className="mb-1">Last login:</p>
        <p className="text-gray-400">
          {sessionStorage.getItem('adminLoginTime') 
            ? new Date(sessionStorage.getItem('adminLoginTime')).toLocaleString()
            : 'Unknown'}
        </p>
      </div>
    </div>
  );
};

export default AdminSidebar;