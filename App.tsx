import React, { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Funcionamento from './components/Funcionamento';
import LoginModal from './components/LoginModal';
import AdminDashboard from './components/AdminDashboard';
import Chatbot from './components/Chatbot';
import MascotAnimation from './components/MascotAnimation';

function App() {
  const [activeSection, setActiveSection] = useState('Início');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showMascot, setShowMascot] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveSection('Início'); // Volta para a página inicial ao fazer logout
  };

  const handleNavigation = (section: string) => {
    if (isLoggedIn) {
      // Impede a navegação e o logout acidental enquanto estiver logado no painel de administração.
      return;
    }
    setActiveSection(section);
  }

  return (
    <div className="bg-[#F7F9F2] text-[#565656] flex flex-col min-h-screen">
      {showMascot && <MascotAnimation onComplete={() => setShowMascot(false)} />}
      <Header 
        activeSection={activeSection} 
        setActiveSection={handleNavigation} 
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        openLoginModal={() => setIsLoginModalOpen(true)}
      />
      <main className="flex-grow pt-20">
        {isLoggedIn ? (
          <div key="admin" className="fade-in-section">
            <AdminDashboard />
          </div>
        ) : (
          <div key={activeSection} className="fade-in-section">
            {activeSection === 'Início' && <Home setActiveSection={setActiveSection} />}
            {activeSection === 'O Colégio' && <About />}
            {activeSection === 'Instalações' && <Gallery />}
            {activeSection === 'Funcionamento' && <Funcionamento />}
            {activeSection === 'Contactos' && <Contact />}
          </div>
        )}
      </main>
      <Footer setActiveSection={setActiveSection} />
      {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} onLogin={handleLogin} />}
      {!isLoggedIn && <Chatbot />}
    </div>
  );
}

export default App;