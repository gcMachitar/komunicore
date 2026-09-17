'use client';

import { useState } from 'react';
import LandingPage from './components/LandingPage';
import KomuniCoreApp from './components/KomuniCoreApp';

export default function Page() {
  const [viewMode, setViewMode] = useState('landing'); // 'landing' | 'app'
  const [selectedRole, setSelectedRole] = useState('admin');

  const handleLaunchApp = (role = 'admin') => {
    setSelectedRole(role);
    setViewMode('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLanding = () => {
    setViewMode('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (viewMode === 'app') {
    return (
      <KomuniCoreApp 
        initialRole={selectedRole} 
        onBackToHome={handleBackToLanding} 
      />
    );
  }

  return (
    <LandingPage onLaunchApp={handleLaunchApp} />
  );
}
