import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useFeatureContext } from './contexts/features/featureContext';
import { Alert, Loading } from './components';

import Dashboard from './pages/Dashboard';
import { HomePage, Orders, SignIn, Register } from './pages';
import Auth from './pages/Authentication/authRoute';

function App() {
  const { isloading, showAlert } = useFeatureContext();

  return (
    <>
      {isloading && <Loading />}
      {showAlert && <Alert />}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />}>
            <Route index element={<HomePage />} />
            <Route
              path='/orders'
              element={
                <Auth>
                  <Orders />
                </Auth>
              }
            />
          </Route>

          <Route path='/sign_in' element={<SignIn />} />
          <Route path='/registration' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
