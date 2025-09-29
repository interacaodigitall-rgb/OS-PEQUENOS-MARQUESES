import React from 'react';

const TeamMemberCard: React.FC<{ imgSrc: string; name: string; role: string; wide?: boolean }> = ({ imgSrc, name, role, wide = false }) => (
    <div className={`text-center transition-transform duration-300 hover:scale-105 ${wide ? 'md:col-span-2' : ''}`}>
        <img src={imgSrc} alt={name} className="w-full h-64 object-cover object-center rounded-xl shadow-lg mb-4 bg-gray-200" loading="lazy" />
        <h4 className="font-display text-xl font-bold text-[#565656]">{name}</h4>
        <p className="text-base text-gray-500">{role}</p>
    </div>
);

// Dados estáticos para a equipa, para garantir que o componente funciona sem dependências externas.
const staticTeamMembers = [
    {
        _id: '1',
        name: 'Antónia Martins',
        role: 'Diretora Administrativa',
        imgSrc: 'https://picsum.photos/seed/antonia-martins/400/500',
        wide: false,
    },
    {
        _id: '2',
        name: 'Olga Muro',
        role: 'Diretora Pedagógica',
        imgSrc: 'https://picsum.photos/seed/olga-muro/400/500',
        wide: false,
    },
    {
        _id: '3',
        name: 'A Nossa Equipa',
        role: 'Educadoras e Auxiliares',
        imgSrc: 'https://picsum.photos/seed/equipa-colegio/800/500',
        wide: true,
    }
];

const About: React.FC = () => {
  const svg = `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M0 10h20M10 0v20" stroke="#d1d5db" stroke-width="0.5"/></svg>`;
  const graphPaperPattern = `data:image/svg+xml;base64,${btoa(svg)}`;

  return (
    <section 
      id="about"
      className="py-24 bg-white"
      style={{ backgroundImage: `url("${graphPaperPattern}")` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Quem Somos Section */}
        <div>
          <div className="text-center">
            <h2 className="font-display text-4xl font-bold text-[#3A8084] mb-4">
              Quem Somos
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
            <div>
              <h3 className="font-display text-2xl font-bold text-[#88B923] mb-3">A nossa equipa</h3>
              <div className="space-y-4 text-base">
                <p>
                  A nossa equipa é constituída por profissionais especializados que visam promover o desenvolvimento global e harmonioso da criança, tendo em conta os seus interesses e as suas necessidades.
                </p>
                <p>
                  Acreditamos que uma criança só é feliz se tiver um espaço onde se sinta acolhida e se os seus conhecimentos e aprendizagens forem promovidos num ambiente familiar, onde a partilha entre a escola e a família seja uma constante.
                </p>
                <p>
                  Cada sala conta com uma Educadora de Infância e uma Auxiliar de Ação Educativa. A equipa de retaguarda conta ainda com o apoio de uma equipa multidisciplinar, composta pela nossa cozinheira, auxiliares de limpeza e pela área de gestão.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {staticTeamMembers.map((member) => (
                    <TeamMemberCard 
                        key={member._id}
                        imgSrc={member.imgSrc}
                        name={member.name}
                        role={member.role}
                        wide={member.wide}
                    />
                ))}
            </div>
          </div>
        </div>

        {/* Projeto Educativo Section */}
        <div>
            <div className="text-center">
                <h2 className="font-display text-4xl font-bold text-[#3A8084] mb-4">
                Projeto Educativo
                </h2>
            </div>
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#F9792A] h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <h3 className="font-display text-2xl font-bold text-[#565656] mb-3">Pedagogia</h3>
                    <div className="space-y-3 text-sm">
                        <p>A nossa pedagogia fundamenta-se na filosofia construtivista de Jean Piaget. O conhecimento e a aprendizagem têm como pilar central a defesa da criança como agente principal no seu processo pessoal de aprendizagem, havendo que respeitar e incentivar a criança na busca de novas experiências, relacionando, questionando, refletindo e partilhando as suas opiniões com os seus pares e os adultos, tornando-se um ser mais autónomo, criativo, solidário, motivado e robusto, ao mesmo tempo que desenvolve as suas capacidades motoras.</p>
                        <p>A rotina educativa baseia-se na orientação de uma pedagogia de projetos, havendo contudo margem para uma pedagogia de situação.</p>
                        <p>As rotinas em projeto comum ao grupo visam seguir determinadas linhas de orientação que partem de objetivos definidos para cada faixa etária.</p>
                        <p>É no seguimento e desenvolvimento destas linhas condutoras que damos forma e orientação ao longo do ano letivo. Procuramos que a aprendizagem seja significativa e lúdica, e sempre baseada nos interesses de todos.</p>
                        <p>Já a pedagogia de situação visa valorizar as conversas e trocas de ideias, os acontecimentos surgidos naturalmente durante o desenrolar de experiências, o que a criança comunica, as suas experiências de vida, os seus gostos, interesses e motivações, valorizando constantemente o que a criança sabe e aprende. Desta forma, o educador deve aproveitar situações espontâneas da criança, tornando-as em aprendizagens ativas.</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#88B923] h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <h3 className="font-display text-2xl font-bold text-[#565656] mb-3">Temática</h3>
                    <div className="space-y-3 text-sm">
                        <p>O nosso projeto educativo assenta no lema "Eu, a brincar, a aprender e a crescer!".</p>
                        <p>Tendo como base as brincadeiras, transmitimos conhecimentos, afetividade e valores morais para o desenvolvimento da personalidade da criança.</p>
                        <p>Os objetivos, os princípios e os conteúdos programáticos estão definidos em consonância com as orientações do Ministério da Educação e da Segurança Social para a Creche e pelas Orientações Curriculares para a Educação Pré-Escolar.</p>
                        <p className="font-bold text-[#88B923] italic mt-4">Por isso, venham brincar, aprender e crescer connosco!</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#3A8084] h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <h3 className="font-display text-2xl font-bold text-[#565656] mb-3">Princípios Orientadores</h3>
                    <p className="text-sm">Os princípios orientadores da nossa ação educativa são os seguintes:</p>
                    <ul className="list-disc list-inside space-y-2 mt-2 text-sm">
                        <li>Respeito pela individualidade e singularidade de cada criança;</li>
                        <li>Incentivo à curiosidade e ao espírito crítico;</li>
                        <li>Promoção do sentido de responsabilidade;</li>
                        <li>Promoção do desenvolvimento de capacidades de expressão e comunicação;</li>
                        <li>Promoção do desenvolvimento global da criança;</li>
                        <li>Incentivo à criatividade;</li>
                        <li>Incentivo à participação das famílias no processo educativo.</li>
                    </ul>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default About;