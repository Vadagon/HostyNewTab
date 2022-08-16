import React, { useState } from 'react';
import './index.scss';

import Navbar from './components/navbar';
import MainView from './components/main_view';
const Newtab = () => {
  return (
    <div className="App">
      <Navbar />
      <MainView />
    </div>
  );
};

export default Newtab;
