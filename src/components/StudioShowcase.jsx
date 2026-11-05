import React, { useState } from 'react';
import { ArrowUpRight, Volume2, VolumeX, ShieldCheck, MessageSquare, ChevronRight, ChevronLeft, Sliders, LayoutGrid, Database, CreditCard } from 'lucide-react';
import RealisticPhone from './RealisticPhone';
import StudioEnvironment from './StudioEnvironment';
import OrangePremierLogo from './OrangePremierLogo';
import GlowingWolfLogo from './GlowingWolfLogo';
import { playLuxuryClick, playChime } from '../utils/sound';

export default function StudioShowcase({
  shades,
  currentShade,
  onSelectShade,
  onOpenBooking,
  soundEnabled,
  onToggleSound,
  onOpenSpecs,
  onOpenCatalog,
  onOpenAdmin,
  onOpenVipCard,
  activeView,
  numbersCount
}) {
  const currentIndex = shades.findIndex(s => s.id === currentShade.id);

  const handleNext = () => {
    playLuxuryClick(soundEnabled);
    const nextIndex = (currentIndex + 1) % shades.length;
    onSelectShade(shades[nextIndex]);
  };

  const handlePrev = () => {
    playLuxuryClick(soundEnabled);
    const prevIndex = (currentIndex - 1 + shades.length) % shades.length;
    onSelectShade(shades[prevIndex]);
  };

  const handleDirectWhatsApp = () => {
    playChime(soundEnabled);
    const promoPrice = currentShade.promoPrice || Math.round(currentShade.price / 2);
    const message = encodeURIComponent(
      `مرحباً Mohamed Issa، أود حجز وتفعيل الرقم التالي بعرض خصم الـ 50% لأول 6 شهور:\n\n` +
      `• الرقم: ${currentShade.number}\n` +
      `• النظام: ${currentShade.tierName}\n` +
      `• عرض أول 6 شهور: ${promoPrice} ج.م شهرياً (خصم 50% شامل الضريبة)\n` +
      `• بعد 6 شهور: ${currentShade.price} ج.م شهرياً شامل الضريبة\n` +
      `• كود الشريحة: MSISDN ${currentShade.msisdn}\n` +
      `• تثبيت السعر: لعام كامل (Tariff Lock)`
    );
    window.open(`https://api.whatsapp.com/send/?phone=201205979779&text=${message}`, '_blank');
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden select-none">
      
      {/* ---------------- 3D STUDIO LIGHTING & PEDESTAL ---------------- */}
      <StudioEnvironment currentShade={currentShade} />

      {/* ---------------- TOP SLEEK NAVIGATION BAR WITH TABS ---------------- */}
      <header className="relative z-30 w-full px-6 sm:px-12 py-5 flex items-center justify-between text-white">
        
        {/* 3D Glowing Orange Premier Logo */}
        <OrangePremierLogo size="default" />

        {/* Center Navigation Tabs (Studio, Bento Catalog, Plans, Admin) */}
        <nav className="hidden md:flex items-center gap-2 p-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg">
          <button
            onClick={() => playLuxuryClick(soundEnabled)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeView === 'studio'
                ? 'bg-white text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            الرئيسية
          </button>

          <button
            onClick={() => { playLuxuryClick(soundEnabled); onOpenCatalog(); }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeView === 'catalog'
                ? 'bg-white text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 text-[#ff7900]" />
            <span>كتالوج الأرقام</span>
            <span className="text-[10px] bg-white/15 px-1.5 py-0.2 rounded-full font-num">
              {numbersCount}
            </span>
          </button>

          <button
            onClick={() => { playLuxuryClick(soundEnabled); onOpenSpecs(); }}
            className="px-4 py-1.5 rounded-full text-xs font-bold text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            باقات Premier
          </button>

          <button
            onClick={() => { playLuxuryClick(soundEnabled); onOpenVipCard(); }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-300 hover:text-amber-200 hover:bg-amber-500/10 transition-all cursor-pointer border border-amber-500/30"
          >
            <CreditCard className="w-3.5 h-3.5 text-amber-400" />
            <span>بطاقة VIP</span>
          </button>

          <button
            onClick={() => { playLuxuryClick(soundEnabled); onOpenAdmin(); }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-400 hover:text-amber-300 hover:bg-amber-400/10 transition-all cursor-pointer border border-amber-400/20"
          >
            <Database className="w-3.5 h-3.5" />
            <span>لوحة الأدمن</span>
          </button>
        </nav>

        {/* Right WhatsApp & Sound Controls */}
        <div className="flex items-center gap-2.5">
          {/* Mobile Admin, VIP Card & Catalog Shortcuts */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              onClick={() => { playLuxuryClick(soundEnabled); onOpenVipCard(); }}
              className="p-2 rounded-full bg-black/30 border border-amber-500/30 text-amber-300"
              title="بطاقة VIP"
            >
              <CreditCard className="w-4 h-4" />
            </button>
            <button
              onClick={() => { playLuxuryClick(soundEnabled); onOpenCatalog(); }}
              className="p-2 rounded-full bg-black/30 border border-white/15 text-white"
            >
              <LayoutGrid className="w-4 h-4 text-[#ff7900]" />
            </button>
            <button
              onClick={() => { playLuxuryClick(soundEnabled); onOpenAdmin(); }}
              className="p-2 rounded-full bg-black/30 border border-amber-500/30 text-amber-400"
            >
              <Database className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'كتم الصوت' : 'تشغيل الصوت'}
            className="p-2.5 rounded-full bg-black/30 backdrop-blur-md hover:bg-black/45 border border-white/10 text-white/80 transition-all cursor-pointer shadow-md"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#ff7900]" /> : <VolumeX className="w-4 h-4 text-white/40" />}
          </button>

          <button
            onClick={handleDirectWhatsApp}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600/95 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">حجز واتساب</span>
            <span className="sm:hidden">واتساب</span>
          </button>
        </div>

      </header>

      {/* ---------------- HERO BRANDING TAGLINE ---------------- */}
      <div className="relative z-20 text-center pt-1 pb-0 px-4">
        <div className="inline-flex items-center justify-center gap-2 mb-1">
          <div className="w-5 h-5 rounded-md bg-[#ff7900] shadow-[0_0_15px_rgba(255,121,0,0.5)] flex items-center justify-center text-[10px] font-black text-black">
            O
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-white font-extrabold font-num">
            ORANGE PREMIER
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-num">
          NUMBERS & TARIFF PLANS
        </h1>
        <p className="text-xs text-white/70 mt-1 max-w-md mx-auto">
          اختيار مباشر لأرقام وباقات Premier الرسمية مع التوصيل والتفعيل الفوري
        </p>
      </div>

      {/* ---------------- CENTER STAGE: ONLY THE iPHONE 17 PRO MAX & CAPSULE ---------------- */}
      <div className="relative z-20 flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-6 sm:px-14 lg:px-20 max-w-7xl mx-auto w-full my-auto py-2">
        
        {/* Left / Center: iPhone 17 Pro Max Cosmic Orange with Next/Prev Arrows */}
        <div className="flex flex-col items-center justify-center relative">
          
          <div className="relative flex items-center">
            
            {/* Quick Prev Number Arrow */}
            <button
              onClick={handlePrev}
              title="الرقم السابق"
              className="hidden sm:flex -left-12 absolute z-30 p-2.5 rounded-full bg-black/40 hover:bg-black/70 border border-white/15 text-white/70 hover:text-white backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-xl"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Photorealistic iPhone 17 Pro Max */}
            <RealisticPhone
              selectedNumber={{
                formatted: currentShade.number,
                msisdn: currentShade.msisdn
              }}
              selectedTier={{
                name: currentShade.tierName,
                price: currentShade.price
              }}
              soundEnabled={soundEnabled}
              themeColor={currentShade.swatchColor}
            />

            {/* Quick Next Number Arrow */}
            <button
              onClick={handleNext}
              title="الرقم التالي"
              className="hidden sm:flex -right-12 absolute z-30 p-2.5 rounded-full bg-black/40 hover:bg-black/70 border border-white/15 text-white/70 hover:text-white backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-xl"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

          </div>

          {/* Minimalist Mobile Step Indicator */}
          <div className="flex sm:hidden items-center gap-4 mt-2">
            <button
              onClick={handlePrev}
              className="px-3 py-1.5 rounded-full bg-black/40 text-xs font-semibold text-white/80 border border-white/15"
            >
              ← السابق
            </button>
            <span className="text-xs text-zinc-400 font-num">
              {currentIndex + 1} / {shades.length}
            </span>
            <button
              onClick={handleNext}
              className="px-3 py-1.5 rounded-full bg-black/40 text-xs font-semibold text-white/80 border border-white/15"
            >
              التالي →
            </button>
          </div>

        </div>

        {/* Right Side: Clean Floating Glass Capsule */}
        <div className="w-full lg:w-[390px] flex justify-center">
          <div className="w-full max-w-sm rounded-[32px] p-6 sm:p-7 bg-black/60 backdrop-blur-2xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.7)] flex flex-col gap-4 text-white transition-all duration-500">
            
            {/* Header: Number, Plan & 50% Discount Price */}
            <div>
              <div className="flex items-center justify-between text-xs text-white/70 mb-1.5">
                <span className="text-[11px] font-bold text-[#ff7900] uppercase tracking-wider">
                  {currentShade.tierName}
                </span>
                
                {/* 50% Discount Glowing Badge */}
                <span className="text-[10px] text-amber-300 font-extrabold bg-gradient-to-r from-orange-500/20 to-amber-500/20 px-2.5 py-0.5 rounded-full border border-orange-500/40 shadow-sm flex items-center gap-1">
                  <span>خصم 50% لأول 6 شهور</span>
                </span>
              </div>

              <div className="flex items-baseline justify-between gap-2 mt-1">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-num" dir="ltr">
                  {currentShade.number}
                </h2>
                <div className="text-right">
                  <div className="flex items-baseline gap-1.5 justify-end">
                    <span className="text-xs line-through text-zinc-500 font-num">
                      {currentShade.price}
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-amber-300 font-num">
                      {currentShade.promoPrice || Math.round(currentShade.price / 2)} <span className="text-xs font-sans">ج.م</span>
                    </div>
                  </div>
                  <div className="text-[10px] text-zinc-400">
                    أول 6 أشهر • ثم {currentShade.price} ج.م شهرياً
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed">
                {currentShade.shortSpecs}
              </p>
            </div>

            {/* 6 Circular Swatches */}
            <div>
              <span className="text-[10px] uppercase tracking-wider text-zinc-400 block mb-2 font-medium">
                تغيير الرقم ولون الاستوديو:
              </span>
              <div className="flex items-center justify-between gap-1.5 p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
                {shades.map((shade) => {
                  const isSelected = shade.id === currentShade.id;
                  return (
                    <button
                      key={shade.id}
                      onClick={() => {
                        playLuxuryClick(soundEnabled);
                        onSelectShade(shade);
                      }}
                      className={`relative w-8 h-8 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center ${
                        isSelected
                          ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110'
                          : 'hover:scale-105 opacity-75 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: shade.swatchColor }}
                      title={`${shade.name} - ${shade.number}`}
                    >
                      {isSelected && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white shadow" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleDirectWhatsApp}
                className="flex-1 py-3.5 px-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs tracking-wide transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2 shadow-xl"
              >
                <MessageSquare className="w-4 h-4 text-black" />
                <span>حجز عبر واتساب</span>
                <span className="font-num font-bold">({currentShade.price} L.E)</span>
              </button>

              <button
                onClick={() => {
                  playLuxuryClick(soundEnabled);
                  onOpenSpecs();
                }}
                className="py-3.5 px-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-medium text-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1 shrink-0"
              >
                <span>الباقات</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Open Bento Catalog Link */}
            <button
              onClick={() => {
                playLuxuryClick(soundEnabled);
                onOpenCatalog();
              }}
              className="text-[11px] text-center text-zinc-300 hover:text-white py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>استعراض كافة أرقام الكتالوج ({numbersCount} رقماً)</span>
              <span>←</span>
            </button>

            {/* Tariff Lock Guarantee Pill */}
            <div className="text-[10px] text-center text-zinc-300 bg-white/5 py-1.5 px-3 rounded-full border border-white/10 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>مؤهل لنظام Premier Lite مع تثبيت السعر لعام كامل</span>
            </div>

          </div>
        </div>

      </div>

      {/* ---------------- MOHAMED ISSA SIGNATURE FOOTER WITH GLOWING 3D WOLF ---------------- */}
      <footer className="relative z-30 py-5 px-6 sm:px-12 border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Brand Info */}
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-[#ff7900] animate-pulse" />
            <span>Orange Premier • VIP Digital Flagship System</span>
          </div>

          {/* Mohamed Issa Signature + 3D Glowing Wolf Linked to WhatsApp */}
          <a
            href="https://api.whatsapp.com/send/?phone=201205979779&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            title="تواصل مباشر مع Mohamed Issa على واتساب"
            className="group inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/40 transition-all duration-300 shadow-lg cursor-pointer"
          >
            {/* 3D Glowing Wolf Logo */}
            <GlowingWolfLogo size={30} />

            <div className="flex flex-col text-right">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-zinc-400 font-medium">Designed & Powered by</span>
                <span className="text-xs sm:text-sm font-black text-white group-hover:text-[#ff7900] tracking-wider transition-colors font-num">
                  Mohamed Issa
                </span>
              </div>
              <span className="text-[9px] text-[#ff7900] font-semibold tracking-wide flex items-center gap-1">
                <span>تواصل VIP عبر واتساب</span>
                <span className="font-num text-[10px]">01205979779</span>
              </span>
            </div>
          </a>

        </div>
      </footer>

    </div>
  );
}
