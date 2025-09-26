import React, {useState} from 'react';
import { MailIcon, PhoneIcon, MapPinIcon } from './IconComponents';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    alert(`Obrigado pelo seu contacto, ${formData.name}! A sua mensagem foi enviada.`);
    setFormData({ name: '', email: '', message: '' });
  };

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#noiseFilter)' opacity='0.03'/></svg>`;
  const subtleNoisePattern = `data:image/svg+xml;base64,${btoa(svg)}`;

  return (
    <section 
      className="py-24 bg-[#FFFCF0]"
      style={{ backgroundImage: `url("${subtleNoisePattern}")` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-[#3A8084]">Entre em Contacto</h2>
          <p className="mt-2 text-lg max-w-2xl mx-auto">
            Tem alguma dúvida ou gostaria de agendar uma visita? Fale connosco!
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-[#565656]">Envie uma mensagem</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700">Nome</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#F9792A] focus:border-[#F9792A]" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700">Email</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#F9792A] focus:border-[#F9792A]" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700">Mensagem</label>
                <textarea name="message" id="message" rows={4} value={formData.message} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#F9792A] focus:border-[#F9792A]" required></textarea>
              </div>
              <div>
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-bold text-white bg-[#F9792A] hover:bg-[#e06c24] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F9792A] transition-colors btn-hover-effect">
                  Enviar
                </button>
              </div>
            </form>
          </div>
          <div className="space-y-8">
             <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-[#565656]">Os Nossos Contactos</h3>
                 <div className="space-y-4 text-lg">
                    <p className="flex items-start"><MapPinIcon className="h-6 w-6 mr-3 text-[#3A8084] flex-shrink-0 mt-1" /> Rua Marechal Gomes da Costa, Lote 18 - 2780-153 Oeiras</p>
                    <div className="flex items-start">
                        <PhoneIcon className="h-6 w-6 mr-3 text-[#3A8084] flex-shrink-0 mt-1" /> 
                        <div>
                            <span>(+351) 917 995 104 / 965 144 611</span>
                            <span className="block text-sm text-gray-500">(chamada para rede móvel nacional)</span>
                            <span className="block mt-1">Creche: 211 372 610</span>
                            <span>Jardim de Infância: 217 165 513</span>
                        </div>
                    </div>
                    <p className="flex items-center"><MailIcon className="h-6 w-6 mr-3 text-[#3A8084]" /> geral@pequenosmarqueses.pt</p>
                 </div>
             </div>
            <div className="h-96 rounded-xl shadow-lg overflow-hidden">
                <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.88214227921!2d-9.302302823611382!3d38.69788776010531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1ec58172960431%3A0x89e092143b836481!2sOs%20Pequenos%20Marqueses!5e0!3m2!1spt-PT!2spt!4v1695676915570!5m2!1spt-PT!2spt" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;