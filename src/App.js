import React from 'react';
import './App.scss';
import Toaster from './components/Toaster';
import Routes from './routes/Routes';

const App = () => {
  return (
    <>
      <Toaster />
      <Routes />
    </>
  );
};

export default App;
