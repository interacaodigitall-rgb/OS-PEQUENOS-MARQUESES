import React from 'react';

const InfoCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={`bg-white p-6 rounded-xl shadow-lg h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${className}`}>
        <h3 className="font-display text-2xl font-bold text-[#88B923] mb-4">{title}</h3>
        <div className="space-y-3 text-base text-[#565656]">{children}</div>
    </div>
);

const ProtocoloCard: React.FC<{ title: string; items: string[]; description?: string; }> = ({ title, items, description }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <h4 className="font-display text-xl font-bold text-[#6A994E] mb-3">{title}</h4>
        {description && <p className="mb-3 text-sm italic">{description}</p>}
        <ul className="list-disc list-inside space-y-1.5 text-base text-[#565656]">
            {items.map(item => <li key={item}>{item}</li>)}
        </ul>
    </div>
);


const Funcionamento: React.FC = () => {
  const svg = `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M0 10h20M10 0v20" stroke="#a3b18a" stroke-width="0.5" opacity="0.5"/></svg>`;
  const graphPaperPattern = `data:image/svg+xml;base64,${btoa(svg)}`;
  
  return (
    <section 
      id="funcionamento"
      className="py-24 bg-[#F0F8E8]"
      style={{ backgroundImage: `url("${graphPaperPattern}")` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-[#3A8084]">Funcionamento</h2>
          <p className="mt-2 text-lg max-w-2xl mx-auto">
            Informações importantes sobre o nosso dia a dia, preçário e parceiros.
          </p>
        </div>
        
        {/* Informações Gerais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
            <InfoCard title="Inscrição e Renovação">
                <p>As inscrições para crianças dos 4 meses aos 6 anos estão abertas durante todo o ano letivo, mediante a existência de vaga.</p>
                <p>Caso a inscrição se efetue entre os meses de setembro e maio, será cobrado o pagamento integral do valor da matrícula. A renovação da matrícula é anual e ocorre durante o mês de março.</p>
            </InfoCard>
            <InfoCard title="Vestuário">
                <p>O uso do uniforme é obrigatório de 1 de outubro a 31 de maio. No verão (1 de junho a 30 de setembro), o uso do polo, calções/saia e chapéu do colégio são obrigatórios. O uniforme está à venda na secretaria.</p>
            </InfoCard>
            <InfoCard title="Alimentação">
                <p>As refeições são elaboradas no colégio por uma Nutricionista, seguindo as normas HACCP. Os menus incluem sopa com mais de 5 legumes, prato principal (carne/peixe/ovo) e fruta fresca, com redução máxima de açúcares.</p>
            </InfoCard>
            <InfoCard title="Período de Funcionamento">
                <p>O Colégio está aberto todo o ano, de segunda a sexta-feira, das 8:00h às 19:00h. Encerra na última semana de agosto, feriados nacionais e nos dias 24 e 31 de dezembro.</p>
            </InfoCard>
        </div>
        
        {/* Preçário */}
        <div className="mb-16">
            <h3 className="font-display text-3xl font-bold text-[#3A8084] text-center mb-10">Preçário</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <InfoCard title="Modalidades">
                    <p className="font-bold">A mensalidade "base-horário" inclui:</p>
                    <ul className="list-disc list-inside space-y-2 pt-2">
                        <li>Alimentação</li>
                        <li>Produtos de higiene (fraldas, toalhitas, pomadas)</li>
                        <li>Bibe</li>
                        <li>Atividades intracurriculares</li>
                    </ul>
                </InfoCard>
                <InfoCard title="Atividades Intracurriculares">
                     <p>Incluídas na mensalidade para crianças dos 12 meses aos 6 anos:</p>
                     <ul className="list-disc list-inside space-y-2 pt-2">
                        <li>Expressão Musical</li>
                        <li>Inglês</li>
                        <li>Ginástica</li>
                    </ul>
                </InfoCard>
                <InfoCard title="Atividades Extracurriculares">
                    <p>Atividades opcionais para o Jardim de Infância, dependendo de um número mínimo de inscrições:</p>
                    <ul className="list-disc list-inside space-y-2 pt-2">
                        <li>Yoga</li>
                        <li>Ballet</li>
                        <li>Teatro</li>
                    </ul>
                </InfoCard>
            </div>
        </div>

        {/* Protocolos */}
        <div>
            <h3 className="font-display text-3xl font-bold text-[#3A8084] text-center mb-10">Protocolos e Parcerias</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProtocoloCard title="Entidades Aceites" items={["Ticket Infância", "Edenred", "Chèque Creche"]} />
                <ProtocoloCard 
                    title="Parcerias com outras entidades" 
                    description="Desconto de 10% na inscrição e 5% na mensalidade para os colaboradores."
                    items={[
                        "Ana Seguros", "Rede de Seguradoras", "Farmácias", 
                        "Câmara Municipal de Oeiras", "EDP", "Força Aérea",
                        "GNR", "Marinha", "PSP", "Polícia Judiciária",
                        "SIMAS de Oeiras", "Deloitte", "EGP", "Grupo Impresa",
                        "Clube Olice", "CTT Expresso", "SAMS", "ANF GDS",
                        "ANF IAPMEI", "FARMTECH", "Justiça de Oeiras",
                        "Infraestruturas de Portugal"
                    ]} 
                />
                 <ProtocoloCard 
                    title="Parcerias na Área da Saúde e Estética"
                    description="Descontos especiais para as famílias." 
                    items={[
                        "Farmácia Paço de Arcos",
                        "Self Care - Terapias Integrativas",
                        "Oculista Central",
                        "Club R",
                        "Psico Prime",
                        "Clínica Lambert",
                        "Gabinete de Psicologia e Terapias Integrativas"
                    ]}
                />
                 <ProtocoloCard 
                    title="Parcerias na área da educação"
                    description="Privilégio de entrada no 1º ciclo, caso haja vagas."
                    items={["Colégio São Francisco de Assis"]}
                />
                <ProtocoloCard 
                    title="Outros parceiros"
                    items={[
                        "Loja Nascidos em Sintonia - Rua de São Nicolau",
                        "Hipotecas - Mediação imobiliária",
                        "Brinquedos com Todos",
                        "Clube de Ténis de Oeiras",
                        "LA Automóveis (10% de desconto nas peças)"
                    ]}
                />
            </div>
        </div>

      </div>
    </section>
  );
};

export default Funcionamento;