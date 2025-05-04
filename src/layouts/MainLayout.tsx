import { Outlet } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#1a1f2c]">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout; 