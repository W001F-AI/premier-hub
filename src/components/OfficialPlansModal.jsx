import React from 'react';
import { X, Check, Sparkles, Tv, Shield, Plane, ArrowLeft, ShieldCheck } from 'lucide-react';
import { PREMIER_TIERS } from '../data/premierData';
import { playLuxuryClick } from '../utils/sound';

export default function OfficialPlansModal({ isOpen, onClose, soundEnabled, onSelectPlanToBook }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-3xl p-6 sm:p-8 bg-[#121216] border border-white/20 shadow-2xl my-auto">
        
        {/* Close */}
        <button
          onClick={() => { playLuxuryClick(soundEnabled); onClose(); }}
          className="absolute top-6 left-6 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff7900]/20 text-[#ff7900] text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            جدول باقات أورانج بريميير الرسمية (الأسعار شاملة الضريبة)
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            تفاصيل وأسعار باقات Orange Premier
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            الأسعار التالية موضحة <span className="text-emerald-400 font-bold">شاملة ضريبة القيمة المضافة والجدول (LE / mo)</span> مع ميزة قفل السعر لعام كامل.
          </p>
        </div>

        {/* 5 Plans Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 mb-6">
          {PREMIER_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-2xl p-4 flex flex-col justify-between border transition-all ${
                tier.id === 'lite'
                  ? 'border-[#ff7900] bg-orange-950/25 ring-1 ring-[#ff7900]/40'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white uppercase">{tier.name}</span>
                  {tier.id === 'lite' && (
                    <span className="text-[9px] bg-[#ff7900] text-black font-bold px-1.5 py-0.5 rounded">المعتمد</span>
                  )}
                </div>

                {/* Price Display: Promo 50% for 6 months + After tax */}
                <div className="mb-4 pb-3 border-b border-white/10">
                  <span className="inline-block text-[9px] font-black text-[#ff7900] bg-orange-500/15 px-2 py-0.5 rounded-md border border-orange-500/30 mb-1">
                    خصم 50% لأول 6 شهور
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs line-through text-zinc-500 font-num">
                      {tier.price}
                    </span>
                    <div className="text-2xl font-black text-amber-300 font-num">
                      {tier.promoPrice} <span className="text-xs font-sans">ج.م</span>
                    </div>
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">
                    أول 6 شهور • ثم {tier.price} ج.م شهرياً
                  </div>
                  <div className="text-[9px] text-zinc-500 font-num">
                    (السعر شامل الضريبة)
                  </div>
                </div>

                <div className="space-y-2 text-[11px] text-zinc-300">
                  <div>
                    <span className="text-zinc-500 block text-[10px]">الدقائق:</span>
                    <strong className="text-white">{tier.minutes}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">الإنترنت:</span>
                    <strong className="text-white">{tier.internet}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">عائلة Premier:</span>
                    <strong className="text-white">{tier.family}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">خصم النت المنزلي:</span>
                    <span className="text-emerald-400 font-semibold">{tier.dslDiscount}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">الدولي والتجوال:</span>
                    <span>{tier.intlMinutes} • {tier.roaming}</span>
                  </div>
                </div>
              </div>

              {/* Entertainment Highlights */}
              <div className="mt-4 pt-3 border-t border-white/10 space-y-1">
                {tier.entertainment.slice(0, 2).map((e, idx) => (
                  <div key={idx} className="text-[10px] text-zinc-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff7900]" />
                    <span className="font-semibold text-white">{e.name}:</span>
                    <span className="text-zinc-400 truncate">{e.duration}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  onSelectPlanToBook(tier);
                  onClose();
                }}
                className="mt-4 w-full py-2 rounded-xl bg-white/10 hover:bg-[#ff7900] hover:text-black text-white text-xs font-bold transition-all cursor-pointer"
              >
                اختيار ({tier.price} ج.م)
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Guarantee */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>الحد الأقصى لتقسيط الأجهزة: حتى 150,000 جنيه على جميع الباقات مع قفل السعر لعام كامل.</span>
          </div>

          <button
            onClick={() => { playLuxuryClick(soundEnabled); onClose(); }}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
}
