import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from '@/pages/Auth/Register';
import Home from '@/pages/Home/Home';
import SearchPage from '@/pages/Search/SearchPage'


const Routing = () => {
  return (
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/search" element={<SearchPage />} >

        </Route>
        <Route path="/register" element={<Register />} />
      </Routes>
  );
};

export default Routing;
