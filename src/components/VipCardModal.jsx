import React, { useState, useRef } from 'react';
import { X, Download, MessageSquare, Sparkles, CreditCard, Check, ShieldCheck, RefreshCw } from 'lucide-react';
import { playLuxuryClick, playChime } from '../utils/sound';

export default function VipCardModal({
  isOpen,
  onClose,
  initialNumber,
  numbersList = [],
  soundEnabled
}) {
  const [clientName, setClientName] = useState('Mohamed Issa');
  const [clientTitle, setClientTitle] = useState('VIP Executive Member');
  const [selectedNumber, setSelectedNumber] = useState(
    initialNumber?.formatted || '012 3108 6222'
  );
  const [cardTheme, setCardTheme] = useState('black'); // 'black' | 'orange' | 'gold'
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isDownloading, setIsDownloading] = useState(false);

  // Serial Number
  const cardSerial = useRef(`VIP-OP-2026-${Math.floor(1000 + Math.random() * 9000)}`).current;

  if (!isOpen) return null;

  // Handle 3D Tilt on Mouse Move
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 18, y: -y * 18 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Card themes styling
  const themes = {
    black: {
      name: 'Black Titanium',
      bg: 'linear-gradient(135deg, #18181c 0%, #0d0d10 50%, #050507 100%)',
      border: 'border-white/20',
      accent: '#ff7900',
      textGradient: 'linear-gradient(180deg, #FFFFFF 30%, #D4D4D8 100%)',
      subText: 'text-zinc-400'
    },
    orange: {
      name: 'Cosmic Orange',
      bg: 'linear-gradient(135deg, #3d1a05 0%, #1f0c02 50%, #0f0500 100%)',
      border: 'border-orange-500/40',
      accent: '#ff7900',
      textGradient: 'linear-gradient(180deg, #FFFFFF 40%, #fed7aa 100%)',
      subText: 'text-orange-200/80'
    },
    gold: {
      name: 'Imperial Gold',
      bg: 'linear-gradient(135deg, #2a220e 0%, #171204 50%, #0a0701 100%)',
      border: 'border-amber-500/40',
      accent: '#f59e0b',
      textGradient: 'linear-gradient(180deg, #FFFBEB 30%, #FCD34D 100%)',
      subText: 'text-amber-200/80'
    }
  };

  const currentTheme = themes[cardTheme];

  // High-Resolution Canvas PNG Generator & Downloader
  const handleDownloadImage = () => {
    playChime(soundEnabled);
    setIsDownloading(true);

    try {
      const canvas = document.createElement('canvas');
      const scale = 2; // High-res retina
      canvas.width = 1000 * scale;
      canvas.height = 620 * scale;
      const ctx = canvas.getContext('2d');
      ctx.scale(scale, scale);

      // Card Base Background
      const bgGrad = ctx.createLinearGradient(0, 0, 1000, 620);
      if (cardTheme === 'black') {
        bgGrad.addColorStop(0, '#1c1c22');
        bgGrad.addColorStop(0.5, '#0e0e12');
        bgGrad.addColorStop(1, '#050507');
      } else if (cardTheme === 'orange') {
        bgGrad.addColorStop(0, '#381602');
        bgGrad.addColorStop(0.5, '#1e0b01');
        bgGrad.addColorStop(1, '#0b0400');
      } else {
        bgGrad.addColorStop(0, '#2e2510');
        bgGrad.addColorStop(0.5, '#171204');
        bgGrad.addColorStop(1, '#090701');
      }

      // Rounded Card Shape
      ctx.beginPath();
      ctx.roundRect(20, 20, 960, 580, 40);
      ctx.fillStyle = bgGrad;
      ctx.fill();

      // Card Border
      ctx.lineWidth = 3;
      ctx.strokeStyle = cardTheme === 'orange' ? '#ff7900' : (cardTheme === 'gold' ? '#f59e0b' : 'rgba(255,255,255,0.25)');
      ctx.stroke();

      // Metallic Specular Bevel
      const sheenGrad = ctx.createLinearGradient(40, 40, 900, 400);
      sheenGrad.addColorStop(0, 'rgba(255,255,255,0.15)');
      sheenGrad.addColorStop(0.4, 'rgba(255,255,255,0.03)');
      sheenGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = sheenGrad;
      ctx.fill();

      // 1. Logo (Orange Box + PREMIER)
      // Orange square
      ctx.fillStyle = '#ff7900';
      ctx.beginPath();
      ctx.roundRect(70, 60, 65, 65, 14);
      ctx.fill();
      
      // orange™ text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText('orange™', 76, 114);

      // PREMIER text
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 38px sans-serif';
      ctx.fillText('PREMIER', 150, 108);

      // VIP Status Pill
      ctx.fillStyle = 'rgba(255, 121, 0, 0.2)';
      ctx.strokeStyle = '#ff7900';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(780, 60, 150, 42, 21);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ff7900';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('VIP PASS', 855, 87);
      ctx.textAlign = 'left';

      // 2. Holographic EMV Chip
      ctx.fillStyle = '#d4af37';
      ctx.beginPath();
      ctx.roundRect(70, 170, 85, 65, 12);
      ctx.fill();

      // Chip internal lines
      ctx.strokeStyle = '#996515';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(95, 170, 35, 65);
      ctx.strokeRect(70, 195, 85, 16);

      // 3. Client Phone Number (Big Embossed Calligraphy)
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 44px sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.8)';
      ctx.shadowBlur = 8;
      ctx.fillText(selectedNumber, 70, 320);
      ctx.shadowBlur = 0;

      // 4. Client Name
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 28px sans-serif';
      ctx.fillText(clientName || 'VIP Client', 70, 420);

      // Client Title
      ctx.fillStyle = '#9ca3af';
      ctx.font = '500 18px sans-serif';
      ctx.fillText(clientTitle || 'Executive Member', 70, 452);

      // 5. Tariff Lock & Expiry
      ctx.fillStyle = '#ff7900';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText('PROMO: 326 L.E / MO (50% OFF 6 MOS) • THEN 652 L.E', 70, 520);

      ctx.fillStyle = '#9ca3af';
      ctx.font = '14px sans-serif';
      ctx.fillText('ONE-YEAR TARIFF LOCK GUARANTEED', 70, 545);

      // Serial in bottom right
      ctx.fillStyle = '#6b7280';
      ctx.font = 'bold 16px monospace';
      ctx.fillText(cardSerial, 750, 545);

      // Trigger download
      const link = document.createElement('a');
      link.download = `Orange-Premier-VIP-${clientName.replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  // WhatsApp Booking with VIP Pass Details
  const handleWhatsAppBooking = () => {
    playChime(soundEnabled);
    const message = encodeURIComponent(
      `مرحباً Mohamed Issa، أود تفعيل بطاقة عضوية Orange Premier VIP وحجز الرقم بعرض الـ 50% لأول 6 شهور:\n\n` +
      `• اسم العميل: ${clientName} (${clientTitle})\n` +
      `• الرقم المعتمد: ${selectedNumber}\n` +
      `• كود بطاقة VIP: ${cardSerial}\n` +
      `• العرض: 326 ج.م شهرياً لأول 6 شهور (خصم 50% شامل الضريبة)\n` +
      `• بعد 6 أشهر: 652 ج.م شهرياً شامل الضريبة\n` +
      `• الضمان: تثبيت السعر لعام كامل (Tariff Lock)`
    );
    window.open(`https://api.whatsapp.com/send/?phone=201205979779&text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in select-none overflow-y-auto">
      
      {/* Container */}
      <div className="relative w-full max-w-4xl bg-[#0f0f13] border-2 border-orange-500/30 rounded-[36px] shadow-[0_25px_90px_rgba(0,0,0,0.95),0_0_50px_rgba(255,121,0,0.2)] overflow-hidden my-6">
        
        {/* Top Header */}
        <div className="px-6 sm:px-10 py-5 bg-[#16161d] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#ff7900] to-orange-600 flex items-center justify-center text-white shadow-lg">
              <CreditCard className="w-5 h-5 text-black" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                بطاقة عضوية Premier VIP الرقمية
              </h3>
              <p className="text-xs text-zinc-400">
                استخرج بطاقة الحجز المعدنية الخاصة بك مع كود التوثيق المعتمد
              </p>
            </div>
          </div>

          <button
            onClick={() => { playLuxuryClick(soundEnabled); onClose(); }}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* ------------ LEFT: INTERACTIVE 3D METAL CARD (7 cols) ------------ */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* The 3D Card Shell */}
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                transition: 'transform 0.15s ease-out',
                background: currentTheme.bg
              }}
              className={`relative w-full aspect-[1.586/1] rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 border-2 ${currentTheme.border} shadow-[0_25px_60px_rgba(0,0,0,0.9),inset_0_1.5px_2px_rgba(255,255,255,0.25)] overflow-hidden flex flex-col justify-between cursor-grab active:cursor-grabbing`}
            >
              {/* Dynamic Specular Sheen Beam */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at ${50 + tilt.x * 2}% ${50 - tilt.y * 2}%, rgba(255,255,255,0.8) 0%, transparent 60%)`
                }}
              />

              {/* Watermark Logo */}
              <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none">
                <span className="text-8xl sm:text-9xl font-black font-sans text-white">
                  O
                </span>
              </div>

              {/* Card Top: Logo & VIP Badge */}
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-3">
                  {/* Orange Cube */}
                  <div className="w-10 h-10 rounded-xl bg-[#ff7900] flex flex-col justify-end p-1 shadow-md">
                    <span className="text-[9px] font-bold text-white leading-none">orange™</span>
                  </div>
                  <span className="text-2xl font-black tracking-wider text-white uppercase font-sans">
                    PREMIER
                  </span>
                </div>

                <div className="px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#ff7900]" />
                  <span className="text-[11px] font-black tracking-wider text-amber-300">
                    VIP PASS
                  </span>
                </div>
              </div>

              {/* Card Middle: Holographic EMV Chip */}
              <div className="relative z-10 my-1">
                <div className="w-12 h-9 rounded-lg bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 border border-amber-200/50 shadow-md flex items-center justify-center p-1 relative overflow-hidden">
                  <div className="w-full h-0.5 bg-black/25 absolute top-2.5" />
                  <div className="w-full h-0.5 bg-black/25 absolute bottom-2.5" />
                  <div className="h-full w-0.5 bg-black/25 absolute left-4" />
                  <div className="h-full w-0.5 bg-black/25 absolute right-4" />
                </div>
              </div>

              {/* Formatted Number (Embossed Calligraphy) */}
              <div className="relative z-10">
                <h4
                  className="text-2xl sm:text-3xl font-black tracking-widest text-white font-num drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  dir="ltr"
                >
                  {selectedNumber}
                </h4>
              </div>

              {/* Card Bottom: Client Name, Title & Tariff */}
              <div className="flex items-end justify-between relative z-10 pt-2 border-t border-white/10">
                <div>
                  <span className="text-sm sm:text-base font-black text-white block leading-tight">
                    {clientName || 'VIP Client'}
                  </span>
                  <span className={`text-[10px] sm:text-[11px] ${currentTheme.subText} block font-medium`}>
                    {clientTitle || 'Executive Member'}
                  </span>
                </div>

                <div className="text-right">
                  <div className="flex items-baseline gap-1 justify-end">
                    <span className="text-[10px] line-through text-zinc-500 font-num">652</span>
                    <span className="text-xs sm:text-sm font-black text-amber-300 font-num block leading-tight">
                      326 L.E <span className="text-[9px] font-normal text-zinc-300">/ mo</span>
                    </span>
                  </div>
                  <span className="text-[8px] text-[#ff7900] font-semibold block leading-none">
                    خصم 50% لأول 6 أشهر
                  </span>
                  <span className="text-[8px] text-zinc-400 font-mono block mt-0.5">
                    {cardSerial}
                  </span>
                </div>
              </div>

            </div>

            {/* Hint */}
            <span className="text-[11px] text-zinc-500 mt-3 flex items-center gap-1">
              <span>حرّك الماوس أو إصبعك لمشاهدة الانعكاس المعدني للبطاقة</span>
            </span>

          </div>

          {/* ------------ RIGHT: CUSTOMIZATION FORM & ACTIONS (5 cols) ------------ */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* 1. Client Name Input */}
            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-1.5 text-right">
                اسم صاحب البطاقة (VIP Client):
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="اكتب اسمك الكريم هنا..."
                className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff7900] text-right font-bold transition-colors"
              />
            </div>

            {/* 2. Title / Company */}
            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-1.5 text-right">
                الصفة أو الشركة (اختياري):
              </label>
              <input
                type="text"
                value={clientTitle}
                onChange={(e) => setClientTitle(e.target.value)}
                placeholder="مثلاً: رئيس مجلس الإدارة / VIP Member"
                className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff7900] text-right transition-colors"
              />
            </div>

            {/* 3. Number Selector */}
            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-1.5 text-right">
                الرقم المخصص على البطاقة:
              </label>
              <select
                value={selectedNumber}
                onChange={(e) => setSelectedNumber(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-amber-300 focus:outline-none focus:border-[#ff7900] text-right font-num font-bold cursor-pointer"
              >
                {numbersList.map(n => (
                  <option key={n.id || n.msisdn} value={n.formatted} className="bg-zinc-900 text-white">
                    {n.formatted} ({n.series})
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Theme Selector */}
            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-1.5 text-right">
                لون ولمعة البطاقة المعدنية:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(themes).map(themeKey => (
                  <button
                    key={themeKey}
                    onClick={() => { playLuxuryClick(soundEnabled); setCardTheme(themeKey); }}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      cardTheme === themeKey
                        ? 'border-[#ff7900] bg-orange-500/20 text-white shadow-md'
                        : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {themes[themeKey].name}
                  </button>
                ))}
              </div>
            </div>

            {/* Guarantee Tag */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-right">
                <span className="text-xs font-bold text-amber-300 block">عرض 50% لأول 6 أشهر: 326 ج.م/شهرياً</span>
                <span className="text-[10px] text-zinc-400 block">ثم 652 ج.م شهرياً شامل الضريبة • تثبيت السعر لعام كامل</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              
              {/* Download PNG Button */}
              <button
                onClick={handleDownloadImage}
                disabled={isDownloading}
                className="w-full py-3 px-5 rounded-2xl bg-white hover:bg-zinc-200 text-black font-extrabold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl active:scale-98"
              >
                <Download className="w-4 h-4 text-[#ff7900]" />
                <span>{isDownloading ? 'جاري التوليد...' : 'تحميل البطاقة كصورة عالية الدقة (PNG)'}</span>
              </button>

              {/* WhatsApp VIP Booking */}
              <button
                onClick={handleWhatsAppBooking}
                className="w-full py-3 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl active:scale-98"
              >
                <MessageSquare className="w-4 h-4 text-black" />
                <span>تأكيد الحجز بهذه البطاقة عبر واتساب</span>
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}