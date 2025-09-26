import React from 'react';

interface HeroProps {
  setActiveSection: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setActiveSection }) => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/creative-learning-kids/1920/1080"
          alt="Ambiente criativo e educativo do colégio"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="font-display text-5xl md:text-7xl font-bold" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}>
          Um mundo de descobertas espera por ti!
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}>
          No colégio "Os Pequenos Marqueses", cada dia é uma nova aventura de aprendizagem, amizade e diversão.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
                onClick={() => setActiveSection('O Colégio')}
                className="bg-white text-[#F9792A] font-bold text-lg py-3 px-8 rounded-full shadow-lg btn-hover-effect"
            >
                Conheça o Colégio
            </button>
            <button
                onClick={() => setActiveSection('Contactos')}
                className="bg-[#F9792A] text-white font-bold text-lg py-3 px-8 rounded-full shadow-lg btn-hover-effect"
            >
                Agende uma Visita
            </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;