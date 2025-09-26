import React from 'react';

interface MascotAnimationProps {
  onComplete: () => void;
}

const MascotAnimation: React.FC<MascotAnimationProps> = ({ onComplete }) => {
  return (
    <div 
      className="fixed bottom-0 left-0 z-[200]" 
      style={{ animation: 'walk-in-wave 6s ease-in-out forwards' }}
      onAnimationEnd={onComplete}
    >
      <svg width="120" height="180" viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
        <g id="mascot">
          {/* Coroa (importada do logo) */}
          <g id="crown" transform="translate(35, 12) scale(0.4)">
            <path
              d="M10 95 L15 45 L40 65 L60 30 L80 65 L105 45 L110 95 Z"
              fill="#88B923"
              stroke="#6A994E"
              strokeWidth="5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <circle cx="15" cy="45" r="10" fill="#F9792A" />
            <circle cx="60" cy="30" r="10" fill="#C9E265" />
            <circle cx="105" cy="45" r="10" fill="#3A8084" />
            <circle cx="40" cy="65" r="10" fill="#FFEE78" />
            <circle cx="80" cy="65" r="10" fill="#FF69B4" />
          </g>
          
          {/* Cabeça */}
          <circle cx="60" cy="50" r="25" fill="#FFEBCD" stroke="#565656" strokeWidth="2" />
          <circle cx="50" cy="45" r="3" fill="black" />
          <circle cx="70" cy="45" r="3" fill="black" />
          <path d="M55 60 Q60 65 65 60" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
          
          {/* Corpo */}
          <rect x="40" y="70" width="40" height="50" rx="10" ry="10" fill="#F9792A" />
          
          {/* Pernas */}
          <g transform="translate(60, 120)">
            <rect x="-20" y="0" width="15" height="60" rx="7.5" ry="7.5" fill="#3A8084" className="mascot-leg-left" style={{ transformOrigin: 'center 7.5px' }} />
            <rect x="5" y="0" width="15" height="60" rx="7.5" ry="7.5" fill="#3A8084" className="mascot-leg-right" style={{ transformOrigin: 'center 7.5px' }}/>
          </g>

          {/* Braços */}
           <g transform="translate(60, 80)">
             {/* Braço esquerdo (atrás) */}
             <rect x="-45" y="0" width="15" height="45" rx="7.5" ry="7.5" fill="#88B923" transform="rotate(-20)" style={{ transformOrigin: '40px 7.5px' }} />
             {/* Braço direito (acena) */}
             <rect x="30" y="0" width="15" height="45" rx="7.5" ry="7.5" fill="#88B923" className="mascot-arm-wave" style={{ transformOrigin: '7.5px 7.5px' }}/>
           </g>
        </g>
      </svg>
    </div>
  );
};

export default MascotAnimation;