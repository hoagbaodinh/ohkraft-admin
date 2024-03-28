import Sidebar from '../../components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import './layout.scss';

const Layout = () => {
  return (
    <div className="content">
      <Sidebar />
      <div className="contentContainer">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
