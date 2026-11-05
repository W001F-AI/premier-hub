import React from 'react';
import { PhoneCall, Sparkles, Volume2, VolumeX, Shield } from 'lucide-react';
import { playLuxuryClick } from '../utils/sound';

export default function Navbar({ soundEnabled, onToggleSound, onOpenConcierge }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-pill px-5 py-3 rounded-full border border-white/10 shadow-2xl backdrop-blur-xl">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#ff7900] shadow-[0_0_20px_rgba(255,121,0,0.6)] flex items-center justify-center font-black text-black text-lg select-none">
            O
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-wider text-white flex items-center gap-1.5">
              <span>ORANGE</span>
              <span className="text-[#ff7900] font-light">PREMIER</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-semibold">
              The Luxury VIP Hub
            </span>
          </div>
        </div>

        {/* Center Tagline (hidden on small screens) */}
        <div className="hidden md:flex items-center gap-2 text-xs text-zinc-300 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>مستشارو Premier VIP متاحون على مدار الساعة</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'كتم المؤثرات الصوتية' : 'تشغيل المؤثرات الصوتية'}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#ff7900]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              playLuxuryClick(soundEnabled);
              onOpenConcierge();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff7900] hover:bg-orange-500 text-black text-xs font-bold transition-all duration-300 shadow-md shadow-orange-500/20 active:scale-95 cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>طلب اتصال VIP</span>
          </button>
        </div>

      </div>
    </header>
  );
}
