import React from 'react';
import { ArrowUpRight, MessageSquare } from 'lucide-react';
import { playLuxuryClick } from '../utils/sound';

export default function CatalogGrid({
  numbers,
  selectedNumber,
  selectedTier,
  onSelectNumber,
  onBookNow,
  soundEnabled
}) {
  const handleQuickWhatsApp = (item) => {
    const message = encodeURIComponent(
      `مرحباً Orange Premier، أود حجز وتفعيل الرقم التالي:\n` +
      `• الرقم: ${item.formatted} (MSISDN: ${item.msisdn})\n` +
      `• الباقة: ${selectedTier.name} (${selectedTier.price} L.E / mo شامل الضريبة)\n` +
      `• تثبيت السعر: لمدة عام كامل (One Year Tariff Lock)`
    );
    window.open(`https://api.whatsapp.com/send/?phone=201205979779&text=${message}`, '_blank');
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-white/10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-10">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#ff7900] block mb-1">
            Orange Premier • Inventory
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            الأرقام المتاحة للتفعيل
          </h2>
        </div>
        <div className="text-xs text-zinc-400 max-w-md">
          جميع الأرقام مؤهلة لنظام <span className="text-white font-semibold">Premier Lite ({selectedTier.price} L.E / mo شامل الضريبة)</span> مع ميزة قفل السعر لعام كامل.
        </div>
      </div>

      {/* Grid of 20 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {numbers.map((item) => {
          const isSelected = selectedNumber.id === item.id || selectedNumber.formatted === item.formatted;
          return (
            <div
              key={item.id}
              onClick={() => {
                playLuxuryClick(soundEnabled);
                onSelectNumber(item);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`group relative rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer overflow-hidden border ${
                isSelected
                  ? 'border-white/40 ring-1 ring-[#ff7900] bg-zinc-900 shadow-xl'
                  : 'border-white/10 hover:border-white/20 bg-[#121216]'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/10 text-zinc-300">
                    {item.series}
                  </span>
                  
                  <span className="text-[10px] text-zinc-400 font-num">
                    MSISDN: {item.msisdn}
                  </span>
                </div>

                {/* Formatted Number */}
                <div className="mb-3">
                  <div
                    className="text-xl sm:text-2xl font-bold text-white tracking-wider font-num transition-colors group-hover:text-[#ff7900]"
                    dir="ltr"
                  >
                    {item.formatted}
                  </div>
                </div>

                <div className="text-xs text-zinc-400 mb-3 pb-2 border-b border-white/5 flex items-center justify-between">
                  <span>{item.highlight || item.series}</span>
                  <span className="text-xs font-semibold text-amber-300 font-num">
                    {selectedTier.price} L.E/mo
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-zinc-400 group-hover:text-white transition-colors flex items-center gap-1 text-[11px]">
                  <span>معاينة</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#ff7900]" />
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuickWhatsApp(item);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>واتساب</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
