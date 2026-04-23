/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardHome from './pages/dashboard/DashboardHome';
import BlueprintsPage from './pages/dashboard/BlueprintsPage';
import ComposePage from './pages/dashboard/ComposePage';
import InboxPage from './pages/dashboard/InboxPage';
import SettingsPage from './pages/dashboard/SettingsPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/dashboard/blueprints" element={<BlueprintsPage />} />
        <Route path="/dashboard/compose" element={<ComposePage />} />
        <Route path="/dashboard/inbox" element={<InboxPage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
