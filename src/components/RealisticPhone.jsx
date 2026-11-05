import React, { useState, useEffect, useRef } from 'react';
import { Phone, PhoneOff, PhoneCall, Wifi, Battery, CreditCard, Lock, CheckCircle2, Flashlight, Camera } from 'lucide-react';
import { playLuxuryClick, playChime } from '../utils/sound';

export default function RealisticPhone({
  selectedNumber,
  selectedTier,
  soundEnabled,
  themeColor
}) {
  const [screenMode, setScreenMode] = useState('call'); // 'call' | 'lock' | 'card'
  const [callAnswered, setCallAnswered] = useState(false);
  const [callTimer, setCallTimer] = useState(0);

  // Parallax rotation state
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const containerRef = useRef(null);

  useEffect(() => {
    setCallAnswered(false);
    setCallTimer(0);
  }, [selectedNumber, selectedTier]);

  useEffect(() => {
    let interval = null;
    if (callAnswered) {
      interval = setInterval(() => setCallTimer(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [callAnswered]);

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handlePointerMove = (clientX, clientY) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 10;
    const rotY = ((x - centerX) / centerX) * 12;
    const glareX = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const glareY = Math.max(0, Math.min(100, (y / rect.height) * 100));

    setTilt({ x: rotX, y: rotY, glareX, glareY });
  };

  const handleMouseMove = (e) => handlePointerMove(e.clientX, e.clientY);

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleResetTilt = () => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleResetTilt}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleResetTilt}
      className="relative flex flex-col items-center justify-center py-2 select-none perspective-[1400px] w-full max-w-[340px] sm:max-w-[370px] touch-pan-y"
    >
      {/* ---------------- MODE TABS ---------------- */}
      <div className="flex items-center gap-1 p-1 mb-3 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 shadow-lg z-30">
        <button
          onClick={() => { playLuxuryClick(soundEnabled); setScreenMode('call'); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-300 cursor-pointer ${
            screenMode === 'call'
              ? 'bg-[#ff7900] text-black shadow-md font-bold scale-105'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <PhoneCall className="w-3 h-3" />
          <span>مكالمة</span>
        </button>

        <button
          onClick={() => { playLuxuryClick(soundEnabled); setScreenMode('lock'); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-300 cursor-pointer ${
            screenMode === 'lock'
              ? 'bg-[#ff7900] text-black shadow-md font-bold scale-105'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Lock className="w-3 h-3" />
          <span>شاشة القفل</span>
        </button>

        <button
          onClick={() => { playLuxuryClick(soundEnabled); setScreenMode('card'); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-300 cursor-pointer ${
            screenMode === 'card'
              ? 'bg-[#ff7900] text-black shadow-md font-bold scale-105'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <CreditCard className="w-3 h-3" />
          <span>الشريحة</span>
        </button>
      </div>

      {/* ---------------- PHOTOREALISTIC iPHONE 17 PRO MAX COSMIC ORANGE ---------------- */}
      <div
        className="relative transition-transform duration-200 ease-out preserve-3d"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {/* Outer Titanium Chassis (Anodized Cosmic Orange) */}
        <div
          className="relative w-[275px] sm:w-[320px] h-[570px] sm:h-[650px] rounded-[52px] sm:rounded-[56px] p-[8px] sm:p-[10px] shadow-[0_30px_70px_rgba(0,0,0,0.9)] transition-all duration-500"
          style={{
            background: 'linear-gradient(140deg, #f97316 0%, #ea580c 20%, #9a3412 45%, #ff7900 65%, #7c2d12 85%, #c2410c 100%)',
            boxShadow: `0 35px 85px -15px rgba(0,0,0,0.95), 0 0 50px rgba(255,121,0,0.4), inset 0 1.5px 2px rgba(255,220,180,0.8), inset 0 -2px 3px rgba(0,0,0,0.8)`
          }}
        >
          {/* Antenna Bands (Laser Cut Ceramic Bands) */}
          <div className="absolute top-[80px] -left-[2px] w-[3px] h-[6px] bg-black/40" />
          <div className="absolute top-[80px] -right-[2px] w-[3px] h-[6px] bg-black/40" />
          <div className="absolute bottom-[80px] -left-[2px] w-[3px] h-[6px] bg-black/40" />
          <div className="absolute bottom-[80px] -right-[2px] w-[3px] h-[6px] bg-black/40" />

          {/* Physical Side Buttons (Orange Anodized Metal) */}
          <div className="absolute -left-[3px] top-[110px] w-[3px] h-[22px] bg-orange-600 rounded-l-xs shadow" />
          <div className="absolute -left-[3px] top-[150px] w-[3px] h-[45px] bg-orange-600 rounded-l-xs shadow" />
          <div className="absolute -left-[3px] top-[205px] w-[3px] h-[45px] bg-orange-600 rounded-l-xs shadow" />
          <div className="absolute -right-[3px] top-[155px] w-[3px] h-[68px] bg-orange-600 rounded-r-xs shadow" />
          {/* iPhone 17 Pro Camera Control Button */}
          <div className="absolute -right-[3px] top-[300px] w-[3px] h-[50px] bg-orange-950 rounded-r-xs border-l border-orange-400/60" />

          {/* OLED Display Screen (1.2mm ultra-slim black bezel) */}
          <div className="relative w-full h-full rounded-[44px] sm:rounded-[48px] overflow-hidden bg-black flex flex-col justify-between border-[2px] border-black shadow-inner">
            
            {/* Dynamic Glass Specular Glare Layer */}
            <div
              className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.02) 40%, transparent 65%)`
              }}
            />

            {/* Apple Earpiece Slit */}
            <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-12 h-[2.5px] bg-zinc-800 rounded-full z-40" />

            {/* Status Bar & Dynamic Island */}
            <div className="relative z-30 pt-2.5 sm:pt-3 px-5 sm:px-6 flex items-center justify-between text-[11px] text-zinc-300 font-semibold font-num">
              <span>01:22</span>

              {/* Dynamic Island with Optical Camera Coating reflection */}
              <div className="h-[24px] w-[95px] bg-black rounded-full flex items-center justify-between px-2.5 border border-zinc-800 shadow-md">
                <div className="w-2 h-2 rounded-full bg-[#ff7900] animate-pulse" />
                <span className="text-[8px] font-bold text-[#ff7900] tracking-wider font-num">PREMIER</span>
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-700 relative overflow-hidden flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-cyan-400/80" />
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[9px] text-[#ff7900] font-black font-num">5G</span>
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-4 h-4 fill-white" />
              </div>
            </div>

            {/* Screen Content Depending on Mode */}
            <div className="relative z-20 flex-1 flex flex-col justify-between p-4 sm:p-5 pt-2">
              
              {/* ---------------- 1. INCOMING CALL MODE ---------------- */}
              {screenMode === 'call' && (
                <div className="flex-1 flex flex-col justify-between items-center text-center py-2 animate-fade-in">
                  
                  {/* Top Caller Header */}
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] uppercase tracking-widest text-[#ff7900] font-bold mb-1">
                      Orange Premier
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-wide">
                      {callAnswered ? 'مكالمة جارية' : 'اتصال وارد'}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5 font-num">
                      {callAnswered ? formatTimer(callTimer) : `${selectedTier.name} • ${selectedTier.price} L.E/mo`}
                    </p>
                  </div>

                  {/* Center Monogram & Crisp Number */}
                  <div className="my-auto flex flex-col items-center">
                    
                    {/* 3D Glowing PREMIER Logo Avatar (Replaced 'O') */}
                    <div className="w-24 h-16 sm:w-28 sm:h-18 rounded-2xl bg-gradient-to-b from-zinc-900 to-black border border-orange-500/40 flex flex-col items-center justify-center mb-3 sm:mb-4 shadow-[0_0_30px_rgba(255,121,0,0.4)] relative overflow-hidden group">
                      {/* Ambient Orange Shimmer */}
                      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#ff7900] to-transparent" />
                      <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#ff7900]/20 rounded-full blur-xl pointer-events-none" />

                      {/* Micro Orange Brand Marker */}
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className="w-2 h-2 rounded-xs bg-[#ff7900] shadow-[0_0_8px_#ff7900]" />
                        <span className="text-[8px] uppercase tracking-widest text-zinc-400 font-bold font-num">ORANGE</span>
                      </div>

                      {/* Bold 3D Metallic PREMIER Text */}
                      <span
                        className="font-black text-xs sm:text-sm tracking-[0.18em] uppercase font-sans text-white"
                        style={{
                          textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 15px rgba(255,121,0,0.6)',
                          background: 'linear-gradient(180deg, #FFFFFF 0%, #E4E4E7 60%, #A1A1AA 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}
                      >
                        PREMIER
                      </span>
                    </div>

                    {/* Formatted Number in Clean Apple Typography */}
                    <div
                      className="text-2xl sm:text-[27px] font-bold tracking-wider font-num text-white"
                      dir="ltr"
                    >
                      {selectedNumber.formatted}
                    </div>

                    <div className="h-0.5 w-14 mx-auto mt-2 rounded-full bg-[#ff7900]" />

                    <span className="text-[10px] text-zinc-400 mt-2 font-num">
                      MSISDN: {selectedNumber.msisdn}
                    </span>
                  </div>

                  {/* Minimal Call Buttons */}
                  <div className="w-full flex items-center justify-around px-3 sm:px-4 pt-1">
                    {!callAnswered ? (
                      <>
                        <div className="flex flex-col items-center gap-1.5">
                          <button
                            onClick={() => {
                              playLuxuryClick(soundEnabled);
                              setCallAnswered(false);
                            }}
                            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
                          >
                            <PhoneOff className="w-5 h-5 sm:w-6 sm:h-6" />
                          </button>
                          <span className="text-[10px] text-zinc-400">رفض</span>
                        </div>

                        <div className="flex flex-col items-center gap-1.5">
                          <button
                            onClick={() => {
                              playChime(soundEnabled);
                              setCallAnswered(true);
                            }}
                            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
                          >
                            <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                          </button>
                          <span className="text-[10px] text-zinc-300 font-medium">رد</span>
                        </div>
                      </>
                    ) : (
                      <div className="w-full flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium bg-emerald-950/60 px-3 py-1.5 rounded-full border border-emerald-500/30">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>متصل بـ Orange Premier</span>
                        </div>
                        <button
                          onClick={() => {
                            playLuxuryClick(soundEnabled);
                            setCallAnswered(false);
                            setCallTimer(0);
                          }}
                          className="w-13 h-13 sm:w-14 sm:h-14 mt-1 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-lg cursor-pointer"
                        >
                          <PhoneOff className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* ---------------- 2. CLEAN iPHONE LOCK SCREEN ---------------- */}
              {screenMode === 'lock' && (
                <div className="flex-1 flex flex-col justify-between items-center text-center py-2 animate-fade-in">
                  <div className="pt-2 sm:pt-3">
                    <div className="text-4xl sm:text-5xl font-light tracking-tight text-white font-num">
                      01:22
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">
                      الخميس، 5 نوفمبر
                    </div>
                  </div>

                  <div className="w-full bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-3 sm:p-3.5 text-right shadow-lg">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3.5 h-3.5 rounded bg-[#ff7900] flex items-center justify-center text-[8px] font-bold text-black">
                          O
                        </div>
                        <span className="text-[11px] font-bold text-white">Orange Premier</span>
                      </div>
                      <span className="text-[9px] text-zinc-400 font-num">الآن</span>
                    </div>

                    <div className="text-xs font-semibold text-zinc-200">
                      رقمك المخصص بنظام {selectedTier.name}
                    </div>

                    <div className="text-sm sm:text-base font-bold text-white mt-0.5 font-num" dir="ltr">
                      {selectedNumber.formatted}
                    </div>

                    <div className="text-[10px] text-amber-300 font-num mt-0.5">
                      {selectedTier.price} L.E / mo (شامل الضريبة)
                    </div>
                  </div>

                  <div className="w-full flex items-center justify-between px-2 pt-1 text-white/70">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                      <Flashlight className="w-4 h-4" />
                    </div>
                    <div className="w-20 sm:w-24 h-1 bg-white/30 rounded-full" />
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                      <Camera className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- 3. MINIMAL eSIM CARD ---------------- */}
              {screenMode === 'card' && (
                <div className="flex-1 flex flex-col justify-center items-center py-3 animate-fade-in">
                  <div
                    className="relative w-[210px] sm:w-[230px] h-[310px] sm:h-[340px] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-2xl overflow-hidden border border-orange-500/20 bg-zinc-950"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-[#ff7900] font-bold font-num">
                          Orange Premier
                        </div>
                        <div className="text-xs text-zinc-300 font-semibold mt-0.5">
                          {selectedTier.name}
                        </div>
                      </div>
                      <div className="w-8 h-6 rounded bg-amber-400 flex items-center justify-center">
                        <div className="w-6 h-4 border border-amber-900/40 rounded-xs" />
                      </div>
                    </div>

                    <div className="my-auto text-center">
                      <div className="text-[10px] text-zinc-400 mb-1">VIP Assigned Line</div>
                      <div
                        className="text-lg sm:text-xl font-bold tracking-wider font-num text-white"
                        dir="ltr"
                      >
                        {selectedNumber.formatted}
                      </div>
                      <div className="text-[10px] text-zinc-500 font-num mt-1">
                        MSISDN: {selectedNumber.msisdn}
                      </div>
                      <div className="text-xs font-semibold text-amber-300 mt-2 font-num">
                        {selectedTier.price} L.E / mo
                      </div>
                    </div>

                    <div className="flex items-end justify-between pt-2 border-t border-white/10 text-[9px] text-zinc-400">
                      <span>PREMIER CLIENT</span>
                      <span className="text-emerald-400 font-bold">1-YEAR TARIFF LOCK</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="relative z-30 pb-2 flex justify-center">
              <div className="w-28 sm:w-32 h-1 bg-zinc-600 rounded-full" />
            </div>

          </div>
        </div>

        {/* Studio Floor Contact Shadow */}
        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-[85%] h-8 bg-black/70 blur-xl rounded-full pointer-events-none" />
      </div>

    </div>
  );
}
