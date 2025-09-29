import React, { useState, useEffect } from 'react';
import { XIcon } from './IconComponents';
import { getSupabase } from '../lib/supabase';

const supabase = getSupabase();

interface GalleryImage {
  id: number;
  publicUrl: string;
  alt_text: string;
}

const facilityList = [
    "1 sala de berçário dividida em dois espaços: zona de berços e zona de brincar",
    "1 copa de leites",
    "2 salas de creche (dos 2 aos 3 anos) e zona de aquisição de hábitos de higiene com sanitários",
    "3 salas de jardim de infância (dos 3 aos 6 anos)",
    "Zona de refeições e de sesta",
    "Cozinha totalmente equipada, com cozinheira certificada",
    "Sistema de climatização implementado",
    "1 refeitório",
    "2 receções com fraldário de apoio com equipamento",
    "2 casas de banho para adultos",
    "Sala de isolamento",
    "Espaço exterior com cerca de 200m² com relva",
    "2 gabinetes administrativos"
];

const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<{src: string, alt: string} | null>(null);
  const svg = `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><path d="M0 20h40M20 0v40" stroke="#e5e7eb" stroke-width="1"/></svg>`;
  const gridPattern = `data:image/svg+xml;base64,${btoa(svg)}`;
  
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Erro ao carregar imagens da galeria:", error);
      } else {
        setImages(data || []);
      }
      setLoading(false);
    };
    fetchImages();
  }, []);

  return (
    <>
      <section 
        className="py-24 bg-white"
        style={{ backgroundImage: `url("${gridPattern}")` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-[#3A8084]">Nossas Instalações</h2>
            <p className="mt-2 text-lg max-w-2xl mx-auto">
              Dispomos de espaços amplos, seguros e estimulantes, pensados para o bem-estar e desenvolvimento de cada criança.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-2">
                  <h3 className="text-2xl font-bold text-[#565656] mb-4">O colégio é constituído por:</h3>
                  <ul className="list-disc list-inside space-y-2 text-[#565656]">
                      {facilityList.map((item, index) => <li key={index}>{item}</li>)}
                  </ul>
              </div>
              <div className="lg:col-span-3">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="rounded-xl shadow-lg aspect-square bg-gray-200 animate-pulse"></div>
                    ))
                  ) : (
                    images.map((image) => (
                      <div 
                        key={image.id} 
                        className="rounded-xl overflow-hidden shadow-lg cursor-pointer group"
                        onClick={() => setSelectedImage({src: image.publicUrl, alt: image.alt_text})}
                      >
                        <img
                          src={image.publicUrl}
                          alt={image.alt_text}
                          className="w-full h-full object-cover aspect-square mosaic-image"
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
          </div>
        </div>
      </section>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
          style={{animation: 'fade-in 0.3s'}}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.src} alt={`Visualização ampliada de: ${selectedImage.alt}`} className="w-full h-full object-contain rounded-lg shadow-2xl" />
            <button 
              onClick={() => setSelectedImage(null)} 
              className="absolute -top-3 -right-3 text-white bg-gray-800/60 rounded-full p-2 hover:bg-gray-800 transition-colors"
              aria-label="Fechar imagem"
            >
              <XIcon className="h-8 w-8" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
