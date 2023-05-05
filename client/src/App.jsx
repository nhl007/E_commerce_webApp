import { Routes, Route } from 'react-router-dom';

import {
  Home,
  Register,
  SignIn,
  Cart,
  ProductPage,
  Admin,
  CheckoutPage,
} from './pages';

import { AdminUsers, AdminOrders, AdminProduct } from './pages/Admin';

import { ProtectedRoute } from './components';

const App = () => {
  return (
    <div className=' w-full overflow-hidden px-[12rem] mt-8'>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/sign-in' element={<SignIn />} />
        <Route exact path='/register' element={<Register />} />
        <Route path='/admin'>
          <Route
            index
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path='users'
            element={
              <ProtectedRoute>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path='products'
            element={
              <ProtectedRoute>
                <AdminProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path='orders'
            element={
              <ProtectedRoute>
                <AdminOrders />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route exact path='/orders' element={<Register />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/checkout' element={<CheckoutPage />} />
        <Route path='/products/:productId' element={<ProductPage />} />

        <Route path='*' element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
