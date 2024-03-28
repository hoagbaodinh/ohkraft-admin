import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const logoutHandler = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to log out? ')) {
      localStorage.removeItem('currentUser');
      navigate('/login');
    } else {
      return;
    }
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <span className="logo">Admin Page</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to={'/chat'} style={{ textDecoration: 'none' }}>
            <li>
              <ChatBubbleIcon className="icon" />
              <span>Chat</span>
            </li>
          </Link>
          <Link to={'/users'} style={{ textDecoration: 'none' }}>
            <li>
              <PersonOutlineOutlinedIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to={'/products'} style={{ textDecoration: 'none' }}>
            <li>
              <InventoryIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to={'/orders'} style={{ textDecoration: 'none' }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
          <p className="title">NEW</p>
          <Link to={'/products/new'} style={{ textDecoration: 'none' }}>
            <li>
              <InventoryIcon className="icon" />
              <span>New Product</span>
            </li>
          </Link>
          <Link to={'/users/new'} style={{ textDecoration: 'none' }}>
            <li>
              <PersonOutlineOutlinedIcon className="icon" />
              <span>New User</span>
            </li>
          </Link>

          <p className="title">USER</p>

          <li>
            <button className="headerBtn" onClick={logoutHandler}>
              <ExitToAppOutlinedIcon className="icon" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
