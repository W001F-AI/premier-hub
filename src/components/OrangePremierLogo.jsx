import React from 'react';

export default function OrangePremierLogo({ size = 'default' }) {
  const isLarge = size === 'large';

  return (
    <div className="flex items-center gap-3 sm:gap-4 select-none group cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
      
      {/* 3D Glowing Orange Cube / Square (Directly from User Image) */}
      <div className="relative">
        {/* Ambient Neon Glow */}
        <div className="absolute -inset-1 rounded-xl bg-[#ff7900] blur-lg opacity-60 group-hover:opacity-90 transition-opacity duration-500 animate-pulse" />
        
        {/* 3D Beveled Orange Box */}
        <div
          className={`relative ${
            isLarge ? 'w-12 h-12 rounded-2xl p-1.5' : 'w-10 h-10 sm:w-11 sm:h-11 rounded-xl p-1.5'
          } flex flex-col justify-end shadow-2xl transition-all duration-300`}
          style={{
            background: 'linear-gradient(135deg, #ff9500 0%, #ff7900 45%, #e05305 100%)',
            boxShadow: 'inset 0 1.5px 2px rgba(255, 255, 255, 0.6), inset 0 -2px 4px rgba(0, 0, 0, 0.35), 0 10px 25px rgba(255, 121, 0, 0.55)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}
        >
          {/* Subtle Top-left Specular Sheen */}
          <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-xl bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />

          {/* Authentic Lowercase "orange™" typography */}
          <div className="relative z-10 flex items-baseline leading-none font-sans font-bold text-white tracking-tighter text-[9px] sm:text-[10px] pl-0.5 pb-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            <span>orange</span>
            <span className="text-[6px] font-normal leading-none ml-0.5 opacity-90">™</span>
          </div>
        </div>
      </div>

      {/* 3D Embossed Bold "PREMIER" Typography (Matches User Image 2 faithfully) */}
      <div className="relative flex flex-col justify-center">
        {/* Glow behind text */}
        <div className="absolute -inset-1 blur-md bg-white/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <span
          className={`relative z-10 font-black tracking-wider uppercase font-sans text-white transition-all duration-300 ${
            isLarge ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'
          }`}
          style={{
            letterSpacing: '0.045em',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.7), 0 0 20px rgba(255, 121, 0, 0.35)',
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.8))'
          }}
        >
          PREMIER
        </span>
      </div>

    </div>
  );
}
