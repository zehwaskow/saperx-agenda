import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Agendas from './pages/Agendas';
import AgendaForm from './pages/Agendas/Form';

const Rotas: React.FC = () => {
  return (
    <Routes>
          <Route path="/" element={<Agendas/>}/>
          <Route path="/agenda_cadastro" element={<AgendaForm/>}/>
          <Route path="/agenda_cadastro/:id" element={<AgendaForm/>}/>
    </Routes>
  );
}

export default Rotas;