import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { LoginForm } from './components/auth/LoginForm';
import { CatalogPage } from './pages/catalog/CatalogPage';
import { ConfiguratorPage } from './pages/configurator/ConfiguratorPage';
import { MaterialsPage } from './pages/materials/MaterialsPage';
import { useAuth } from './lib/stores/auth';

export default function App() {
  const { initialize } = useAuth();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/configurator" element={<ConfiguratorPage />} />
            <Route path="/materials" element={<MaterialsPage />} />
            <Route path="/" element={<MaterialsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}