import React, { useState, useMemo } from 'react';
import { ArrowUpRight, MessageSquare, Smartphone, ShieldCheck, ChevronRight, ChevronLeft, Bookmark, Sparkles, Search, Check, BookOpen, Layers, CreditCard } from 'lucide-react';
import { playLuxuryClick, playChime, playPageTurnSound } from '../utils/sound';

export default function PremierBentoCatalog({
  numbers = [],
  onSelectNumberToPreview,
  currentNumber,
  soundEnabled,
  onOpenVipCard
}) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | '3109' | '3108' | '3107' | '3106' | '3105'
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [flipDirection, setFlipDirection] = useState(null); // 'next' | 'prev' | null
  const itemsPerPage = 6; // 3 on right page, 3 on left page (or 6 on single mobile page)

  // Leather Bookmark Dividers
  const ledgerTabs = [
    { id: 'all', title: 'السجل الكامل', tag: 'جميع السلاسل', count: numbers.length },
    { id: '3109', title: 'سلسلة 3109', tag: 'الأعلى طلباً', count: numbers.filter(n => n.series?.includes('3109')).length },
    { id: '3108', title: 'سلسلة 3108', tag: 'متناسقة 222', count: numbers.filter(n => n.series?.includes('3108')).length },
    { id: '3107', title: 'سلسلة 3107', tag: 'إيقاع رنان', count: numbers.filter(n => n.series?.includes('3107')).length },
    { id: '3106', title: 'سلسلة 3106', tag: 'VIP النخبة', count: numbers.filter(n => n.series?.includes('3106')).length },
    { id: '3105', title: 'سلسلة 3105', tag: 'وقار كلاسيكي', count: numbers.filter(n => n.series?.includes('3105')).length },
  ];

  // Filter numbers
  const filteredNumbers = useMemo(() => {
    return numbers.filter((item) => {
      const matchTab = activeTab === 'all' || (item.series && item.series.includes(activeTab));
      const matchSearch =
        !searchTerm.trim() ||
        (item.msisdn && item.msisdn.includes(searchTerm.trim())) ||
        (item.formatted && item.formatted.includes(searchTerm.trim())) ||
        (item.highlight && item.highlight.includes(searchTerm.trim()));
      return matchTab && matchSearch;
    });
  }, [numbers, activeTab, searchTerm]);

  // Pagination for pages
  const totalPages = Math.max(1, Math.ceil(filteredNumbers.length / itemsPerPage));
  const displayedNumbers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredNumbers.slice(start, start + itemsPerPage);
  }, [filteredNumbers, currentPage]);

  // Split into Right Page (First 3) and Left Page (Next 3) for the 2-page book spread
  const rightPageNumbers = displayedNumbers.slice(0, 3);
  const leftPageNumbers = displayedNumbers.slice(3, 6);

  const handleTabChange = (tabId) => {
    playPageTurnSound(soundEnabled);
    setFlipDirection('next');
    setActiveTab(tabId);
    setCurrentPage(1);
    setTimeout(() => setFlipDirection(null), 450);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      playPageTurnSound(soundEnabled);
      setFlipDirection('next');
      setCurrentPage(prev => prev + 1);
      setTimeout(() => setFlipDirection(null), 450);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      playPageTurnSound(soundEnabled);
      setFlipDirection('prev');
      setCurrentPage(prev => prev - 1);
      setTimeout(() => setFlipDirection(null), 450);
    }
  };

  const handleWhatsApp = (item) => {
    playChime(soundEnabled);
    const message = encodeURIComponent(
      `مرحباً Mohamed Issa، أود حجز وتفعيل الرقم التالي بعرض خصم الـ 50% لأول 6 شهور من دفتر الأرقام:\n\n` +
      `• الرقم: ${item.formatted}\n` +
      `• النظام: Premier Lite\n` +
      `• عرض أول 6 شهور: 326 ج.م شهرياً (خصم 50% شامل الضريبة)\n` +
      `• بعد 6 شهور: 652 ج.م شهرياً شامل الضريبة\n` +
      `• كود الشريحة: MSISDN ${item.msisdn}\n` +
      `• تثبيت السعر: لعام كامل (One-Year Tariff Lock)`
    );
    window.open(`https://api.whatsapp.com/send/?phone=201205979779&text=${message}`, '_blank');
  };

  const handlePreviewOnPhone = (item) => {
    playLuxuryClick(soundEnabled);
    onSelectNumberToPreview(item);
  };

  return (
    <section className="relative z-20 py-8 sm:py-14 px-3 sm:px-8 max-w-7xl mx-auto w-full select-none">
      
      {/* ---------------- 1. TOP EXECUTIVE BRIEFING ---------------- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-[#ff7900] text-xs font-bold mb-3 shadow-[0_0_20px_rgba(255,121,0,0.15)]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>ORANGE PREMIER VIP REGISTRY • دفتر حصر وتخصيص الأرقام</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <span>سجل أرقام Premier المعتمدة</span>
            <span className="text-xs sm:text-sm font-semibold px-2.5 py-0.5 rounded-md bg-white/10 text-zinc-300 border border-white/10">
              إصدار VIP الحصري
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl leading-relaxed">
            تصفح دفتر الأرقام بنظام التقليب التفاعلي. كل رقم متاح للتفعيل الفوري بعرض{' '}
            <span className="text-amber-300 font-extrabold bg-orange-500/15 px-2 py-0.5 rounded border border-orange-500/30">
              خصم 50% لأول 6 شهور: 326 ج.م شهرياً (بدلاً من 652 ج.م)
            </span>{' '}
            مع ضمان تثبيت السعر لعام كامل.
          </p>
        </div>

        {/* Search Bar & Issue VIP Pass Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
          {onOpenVipCard && (
            <button
              onClick={() => { playLuxuryClick(soundEnabled); onOpenVipCard(); }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 hover:text-white hover:bg-amber-500/30 text-xs font-bold transition-all cursor-pointer shadow-md shrink-0 active:scale-95"
            >
              <CreditCard className="w-4 h-4 text-amber-400" />
              <span>إصدار بطاقة VIP</span>
            </button>
          )}

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-zinc-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="ابحث برقم أو سلسلة (مثلاً 3109)..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-black/60 border border-white/15 rounded-2xl py-2.5 pr-10 pl-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff7900] font-num text-right shadow-inner transition-colors"
            />
          </div>
        </div>
      </div>

      {/* ---------------- 2. LEATHER INDEX TABS (فواصل الدفتر الجلدية الملونة) ---------------- */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-2 scrollbar-none">
        {ledgerTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`group relative flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-2xl transition-all duration-300 cursor-pointer shrink-0 border ${
                isActive
                  ? 'bg-gradient-to-r from-[#ff7900] via-orange-600 to-amber-600 text-black font-extrabold shadow-[0_8px_25px_rgba(255,121,0,0.45)] border-transparent -translate-y-1'
                  : 'bg-[#15151a] hover:bg-[#1e1e24] text-zinc-300 border-white/10 hover:border-white/20'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isActive ? 'text-black fill-black' : 'text-[#ff7900]'}`} />
              <div className="text-right">
                <span className="text-xs sm:text-sm block leading-tight">{tab.title}</span>
                <span className={`text-[10px] block ${isActive ? 'text-black/80 font-bold' : 'text-zinc-500'}`}>
                  {tab.tag} • ({tab.count})
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ---------------- 3. THE LUXURY DESK FOLIO / TWO-PAGE BOOK SPREAD ---------------- */}
      <div className="relative mt-3 rounded-[32px] sm:rounded-[40px] bg-[#0c0c0f] border-2 border-orange-500/25 shadow-[0_30px_100px_rgba(0,0,0,0.95),0_0_60px_rgba(255,121,0,0.15)] overflow-hidden">
        
        {/* Real Silk Orange Bookmark Ribbon hanging from top */}
        <div className="absolute top-0 right-12 sm:right-20 w-7 sm:w-9 h-14 sm:h-20 bg-gradient-to-b from-[#ff7900] via-orange-600 to-[#d95a00] rounded-b-md shadow-[0_6px_15px_rgba(0,0,0,0.6)] z-30 pointer-events-none flex flex-col justify-end items-center pb-1">
          <div className="w-4 h-0.5 bg-amber-200/60 rounded-full" />
        </div>

        {/* Leather Folio Top Bar with Gold Rings & Header */}
        <div className="px-6 sm:px-10 py-4 bg-gradient-to-r from-[#17171d] via-[#1a1a22] to-[#17171d] border-b border-white/10 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            {/* Stamped Orange Premier Cube */}
            <div className="w-8 h-8 rounded-lg bg-[#ff7900] flex items-center justify-center text-xs font-black text-black shadow-md">
              O
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#ff7900] font-black font-num block">
                PREMIER EXECUTIVE FOLIO
              </span>
              <span className="text-[11px] text-zinc-400 font-medium">
                دفتر حصر الحسابات والخطوط المميزة • قفل السعر لعام كامل
              </span>
            </div>
          </div>

          {/* Page Numbering & Turn Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-amber-300/90 font-num bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
              الصحيفة {currentPage} من {totalPages}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1 text-xs font-bold ${
                  currentPage === 1
                    ? 'border-white/5 text-zinc-600 cursor-not-allowed bg-black/20'
                    : 'border-white/15 bg-white/5 text-white hover:bg-orange-500 hover:text-black hover:border-transparent active:scale-95'
                }`}
                title="الصحيفة السابقة"
              >
                <ChevronRight className="w-4 h-4" />
                <span className="hidden sm:inline">السابقة</span>
              </button>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1 text-xs font-bold ${
                  currentPage === totalPages
                    ? 'border-white/5 text-zinc-600 cursor-not-allowed bg-black/20'
                    : 'border-white/15 bg-white/5 text-white hover:bg-orange-500 hover:text-black hover:border-transparent active:scale-95'
                }`}
                title="الصحيفة التالية"
              >
                <span className="hidden sm:inline">التالية</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* ---------------- BOOK SPREAD BODY (الصفحة اليمنى واليسرى) ---------------- */}
        <div
          className={`relative p-5 sm:p-10 transition-transform duration-300 ${
            flipDirection === 'next' ? 'animate-page-turn-next' : ''
          } ${flipDirection === 'prev' ? 'animate-page-turn-prev' : ''}`}
        >
          {/* Subtle Desk Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.025] pointer-events-none">
            <span className="text-[120px] sm:text-[200px] font-black tracking-widest text-white uppercase font-sans">
              PREMIER
            </span>
          </div>

          {/* Book Spine Center Crease (Visible on MD screens and above) */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/40 via-black/80 to-black/40 pointer-events-none hidden lg:block z-10">
            <div className="w-[1px] h-full mx-auto bg-white/5 shadow-[0_0_10px_rgba(0,0,0,0.8)]" />
          </div>

          {/* If no numbers found */}
          {displayedNumbers.length === 0 ? (
            <div className="py-20 text-center text-zinc-400">
              <p className="text-lg font-bold">لا توجد أرقام مطابقة لبحثك في هذا القسم.</p>
              <button
                onClick={() => { setSearchTerm(''); setActiveTab('all'); }}
                className="mt-4 px-4 py-2 rounded-xl bg-orange-500/20 text-[#ff7900] text-xs font-bold hover:bg-orange-500/30"
              >
                إظهار كافة الأرقام
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 relative z-20">
              
              {/* ------------ RIGHT PAGE (الصحيفة اليمنى) ------------ */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-orange-500/20 pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ff7900]" />
                    <span className="text-xs font-black tracking-wider text-zinc-300 uppercase">
                      الصحيفة اليمنى • قيد الأرقام
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-500 font-num">
                    الصفحة {(currentPage - 1) * 2 + 1}
                  </span>
                </div>

                {rightPageNumbers.map((item, idx) => {
                  const entryIndex = (currentPage - 1) * itemsPerPage + idx + 1;
                  const isSelected = currentNumber && (currentNumber.msisdn === item.msisdn || currentNumber.formatted === item.formatted);

                  return (
                    <LedgerEntryRow
                      key={item.id || item.msisdn}
                      item={item}
                      entryIndex={entryIndex}
                      isSelected={isSelected}
                      onPreview={() => handlePreviewOnPhone(item)}
                      onWhatsApp={() => handleWhatsApp(item)}
                    />
                  );
                })}
              </div>

              {/* ------------ LEFT PAGE (الصحيفة اليسرى) ------------ */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-orange-500/20 pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-xs font-black tracking-wider text-zinc-300 uppercase">
                      الصحيفة اليسرى • التخصيص الفوري
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-500 font-num">
                    الصفحة {(currentPage - 1) * 2 + 2}
                  </span>
                </div>

                {leftPageNumbers.length > 0 ? (
                  leftPageNumbers.map((item, idx) => {
                    const entryIndex = (currentPage - 1) * itemsPerPage + 3 + idx + 1;
                    const isSelected = currentNumber && (currentNumber.msisdn === item.msisdn || currentNumber.formatted === item.formatted);

                    return (
                      <LedgerEntryRow
                        key={item.id || item.msisdn}
                        item={item}
                        entryIndex={entryIndex}
                        isSelected={isSelected}
                        onPreview={() => handlePreviewOnPhone(item)}
                        onWhatsApp={() => handleWhatsApp(item)}
                      />
                    );
                  })
                ) : (
                  /* Empty state for the remaining page in odd numbers */
                  <div className="h-full min-h-[220px] rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center p-6 text-center text-zinc-500">
                    <Sparkles className="w-8 h-8 text-[#ff7900]/40 mb-2" />
                    <span className="text-xs font-semibold text-zinc-400">نهاية قائمة الأرقام المتاحة في هذا الفهرس</span>
                    <span className="text-[10px] text-zinc-600 mt-1">تواصل مع الإدارة لإضافة أرقام خاصة جديدة</span>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Page Corner Curl indicator on bottom left */}
          <div className="page-corner-curl" />
        </div>

        {/* ---------------- 4. FOLIO BOTTOM TURN-PAGE CONTROLS ---------------- */}
        <div className="px-6 sm:px-10 py-5 bg-gradient-to-r from-[#111115] via-[#141419] to-[#111115] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>كافة الأرقام مسجلة حصرياً على باقة Premier Lite مع ضمان استقرار الفاتورة</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-400 font-num">
              صفحة {currentPage} من {totalPages}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-2 ${
                  currentPage === 1
                    ? 'border-white/5 text-zinc-600 cursor-not-allowed bg-black/20'
                    : 'border-white/15 bg-white/5 text-white hover:bg-orange-500 hover:text-black hover:border-transparent active:scale-95 shadow-md'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
                <span>اقلب للصفحة السابقة</span>
              </button>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-2 ${
                  currentPage === totalPages
                    ? 'border-white/5 text-zinc-600 cursor-not-allowed bg-black/20'
                    : 'border-white/15 bg-white/5 text-white hover:bg-orange-500 hover:text-black hover:border-transparent active:scale-95 shadow-md'
                }`}
              >
                <span>اقلب للصفحة التالية</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}

// ---------------- SUBCOMPONENT: LUXURY LEDGER ENTRY ROW (سطر توثيق دفتري بديل الكروت) ----------------
function LedgerEntryRow({ item, entryIndex, isSelected, onPreview, onWhatsApp }) {
  return (
    <div
      className={`group relative rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 transition-all duration-300 border ${
        isSelected
          ? 'bg-gradient-to-r from-orange-950/60 via-zinc-900 to-black border-[#ff7900] shadow-[0_0_30px_rgba(255,121,0,0.3)] translate-x-1'
          : 'bg-[#121217]/90 hover:bg-[#181820] border-white/10 hover:border-orange-500/40 hover:translate-x-1'
      }`}
    >
      {/* Right Indicator Stripe */}
      <div
        className={`absolute top-2 bottom-2 right-0 w-1 rounded-l-full transition-colors ${
          isSelected ? 'bg-[#ff7900]' : 'bg-transparent group-hover:bg-orange-500/60'
        }`}
      />

      {/* Entry Index & Number Layout */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Calligraphic Entry Stamp */}
        <span className="w-8 h-8 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center text-xs font-black font-num text-amber-400/90 group-hover:text-white group-hover:border-orange-500/40 transition-colors shrink-0 shadow-inner">
          {entryIndex < 10 ? `0${entryIndex}` : entryIndex}
        </span>

        <div>
          {/* Big Formatted Phone Number */}
          <div className="flex items-center gap-2.5">
            <h3
              className="text-xl sm:text-2xl font-black tracking-wider text-white font-num group-hover:text-[#ff7900] transition-colors"
              dir="ltr"
            >
              {item.formatted}
            </h3>
            
            <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-zinc-400 font-semibold border border-white/10 shrink-0">
              {item.series}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1 text-[11px] text-zinc-400">
            <span className="font-num text-zinc-500 text-[10px]">MSISDN: {item.msisdn}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <Check className="w-3 h-3" />
              متاح للتفعيل الفوري
            </span>
          </div>
        </div>
      </div>

      {/* Pricing & Interactive Action Buttons */}
      <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
        
        {/* Tariff Price with 50% discount */}
        <div className="text-right">
          <div className="flex items-baseline gap-1.5 justify-end">
            <span className="text-[11px] line-through text-zinc-500 font-num">652</span>
            <div className="text-base sm:text-lg font-black text-amber-300 font-num leading-tight">
              326 <span className="text-[10px] font-sans">ج.م</span>
            </div>
          </div>
          <div className="text-[10px] text-[#ff7900] font-bold leading-none mt-0.5">
            خصم 50% لأول 6 شهور
          </div>
          <div className="text-[8px] text-zinc-400 leading-none mt-0.5">
            ثم 652 ج.م/شهر شامل الضريبة
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Preview on iPhone 17 Pro */}
          <button
            onClick={onPreview}
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1 active:scale-95"
            title="معاينة حية على شاشة الآيفون 17 برو ماكس"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#ff7900]" />
            <span className="text-[11px]">معاينة</span>
          </button>

          {/* WhatsApp Direct */}
          <button
            onClick={onWhatsApp}
            className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs transition-all cursor-pointer flex items-center gap-1 shadow-lg active:scale-95"
            title="حجز فوري عبر واتساب"
          >
            <MessageSquare className="w-3.5 h-3.5 text-black" />
            <span className="text-[11px]">حجز</span>
          </button>
        </div>

      </div>

    </div>
  );
}