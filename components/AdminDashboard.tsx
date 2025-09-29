import React, { useState, useEffect, useCallback } from 'react';
import { getSupabase } from '../lib/supabase';
import { GalleryIcon, EditIcon, XIcon, SaveIcon } from './IconComponents';

const supabase = getSupabase();

interface SiteConfig {
  key: string;
  value: string;
}

interface GalleryImage {
  id: number;
  publicUrl: string;
  name: string;
  alt_text: string;
}

const AdminDashboard: React.FC = () => {
  const [config, setConfig] = useState<SiteConfig[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingConfig, setSavingConfig] = useState(false);
  const [savingImage, setSavingImage] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'general' | 'gallery'>('general');

  const fetchConfig = useCallback(async () => {
    const { data, error } = await supabase.from('site_config').select('*');
    if (error) {
      setError('Falha ao carregar configurações.');
      console.error(error);
    } else {
      setConfig(data || []);
    }
  }, []);

  const fetchGallery = useCallback(async () => {
    const { data, error } = await supabase.from('gallery_images').select('*').order('created_at', { ascending: false });
    if (error) {
      setError('Falha ao carregar a galeria.');
      console.error(error);
    } else {
      setGalleryImages(data || []);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchConfig(), fetchGallery()]);
      setLoading(false);
    };
    fetchData();
  }, [fetchConfig, fetchGallery]);

  const handleConfigChange = (key: string, value: string) => {
    setConfig(prevConfig => {
      const existing = prevConfig.find(item => item.key === key);
      if (existing) {
        return prevConfig.map(item => item.key === key ? { ...item, value } : item);
      }
      return [...prevConfig, { key, value }];
    });
  };

  const showSuccessMessage = (message: string) => {
    setSuccess(message);
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleSaveConfig = async () => {
    setSavingConfig(true);
    setError(null);
    const { error } = await supabase.from('site_config').upsert(config, { onConflict: 'key' });
    if (error) {
      setError(`Erro ao guardar as configurações: ${error.message}`);
    } else {
      showSuccessMessage('Configurações guardadas com sucesso!');
    }
    setSavingConfig(false);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    let fileName = ''; // Manter o nome do ficheiro para limpeza em caso de erro

    try {
      // 1. Obter utilizador autenticado
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Utilizador não autenticado. Por favor, faça login novamente.');
      }

      // 2. Preparar nome do ficheiro e carregar para o storage
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '');
      fileName = `${user.id}/${Date.now()}_${cleanFileName}`;
      const { error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      // 3. Obter URL público
      const { data: urlData } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(fileName);
      
      if (!urlData.publicUrl) {
        throw new Error('Erro ao obter o URL público da imagem.');
      }
      
      // 4. Inserir na base de dados (sem .select() para evitar conflitos de RLS)
      const { error: dbError } = await supabase.from('gallery_images').insert({ 
          publicUrl: urlData.publicUrl,
          name: fileName,
          alt_text: file.name.split('.').slice(0, -1).join(' '),
          user_id: user.id
      });

      if (dbError) {
        throw dbError;
      }

      // 5. Sucesso
      showSuccessMessage('Imagem carregada com sucesso!');
      await fetchGallery();

    } catch (e: any) {
      const message = e.message || 'Ocorreu um erro desconhecido.';
      setError(`Falha no carregamento: ${message}`);
        
      // Limpeza do ficheiro no storage se um passo posterior falhar
      if (fileName) {
        await supabase.storage.from('gallery-images').remove([fileName]);
      }
    } finally {
      setUploading(false);
      if (event.target) {
        event.target.value = ''; // Limpar o input do ficheiro
      }
    }
  };

  const handleDeleteImage = async (image: GalleryImage) => {
    if (!window.confirm(`Tem a certeza que quer apagar a imagem "${image.alt_text}"?`)) return;
    setError(null);

    const { error: storageError } = await supabase.storage.from('gallery-images').remove([image.name]);
    if (storageError) {
        setError(`Erro ao apagar a imagem do armazenamento: ${storageError.message}`);
        return;
    }
    
    const { error: dbError } = await supabase.from('gallery_images').delete().match({ id: image.id });
     if (dbError) {
        setError(`Erro ao apagar a referência da imagem: ${dbError.message}`);
    } else {
        showSuccessMessage('Imagem apagada com sucesso!');
        fetchGallery();
    }
  };

  const handleImageAltTextChange = (id: number, newAltText: string) => {
    setGalleryImages(prev => prev.map(img => img.id === id ? { ...img, alt_text: newAltText } : img));
  };

  const handleUpdateImageAltText = async (id: number, newAltText: string) => {
    setSavingImage(id);
    setError(null);
    const { error } = await supabase.from('gallery_images').update({ alt_text: newAltText }).eq('id', id);
    if (error) {
        setError(`Erro ao atualizar a descrição da imagem: ${error.message}`);
    } else {
        showSuccessMessage('Descrição da imagem guardada!');
    }
    setSavingImage(null);
  };
  
  const getConfigValue = (key: string) => config.find(c => c.key === key)?.value || '';

  if (loading) return <div className="text-center py-24">A carregar painel...</div>;

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-[#3A8084]">Painel de Administração</h2>
          <p className="mt-2 text-lg max-w-2xl mx-auto text-gray-600">
            Bem-vindo, Administrador. Gestão de conteúdo do website.
          </p>
        </div>
        
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">{error}</div>}
        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">{success}</div>}
        
        <div className="mb-8 border-b border-gray-200">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                <button
                    onClick={() => setActiveTab('general')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${activeTab === 'general' ? 'border-[#F9792A] text-[#F9792A]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                    Configurações Gerais
                </button>
                <button
                    onClick={() => setActiveTab('gallery')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${activeTab === 'gallery' ? 'border-[#F9792A] text-[#F9792A]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                    Galeria (Instalações)
                </button>
            </nav>
        </div>

        {activeTab === 'general' && (
             <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
                <div className="flex items-center mb-6">
                    <div className="bg-[#F9792A]/20 p-3 rounded-full mr-4">
                        <EditIcon className="h-8 w-8 text-[#F9792A]" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-[#565656]">Configurações Gerais</h3>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700">Telefone Principal</label>
                        <input type="text" value={getConfigValue('main_phone')} onChange={e => handleConfigChange('main_phone', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#F9792A] focus:border-[#F9792A]" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700">Email Principal</label>
                        <input type="email" value={getConfigValue('main_email')} onChange={e => handleConfigChange('main_email', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#F9792A] focus:border-[#F9792A]" />
                    </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-700">Morada</label>
                        <textarea value={getConfigValue('address')} onChange={e => handleConfigChange('address', e.target.value)} rows={2} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#F9792A] focus:border-[#F9792A]" />
                    </div>
                </div>
                <button onClick={handleSaveConfig} disabled={savingConfig} className="mt-6 w-full bg-[#F9792A] text-white font-bold py-2 px-6 rounded-full hover:bg-[#e06c24] transition-colors btn-hover-effect disabled:bg-gray-400">
                    {savingConfig ? 'A guardar...' : 'Guardar Configurações'}
                </button>
            </div>
        )}

        {activeTab === 'gallery' && (
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-6">
                    <div className="bg-[#C9E265]/20 p-3 rounded-full mr-4">
                        <GalleryIcon className="h-8 w-8 text-[#88B923]" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-[#565656]">Gerir Galeria da Página 'Instalações'</h3>
                </div>
                <p className="text-gray-600 -mt-4 mb-6">As imagens carregadas aqui serão exibidas na secção "Instalações" do website público.</p>
                <div className="mb-6">
                    <label className="w-full flex items-center justify-center px-4 py-3 bg-gray-50 text-[#88B923] rounded-lg shadow-sm tracking-wide uppercase border border-dashed border-[#88B923] cursor-pointer hover:bg-[#88B923]/10">
                        <svg className="w-6 h-6 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4 4-4-4h3V9h2v2z" /></svg>
                        <span className="text-sm font-bold">{uploading ? 'A carregar...' : 'Carregar nova imagem'}</span>
                        <input type='file' className="hidden" onChange={handleImageUpload} disabled={uploading} accept="image/jpeg,image/png,image/webp" />
                    </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-h-[60vh] overflow-y-auto pr-2">
                    {galleryImages.map(image => (
                        <div key={image.id} className="relative group bg-gray-50 rounded-lg p-2 border">
                            <img src={image.publicUrl} alt={image.alt_text} className="w-full h-40 object-cover rounded-lg" />
                            <div className="mt-2">
                                <label className="text-xs font-bold text-gray-500">Texto descritivo</label>
                                <textarea 
                                    value={image.alt_text}
                                    onChange={(e) => handleImageAltTextChange(image.id, e.target.value)}
                                    rows={2}
                                    className="mt-1 text-sm block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#88B923] focus:border-[#88B923]"
                                />
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <button onClick={() => handleUpdateImageAltText(image.id, image.alt_text)} disabled={savingImage === image.id} className="flex items-center text-sm text-white bg-green-600 hover:bg-green-700 px-2 py-1 rounded-md disabled:bg-gray-400">
                                    <SaveIcon className="h-4 w-4 mr-1" />
                                    {savingImage === image.id ? '...' : 'Guardar'}
                                </button>
                                <button onClick={() => handleDeleteImage(image)} className="text-white bg-red-500 rounded-full p-2 hover:bg-red-600 absolute -top-3 -right-3 shadow-lg">
                                    <XIcon className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;