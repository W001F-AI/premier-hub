import React from 'react';
import { Sparkles, Phone, Wifi, Users, Router, CreditCard, Globe, Tv, ArrowLeft, ShieldCheck, Plane, Gift } from 'lucide-react';
import { playLuxuryClick, playChime } from '../utils/sound';

export default function DetailsCard({
  selectedNumber,
  selectedTier,
  tiers,
  onSelectTier,
  onBookNow,
  soundEnabled
}) {
  return (
    <div className="w-full max-w-xl glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-white/10 shadow-2xl relative overflow-hidden transition-all duration-500">
      
      {/* Decorative gradient background pulse */}
      <div
        className="absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-20"
        style={{ backgroundColor: selectedTier.color }}
      />

      <div>
        {/* Tier Selector Horizontal Pills inside the Card */}
        <div className="mb-5">
          <div className="text-[11px] text-zinc-400 font-medium mb-2 flex items-center justify-between">
            <span>اختر باقة Premier للرقم:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              قفل السعر لمدة سنة
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/10">
            {tiers.map((t) => {
              const isCurrent = selectedTier.id === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    playLuxuryClick(soundEnabled);
                    onSelectTier(t);
                  }}
                  className={`py-2 px-1 rounded-xl text-center transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? 'bg-white/15 text-white shadow-md border border-white/20'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="text-[11px] font-bold truncate">{t.name.replace('Premier ', '')}</div>
                  <div className="text-[10px] font-num font-semibold text-zinc-300">{t.price} ج.م</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Line & Tier Summary */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span
            className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1.5"
            style={{
              backgroundColor: `${selectedTier.color}20`,
              color: selectedTier.color,
              border: `1px solid ${selectedTier.color}40`
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {selectedTier.name}
          </span>
          <span className="text-xs text-zinc-400">
            MSISDN: <span className="font-num text-zinc-300">{selectedNumber.msisdn}</span>
          </span>
        </div>

        {/* Big Formatted Number */}
        <div className="my-3">
          <h2
            className="text-3xl sm:text-4xl font-black tracking-wider text-white font-num"
            dir="ltr"
          >
            {selectedNumber.formatted}
          </h2>
          <div className="flex items-center gap-2 mt-1 text-xs text-zinc-400">
            <span className="text-amber-400 font-semibold">{selectedNumber.badge}</span>
            <span>•</span>
            <span>{selectedNumber.pattern}</span>
          </div>
        </div>

        {/* Pricing Box */}
        <div className="flex items-baseline gap-2 pb-4 border-b border-white/10">
          <span className="text-3xl font-extrabold text-white font-num">
            {selectedTier.price}
          </span>
          <span className="text-sm font-semibold text-[#ff7900]">جنية مصري</span>
          <span className="text-xs text-zinc-500 mr-2">/ {selectedTier.priceNote}</span>
        </div>

        {/* Core Specs Grid */}
        <div className="py-4 grid grid-cols-2 gap-3 text-xs border-b border-white/10">
          <div className="flex items-start gap-2.5 text-zinc-200">
            <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
              <Phone className="w-3.5 h-3.5 text-[#ff7900]" />
            </div>
            <div>
              <span className="text-zinc-400 block text-[10px]">دقائق لكل الشبكات</span>
              <span className="font-bold">{selectedTier.minutes}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-zinc-200">
            <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
              <Wifi className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <div>
              <span className="text-zinc-400 block text-[10px]">موبايل إنترنت</span>
              <span className="font-bold">{selectedTier.internet}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-zinc-200">
            <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
              <Users className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div>
              <span className="text-zinc-400 block text-[10px]">أفراد عائلة PREMIER</span>
              <span className="font-bold">{selectedTier.family}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-zinc-200">
            <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
              <Router className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div>
              <span className="text-zinc-400 block text-[10px]">خصم إنترنت منزلي</span>
              <span className="font-bold text-[11px]">{selectedTier.dslDiscount}</span>
            </div>
          </div>
        </div>

        {/* Exclusive Benefits & 3 New Perks */}
        <div className="py-3">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
            الاشتراكات والمميزات الجديدة الحصرية:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {selectedTier.entertainment.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-zinc-200"
              >
                <Tv className="w-3 h-3 text-[#ff7900]" />
                <span className="font-bold text-white">{item.name}:</span>
                <span className="text-zinc-300">{item.duration}</span>
              </span>
            ))}
          </div>
        </div>

        {/* International & Roaming Note */}
        <div className="pb-3 text-[11px] text-zinc-400 flex items-center justify-between border-t border-white/5 pt-2">
          <span>التجوال: {selectedTier.roaming}</span>
          <span className="font-medium text-zinc-300">{selectedTier.installmentLimit}</span>
        </div>
      </div>

      {/* Primary Booking CTA Button */}
      <div className="pt-2">
        <button
          onClick={() => {
            playChime(soundEnabled);
            onBookNow(selectedNumber, selectedTier);
          }}
          className="relative group w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#ff7900] via-orange-500 to-[#ff7900] text-black font-bold text-sm tracking-wide shadow-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-orange-500/30 hover:scale-[1.01] active:scale-[0.99]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer pointer-events-none" />

          <div className="relative flex items-center justify-center gap-2">
            <span>تأكيد حجز الرقم على باقة {selectedTier.name}</span>
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </div>
        </button>

        <p className="text-[11px] text-center text-zinc-500 mt-2">
          مؤهل للباقة مع ميزة One Year Tariff Lock وتوصيل مجاني للـ SIM
        </p>
      </div>

    </div>
  );
}
