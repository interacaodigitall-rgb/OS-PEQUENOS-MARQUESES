import React, { useState } from 'react';
import { XIcon } from './IconComponents';

interface LoginModalProps {
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de autenticação
    if (username === 'admin' && password === 'admin') {
      setError('');
      onLogin();
    } else {
      setError('Utilizador ou palavra-passe incorretos.');
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl relative max-w-md w-full p-8"
        onClick={(e) => e.stopPropagation()}
        style={{animation: 'scale-in 0.3s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94)'}}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors rounded-full p-1 hover:bg-gray-100"
          aria-label="Fechar login"
        >
          <XIcon className="h-7 w-7" />
        </button>
        
        <h3 className="font-display text-3xl font-bold text-center text-[#3A8084] mb-6">Área Reservada</h3>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-bold text-gray-700">Utilizador</label>
            <input 
              type="text" 
              name="username" 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#F9792A] focus:border-[#F9792A]" 
              required 
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-700">Palavra-passe</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#F9792A] focus:border-[#F9792A]" 
              required 
            />
          </div>
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <button 
              type="submit" 
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-bold text-white bg-[#F9792A] hover:bg-[#e06c24] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F9792A] transition-colors"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;