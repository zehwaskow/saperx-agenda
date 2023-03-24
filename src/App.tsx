import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Rotas from './rotas';
import Header from './components/Header';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Rotas />
    </BrowserRouter>
  );
}

export default App;