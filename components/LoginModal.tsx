import React, { useState } from 'react';
import { XIcon } from './IconComponents';
import { getSupabase } from '../lib/supabase';

const supabase = getSupabase();

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError('Email ou palavra-passe incorretos.');
      console.error('Login Error:', error.message);
    } else {
      // O App.tsx irá detetar a mudança de estado e fechar o modal
    }
    setLoading(false);
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
            <label htmlFor="email" className="block text-sm font-bold text-gray-700">Email</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
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
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-bold text-white bg-[#F9792A] hover:bg-[#e06c24] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F9792A] transition-colors disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? 'A entrar...' : 'Entrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
