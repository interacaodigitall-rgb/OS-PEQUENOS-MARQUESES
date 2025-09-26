import React from 'react';
import { GalleryIcon, EditIcon, MailIcon } from './IconComponents';

const AdminDashboard: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-[#3A8084]">Painel de Administração</h2>
          <p className="mt-2 text-lg max-w-2xl mx-auto text-gray-600">
            Bem-vindo, Administrador. Gestão de conteúdo do website.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow">
            <div className="bg-[#C9E265]/20 p-4 rounded-full mb-4">
                <GalleryIcon className="h-10 w-10 text-[#88B923]" />
            </div>
            <h3 className="font-display text-2xl font-bold text-[#565656] mb-2">Gerir Galeria</h3>
            <p className="text-gray-500 mb-6 flex-grow">Adicione, remova ou altere as fotos das instalações do colégio.</p>
            <button className="bg-[#88B923] text-white font-bold py-2 px-6 rounded-full hover:bg-[#76a01e] transition-colors btn-hover-effect">
              Aceder
            </button>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow">
            <div className="bg-[#F9792A]/20 p-4 rounded-full mb-4">
                 <EditIcon className="h-10 w-10 text-[#F9792A]" />
            </div>
            <h3 className="font-display text-2xl font-bold text-[#565656] mb-2">Editar Páginas</h3>
            <p className="text-gray-500 mb-6 flex-grow">Atualize textos, informações de contacto e detalhes do funcionamento.</p>
            <button className="bg-[#F9792A] text-white font-bold py-2 px-6 rounded-full hover:bg-[#e06c24] transition-colors btn-hover-effect">
              Aceder
            </button>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow">
            <div className="bg-[#3A8084]/20 p-4 rounded-full mb-4">
                <MailIcon className="h-10 w-10 text-[#3A8084]"/>
            </div>
            <h3 className="font-display text-2xl font-bold text-[#565656] mb-2">Ver Mensagens</h3>
            <p className="text-gray-500 mb-6 flex-grow">Visualize as mensagens enviadas através do formulário de contacto do site.</p>
            <button className="bg-[#3A8084] text-white font-bold py-2 px-6 rounded-full hover:bg-[#2f686b] transition-colors btn-hover-effect">
              Aceder
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;