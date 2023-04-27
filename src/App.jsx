import './App.scss';
import { createBrowserRouter,createHashRouter,RouterProvider } from 'react-router-dom';
import MasterLayout from './components/MasterLayout/MasterLayout'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login'
import Proudcts from './components/Proudcts/Proudcts'
import Signup from './components/Signup/Signup'
import Notfound from './components/Notfound/Notfound'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import ResetCode from './components/ResetCode/ResetCode'
import ResetPassword from "./components/ResetPassword/ResetPassword";
import { useState,useEffect } from 'react';
import jwtDecode from 'jwt-decode'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProudctDetails from './components/ProudctDetails/ProudctDetails';
import CategoryDetails from "./components/CategoryDetails/CategoryDetails";
import CategoryView from "./components/CategoryView/CategoryView";
import Brands from "./components/Brands/Brands";
import Checkout from './components/Checkout/Checkout';
import Orders from './components/Orders/Orders';
import CartContextProvider from './Context/CartCountext';
import { Provider } from 'react-redux';
import { Store } from './Redux/Store';

function App() {

  const [userData, setUserData] = useState(null);
  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken=jwtDecode(encodedToken);
    setUserData(decodedToken);
  }

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      saveUserData()
    }
  },[])
    


  let router = createHashRouter([
    {
      path: "",
      element: <MasterLayout userData={userData} setUserData={setUserData} />,
      children: [
        {
          path: "",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "signup", element: <Signup /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "resetpassword", element: <ResetPassword /> },
        { path: "resetcode", element: <ResetCode /> },
        {
          path: "proudcts",
          element: (
            <ProtectedRoute>
              <Proudcts />
            </ProtectedRoute>
          ),
        },
        {
          path: "proudcts/:id",
          element: (
            <ProtectedRoute>
              <ProudctDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "category/:id",
          element: (
            <ProtectedRoute>
              <CategoryDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "category",
          element: (
            <ProtectedRoute>
              <CategoryView />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);
  return (
    <>
      <Provider store={Store}>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
      </Provider>
    </>
  );
}

export default App;
