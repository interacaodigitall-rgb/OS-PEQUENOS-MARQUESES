import React from 'react';

interface LogoProps {
  className?: string;
  textColor?: string;
}

const Logo: React.FC<LogoProps> = ({ className, textColor = '#3A8084' }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 450 100" // Aumentado para acomodar o texto
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Os Pequenos Marqueses Logo"
    >
      {/* A coroa */}
      <g id="crown" transform="translate(0, -5)"> {/* Ligeiro ajuste vertical para melhor alinhamento */}
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
      
      {/* O texto do logótipo */}
      <text 
        fontFamily="'Chelsea Market', cursive" 
        fontSize="38" 
        fill={textColor} // Cor personalizável
        dominantBaseline="hanging"
      >
        <tspan x="135" y="22">Os Pequenos</tspan>
        <tspan x="135" y="62">Marqueses</tspan>
      </text>
    </svg>
  );
};

export default Logo;