import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Dashboard Pages
import DashboardPage from './pages/dashboard/DashboardPage';
import ResponsesPage from './pages/responses/ResponsesPage';
import ResponseDetailPage from './pages/responses/ResponseDetailPage';
import FormsPage from './pages/forms/FormsPage';
import FormDetailPage from './pages/forms/FormDetailPage';
import TemplatesPage from './pages/templates/TemplatesPage';
import RulesPage from './pages/rules/RulesPage';
import AnalyticsPage from './pages/analytics/AnalyticsPage';
import SettingsPage from './pages/settings/SettingsPage';
import IntegrationsPage from './pages/integrations/IntegrationsPage';

// Error Pages
import NotFoundPage from './pages/errors/NotFoundPage';
import UnauthorizedPage from './pages/errors/UnauthorizedPage';

import { useAuthStore } from './store/authStore';
import { setupSocket } from './api/socket';

function App() {
  const { user, isAuthenticated, initializeAuth } = useAuthStore();

  useEffect(() => {
    // Initialize auth on app load
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    // Setup WebSocket connection when authenticated
    if (isAuthenticated && user) {
      setupSocket();
    }
  }, [isAuthenticated, user]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Protected Routes */}
        <Route
          element={<PrivateRoute><Layout /></PrivateRoute>}
        >
          <Route path="/" element={<DashboardPage />} />
          <Route path="/responses" element={<ResponsesPage />} />
          <Route path="/responses/:id" element={<ResponseDetailPage />} />
          <Route path="/forms" element={<FormsPage />} />
          <Route path="/forms/:id" element={<FormDetailPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Not Found */}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Box>
  );
}

export default App;
