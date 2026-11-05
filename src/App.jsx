import React, { useState } from 'react';
import StudioShowcase from './components/StudioShowcase';
import PremierBentoCatalog from './components/PremierBentoCatalog';
import AdminDashboardModal from './components/AdminDashboardModal';
import AdminPinModal from './components/AdminPinModal';
import BookingModal from './components/BookingModal';
import OfficialPlansModal from './components/OfficialPlansModal';
import VipCardModal from './components/VipCardModal';
import { STUDIO_SHADES } from './data/studioShades';
import { PREMIER_TIERS, OFFICIAL_NUMBERS } from './data/premierData';
import { getStoredNumbers, saveStoredNumbers } from './data/numbersStore';
import { ArrowRight, Smartphone, Lock } from 'lucide-react';
import OrangePremierLogo from './components/OrangePremierLogo';
import GlowingWolfLogo from './components/GlowingWolfLogo';

export default function App() {
  const [numbersList, setNumbersList] = useState(getStoredNumbers());
  const [currentShade, setCurrentShade] = useState(STUDIO_SHADES[0]);
  const [selectedTier, setSelectedTier] = useState(PREMIER_TIERS[0]); // Premier Lite 652 L.E/mo
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Navigation View State ('studio' | 'catalog')
  const [activeView, setActiveView] = useState('studio');

  // Modals state
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [specsModalOpen, setSpecsModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminPinModalOpen, setAdminPinModalOpen] = useState(false);
  const [vipCardModalOpen, setVipCardModalOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  
  const [bookingTargetNumber, setBookingTargetNumber] = useState({
    formatted: STUDIO_SHADES[0].number,
    msisdn: STUDIO_SHADES[0].msisdn
  });
  const [bookingTargetTier, setBookingTargetTier] = useState(PREMIER_TIERS[0]);

  // Request to open Admin Console (Protected by PIN)
  const handleRequestOpenAdmin = () => {
    if (isAdminAuthenticated) {
      setAdminModalOpen(true);
    } else {
      setAdminPinModalOpen(true);
    }
  };

  const handleAdminUnlocked = () => {
    setIsAdminAuthenticated(true);
    setAdminPinModalOpen(false);
    setAdminModalOpen(true);
  };

  // Persist numbers update from Admin Dashboard
  const handleUpdateNumbers = (newNumbers) => {
    setNumbersList(newNumbers);
    saveStoredNumbers(newNumbers);
  };

  const handleResetToDefault = () => {
    setNumbersList(OFFICIAL_NUMBERS);
    saveStoredNumbers(OFFICIAL_NUMBERS);
  };

  const handleSelectShade = (shade) => {
    setCurrentShade(shade);
    setBookingTargetNumber({
      formatted: shade.number,
      msisdn: shade.msisdn
    });
  };

  const handleSelectFromBento = (item) => {
    const foundShade = STUDIO_SHADES.find(s => s.msisdn === item.msisdn) || {
      ...STUDIO_SHADES[0],
      number: item.formatted,
      msisdn: item.msisdn
    };
    setCurrentShade(foundShade);
    setBookingTargetNumber({
      formatted: item.formatted,
      msisdn: item.msisdn
    });
    // Switch to studio to preview on the iPhone 17 Pro Max
    setActiveView('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (shadeOrNumber, tier = selectedTier) => {
    if (shadeOrNumber.number) {
      setBookingTargetNumber({
        formatted: shadeOrNumber.number,
        msisdn: shadeOrNumber.msisdn
      });
    } else if (shadeOrNumber.formatted) {
      setBookingTargetNumber({
        formatted: shadeOrNumber.formatted,
        msisdn: shadeOrNumber.msisdn
      });
    }
    setBookingTargetTier(tier);
    setBookingModalOpen(true);
  };

  const handleSelectPlanFromModal = (tier) => {
    setSelectedTier(tier);
    setBookingTargetTier(tier);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-[#ff7900] selection:text-black">
      
      {/* ---------------- 1. STUDIO SHOWCASE VIEW ---------------- */}
      {activeView === 'studio' && (
        <StudioShowcase
          shades={STUDIO_SHADES}
          currentShade={currentShade}
          onSelectShade={handleSelectShade}
          onOpenBooking={handleOpenBooking}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(prev => !prev)}
          onOpenSpecs={() => setSpecsModalOpen(true)}
          onOpenCatalog={() => setActiveView('catalog')}
          onOpenAdmin={handleRequestOpenAdmin}
          onOpenVipCard={() => setVipCardModalOpen(true)}
          activeView={activeView}
          numbersCount={numbersList.length}
        />
      )}

      {/* ---------------- 2. DEDICATED BENTO CATALOG VIEW ---------------- */}
      {activeView === 'catalog' && (
        <div className="min-h-screen bg-[#0c0c0f] flex flex-col justify-between animate-fade-in">
          
          {/* Top Catalog Header with Back Button */}
          <header className="sticky top-0 z-40 px-6 sm:px-12 py-5 bg-black/70 backdrop-blur-xl border-b border-white/10 flex items-center justify-between">
            <OrangePremierLogo size="default" />

            <div className="flex items-center gap-3">
              <button
                onClick={() => setVipCardModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold hover:bg-amber-500/20 transition-all cursor-pointer"
              >
                <span>بطاقة VIP</span>
              </button>

              <button
                onClick={handleRequestOpenAdmin}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-bold hover:bg-white/10 transition-all cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>لوحة الأدمن</span>
              </button>

              <button
                onClick={() => setActiveView('studio')}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black font-extrabold text-xs tracking-wide hover:bg-zinc-200 transition-all cursor-pointer shadow-lg active:scale-95"
              >
                <Smartphone className="w-4 h-4 text-[#ff7900]" />
                <span>العودة للموبايل</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Glowing Bento Catalog Component */}
          <main className="flex-1">
            <PremierBentoCatalog
              numbers={numbersList}
              onSelectNumberToPreview={handleSelectFromBento}
              currentNumber={{
                formatted: currentShade.number,
                msisdn: currentShade.msisdn
              }}
              soundEnabled={soundEnabled}
              onOpenVipCard={() => setVipCardModalOpen(true)}
            />
          </main>

          {/* Mohamed Issa Signature Footer with 3D Glowing Wolf */}
          <footer className="py-5 px-6 sm:px-12 border-t border-white/10 bg-black/60 backdrop-blur-md">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-[#ff7900] animate-pulse" />
                <span>Orange Egypt • Premier Numbers Inventory</span>
              </div>

              <a
                href="https://api.whatsapp.com/send/?phone=201205979779&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                title="تواصل مباشر مع Mohamed Issa على واتساب"
                className="group inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/40 transition-all duration-300 shadow-lg cursor-pointer"
              >
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
      )}

      {/* ---------------- 3. ADMIN PIN AUTHENTICATION MODAL ---------------- */}
      <AdminPinModal
        isOpen={adminPinModalOpen}
        onClose={() => setAdminPinModalOpen(false)}
        onUnlocked={handleAdminUnlocked}
        soundEnabled={soundEnabled}
      />

      {/* ---------------- 4. ADMIN DASHBOARD MODAL ---------------- */}
      <AdminDashboardModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        numbers={numbersList}
        onUpdateNumbers={handleUpdateNumbers}
        onResetToDefault={handleResetToDefault}
        soundEnabled={soundEnabled}
      />

      {/* ---------------- 5. BOOKING MODAL (BACKUP) ---------------- */}
      <BookingModal
        numberItem={bookingTargetNumber}
        selectedTier={bookingTargetTier}
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        soundEnabled={soundEnabled}
      />

      {/* ---------------- 6. OFFICIAL 5 PLANS SPECS MODAL ---------------- */}
      <OfficialPlansModal
        isOpen={specsModalOpen}
        onClose={() => setSpecsModalOpen(false)}
        soundEnabled={soundEnabled}
        onSelectPlanToBook={handleSelectPlanFromModal}
      />

      {/* ---------------- 7. VIP DIGITAL MEMBERSHIP CARD MODAL ---------------- */}
      <VipCardModal
        isOpen={vipCardModalOpen}
        onClose={() => setVipCardModalOpen(false)}
        initialNumber={{
          formatted: currentShade.number,
          msisdn: currentShade.msisdn
        }}
        numbersList={numbersList}
        soundEnabled={soundEnabled}
      />

    </div>
  );
}
