import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, PhoneCall, ShieldCheck, Wifi, Battery, Sparkles, CreditCard, Lock, CheckCircle2 } from 'lucide-react';
import { playLuxuryClick, playChime } from '../utils/sound';

export default function PhoneMockup({ selectedNumber, selectedTier, soundEnabled }) {
  const [activeScreenMode, setActiveScreenMode] = useState('call'); // 'call' | 'card' | 'lock'
  const [callAnswered, setCallAnswered] = useState(false);
  const [callTimer, setCallTimer] = useState(0);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Reset call answered state when number changes
  useEffect(() => {
    setCallAnswered(false);
    setCallTimer(0);
  }, [selectedNumber, selectedTier]);

  // Call timer simulation if answered
  useEffect(() => {
    let interval = null;
    if (callAnswered) {
      interval = setInterval(() => {
        setCallTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callAnswered]);

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAnswerCall = () => {
    playChime(soundEnabled);
    setCallAnswered(true);
  };

  const handleDeclineCall = () => {
    playLuxuryClick(soundEnabled);
    setCallAnswered(false);
    setCallTimer(0);
  };

  // Parallax subtle 3D tilt on mouse movement over the container
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const maxDeg = 7;
    setRotateX((-y / (rect.height / 2)) * maxDeg);
    setRotateY((x / (rect.width / 2)) * maxDeg);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="flex flex-col items-center justify-center relative w-full py-4 select-none">
      
      {/* Screen Mode Switcher Pills */}
      <div className="flex items-center gap-1.5 p-1 mb-5 rounded-full glass-pill z-20">
        <button
          onClick={() => { playLuxuryClick(soundEnabled); setActiveScreenMode('call'); }}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
            activeScreenMode === 'call'
              ? 'bg-white/15 text-white shadow-lg backdrop-blur-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <PhoneCall className="w-3.5 h-3.5 text-[#ff7900]" />
          <span>مكالمة واردة</span>
        </button>

        <button
          onClick={() => { playLuxuryClick(soundEnabled); setActiveScreenMode('card'); }}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
            activeScreenMode === 'card'
              ? 'bg-white/15 text-white shadow-lg backdrop-blur-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5 text-amber-400" />
          <span>الشريحة المعدنية</span>
        </button>

        <button
          onClick={() => { playLuxuryClick(soundEnabled); setActiveScreenMode('lock'); }}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
            activeScreenMode === 'lock'
              ? 'bg-white/15 text-white shadow-lg backdrop-blur-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Lock className="w-3.5 h-3.5 text-sky-400" />
          <span>شاشة القفل</span>
        </button>
      </div>

      {/* 3D Phone Perspective Container */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="perspective-1000 transition-transform duration-200 ease-out"
        style={{
          transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      >
        {/* Luxury Phone Exterior Body (Titanium Bezel) */}
        <div className="relative w-[300px] sm:w-[335px] h-[610px] sm:h-[650px] rounded-[52px] p-[10px] bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(255,121,0,0.2)] ring-1 ring-white/20">
          
          {/* Side Buttons */}
          <div className="absolute -left-[3px] top-[115px] w-[3px] h-[28px] bg-zinc-600 rounded-l-sm" />
          <div className="absolute -left-[3px] top-[155px] w-[3px] h-[50px] bg-zinc-600 rounded-l-sm" />
          <div className="absolute -left-[3px] top-[215px] w-[3px] h-[50px] bg-zinc-600 rounded-l-sm" />
          <div className="absolute -right-[3px] top-[160px] w-[3px] h-[75px] bg-zinc-600 rounded-r-sm" />

          {/* Inner Display Border */}
          <div className="relative w-full h-full rounded-[44px] overflow-hidden bg-black flex flex-col justify-between border-[2px] border-zinc-900 shadow-inner">
            
            {/* Dynamic Glass Reflection Stripe */}
            <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none transform -rotate-45" />

            {/* Top Status Bar & Dynamic Island */}
            <div className="relative z-30 pt-3 px-6 flex items-center justify-between text-[11px] text-zinc-300 font-semibold font-num">
              <span>01:22</span>
              
              {/* Dynamic Island */}
              <div className="h-[26px] w-[105px] bg-black rounded-full flex items-center justify-between px-2.5 border border-zinc-800/80 shadow-md">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff7900] animate-pulse" />
                <span className="text-[9px] text-[#ff7900] font-sans font-bold">PREMIER</span>
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800" />
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[9px] text-[#ff7900] font-bold">5G+</span>
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-4 h-4 fill-white" />
              </div>
            </div>

            {/* Dynamic Screen Content Based on Mode */}
            <div className="relative z-20 flex-1 flex flex-col justify-between p-5 pt-3">
              
              {/* ---------------- MODE 1: VIP INCOMING CALL ---------------- */}
              {activeScreenMode === 'call' && (
                <div className="flex-1 flex flex-col justify-between items-center text-center py-2 animate-fade-in">
                  
                  {/* Top Caller Info */}
                  <div className="flex flex-col items-center">
                    <span className="text-[11px] uppercase tracking-widest text-[#ff7900] font-bold mb-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Orange Premier VIP
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-wide">
                      {callAnswered ? 'مكالمة جارية' : 'مكالمة واردة VIP'}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {callAnswered ? formatTimer(callTimer) : selectedTier.name}
                    </p>
                  </div>

                  {/* Center Avatar & Phone Number */}
                  <div className="my-auto flex flex-col items-center">
                    <div
                      className="relative w-24 h-24 rounded-full flex items-center justify-center mb-5 shadow-2xl transition-all duration-500"
                      style={{
                        background: `radial-gradient(circle, ${selectedTier.color}33 0%, rgba(20,20,25,0.9) 80%)`,
                        boxShadow: `0 0 35px ${selectedTier.color}40`,
                        border: `1.5px solid ${selectedTier.color}60`
                      }}
                    >
                      <div className="text-3xl font-black text-white tracking-tighter font-num">
                        222
                      </div>
                      {!callAnswered && (
                        <div
                          className="absolute inset-0 rounded-full animate-ping opacity-30"
                          style={{ borderColor: selectedTier.color, borderWidth: 1 }}
                        />
                      )}
                    </div>

                    {/* The Formatted Number */}
                    <div className="relative group">
                      <div
                        className="text-2xl sm:text-[26px] font-black tracking-wider font-num drop-shadow-md text-white transition-colors duration-300"
                        dir="ltr"
                      >
                        {selectedNumber.formatted}
                      </div>
                      <div
                        className="h-0.5 w-16 mx-auto mt-2 rounded-full transition-all duration-500"
                        style={{ backgroundColor: selectedTier.color }}
                      />
                    </div>

                    {/* Pattern & Series Badge */}
                    <div className="mt-3 flex flex-col items-center gap-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/10 backdrop-blur-md border border-white/10 text-zinc-200">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#ff7900]" />
                        <span>{selectedNumber.badge}</span>
                      </span>
                      <span className="text-[10px] text-zinc-400">
                        {selectedNumber.highlight}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Call Action Buttons */}
                  <div className="w-full flex items-center justify-around px-2 pt-2">
                    {!callAnswered ? (
                      <>
                        <div className="flex flex-col items-center gap-1">
                          <button
                            onClick={handleDeclineCall}
                            className="w-14 h-14 rounded-full bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
                          >
                            <PhoneOff className="w-6 h-6" />
                          </button>
                          <span className="text-[10px] text-zinc-400">تجاهل</span>
                        </div>

                        <div className="flex flex-col items-center gap-1">
                          <button
                            onClick={handleAnswerCall}
                            className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/40 transition-transform active:scale-95 animate-bounce cursor-pointer"
                          >
                            <Phone className="w-6 h-6" />
                          </button>
                          <span className="text-[10px] text-zinc-300 font-medium">رد VIP</span>
                        </div>
                      </>
                    ) : (
                      <div className="w-full flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium bg-emerald-950/60 px-3 py-1.5 rounded-full border border-emerald-500/30">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>متصل الآن بكونسيرج أورانج بريميير</span>
                        </div>
                        <button
                          onClick={handleDeclineCall}
                          className="w-14 h-14 mt-1 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
                        >
                          <PhoneOff className="w-6 h-6" />
                        </button>
                        <span className="text-[10px] text-zinc-400">إنهاء المكالمة</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ---------------- MODE 2: METAL ESIM CARD ---------------- */}
              {activeScreenMode === 'card' && (
                <div className="flex-1 flex flex-col justify-center items-center py-4">
                  <div
                    className="relative w-[240px] h-[360px] rounded-2xl p-5 flex flex-col justify-between shadow-2xl overflow-hidden border border-white/20 transition-all duration-500"
                    style={{
                      background: `linear-gradient(145deg, #18181b 0%, #09090b 60%, ${selectedTier.color}22 100%)`,
                      boxShadow: `0 15px 35px -5px ${selectedTier.color}35`
                    }}
                  >
                    <div className="absolute top-0 right-0 w-44 h-44 bg-white/5 rounded-full blur-2xl pointer-events-none" />

                    {/* Card Top */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-[#ff7900] font-bold">
                          Orange Premier
                        </div>
                        <div className="text-xs text-zinc-300 font-semibold mt-0.5">
                          {selectedTier.name}
                        </div>
                      </div>
                      <div className="w-9 h-7 rounded bg-gradient-to-tr from-amber-300 to-amber-500 shadow flex items-center justify-center">
                        <div className="w-7 h-5 border border-amber-900/40 rounded-xs flex flex-col justify-between p-0.5">
                          <div className="h-[1px] bg-amber-900/40" />
                          <div className="h-[1px] bg-amber-900/40" />
                        </div>
                      </div>
                    </div>

                    {/* Card Center: Embossed Number */}
                    <div className="my-auto text-center">
                      <div className="text-[10px] text-zinc-400 mb-1">VIP Assigned Line</div>
                      <div
                        className="text-xl font-bold tracking-wider font-num text-white drop-shadow"
                        dir="ltr"
                      >
                        {selectedNumber.formatted}
                      </div>
                      <div className="text-[10px] text-zinc-400 mt-1">
                        MSISDN: {selectedNumber.msisdn}
                      </div>
                      <div
                        className="text-[11px] font-semibold mt-1"
                        style={{ color: selectedTier.color }}
                      >
                        {selectedTier.price} ج.م / شهرياً
                      </div>
                    </div>

                    {/* Card Bottom */}
                    <div className="flex items-end justify-between pt-2 border-t border-white/10 text-[10px]">
                      <div>
                        <span className="text-zinc-500 block">CARDHOLDER</span>
                        <span className="text-zinc-200 font-semibold tracking-wider">PREMIER VIP</span>
                      </div>
                      <div className="text-right">
                        <span className="text-zinc-500 block">TARIFF LOCK</span>
                        <span className="text-emerald-400 font-bold">1 YEAR GUARANTEE</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-center text-xs text-zinc-400">
                    شريحة معدنية حصرية تُسلَّم لك شخصياً حتى باب منزلك
                  </div>
                </div>
              )}

              {/* ---------------- MODE 3: LOCK SCREEN ---------------- */}
              {activeScreenMode === 'lock' && (
                <div className="flex-1 flex flex-col justify-between items-center text-center py-3">
                  <div className="pt-4">
                    <div className="text-5xl font-extralight tracking-tight text-white font-num">
                      01:22
                    </div>
                    <div className="text-xs text-zinc-300 mt-1">
                      الخميس، 5 نوفمبر
                    </div>
                  </div>

                  <div className="w-full bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-3.5 text-right shadow-xl">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-[#ff7900] flex items-center justify-center text-[9px] font-bold text-black">
                          O
                        </div>
                        <span className="text-[11px] font-bold text-white">Orange Premier</span>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-num">الآن</span>
                    </div>
                    <div className="text-xs font-semibold text-zinc-100">
                      رقمك المميز مؤهل لنظام {selectedTier.name}
                    </div>
                    <div className="text-[11px] text-zinc-300 mt-0.5" dir="ltr">
                      {selectedNumber.formatted}
                    </div>
                    <div className="mt-2 text-[10px] text-[#ff7900] font-medium flex items-center justify-end gap-1">
                      <span>قفل السعر مضمون لمدة عام كامل</span>
                      <span>←</span>
                    </div>
                  </div>

                  <div className="w-28 h-1 bg-white/40 rounded-full mb-1" />
                </div>
              )}

            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="relative z-30 pb-2 flex justify-center">
              <div className="w-32 h-1 bg-zinc-600 rounded-full" />
            </div>

          </div>
        </div>

        {/* Ambient Under-glow below phone */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-12 rounded-full blur-2xl pointer-events-none transition-all duration-700 opacity-60"
          style={{ backgroundColor: selectedTier.color }}
        />
      </div>

    </div>
  );
}
