import React from 'react';
import { Volume2, VolumeX, Sparkles, Search, Layers } from 'lucide-react';
import { playLuxuryClick } from '../utils/sound';

export default function FloatingControls({
  numbers,
  selectedNumber,
  onSelectNumber,
  seriesList,
  activeSeries,
  onSelectSeries,
  soundEnabled,
  onToggleSound,
  searchTerm,
  onSearchChange,
  themeColor
}) {
  return (
    <div className="w-full flex flex-col items-center gap-3.5 z-20">
      
      {/* Series Filter Tabs (All, 3109, 3108, 3107, 3106, 3105) */}
      <div className="flex items-center gap-1.5 p-1 rounded-full glass-pill overflow-x-auto max-w-full">
        {seriesList.map((s) => {
          const isActive = activeSeries === s.id;
          return (
            <button
              key={s.id}
              onClick={() => {
                playLuxuryClick(soundEnabled);
                onSelectSeries(s.id);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#ff7900] to-orange-600 text-white shadow-lg shadow-orange-500/25'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {s.name}
            </button>
          );
        })}
      </div>

      {/* Floating Capsule Swatches for the 20 Numbers */}
      <div className="flex items-center gap-3 p-2 px-3.5 rounded-full glass-panel shadow-2xl border border-white/10 max-w-full">
        
        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          title={soundEnabled ? 'كتم المؤثرات' : 'تشغيل المؤثرات'}
          className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-[#ff7900]" /> : <VolumeX className="w-4 h-4" />}
        </button>

        <div className="w-[1px] h-6 bg-white/10 shrink-0" />

        {/* Circular Number Swatches */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 px-1 max-w-[280px] sm:max-w-md lg:max-w-lg scrollbar-thin">
          {numbers.map((item) => {
            const isSelected = selectedNumber.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playLuxuryClick(soundEnabled);
                  onSelectNumber(item);
                }}
                className={`relative group flex items-center justify-center p-0.5 rounded-full transition-all duration-300 cursor-pointer shrink-0 ${
                  isSelected ? 'scale-110' : 'hover:scale-105 opacity-75 hover:opacity-100'
                }`}
                title={`${item.formatted} - ${item.badge}`}
              >
                {/* Active Outer Ring */}
                <div
                  className={`w-9 h-9 rounded-full flex flex-col items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-black'
                      : 'border border-white/20'
                  }`}
                  style={{
                    backgroundColor: isSelected ? themeColor : 'rgba(255,255,255,0.06)',
                    boxShadow: isSelected ? `0 0 15px ${themeColor}` : 'none'
                  }}
                >
                  <span className={`text-[10px] font-bold font-num select-none leading-none ${
                    isSelected ? 'text-black' : 'text-zinc-200'
                  }`}>
                    {item.rawNumber.slice(-3)}
                  </span>
                  <span className={`text-[8px] font-num select-none leading-none opacity-80 ${
                    isSelected ? 'text-black' : 'text-zinc-400'
                  }`}>
                    {item.rawNumber.slice(-5, -3)}
                  </span>
                </div>

                {/* Tooltip on hover */}
                <span className="absolute -top-9 px-2 py-1 rounded bg-black/95 text-[10px] text-zinc-200 font-num pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 shadow-lg z-30">
                  {item.formatted}
                </span>
              </button>
            );
          })}
        </div>

        <div className="w-[1px] h-6 bg-white/10 shrink-0" />

        {/* Search Input Filter */}
        <div className="relative hidden md:flex items-center">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute right-3 pointer-events-none" />
          <input
            type="text"
            placeholder="ابحث بآخر أرقام..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-32 bg-white/5 border border-white/10 rounded-full py-1 pr-8 pl-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff7900] transition-colors font-num text-right"
          />
        </div>

      </div>

    </div>
  );
}
