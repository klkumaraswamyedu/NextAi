import React, { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { StudentOpportunitiesPage } from './pages/StudentOpportunitiesPage';
import { GovernmentSchemesPage } from './pages/GovernmentSchemesPage';
import { SavedItemsPage } from './pages/SavedItemsPage';

export function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100">
      <div>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="w-full">
          {activeTab === 'home' && (
            <HomePage onSelectService={(service) => setActiveTab(service)} />
          )}
          {activeTab === 'student' && (
            <StudentOpportunitiesPage onBackToHome={() => setActiveTab('home')} />
          )}
          {activeTab === 'government' && (
            <GovernmentSchemesPage onBackToHome={() => setActiveTab('home')} />
          )}
          {activeTab === 'saved' && (
            <SavedItemsPage onBackToHome={() => setActiveTab('home')} />
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
