import React, { useState } from 'react';
import { X, UploadCloud, Database, Trash2, Plus, Check, RefreshCw, FileText, Search, Shield, Sparkles } from 'lucide-react';
import { parseBulkNumbersText } from '../data/numbersStore';
import { playLuxuryClick, playChime } from '../utils/sound';

export default function AdminDashboardModal({
  isOpen,
  onClose,
  numbers,
  onUpdateNumbers,
  onResetToDefault,
  soundEnabled
}) {
  const [activeTab, setActiveTab] = useState('bulk'); // 'bulk' | 'inventory'
  const [bulkInput, setBulkInput] = useState('');
  const [parsedPreview, setParsedPreview] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleTextChange = (e) => {
    const val = e.target.value;
    setBulkInput(val);
    const results = parseBulkNumbersText(val);
    setParsedPreview(results);
  };

  const handleSaveBulk = () => {
    if (parsedPreview.length === 0) return;
    playChime(soundEnabled);
    
    // Merge new parsed numbers at the top
    const updated = [...parsedPreview, ...numbers];
    onUpdateNumbers(updated);
    setBulkInput('');
    setParsedPreview([]);
    setSaveSuccessMsg(`تمت إضافة ${parsedPreview.length} رقماً جديداً بنجاح ومزامنتها في المخزون!`);
    setTimeout(() => setSaveSuccessMsg(''), 4000);
    setActiveTab('inventory');
  };

  const handleDeleteNumber = (id) => {
    playLuxuryClick(soundEnabled);
    const updated = numbers.filter(n => n.id !== id);
    onUpdateNumbers(updated);
  };

  const filteredInventory = numbers.filter(n => 
    n.formatted.includes(searchFilter) ||
    n.msisdn.includes(searchFilter) ||
    n.series.includes(searchFilter)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl p-6 sm:p-8 bg-[#101014] border border-orange-500/30 shadow-2xl my-auto text-white">
        
        {/* Close Button */}
        <button
          onClick={() => { playLuxuryClick(soundEnabled); onClose(); }}
          className="absolute top-6 left-6 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#ff7900] shadow-[0_0_20px_rgba(255,121,0,0.5)] flex items-center justify-center font-black text-black">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ff7900]">
                Orange Premier • Admin Console
              </span>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-zinc-300 font-num">
                {numbers.length} رقماً في المخزون
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              لوحة إدارة ورفع أرقام البريميير
            </h3>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6">
          <button
            onClick={() => { playLuxuryClick(soundEnabled); setActiveTab('bulk'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'bulk'
                ? 'bg-[#ff7900] text-black shadow-lg shadow-orange-500/20'
                : 'bg-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>رفع أرقام Bulk (إكسيل / نص)</span>
          </button>

          <button
            onClick={() => { playLuxuryClick(soundEnabled); setActiveTab('inventory'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'inventory'
                ? 'bg-[#ff7900] text-black shadow-lg shadow-orange-500/20'
                : 'bg-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>إدارة المخزون الحالي ({numbers.length})</span>
          </button>
        </div>

        {/* Success Alert */}
        {saveSuccessMsg && (
          <div className="p-3 mb-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* ---------------- TAB 1: BULK IMPORT ---------------- */}
        {activeTab === 'bulk' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs text-zinc-300 font-medium block mb-1">
                الصق عمود الأرقام من Excel أو شيت مباشرة (يدعم كل سطر رقم، أو فواصل):
              </label>
              <textarea
                rows={6}
                value={bulkInput}
                onChange={handleTextChange}
                placeholder="مثال:
1231096222
01231095222
1231084222
01231079222"
                className="w-full bg-black/60 border border-white/15 rounded-2xl p-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff7900] font-num text-left transition-all"
                dir="ltr"
              />
            </div>

            {/* Parsing Live Feedback */}
            {parsedPreview.length > 0 && (
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between text-xs text-zinc-300 mb-2">
                  <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    تم التعرّف على {parsedPreview.length} رقماً بشكل تلقائي
                  </span>
                  <span className="text-[10px] text-zinc-400">معاينة أول 4 أرقام:</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {parsedPreview.slice(0, 6).map((p, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-black border border-white/15 text-[11px] font-num text-zinc-200"
                      dir="ltr"
                    >
                      {p.formatted}
                    </span>
                  ))}
                  {parsedPreview.length > 6 && (
                    <span className="px-2 py-1 text-xs text-zinc-400">
                      + {parsedPreview.length - 6} أرقام إضافية
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-zinc-400">
                الأرقام التي ترفعها تُحفظ فوراً في المتصفح وتظهر في التول تلقائياً.
              </span>

              <button
                onClick={handleSaveBulk}
                disabled={parsedPreview.length === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  parsedPreview.length > 0
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20 active:scale-95'
                    : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>حفظ وإضافة {parsedPreview.length} رقماً للمخزون</span>
              </button>
            </div>
          </div>
        )}

        {/* ---------------- TAB 2: INVENTORY TABLE ---------------- */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            
            {/* Search within inventory */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-zinc-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="بحث في المخزون..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl py-2 pr-9 pl-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff7900] font-num text-right"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (window.confirm('هل تريد استعادة قائمة الـ 20 رقماً الأصلية المعتمدة؟')) {
                      playLuxuryClick(soundEnabled);
                      onResetToDefault();
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 text-xs transition-colors cursor-pointer border border-white/10"
                >
                  <RefreshCw className="w-3 h-3 text-[#ff7900]" />
                  <span>استعادة الأرقام الأصلية</span>
                </button>
              </div>
            </div>

            {/* Numbers List Table */}
            <div className="max-h-[340px] overflow-y-auto border border-white/10 rounded-2xl bg-black/40 scrollbar-thin">
              <table className="w-full text-right text-xs">
                <thead className="bg-white/5 border-b border-white/10 text-zinc-400 sticky top-0 backdrop-blur-md">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold">#</th>
                    <th className="py-2.5 px-4 font-semibold">رقم الخط</th>
                    <th className="py-2.5 px-4 font-semibold">MSISDN</th>
                    <th className="py-2.5 px-4 font-semibold">السلسلة</th>
                    <th className="py-2.5 px-4 font-semibold text-center">إجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredInventory.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-2 px-4 text-zinc-500 font-num">{idx + 1}</td>
                      <td className="py-2 px-4 font-bold text-white font-num" dir="ltr">
                        {item.formatted}
                      </td>
                      <td className="py-2 px-4 text-zinc-400 font-num">{item.msisdn}</td>
                      <td className="py-2 px-4">
                        <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-zinc-300">
                          {item.series}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-center">
                        <button
                          onClick={() => handleDeleteNumber(item.id)}
                          title="حذف الرقم"
                          className="p-1 rounded-md text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredInventory.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-zinc-500 text-xs">
                        لا توجد أرقام مطابقة لبحثك
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
