import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerLandingPage from './customerPage/CustomerLandingPage';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Customer Landing Page - Main Route */}
        <Route path="/" element={<CustomerLandingPage />} />
        
        {/* Admin Login Route */}
        <Route path="/admin" element={<AdminLogin />} />
        
        {/* Admin Dashboard Route (Protected) */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        {/* 404 Not Found Route */}
        <Route path="*" element={
          <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-white mb-4">404</h1>
              <p className="text-gray-400 mb-8">Page not found</p>
              <a 
                href="/" 
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all inline-block"
              >
                Go Home
              </a>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;