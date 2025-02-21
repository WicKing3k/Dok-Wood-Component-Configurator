import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Globe, User } from 'lucide-react';
import { useI18n } from '../../lib/i18n/i18n';
import newLogo from '../../lib/stores/assets/new-logo.png'; // Import the new logo

export function Header() {
  const { language, setLanguage, t } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto"
                src={newLogo} // Use the imported logo
                alt="DOK-WOOD"
              />
              <span className="ml-2 text-xl font-bold text-gray-900 animate-pulse">DOK-WOOD</span>
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <Link
              to="/materials"
              className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              {t('nav.materials')}
            </Link>

            <Link
              to="/catalog"
              className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              {t('nav.catalog')}
            </Link>
            
            <Link
              to="/configurator"
              className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              {t('nav.configurator')}
            </Link>
            
            <button
              onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
              className="text-gray-700 hover:text-orange-600 p-2 rounded-full"
            >
              <Globe className="h-5 w-5" />
            </button>
            
            <Link
              to="/profile"
              className="text-gray-700 hover:text-orange-600 p-2 rounded-full"
            >
              <User className="h-5 w-5" />
            </Link>
          </div>

          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-orange-600 p-2 rounded-full"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/materials"
              className="text-gray-700 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              {t('nav.materials')}
            </Link>
            <Link
              to="/catalog"
              className="text-gray-700 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              {t('nav.catalog')}
            </Link>
            <Link
              to="/configurator"
              className="text-gray-700 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              {t('nav.configurator')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}