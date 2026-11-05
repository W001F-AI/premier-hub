import React, { useState } from 'react';
import { X, Lock, KeyRound, ShieldAlert, Check } from 'lucide-react';
import { playLuxuryClick, playChime } from '../utils/sound';

export default function AdminPinModal({ isOpen, onClose, onUnlocked, soundEnabled }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Secure PIN for Mohamed Issa
    if (pin === '1481') {
      playChime(soundEnabled);
      setError(false);
      setPin('');
      onUnlocked();
    } else {
      playLuxuryClick(soundEnabled);
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-sm rounded-3xl p-6 sm:p-7 bg-[#121216] border border-orange-500/30 shadow-[0_20px_60px_rgba(255,121,0,0.2)] text-white text-center">
        
        {/* Close Button */}
        <button
          onClick={() => { playLuxuryClick(soundEnabled); onClose(); }}
          className="absolute top-5 left-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Lock Icon */}
        <div className="w-14 h-14 rounded-2xl bg-orange-500/15 border border-orange-500/40 text-[#ff7900] mx-auto flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(255,121,0,0.3)]">
          <Lock className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-bold text-white mb-1">
          لوحة الأدمن محمية
        </h3>
        <p className="text-xs text-zinc-400 mb-6">
          أدخل رمز الـ PIN السري للدخول إلى إدارة المخزون ورفع الأرقام
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              autoFocus
              maxLength={6}
              value={pin}
              onChange={(e) => {
                setError(false);
                setPin(e.target.value);
              }}
              placeholder="••••"
              className="w-40 text-center tracking-[0.6em] text-2xl font-black bg-black/70 border border-white/20 rounded-2xl py-3 text-white focus:outline-none focus:border-[#ff7900] shadow-inner font-num"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 font-semibold animate-pulse flex items-center justify-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              رمز الـ PIN غير صحيح، يرجى المحاولة ثانية
            </p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff7900] to-orange-600 text-black font-extrabold text-xs tracking-wider transition-all duration-200 active:scale-95 shadow-lg shadow-orange-500/25 cursor-pointer flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>فتح لوحة التحكم</span>
            </button>
          </div>
        </form>

        <p className="text-[10px] text-zinc-500 mt-4">
          خاص بمسؤولي النظام فقط
        </p>

      </div>
    </div>
  );
}
