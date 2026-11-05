import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, MessageSquare } from 'lucide-react';
import { playLuxuryClick, playChime } from '../utils/sound';

export default function BookingModal({
  numberItem,
  selectedTier,
  isOpen,
  onClose,
  soundEnabled
}) {
  const [name, setName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [city, setCity] = useState('القاهرة - التجمع الخامس');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !numberItem || !selectedTier) return null;

  const getWhatsAppUrl = () => {
    const message = encodeURIComponent(
      `مرحباً Orange Premier، أود حجز وتفعيل الرقم التالي:\n` +
      `• الرقم: ${numberItem.formatted} (MSISDN: ${numberItem.msisdn})\n` +
      `• الباقة: ${selectedTier.name}\n` +
      `• السعر: ${selectedTier.price} L.E / mo شامل الضريبة\n` +
      `• تثبيت السعر: لمدة عام كامل (One Year Tariff Lock)\n` +
      `• الاسم: ${name || 'عميل Premier'}\n` +
      `• هاتف التواصل: ${contactPhone || 'يرجى الرد هنا'}`
    );
    return `https://api.whatsapp.com/send/?phone=201205979779&text=${message}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playChime(soundEnabled);
    window.open(getWhatsAppUrl(), '_blank');
    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    playLuxuryClick(soundEnabled);
    window.open(getWhatsAppUrl(), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl p-6 sm:p-7 glass-panel border border-white/15 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => { playLuxuryClick(soundEnabled); onClose(); }}
          className="absolute top-5 left-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-[#ff7900] uppercase tracking-wider">
                Orange Premier
              </span>
            </div>

            <h3 className="text-xl font-bold text-white">
              تأكيد حجز الرقم
            </h3>
            
            {/* Number Card Summary */}
            <div className="my-4 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-zinc-400 block">{selectedTier.name}</span>
                <span className="text-xl font-bold font-num text-white tracking-wider" dir="ltr">
                  {numberItem.formatted}
                </span>
                <span className="text-[10px] text-zinc-500 font-num block">
                  MSISDN: {numberItem.msisdn}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-amber-300 font-num">{selectedTier.price}</span>
                <span className="text-[10px] text-white/80 mr-1">L.E/mo</span>
                <span className="text-[9px] text-emerald-400 block font-medium">شامل الضريبة (سعر مقفول سنة)</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs text-zinc-300 font-medium block mb-1">الاسم بالكامل</label>
                <input
                  type="text"
                  required
                  placeholder="الاسم"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff7900] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-300 font-medium block mb-1">رقم الهاتف للتواصل</label>
                <input
                  type="tel"
                  required
                  placeholder="01x xxxx xxxx"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff7900] transition-colors font-num text-right"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-300 font-medium block mb-1">مكان استلام وتفعيل الشريحة</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#18181b] border border-white/15 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#ff7900] transition-colors"
                >
                  <option value="توصيل شخصي لباب المنزل (مجاناً)">توصيل شخصي لباب المنزل (مجاناً)</option>
                  <option value="فرع أورانج - التجمع الخامس">فرع أورانج - التجمع الخامس</option>
                  <option value="فرع أورانج - الشيخ زايد">فرع أورانج - الشيخ زايد</option>
                  <option value="فرع أورانج - مصر الجديدة والمعادي">فرع أورانج - مصر الجديدة والمعادي</option>
                  <option value="فرع أورانج - الإسكندرية">فرع أورانج - الإسكندرية</option>
                  <option value="توصيل لباب المنزل لأي محافظة بمصر">توصيل لباب المنزل لأي محافظة بمصر</option>
                </select>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs tracking-wider transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageSquare className="w-4 h-4 text-black" />
                  <span>إرسال تفاصيل الحجز عبر واتساب فوراً</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-4">
              <CheckCircle className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              تم فتح المحادثة على واتساب
            </h3>
            <p className="text-xs text-zinc-300 mb-6 leading-relaxed">
              تم تجهيز رسالة التفعيل للرقم <span className="font-num text-[#ff7900] font-bold" dir="ltr">{numberItem.formatted}</span> بسعر <strong className="text-white">{selectedTier.price} L.E/mo</strong>.
            </p>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              العودة
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
