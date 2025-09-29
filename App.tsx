import React, { useState, useEffect } from 'react';
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
import { getSupabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';

const supabase = getSupabase();

function App() {
  const [activeSection, setActiveSection] = useState('Início');
  const [session, setSession] = useState<Session | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showMascot, setShowMascot] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setSession(session);
      })
      .catch(err => {
        console.error("Erro ao obter a sessão do Supabase:", err);
        setError("Não foi possível ligar ao servidor. Verifique a sua ligação à internet.");
      });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (_event === 'SIGNED_IN') {
        setIsLoginModalOpen(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setActiveSection('Início'); // Volta para a página inicial ao fazer logout
  };

  const handleNavigation = (section: string) => {
    if (session) {
      // Impede a navegação e o logout acidental enquanto estiver logado no painel de administração.
      return;
    }
    setActiveSection(section);
  }
  
  const isLoggedIn = !!session;
  
  if (error) {
    return (
      <div className="bg-[#F7F9F2] text-[#565656] flex flex-col min-h-screen items-center justify-center text-center p-4">
        <div>
          <h2 className="text-2xl font-bold text-red-600 mb-2 font-display">Erro de Ligação</h2>
          <p className="text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-[#F9792A] text-white font-bold py-2 px-6 rounded-full hover:bg-[#e06c24] transition-colors btn-hover-effect"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
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
      {isLoginModalOpen && !isLoggedIn && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
      {!isLoggedIn && <Chatbot />}
    </div>
  );
}

export default App;
