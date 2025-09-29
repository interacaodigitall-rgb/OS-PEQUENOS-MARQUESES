import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { ChatIcon, XIcon, CrownIcon } from './IconComponents';

type Message = {
    id: number;
    role: 'user' | 'model';
    text: string;
};

// Acesso seguro à chave da API a partir do ambiente. Se não existir, o chatbot será desativado.
const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : undefined;

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isApiConfigured, setIsApiConfigured] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inactivityTimerRef = useRef<number | null>(null);
    const aiRef = useRef<any>(null);

    const schoolInfo = `
    INFORMAÇÕES SOBRE O COLÉGIO "OS PEQUENOS MARQUESES":

    **SOBRE NÓS (QUEM SOMOS):**
    - Equipa: Profissionais especializados que promovem o desenvolvimento global e harmonioso da criança, com base nos seus interesses e necessidades. Acreditamos num ambiente familiar e na partilha entre escola e família. Cada sala tem uma educadora de infância e uma auxiliar. A equipa de retaguarda inclui também a nossa cozinheira, auxiliares de limpeza e a área de gestão.
    - Direção: Antónia Martins (Diretora Administrativa) e Olga Muro (Diretora Pedagógica).
    - Projeto Educativo: Baseado na filosofia construtivista de Jean Piaget. A criança é o agente principal da sua aprendizagem.
        - Pedagogia: Foco em respeito, autonomia, criatividade e motivação. A rotina educativa é baseada em projetos, mas com flexibilidade para pedagogia de situação (aproveitar momentos espontâneos para aprender).
        - Temática: "Eu, a brincar, a aprender e a crescer!". Transmissão de conhecimentos, afetividade e valores morais através de brincadeiras.
        - Princípios: Respeito pela individualidade, incentivo à curiosidade e espírito crítico, promoção da responsabilidade, expressão, comunicação, criatividade e participação das famílias.

    **INSTALAÇÕES:**
    - O colégio é constituído por: 1 sala de berçário dividida em dois espaços, 1 copa de leites, 2 salas de creche (2-3 anos), 3 salas de jardim de infância (3-6 anos), zona de refeições e sesta, cozinha equipada, sistema de climatização, 1 refeitório, 2 receções, 2 casas de banho para adultos, sala de isolamento, espaço exterior com 200m² de relva, 2 gabinetes administrativos.

    **FUNCIONAMENTO:**
    - Horário: Segunda a sexta-feira, das 8:00h às 19:00h. Aberto todo o ano.
    - Encerramentos: Última semana de agosto, feriados nacionais, dias 24 e 31 de dezembro.
    - Inscrição e Renovação: Abertas todo o ano para crianças de 4 meses a 6 anos (mediante vaga). Renovação anual em março.
    - Vestuário: Uniforme obrigatório de 1 de outubro a 31 de maio. No verão, polo, calções/saia e chapéu do colégio são obrigatórios.
    - Alimentação: Refeições elaboradas no colégio por uma Nutricionista, seguindo normas HACCP (menus incluem sopa, prato principal e fruta, com baixo teor de açúcar).

    **PREÇÁRIO:**
    - Mensalidade "base-horário" inclui: Alimentação, produtos de higiene (fraldas, toalhitas, pomadas), bibe e atividades intracurriculares.
    - Atividades Intracurriculares (incluídas para 12m-6a): Expressão Musical, Inglês, Ginástica.
    - Atividades Extracurriculares (opcionais, com inscrição): Yoga, Ballet, Teatro.

    **PROTOCOLOS E PARCERIAS:**
    - Formas de Pagamento: Aceita Ticket Infância, Edenred, Chèque Creche.
    - Parcerias com Entidades (desconto 10% na inscrição, 5% na mensalidade): Ana Seguros, Rede de Seguradoras, Farmácias, Câmara Municipal de Oeiras, EDP, Força Aérea, GNR, Marinha, PSP, Polícia Judiciária, SIMAS de Oeiras, Deloitte, e muitas outras.
    - Saúde/Estética (descontos): Farmácia Paço de Arcos, Self Care, Oculista Central, etc.
    - Educação: Privilégio de entrada no 1º ciclo no Colégio São Francisco de Assis.
    - Outros Parceiros: Loja Nascidos em Sintonia, Hipotecas, Brinquedos com Todos, Clube de Ténis de Oeiras, LA Automóveis (10% desconto).

    **CONTACTOS:**
    - Morada: Rua Marechal Gomes da Costa, Lote 18 - 2780-153 Oeiras.
    - Telefones: (+351) 917 995 104 / 965 144 611. Creche: 211 372 610. Jardim de Infância: 217 165 513.
    - Email: geral@pequenosmarqueses.pt
    `;

    useEffect(() => {
        if (apiKey) {
            try {
                aiRef.current = new GoogleGenAI({ apiKey });
                setIsApiConfigured(true);
            } catch (e) {
                console.error("Falha ao inicializar o GoogleGenAI:", e);
                setIsApiConfigured(false);
            }
        } else {
            console.warn("A chave da API do Gemini (API_KEY) não está configurada. O Chatbot estará desativado.");
            setIsApiConfigured(false);
        }
    }, []);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            if (isApiConfigured) {
                setMessages([{ id: Date.now(), role: 'model', text: 'Olá! 👋 Eu sou o Marquinhos, o assistente virtual do colégio. Como posso ajudar? Pode escolher uma das opções abaixo ou escrever a sua pergunta.' }]);
                setShowSuggestions(true);
            } else {
                setMessages([{ id: Date.now(), role: 'model', text: 'Peço desculpa, o serviço de chat não está disponível de momento.' }]);
            }
        }
    }, [isOpen, isApiConfigured]);

    const resetInactivityTimer = () => {
        if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = window.setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now(),
                role: 'model',
                text: 'Parece que ficou sem perguntas. Se precisar de mais alguma coisa, estarei por aqui! Até breve! 👋'
            }]);
        }, 60000); // 1 minuto
    };

    useEffect(() => {
        if (isOpen && messages.length > 0) {
            resetInactivityTimer();
        }
        return () => {
            if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
        };
    }, [messages, isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (messageText?: string) => {
        const textToSend = messageText || input;
        if (!textToSend.trim() || isLoading) return;

        setShowSuggestions(false);
        const userMessage: Message = { id: Date.now(), role: 'user', text: textToSend };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        if (!isApiConfigured || !aiRef.current) {
            setMessages(prev => [...prev, { id: Date.now() + 1, role: 'model', text: 'Peço desculpa, o serviço de chat não está configurado corretamente.' }]);
            setIsLoading(false);
            return;
        }

        try {
            const response = await aiRef.current.models.generateContent({
                model: "gemini-2.5-flash",
                contents: textToSend,
                config: {
                    systemInstruction: `Você é um assistente virtual amigável, caloroso e prestável do colégio "Os Pequenos Marqueses". O seu nome é Marquinhos. A sua missão é responder de forma humanizada, mantendo uma conversa natural e contínua. Mantenha o contexto da conversa. Evite saudações repetitivas a cada mensagem. Responda apenas a perguntas relacionadas com o colégio, com base nas informações fornecidas. Seja conciso, simpático e use emojis de forma apropriada para um contexto infantil. Se não souber a resposta ou a pergunta for fora do tópico, diga educadamente que só pode fornecer informações sobre o colégio. Aqui estão os dados sobre o colégio:\n\n${schoolInfo}`,
                },
            });
            const modelMessage: Message = { id: Date.now() + 1, role: 'model', text: response.text };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("Gemini API error:", error);
            const errorMessage: Message = { id: Date.now() + 1, role: 'model', text: 'Peço desculpa, estou com dificuldades em ligar-me. Por favor, tente novamente mais tarde.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const suggestionButtons = [
        { label: 'Horários', color: 'bg-blue-100 text-blue-800 hover:bg-blue-200' },
        { label: 'Preços', color: 'bg-green-100 text-green-800 hover:bg-green-200' },
        { label: 'Inscrições', color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' },
    ];

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 bg-[#3A8084] text-white p-4 rounded-full shadow-lg hover:bg-[#2f686b] transition-transform hover:scale-110 z-[60]`}
                aria-label="Abrir chat de ajuda"
            >
                {isOpen ? <XIcon className="h-8 w-8" /> : <ChatIcon className="h-8 w-8" />}
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-6 w-[calc(100%-3rem)] max-w-sm h-[calc(100%-7rem)] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50" style={{ animation: 'scale-in 0.2s' }}>
                    <header className="bg-[#3A8084] text-white p-4 rounded-t-2xl flex items-center justify-center">
                        <CrownIcon className="h-8 w-8 mr-3 text-yellow-300"/>
                        <h3 className="font-display text-xl">Fale com o Marquinhos!</h3>
                    </header>
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-[#C9E265] text-[#565656]' : 'bg-gray-200'}`}>
                                    <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                 <div className="max-w-[80%] p-3 rounded-2xl bg-gray-200">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {showSuggestions && messages.length > 0 && isApiConfigured && (
                        <div className="p-4 pt-0 border-t border-gray-200 flex flex-wrap gap-2 justify-center">
                            {suggestionButtons.map(btn => (
                                <button key={btn.label} onClick={() => handleSendMessage(btn.label)} className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${btn.color}`}>
                                    {btn.label}
                                </button>
                            ))}
                        </div>
                    )}
                    
                    <footer className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
                        <div className="flex">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder={isApiConfigured ? "Escreva a sua dúvida..." : "Chat indisponível"}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F9792A]"
                                disabled={isLoading || !isApiConfigured}
                            />
                            <button onClick={() => handleSendMessage()} disabled={isLoading || !input.trim() || !isApiConfigured} className="ml-3 bg-[#F9792A] text-white px-4 py-2 rounded-full font-bold hover:bg-[#e06c24] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
                                Enviar
                            </button>
                        </div>
                    </footer>
                </div>
            )}
        </>
    );
};

export default Chatbot;
