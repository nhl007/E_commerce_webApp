import { Routes, Route } from 'react-router-dom';

import {
  Home,
  Register,
  SignIn,
  Cart,
  ProductPage,
  Admin,
  CheckoutPage,
  OrderPage,
  ProfilePage,
  CategoryPage,
} from './pages';

import { AdminUsers, AdminOrders, AdminProduct } from './pages/Admin';

import { ProtectedRoute } from './components';

const App = () => {
  return (
    <div className='w-full overflow-hidden lg:px-[4rem] xl:px-[12rem] sm:px-[1rem] mt-8 sm:mt-[3rem]'>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/sign-in' element={<SignIn />} />
        <Route exact path='/register' element={<Register />} />
        <Route
          exact
          path='/profile'
          element={
            <ProtectedRoute permission='all'>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path='/admin'>
          <Route
            index
            element={
              <ProtectedRoute permission='admin'>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path='users'
            element={
              <ProtectedRoute permission='admin'>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path='products'
            element={
              <ProtectedRoute permission='admin'>
                <AdminProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path='orders'
            element={
              <ProtectedRoute permission='admin'>
                <AdminOrders />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route exact path='/orders' element={<OrderPage />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/checkout' element={<CheckoutPage />} />
        <Route path='/products/:productId' element={<ProductPage />} />
        <Route path='/category/:category' element={<CategoryPage />} />

        <Route path='*' element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
