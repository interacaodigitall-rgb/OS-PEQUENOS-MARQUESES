import React, { useState } from 'react';
import { CalendarIcon, FacebookIcon, XIcon, KiteIcon, BookIcon, PlantIcon, HealthIcon, PartyIcon, StarIcon, PajamaIcon, HomeIcon } from './IconComponents';
import Hero from './Hero';

const Home: React.FC<{ setActiveSection: (section: string) => void; }> = ({ setActiveSection }) => {
  const [isAgendaOpen, setIsAgendaOpen] = useState(false);
  
  const agendaEvents = [
    { date: '5, 13, 19 e 26', event: 'Rastreios respiratórios', Icon: HealthIcon, color: 'text-blue-500' },
    { date: '6', event: 'Crazy Hair Day', Icon: PartyIcon, color: 'text-pink-500' },
    { date: '11', event: 'Dia de São Martinho', Icon: StarIcon, color: 'text-yellow-600' },
    { date: '13', event: 'Crazy Dress Day', Icon: PartyIcon, color: 'text-purple-500' },
    { date: '20', event: 'Dia dos Direitos Internacionais da Criança e Dia do Pijama', Icon: PajamaIcon, color: 'text-indigo-500' },
  ];

  const serviceCards = [
    { title: 'Berçário', description: 'Dos 4 aos 12 meses, o nosso berçário tem capacidade para 10 bebés, estando preparado para ser um prolongamento do ambiente acolhedor das suas casas.' },
    { title: 'Creche', description: 'Cada etapa é única e merece ser vivenciada na forma e meio adequados, por isso a nossa creche divide os primeiros anos de vida em salas adaptadas a cada uma dessas fases.' },
    { title: 'Jardim de Infância', description: 'Brincar, aprender, crescer. Dos 3 aos 6 anos há espaço e tempo para tudo. Cada criança tem o seu ritmo e, no nosso colégio, temos um profundo respeito por essa premissa.' },
];
  
  const galleryImages = ['nursery', 'playroom', 'cafeteria', 'playground', 'kitchenette', 'reading-corner', 'art-room', 'music-room'];


  return (
    <>
      <Hero setActiveSection={setActiveSection} />

      {/* Pilares Section */}
      <section id="pilares" className="py-24 bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-4xl font-bold text-[#3A8084] mb-4">
                Os Nossos Pilares
            </h2>
            <p className="mt-2 text-lg max-w-3xl mx-auto text-[#565656] mb-16">
                A nossa filosofia assenta em três pilares essenciais para um desenvolvimento feliz e harmonioso.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="flex flex-col items-center">
                    <div className="bg-[#F9792A]/20 p-5 rounded-full mb-4">
                        <KiteIcon className="h-12 w-12 text-[#F9792A]" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-[#565656] mb-2">Brincar</h3>
                    <p className="text-base">É a linguagem universal da infância. Através da brincadeira, as crianças exploram, descobrem o mundo e constroem as primeiras amizades.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-[#88B923]/20 p-5 rounded-full mb-4">
                        <BookIcon className="h-12 w-12 text-[#88B923]" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-[#565656] mb-2">Aprender</h3>
                    <p className="text-base">Incentivamos a curiosidade natural de cada criança, criando um ambiente seguro e estimulante onde cada descoberta é uma vitória celebrada.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-[#3A8084]/20 p-5 rounded-full mb-4">
                        <PlantIcon className="h-12 w-12 text-[#3A8084]" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-[#565656] mb-2">Crescer</h3>
                    <p className="text-base">Apoiamos o desenvolvimento integral de cada um, promovendo a autonomia, a confiança e os valores que formarão adultos felizes e responsáveis.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Galeria "O Nosso Dia-a-Dia" */}
      <section id="dia-a-dia" className="py-24 bg-[#F7F9F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="font-display text-4xl font-bold text-[#3A8084]">O Nosso Dia a Dia</h2>
                <p className="mt-2 text-lg max-w-2xl mx-auto text-[#565656]">
                    Espreite os momentos de alegria, descoberta e amizade que preenchem os nossos dias.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[600px]">
                <div className="md:col-span-2 md:row-span-2 rounded-xl overflow-hidden shadow-lg aspect-square md:aspect-auto"><img src="https://picsum.photos/seed/kids-playing-large/800/800" alt="Crianças a brincar" className="w-full h-full object-cover mosaic-image"/></div>
                <div className="md:col-span-1 md:row-span-1 rounded-xl overflow-hidden shadow-lg aspect-square"><img src="https://picsum.photos/seed/art-class-kids/400/400" alt="Aula de artes" className="w-full h-full object-cover mosaic-image"/></div>
                <div className="md:col-span-1 md:row-span-1 rounded-xl overflow-hidden shadow-lg aspect-square"><img src="https://picsum.photos/seed/outdoor-fun/400/400" alt="Atividade ao ar livre" className="w-full h-full object-cover mosaic-image"/></div>
                <div className="md:col-span-2 md:row-span-1 rounded-xl overflow-hidden shadow-lg aspect-[2/1]"><img src="https://picsum.photos/seed/lunch-time/800/400" alt="Hora do lanche" className="w-full h-full object-cover mosaic-image"/></div>
            </div>
        </div>
      </section>

      {/* Faça-nos uma visita Section */}
      <section id="visita" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <div className="inline-flex items-center bg-[#3A8084] rounded-full pr-10 shadow-lg">
                    <div className="bg-[#2f686b] p-4 rounded-full">
                        <HomeIcon className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="font-display text-3xl font-bold text-white ml-4">
                        Faça-nos uma visita!
                    </h2>
                </div>
            </div>
            
            <div className="relative mb-12 w-full">
                <div className="flex animate-infinite-scroll group-hover:pause-animation">
                    {[...galleryImages, ...galleryImages].map((seed, index) => (
                    <div key={`${seed}-${index}`} className="flex-shrink-0 w-80 h-56 rounded-xl overflow-hidden shadow-lg mx-2">
                        <img 
                        src={`https://picsum.photos/seed/${seed}/400/300`} 
                        alt={seed.replace('-', ' ')} 
                        className="w-full h-full object-cover"
                        />
                    </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {serviceCards.map(card => (
                    <div key={card.title} className="bg-gray-50 p-6 rounded-xl shadow-lg text-center border-t-4 border-[#88B923]">
                        <h3 className="font-display text-2xl font-bold text-[#565656]">{card.title}</h3>
                        <p className="text-base text-gray-600 mt-4">{card.description}</p>
                    </div>
                ))}
            </div>

            <div className="text-center">
                <button
                    onClick={() => setActiveSection('Instalações')}
                    className="bg-transparent border-2 border-[#3A8084] text-[#3A8084] font-bold text-lg py-3 px-12 rounded-full hover:bg-[#3A8084] hover:text-white transition-colors btn-hover-effect"
                >
                    Ver mais
                </button>
            </div>
        </div>
      </section>


      {/* Artigos Section */}
      <section id="articles" className="py-24 bg-[#F7F9F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-[#3A8084]">Últimos Artigos</h2>
            <p className="mt-2 text-lg max-w-2xl mx-auto text-[#565656]">
              Dicas de pedagogia, notícias e eventos do nosso colégio.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
              <img src="https://picsum.photos/seed/adaptation/600/400" alt="Adaptação ao pré-escolar" className="w-full h-48 object-cover"/>
              <div className="p-6">
                <span className="text-xs font-bold text-gray-400">01.2017</span>
                <h3 className="font-display text-xl font-bold text-[#565656] mb-2">Adaptação ao pré-escolar</h3>
                <p className="text-gray-600 mb-4 text-sm">Dicas e estratégias para ajudar o seu filho a ter uma transição suave e feliz para o pré-escolar.</p>
                <a href="#" className="font-bold text-[#F9792A] hover:underline">Ler Mais &rarr;</a>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
              <img src="https://picsum.photos/seed/bites/600/400" alt="Criança a brincar" className="w-full h-48 object-cover"/>
              <div className="p-6">
                <span className="text-xs font-bold text-gray-400">11.2017</span>
                <h3 className="font-display text-xl font-bold text-[#565656] mb-2">Mordidas</h3>
                <p className="text-gray-600 mb-4 text-sm">Entenda por que as crianças mordem e como lidar com este comportamento comum na primeira infância.</p>
                <a href="#" className="font-bold text-[#F9792A] hover:underline">Ler Mais &rarr;</a>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
              <img src="https://picsum.photos/seed/tantrums/600/400" alt="Criança a fazer uma birra" className="w-full h-48 object-cover"/>
              <div className="p-6">
                <span className="text-xs font-bold text-gray-400">01.2018</span>
                <h3 className="font-display text-xl font-bold text-[#565656] mb-2">Birras</h3>
                <p className="text-gray-600 mb-4 text-sm">As birras fazem parte do crescimento. Saiba como geri-las de forma positiva e construtiva.</p>
                <a href="#" className="font-bold text-[#F9792A] hover:underline">Ler Mais &rarr;</a>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
              <img src="https://picsum.photos/seed/parenting-styles/600/400" alt="Estilos Parentais" className="w-full h-48 object-cover"/>
              <div className="p-6">
                <span className="text-xs font-bold text-gray-400">03.2018</span>
                <h3 className="font-display text-xl font-bold text-[#565656] mb-2">Estilos Parentais</h3>
                <p className="text-gray-600 mb-4 text-sm">Explore os diferentes estilos parentais e descubra qual se alinha melhor com os seus valores e objetivos.</p>
                <a href="#" className="font-bold text-[#F9792A] hover:underline">Ler Mais &rarr;</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTAs Finais */}
      <section className="py-20 bg-black/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
                onClick={() => setIsAgendaOpen(true)}
                className="bg-[#6A994E] text-white font-bold py-3 px-8 rounded-full shadow-md hover:bg-[#588141] transition-colors btn-hover-effect flex items-center justify-center text-lg"
              >
                <CalendarIcon className="h-5 w-5 mr-3" />
                Ver Agenda de Atividades
            </button>
             <a href="#" className="bg-[#1877F2] text-white p-3 px-8 rounded-full shadow-lg flex items-center justify-center font-bold text-lg hover:bg-[#166fe5] transition-colors btn-hover-effect">
                  <FacebookIcon className="h-6 w-6 mr-3"/> Siga-nos no Facebook!
              </a>
        </div>
      </section>

      {isAgendaOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setIsAgendaOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl relative max-w-lg w-full p-8"
            onClick={(e) => e.stopPropagation()}
            style={{animation: 'scale-in 0.3s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94)'}}
          >
            <button 
              onClick={() => setIsAgendaOpen(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors rounded-full p-1 hover:bg-gray-100"
              aria-label="Fechar agenda"
            >
              <XIcon className="h-7 w-7" />
            </button>
            <div className="flex items-center mb-6">
                <div className="bg-[#6A994E] p-3 rounded-full mr-4">
                    <CalendarIcon className="h-8 w-8 text-white"/>
                </div>
                <h3 className="font-display text-3xl font-bold text-[#565656]">Agenda de Novembro</h3>
            </div>
            <div className="space-y-4">
                {agendaEvents.map((item, index) => (
                    <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                        <item.Icon className={`h-8 w-8 mr-4 flex-shrink-0 mt-1 ${item.color}`} />
                        <div>
                            <p className="font-bold text-gray-800">{item.event}</p>
                            <p className="text-sm text-gray-500">Dia(s): {item.date}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
