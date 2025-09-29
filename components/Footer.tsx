import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { FacebookIcon, InstagramIcon } from './IconComponents';
import { getSupabase } from '../lib/supabase';

const supabase = getSupabase();

interface FooterProps {
  setActiveSection: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setActiveSection }) => {
  const [contactInfo, setContactInfo] = useState({ address: '', phone: '' });

  useEffect(() => {
    const fetchConfig = async () => {
      const { data, error } = await supabase.from('site_config').select('key, value').in('key', ['address', 'main_phone']);
      if (error) {
        console.error("Erro ao carregar configurações do rodapé:", error);
      } else if (data) {
        const address = data.find(item => item.key === 'address')?.value || 'R. Marechal Gomes da Costa, 18<br/>2780-153 Oeiras';
        const phone = data.find(item => item.key === 'main_phone')?.value || '(+351) 917 995 104';
        setContactInfo({ address, phone });
      }
    };
    fetchConfig();
  }, []);

  const handleNavClick = (section: string) => {
    window.scrollTo(0, 0);
    setActiveSection(section);
  };
  
  return (
    <footer className="bg-[#3A8084] text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
             <button onClick={() => handleNavClick('Início')} className="mb-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#3A8084] focus:ring-white rounded-lg">
              <Logo className="h-14 w-auto" textColor="white" />
            </button>
            <p className="text-gray-200">Educação com afeto e descoberta.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><button onClick={() => handleNavClick('Início')} className="hover:text-[#FFEE78] transition-colors">Início</button></li>
              <li><button onClick={() => handleNavClick('O Colégio')} className="hover:text-[#FFEE78] transition-colors">O Colégio</button></li>
              <li><button onClick={() => handleNavClick('Instalações')} className="hover:text-[#FFEE78] transition-colors">Instalações</button></li>
              <li><button onClick={() => handleNavClick('Funcionamento')} className="hover:text-[#FFEE78] transition-colors">Funcionamento</button></li>
              <li><button onClick={() => handleNavClick('Contactos')} className="hover:text-[#FFEE78] transition-colors">Contactos</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <address className="not-italic space-y-2 text-gray-200">
              <p dangerouslySetInnerHTML={{ __html: contactInfo.address.replace(/\n/g, '<br/>') }}></p>
              <p>{contactInfo.phone}</p>
            </address>
          </div>
           <div>
            <h3 className="text-lg font-bold mb-4">Siga-nos</h3>
             <div className="flex space-x-4">
                <a href="#" className="text-gray-200 hover:text-white"><span className="sr-only">Facebook</span><FacebookIcon className="h-8 w-8"/></a>
                <a href="#" className="text-gray-200 hover:text-white"><span className="sr-only">Instagram</span><InstagramIcon className="h-8 w-8"/></a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-[#4b9fa3] pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Os Pequenos Marqueses. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
