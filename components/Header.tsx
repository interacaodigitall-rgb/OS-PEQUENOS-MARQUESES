import React, { useState } from 'react';
import Logo from './Logo';
import { LogoutIcon, MenuIcon, XIcon } from './IconComponents';

const navLinks = [
  { name: 'Início', color: 'bg-[#F9792A]', hover: 'hover:bg-[#e06c24]' },
  { name: 'O Colégio', color: 'bg-[#88B923]', hover: 'hover:bg-[#76a01e]' },
  { name: 'Instalações', color: 'bg-[#C9E265]', hover: 'hover:bg-[#b5cc5a]', textColor: 'text-[#565656]' },
  { name: 'Funcionamento', color: 'bg-[#6A994E]', hover: 'hover:bg-[#588141]' },
  { name: 'Contactos', color: 'bg-[#3A8084]', hover: 'hover:bg-[#2f686b]' },
];

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isLoggedIn: boolean;
  handleLogout: () => void;
  openLoginModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection, isLoggedIn, handleLogout, openLoginModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    setIsMenuOpen(false); // Fecha o menu ao navegar
  };
  
  const getLinkClassName = (link: typeof navLinks[0]) => {
    const isActive = activeSection === link.name;
    const baseClasses = `font-bold transition-all duration-300 px-4 py-2 rounded-md text-sm flex-shrink-0`;
    const colorClasses = `${link.color} ${link.hover} ${link.textColor || 'text-white'}`;
    const activeClasses = isActive ? 'scale-105 ring-2 ring-offset-2 ring-white/70 shadow-lg' : 'hover:scale-105';
    return `${baseClasses} ${colorClasses} ${activeClasses}`;
  };

  const renderNavLinks = () => (
     navLinks.map((link) => (
      <button
        key={link.name}
        onClick={() => handleNavClick(link.name)}
        className={getLinkClassName(link)}
        disabled={isLoggedIn}
        aria-disabled={isLoggedIn}
      >
        {link.name}
      </button>
    ))
  );

  return (
    <header className="bg-white/90 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <button onClick={() => handleNavClick('Início')} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3A8084] rounded-lg">
              <Logo className="h-16 w-auto" />
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 flex-1 justify-end min-w-0">
            <nav className="flex items-baseline space-x-2 overflow-x-auto scrollbar-hide py-4 -my-4">
              {renderNavLinks()}
            </nav>
             {isLoggedIn ? (
               <button onClick={handleLogout} className="flex-shrink-0 flex items-center px-4 py-2 rounded-md text-sm font-bold text-white bg-red-500 hover:bg-red-600 transition-colors">
                  <LogoutIcon className="h-4 w-4 mr-2" />
                  Logout
               </button>
             ) : (
                <button onClick={openLoginModal} className="flex-shrink-0 px-4 py-2 rounded-md text-sm font-bold text-[#F9792A] bg-white border-2 border-[#F9792A] hover:bg-[#F9792A]/10 transition-colors">
                    Área Reservada
                </button>
             )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#3A8084] hover:text-white hover:bg-[#3A8084]/90 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Abrir menu principal</span>
              {isMenuOpen ? (
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu, show/hide based on menu state. */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 bg-white/95">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.name)}
                className={`${getLinkClassName(link)} w-full !flex justify-start`}
                disabled={isLoggedIn}
                aria-disabled={isLoggedIn}
              >
                {link.name}
              </button>
            ))}
            <div className="border-t border-gray-200 my-2"></div>
            {isLoggedIn ? (
              <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full flex items-center justify-start px-4 py-2 rounded-md text-sm font-bold text-white bg-red-500 hover:bg-red-600 transition-colors">
                <LogoutIcon className="h-4 w-4 mr-2" />
                Logout
              </button>
            ) : (
              <button onClick={() => { openLoginModal(); setIsMenuOpen(false); }} className="w-full justify-start px-4 py-2 rounded-md text-sm font-bold text-[#F9792A] bg-white border-2 border-[#F9792A] hover:bg-[#F9792A]/10 transition-colors">
                Área Reservada
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;