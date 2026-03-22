import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import PortfolioView from './components/Dashboard/PortfolioView';
import BuildingsMapView from './components/Buildings/BuildingsMapView';
import BuildingDetail from './components/Building/BuildingDetail';
import SystemView from './components/Building/SystemView';
import EnergyView from './components/Energy/EnergyView';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        <Routes>
          <Route path="/" element={<PortfolioView />} />
          <Route path="/buildings" element={<BuildingsMapView />} />
          <Route path="/building/:id" element={<BuildingDetail />} />
          <Route path="/building/:id/system/:systemId" element={<SystemView />} />
          <Route path="/energy" element={<EnergyView />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
