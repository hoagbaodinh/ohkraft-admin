import './App.scss';
import Home from './pages/home/Home.jsx';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useRouteLoaderData,
} from 'react-router-dom';
import Login from './pages/login/Login.jsx';
import Layout from './pages/layout/Layout.jsx';
import { getCurrentUser } from './util/auth.js';
import Product from './pages/productTable/ProductTable.jsx';
import NewProduct from './pages/newProduct/NewProduct.jsx';
import ErrorPage from './pages/error/Error.jsx';
import ChatPage from './pages/chat/Chat.jsx';
import TransactionPage from './pages/transaction/Transaction.jsx';
import NewUser from './pages/newUser/NewUser.jsx';
import UserTable from './pages/userTable/UserTable.jsx';

// Check user co phai la admin hay khong
const ProtectedRoute = ({ children }) => {
  const user = useRouteLoaderData('root');
  if (!user) {
    window.alert('You must be logged in first');
    return <Navigate to="/login" />;
  } else if (!user?.isAdmin && user?.isConsultant) {
    return <Navigate to="/chat" />;
  } else if (!user?.isAdmin && !user?.isConsultant) {
    window.alert("You don't have permission to access");
    localStorage.removeItem('currentUser');

    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      id: 'root',
      loader: getCurrentUser,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: 'products',
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <Product title="Products List" />
                </ProtectedRoute>
              ),
            },
            {
              path: 'new',

              element: (
                <ProtectedRoute>
                  <NewProduct edit={false} />
                </ProtectedRoute>
              ),
            },
            {
              path: 'edit/:id',
              element: (
                <ProtectedRoute>
                  <NewProduct edit={true} />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: 'orders',
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <TransactionPage title="Order" />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: 'users',
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <UserTable />
                </ProtectedRoute>
              ),
            },
            {
              path: 'new',
              element: (
                <ProtectedRoute>
                  <NewUser edit={false} />
                </ProtectedRoute>
              ),
            },
            {
              path: 'edit/:id',
              element: (
                <ProtectedRoute>
                  <NewUser edit={true} />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: 'chat',
          element: <ChatPage />,
        },
      ],
    },
    { path: '/login', element: <Login /> },
    { path: '*', element: <ErrorPage /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
