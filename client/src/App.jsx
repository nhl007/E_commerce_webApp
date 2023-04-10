import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Register, SignIn } from './pages';
import Cart from './pages/Cart';

const App = () => {
  return (
    <div className=' w-full overflow-hidden px-[1rem] lg:px-[3rem] xl:px-[8rem] mt-8'>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/sign-in' element={<SignIn />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/cart' element={<Cart />} />
      </Routes>
    </div>
  );
};

export default App;
