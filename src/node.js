import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// --- SUPABASE CONFIG ---
const SUPABASE_URL = 'https://ltsskquetmcpxcnbsoah.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0c3NrcXVldG1jcHhjbmJzb2FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1NTUxNjIsImV4cCI6MjA4MDEzMTE2Mn0.FjCAySw1l0ppUQVS7SuviAPAHnQAo_BbcaUV2ck7z6U';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- ICONS ---
const ArrowLeft = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>);
const Instagram = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>);
const ShoppingBag = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>);
const XIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>);
const Clock = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>);
const MapPin = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>);
const Search = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>);
const EditIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>);
const TrashIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>);
const PlusIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>);
const LockIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>);
const Info = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>);
const ImageIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>);
const Camera = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>);
const LockKeyhole = LockIcon; 

// --- HELPERS ---
const BLOCK_LIMITS = { 'A': 12, 'B': 12, 'C': 12, 'D': 6 };
const formatRupiah = (price) => `Rp ${price.toLocaleString('id-ID')}`;
const formatRupiahInput = (value) => {
  if (!value) return '';
  const numberString = value.toString().replace(/[^,\d]/g, '');
  const split = numberString.split(',');
  const sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  const ribuan = split[0].substr(sisa).match(/\d{3}/gi);
  if (ribuan) rupiah += (sisa ? '.' : '') + ribuan.join('.');
  return split[1] !== undefined ? 'Rp ' + rupiah + ',' + split[1] : 'Rp ' + rupiah;
};
const parseRupiah = (value) => {
  if (!value) return 0;
  return parseInt(value.toString().replace(/[^0-9]/g, ''), 10) || 0;
};
const resizeImage = (file, maxWidth = 1000) => { 
  return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
              const canvas = document.createElement('canvas');
              let width = img.width; let height = img.height;
              if (width > maxWidth) { height *= maxWidth / width; width = maxWidth; }
              canvas.width = width; canvas.height = height;
              const ctx = canvas.getContext('2d');
              ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
              ctx.drawImage(img, 0, 0, width, height);
              resolve(canvas.toDataURL(file.type));
          };
          img.src = event.target.result;
      };
      reader.readAsDataURL(file);
  });
};

const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(','); const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]); let n = bstr.length; const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
};

const uploadImageToSupabase = async (base64Image, folder) => {
    if (!base64Image || !base64Image.startsWith('data:')) return base64Image;
    const timestamp = Date.now();
    const fileName = `${folder}/img-${timestamp}.jpg`;
    const file = dataURLtoFile(base64Image, fileName);
    const { error } = await supabase.storage.from('outlet-images').upload(fileName, file, { upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from('outlet-images').getPublicUrl(fileName);
    return data.publicUrl;
};

// --- COMPONENTS ---
const SmartImage = ({ srcLocal, srcOnline, alt, className, onClick }) => {
  const imgSrc = srcOnline || srcLocal;
  return imgSrc ? 
    <img src={imgSrc} alt={alt} className={className} onClick={() => onClick && onClick(imgSrc)} style={{ cursor: onClick ? 'pointer' : 'default' }} onError={(e) => {e.target.style.display='none';}} /> 
    : <div className={`bg-slate-200 flex flex-col items-center justify-center ${className} overflow-hidden`}><ImageIcon className="w-8 h-8 text-slate-400 mb-1" /><span className="text-[10px] text-slate-400 text-center">{alt || 'No Image'}</span></div>;
};

const Modal = ({ isOpen, children, className = "max-w-md", zIndex = "z-[100]" }) => {
    if (!isOpen) return null;
    return (<div className={`fixed inset-0 ${zIndex} bg-black/60 flex items-center justify-center p-4 animate-fade-in`}><div className={`bg-white w-full ${className} rounded-2xl p-6 shadow-2xl animate-zoom-in`}>{children}</div></div>);
};

const useSecretTap = (callback) => {
    const [taps, setTaps] = useState(0);
    useEffect(() => { if (taps > 0) { const timer = setTimeout(() => setTaps(0), 2000); return () => clearTimeout(timer); } }, [taps]);
    useEffect(() => { if (taps >= 3) { callback(); setTaps(0); } }, [taps, callback]);
    return () => setTaps(prev => prev + 1);
};

const LandingPage = ({ onGoToList, animationClass, onSecretTrigger }) => {
  const handleLogoTap = useSecretTap(onSecretTrigger);
  return (
    // PERUBAHAN DISINI: bg-[#213C66] diubah menjadi bg-[#0b2850]
    <div className={`min-h-screen bg-[#0b2850] flex flex-col items-center justify-between relative overflow-hidden font-inter transition-opacity duration-500 ${animationClass}`}>
      <div className="h-10 w-full"></div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="text-center p-4 animate-fade-in-up">
          <div onClick={handleLogoTap} className="cursor-pointer active:scale-95 transition-transform">
            <SmartImage 
                srcLocal="/images/sitbul.jpg" 
                srcOnline="/images/sitbul.jpg" 
                alt="Logo Situbuleud Food Market" 
                className="w-48 h-48 sm:w-64 sm:h-64 object-contain rounded-full pointer-events-none" 
            />
          </div>
        </div>
      </div>
      <div onClick={onGoToList} className="w-full cursor-pointer group z-10">
        <div className="bg-white rounded-t-[3rem] pb-12 pt-8 px-8 w-full max-w-md mx-auto relative transition-transform hover:-translate-y-2 duration-300 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
          <p className="text-[#0B2545] text-center font-bold text-lg mb-6 tracking-wide">KLIK UNTUK LIHAT MENU</p>
          <div className="flex justify-center gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="transition-all duration-500 animate-bounce" style={{ animationDelay: `${i * 100}ms` }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#4B6584" className="group-hover:fill-[#0B2545]"><path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z"/></svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const OutletListPage = ({ onBack, onOpenMenu, animationClass, outlets, allMenus, isAdmin, onLogoutAdmin, onSecretTrigger, onRequestDelete, onRequestEdit, onAdd, searchQuery, draftQuery, setDraftQuery, executeSearch }) => {
  const handleTitleTap = useSecretTap(onSecretTrigger);
  const getBadgeColor = (code) => {
      if (!code) return 'bg-gray-500 text-white';
      if (code.startsWith('A')) return 'bg-yellow-500 text-white';
      if (code.startsWith('B')) return 'bg-blue-600 text-white';
      if (code.startsWith('C')) return 'bg-orange-500 text-white';
      if (code.startsWith('D')) return 'bg-emerald-600 text-white';
      return 'bg-gray-500 text-white';
  };
  const filteredOutlets = outlets.filter(outlet => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return outlet.name.toLowerCase().includes(q) || outlet.category?.toLowerCase().includes(q) || (allMenus[outlet.id] || []).some(m => m.name.toLowerCase().includes(q));
    }).sort((a, b) => {
        if (a.block < b.block) return -1; if (a.block > b.block) return 1;
        return parseInt(a.code.slice(1)) - parseInt(b.code.slice(1));
    });

  return (
    <div className={`min-h-screen bg-slate-50 font-inter pb-10 ${animationClass}`}>
      <div className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto"><button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors"><ArrowLeft className="w-6 h-6 text-[#0B2545]" /></button><h2 className="text-xl font-bold text-[#213C66] cursor-default select-none" onClick={handleTitleTap}>Situbuleud Food Market {isAdmin && <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full border border-green-200">Admin</span>}</h2></div>
          <div className="flex items-center gap-2 w-full sm:w-auto"><form className="relative w-full sm:w-64" onSubmit={(e) => { e.preventDefault(); executeSearch(); }}><input type="text" placeholder="Cari menu atau outlet..." value={draftQuery} onChange={(e) => setDraftQuery(e.target.value)} className="w-full pl-3 pr-10 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#213C66] outline-none" /><button type="submit" className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 hover:bg-slate-100 rounded-full"><Search className="w-4 h-4 text-slate-400" /></button></form>{isAdmin && (<div className="flex gap-2"><button onClick={onAdd} className="bg-[#0B2545] text-white p-2 rounded-full shadow-lg hover:bg-blue-900 transition-colors flex items-center gap-1 text-xs font-bold whitespace-nowrap flex-shrink-0"><PlusIcon className="w-4 h-4" /> Tambah</button><button onClick={onLogoutAdmin} className="bg-slate-200 text-slate-700 p-2 rounded-full shadow hover:bg-slate-300 transition-colors" title="Logout Admin"><LockIcon className="w-4 h-4" /></button></div>)}</div>
        </div>
      </div>
      <div className="p-4 space-y-6">
        <div className="bg-[#0B2545] rounded-2xl p-6 shadow-lg relative overflow-hidden"><h3 className="text-white font-bold mb-4 text-center tracking-wide border-b border-white/20 pb-2">DENAH LOKASI OUTLET</h3><div className="bg-slate-100 rounded-lg p-2 h-64 relative overflow-hidden border-2 border-slate-300"><svg viewBox="0 0 320 280" className="w-full h-full font-bold"><rect width="320" height="280" fill="#F3F4F6" /><g fill="#F97316" stroke="#C2410C" strokeWidth="0.5">{[1, 2, 3, 4, 5, 6].map((num, i) => (<g key={`C1-${i}`}><rect x={10 + (i*17)} y={10} width="17" height="25" /><text x={18.5 + (i*17)} y={27} fontSize="9" textAnchor="middle" fill="black" stroke="none">{num}</text></g>))}</g><rect x={112} y={10} width="17" height="25" fill="#F97316" stroke="#C2410C" strokeWidth="0.5" /><text x={120.5} y={27} fontSize="12" textAnchor="middle" fill="white" fontWeight="900" stroke="none">C</text><g fill="#F97316" stroke="#C2410C" strokeWidth="0.5">{[7, 8, 9, 10, 11, 12].map((num, i) => (<g key={`C2-${i}`}><rect x={129 + (i*17)} y={10} width="17" height="25" /><text x={137.5 + (i*17)} y={27} fontSize="9" textAnchor="middle" fill="black" stroke="none">{num}</text></g>))}</g><rect x={240} y={10} width="70" height="25" fill="#A3E635" stroke="#365314" strokeWidth="0.5" /><text x={275} y={26} fontSize="10" textAnchor="middle" fill="#1A2E05" fontWeight="bold" stroke="none">TOILET</text><rect x={240} y={50} width="70" height="70" fill="#D9F99D" stroke="#365314" strokeWidth="0.5" /><text x={275} y={90} fontSize="10" textAnchor="middle" fill="#365314" fontWeight="bold" stroke="none">MASJID</text><g fill="#2563EB" stroke="#1E3A8A" strokeWidth="0.5">{[12, 11, 10, 9, 8, 7].map((num, i) => (<g key={`B1-${i}`}><rect x={20} y={50 + (i*18)} width="25" height="18" /><text x={32.5} y={62 + (i*18)} fontSize="9" textAnchor="middle" fill="black" stroke="none">{num}</text></g>))}</g><rect x={45} y={50} width="20" height="108" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="0.5" /><text x={55} y={108} fontSize="14" textAnchor="middle" fill="white" fontWeight="900" stroke="none">B</text><g fill="#2563EB" stroke="#1E3A8A" strokeWidth="0.5">{[6, 5, 4, 3, 2, 1].map((num, i) => (<g key={`B2-${i}`}><rect x={65} y={50 + (i*18)} width="25" height="18" /><text x={77.5} y={62 + (i*18)} fontSize="9" textAnchor="middle" fill="black" stroke="none">{num}</text></g>))}</g><g fill="#059669" stroke="#064E3B" strokeWidth="0.5">{[3, 2, 1].map((num, i) => (<g key={`D1-${i}`}><rect x={110} y={50 + (i*36)} width="25" height="36" /><text x={122.5} y={70 + (i*36)} fontSize="10" textAnchor="middle" fill="black" stroke="none">{num}</text></g>))}</g><rect x={135} y={50} width="20" height="108" fill="#10B981" stroke="#064E3B" strokeWidth="0.5" /><text x={145} y={108} fontSize="14" textAnchor="middle" fill="white" fontWeight="900" stroke="none">D</text><g fill="#059669" stroke="#064E3B" strokeWidth="0.5">{[6, 5, 4].map((num, i) => (<g key={`D2-${i}`}><rect x={155} y={50 + (i*36)} width="25" height="36" /><text x={167.5} y={70 + (i*36)} fontSize="10" textAnchor="middle" fill="black" stroke="none">{num}</text></g>))}</g><g fill="#EAB308" stroke="#713F12" strokeWidth="0.5">{[6, 5, 4, 3, 2, 1].map((num, i) => (<g key={`A1-${i}`}><rect x={20} y={170 + (i*15)} width="25" height="15" /><text x={32.5} y={181 + (i*15)} fontSize="8" textAnchor="middle" fill="black" stroke="none">{num}</text></g>))}</g><rect x={45} y={170} width="20" height="90" fill="#FACC15" stroke="#713F12" strokeWidth="0.5" /><text x={55} y={215} fontSize="12" textAnchor="middle" fill="white" fontWeight="900" stroke="none">A</text><g fill="#EAB308" stroke="#713F12" strokeWidth="0.5">{[12, 11, 10, 9, 8, 7].map((num, i) => (<g key={`A2-${i}`}><rect x={65} y={170 + (i*15)} width="25" height="15" /><text x={77.5} y={181 + (i*15)} fontSize="8" textAnchor="middle" fill="black" stroke="none">{num}</text></g>))}</g><rect x={110} y={170} width="70" height="90" fill="#64748B" /><line x1="145" y1="180" x2="145" y2="200" stroke="white" strokeWidth="2" /><line x1="145" y1="210" x2="145" y2="230" stroke="white" strokeWidth="2" /><line x1="145" y1="240" x2="145" y2="260" stroke="white" strokeWidth="2" /><rect x={180} y={170} width="130" height="90" fill="#BFDBFE" /><text x={245} y={215} fontSize="10" textAnchor="middle" fill="#1E3A8A" fontWeight="bold">AREA PARKIR</text></svg></div></div>
        <div>
          <h3 className="text-[#0B2545] font-bold text-lg mb-4">List Outlet ({filteredOutlets.length})</h3>
          {filteredOutlets.length === 0 ? (<div className="bg-white p-8 rounded-2xl text-center text-slate-400 shadow-sm"><Search className="w-8 h-8 mx-auto mb-3 text-slate-300" /><p className="font-bold mb-1">Outlet Tidak Ditemukan</p></div>) : (
            <div className="grid grid-cols-2 gap-4">{filteredOutlets.map((outlet) => (<div key={outlet.id} className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col relative group/card"><div className="h-28 rounded-xl w-full mb-3 overflow-hidden bg-slate-100 relative z-0"><SmartImage srcOnline={outlet.imageOnline} alt={outlet.name} className="w-full h-full object-cover" />{isAdmin && (<div className="absolute top-2 right-2 z-10 flex gap-1"><button onClick={(e) => { e.stopPropagation(); onRequestEdit(outlet); }} className="bg-yellow-500 text-white p-1.5 rounded-full hover:bg-yellow-600 shadow-md"><EditIcon className="w-3.5 h-3.5" /></button><button onClick={(e) => { e.stopPropagation(); onRequestDelete(outlet); }} className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow-md"><TrashIcon className="w-3.5 h-3.5" /></button></div>)}</div><div className="flex justify-between items-start mb-1 w-full"><h4 className="font-bold text-[#0B2545] text-sm leading-tight truncate pr-1">{outlet.name}</h4><span className={`text-[10px] px-1.5 py-0.5 rounded font-bold flex-shrink-0 ${getBadgeColor(outlet.code)}`}>{outlet.code || "N/A"}</span></div><button onClick={() => onOpenMenu(outlet)} className="mt-auto w-full bg-[#0B2545] text-white text-xs font-bold py-2 rounded-lg hover:bg-[#163A66] transition-colors">Lihat Menu</button></div>))}</div>
          )}
        </div>
        <div className="mt-8 border-t border-slate-200 pt-6"><h3 className="text-[#0B2545] font-bold text-lg mb-4">Info & Lokasi</h3><div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0"><Clock className="w-5 h-5" /></div><div><p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Jam Operasional</p><p className="text-sm font-bold text-slate-700">Open Daily : 7 AM - 11 PM</p></div></div><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 flex items-center justify-center text-white shrink-0"><Instagram className="w-5 h-5" /></div><div><p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Instagram</p><p className="text-sm font-bold text-slate-700">@sitbul.foodmarket</p></div></div><div className="flex items-start gap-3"><div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0 mt-1"><MapPin className="w-5 h-5" /></div><div><p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Alamat</p><p className="text-sm font-bold text-slate-700 leading-relaxed">Jl. K.K Singawinata No.72-47, Nagri Tengah, Kec. Purwakarta, Kabupaten Purwakarta, Jawa Barat 41114, Indonesia</p></div></div></div></div>
      </div>
    </div>
  );
};

const MenuPage = ({ onBack, outlet, animationClass, onZoomImage, menuList, isAdmin, onAddMenu, onRequestDeleteMenu, onRequestEditMenu, onRequestEditOutlet }) => {
 const specialMenus = menuList.filter(m => m.is_special === true); 
 const otherMenus = menuList.filter(m => m.is_special !== true);
 const getBadgeColor = (code) => { if (!code) return 'bg-gray-500 text-white'; if (code.startsWith('A')) return 'bg-yellow-500 text-white'; if (code.startsWith('B')) return 'bg-blue-600 text-white'; if (code.startsWith('C')) return 'bg-orange-500 text-white'; if (code.startsWith('D')) return 'bg-emerald-600 text-white'; return 'bg-gray-500 text-white'; };
 const getBadgeText = (code) => { if (!code) return 'text-gray-500'; if (code.startsWith('A')) return 'text-yellow-500'; if (code.startsWith('B')) return 'text-blue-600'; if (code.startsWith('C')) return 'text-orange-500'; if (code.startsWith('D')) return 'text-emerald-600'; return 'text-gray-500'; };

 return (
   <div className={`min-h-screen bg-slate-50 font-inter pb-20 ${animationClass}`}>
     <div className="bg-white sticky top-0 z-50 shadow-sm py-4"><div className="px-4 flex items-center justify-between"><div className="flex items-center gap-4"><button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors"><ArrowLeft className="w-6 h-6 text-[#0B2545]" /></button><h2 className="text-xl font-bold text-[#0B2545]">{outlet?.name}</h2></div></div></div>
     <div className="p-4 space-y-6">
         <div className="w-full h-56 rounded-2xl overflow-hidden shadow-lg relative bg-slate-200"><SmartImage srcOnline={outlet?.imageOnline} alt={outlet?.name} className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div><div className={`absolute bottom-4 left-4 p-1.5 rounded-full shadow-lg ${getBadgeColor(outlet?.code)}`}><div className="w-10 h-10 rounded-full bg-white flex items-center justify-center"><span className={`font-bold text-lg ${getBadgeText(outlet?.code)}`}>{outlet?.code}</span></div></div></div>
         
         <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-black">Menu Spesial</h3>
                {isAdmin && (<button onClick={() => onAddMenu('special')} className="bg-[#0B2545] text-white px-3 py-1.5 rounded-full shadow-lg hover:bg-blue-900 transition-colors flex items-center gap-1 text-xs font-bold whitespace-nowrap"><PlusIcon className="w-3 h-3" /> Menu</button>)}
            </div>
            {specialMenus.length > 0 ? (<div className="grid grid-cols-2 gap-4">{specialMenus.map((menu) => (<div key={menu.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all relative group">{isAdmin && (<div className="absolute top-2 right-2 z-10 flex gap-1"><button onClick={() => onRequestEditMenu(menu)} className="bg-yellow-500 text-white p-1 rounded-full shadow-md"><EditIcon className="w-3 h-3" /></button><button onClick={() => onRequestDeleteMenu(menu)} className="bg-red-500 text-white p-1 rounded-full shadow-md"><TrashIcon className="w-3 h-3" /></button></div>)}<div className="h-32 w-full relative bg-slate-100"><SmartImage srcOnline={menu.imageOnline} alt={menu.name} className="w-full h-full object-cover" onClick={(src) => onZoomImage(src)} /></div><div className="p-3"><h4 className="font-bold text-slate-800 text-sm mb-1 leading-tight">{menu.name}</h4><p className="text-[#0B2545] font-bold text-xs mb-2">{formatRupiah(menu.price)}</p></div></div>))}</div>) : <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-xl"><p className="text-sm">Belum ada menu spesial.</p></div>}
         </div>

         {(otherMenus.length > 0 || isAdmin) && (
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-black">Menu Lainnya</h3>
                    {/* TOMBOL + MENU SUDAH DIHAPUS DARI SINI SESUAI PERMINTAAN */}
                </div>
                {otherMenus.length > 0 ? (<div className="grid grid-cols-3 gap-2">{otherMenus.map((menu) => (<div key={menu.id} className="bg-white rounded-lg shadow-sm border border-slate-100 p-2 flex flex-col justify-between hover:shadow-md transition-all text-center h-full relative">{isAdmin && (<div className="absolute top-1 right-1 z-10 flex gap-1"><button onClick={() => onRequestEditMenu(menu)} className="text-yellow-500 bg-white rounded-full p-0.5 shadow"><EditIcon className="w-3 h-3" /></button><button onClick={() => onRequestDeleteMenu(menu)} className="text-red-500 bg-white rounded-full p-0.5 shadow"><XIcon className="w-4 h-4" /></button></div>)}<h4 className="font-bold text-slate-800 text-[10px] leading-tight mb-1">{menu.name}</h4><p className="text-[#0B2545] font-bold text-[10px]">{formatRupiah(menu.price)}</p></div>))}</div>) : (isAdmin ? <div className="text-center py-4 text-slate-400 bg-slate-50 rounded-xl"><p className="text-xs">Belum ada menu lainnya.</p></div> : null)}
            </div>
         )}

         <div className="mt-8 border-t border-slate-200 pt-6"><div className="flex justify-between items-center mb-4"><h3 className="font-bold text-lg text-[#0B2545]">Info & Pemesanan</h3>{isAdmin && (<button onClick={() => onRequestEditOutlet(outlet)} className="bg-[#0B2545] text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-blue-900 transition-colors"><EditIcon className="w-3 h-3" /> Edit Info</button>)}</div><div className="space-y-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 flex items-center justify-center text-white shrink-0"><Instagram className="w-5 h-5" /></div><div><p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Instagram</p><p className="text-sm font-bold text-slate-700">@{outlet?.name.replace(/\s+/g, '').toLowerCase()}_sb</p></div></div><div className="h-px bg-slate-100 my-2"></div><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center shrink-0 p-1"><svg viewBox="0 0 24 24" className="w-full h-full text-green-600 fill-current"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" fill="white" /></svg></div><div><p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">GoFood</p><p className="text-sm font-bold text-slate-700">{outlet.gofood || outlet.name}</p></div></div><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white shrink-0 p-1.5"><ShoppingBag className="w-full h-full stroke-white" /></div><div><p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ShopeeFood</p><p className="text-sm font-bold text-slate-700">{outlet.shopee || outlet.name}</p></div></div><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white shrink-0 p-1"><span className="font-bold text-[10px] italic">Grab</span></div><div><p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">GrabFood</p><p className="text-sm font-bold text-slate-700">{outlet.grab || outlet.name}</p></div></div></div></div>
     </div>
   </div>
 );
};

// --- MAIN COMPONENT ---
export default function App() {
 const [currentPage, setCurrentPage] = useState('landing');
 const [selectedOutlet, setSelectedOutlet] = useState(null);
 const [direction, setDirection] = useState('forward');
 const [zoomedImage, setZoomedImage] = useState(null);
 const [alertInfo, setAlertInfo] = useState({ show: false, title: '', message: '' });
 const [menuAddType, setMenuAddType] = useState(null);
 
 const [outlets, setOutlets] = useState([]);
 const [allMenus, setAllMenus] = useState({});

 const showAlert = (title, message) => setAlertInfo({ show: true, title, message });

 useEffect(() => {
    const fetchData = async () => {
        const { data: outletData, error: outletError } = await supabase.from('outlets').select('*').order('code', { ascending: true });
        if (outletError) console.error(outletError);
        else {
            setOutlets(outletData.map(o => ({ ...o, imageOnline: o.image_url })));
        }

        const { data: menuData, error: menuError } = await supabase.from('menus').select('*').order('id', { ascending: true });
        if (menuError) console.error(menuError);
        else {
            const grouped = menuData.reduce((acc, menu) => {
                const oid = menu.outlet_id;
                if (!acc[oid]) acc[oid] = [];
                acc[oid].push({ ...menu, imageOnline: menu.image_url });
                return acc;
            }, {});
            setAllMenus(grouped);
        }
    };
    fetchData();
 }, []);

 const [isAdmin, setIsAdmin] = useState(false);
 const [showLoginModal, setShowLoginModal] = useState(false);
 const [passwordInput, setPasswordInput] = useState('');
 const [loginError, setLoginError] = useState(false);
 const [showAddModal, setShowAddModal] = useState(false);
 const [newOutlet, setNewOutlet] = useState({ name: '', category: '', block: 'A', number: '1', image: null }); 
 const [showAddMenuModal, setShowAddMenuModal] = useState(false);
 const [newMenu, setNewMenu] = useState({ name: '', price: '', image: null });
 const [showEditOutletModal, setShowEditOutletModal] = useState(false);
 const [editingOutlet, setEditingOutlet] = useState(null);
 const [showEditMenuModal, setShowEditMenuModal] = useState(false);
 const [editingMenu, setEditingMenu] = useState(null);
 const [showEditContactModal, setShowEditContactModal] = useState(false);
 const [editingContact, setEditingContact] = useState(null);
 const [outletToDelete, setOutletToDelete] = useState(null); 
 const [menuToDelete, setMenuToDelete] = useState(null); 
 const ADMIN_PIN = '1234';
 const [searchQuery, setSearchQuery] = useState(''); 
 const [draftQuery, setDraftQuery] = useState(''); 
  
 const handleGoToList = () => { setDirection('forward'); setCurrentPage('list'); };
 const handleOpenMenu = (outlet) => { setDirection('forward'); setSelectedOutlet(outlet); setCurrentPage('menu'); window.scrollTo(0, 0); };
 const executeSearch = () => setSearchQuery(draftQuery);
 const handleBack = () => { setDirection('back'); if (currentPage === 'menu') setCurrentPage('list'); else { setCurrentPage('landing'); setSearchQuery(''); setDraftQuery(''); }};
 const requestDelete = (outlet) => setOutletToDelete(outlet); 
  
 const confirmDelete = async () => {
   if (outletToDelete) {
       const { error } = await supabase.from('outlets').delete().eq('id', outletToDelete.id);
       if (!error) {
           setOutlets(prev => prev.filter(item => item.id !== outletToDelete.id));
           const newMenus = { ...allMenus }; delete newMenus[outletToDelete.id]; setAllMenus(newMenus);
           setOutletToDelete(null);
       } else showAlert('Error', error.message);
   }
 };

 const handleAddOutlet = async (e) => {
   e.preventDefault();
   const code = `${newOutlet.block}${newOutlet.number}`;
   if (outlets.some(o => o.code === code)) return showAlert('Gagal', `Slot ${code} sudah terisi!`);

   let imageUrl = null;
   if (newOutlet.image) imageUrl = await uploadImageToSupabase(newOutlet.image, 'outlets');

   const { data, error } = await supabase.from('outlets').insert([{
        code, block: newOutlet.block, name: newOutlet.name, category: newOutlet.category || 'Umum', image_url: imageUrl
   }]).select();

   if (!error && data) {
       setOutlets(prev => [...prev, { ...data[0], imageOnline: data[0].image_url }]);
       setAllMenus(prev => ({ ...prev, [data[0].id]: [] }));
       setShowAddModal(false); setNewOutlet({ name: '', category: '', block: 'A', number: '1', image: null });
   } else showAlert('Error', error?.message);
 };

 const handleUpdateOutlet = async (e) => {
    e.preventDefault();
    let imageUrl = await uploadImageToSupabase(editingOutlet.image, 'outlets');
    
    const { error } = await supabase.from('outlets').update({
        name: editingOutlet.name, image_url: imageUrl
    }).eq('id', editingOutlet.id);

    if (!error) {
        const updated = { ...editingOutlet, imageOnline: imageUrl };
        setOutlets(prev => prev.map(o => o.id === editingOutlet.id ? { ...o, ...updated } : o));
        if (selectedOutlet?.id === editingOutlet.id) setSelectedOutlet({ ...selectedOutlet, ...updated });
        setShowEditOutletModal(false); setEditingOutlet(null);
    } else showAlert('Error', error.message);
 };

 const requestEditContact = (outlet) => { setEditingContact({ ...outlet }); setShowEditContactModal(true); };
 const handleUpdateContact = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('outlets').update({
        wa: editingContact.wa, ig: editingContact.ig, gofood: editingContact.gofood, shopee: editingContact.shopee, grab: editingContact.grab
    }).eq('id', editingContact.id);

    if (!error) {
        setOutlets(prev => prev.map(o => o.id === editingContact.id ? { ...o, ...editingContact } : o));
        if (selectedOutlet?.id === editingContact.id) setSelectedOutlet({ ...selectedOutlet, ...editingContact });
        setShowEditContactModal(false); setEditingContact(null);
    } else showAlert('Error', error.message);
 };

 const handleAddMenuSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOutlet) return;
    const isSpecial = menuAddType === 'special';
    // Logic: Menu Other tidak perlu foto, Menu Special boleh foto
    let imageUrl = isSpecial && newMenu.image ? await uploadImageToSupabase(newMenu.image, 'menus') : null;

    const { data, error } = await supabase.from('menus').insert([{
        outlet_id: selectedOutlet.id, name: newMenu.name, price: parseRupiah(newMenu.price), image_url: imageUrl, is_special: isSpecial
    }]).select();

    if (!error && data) {
        const newItem = { ...data[0], imageOnline: data[0].image_url };
        setAllMenus(prev => ({ ...prev, [selectedOutlet.id]: [...(prev[selectedOutlet.id]||[]), newItem] }));
        setShowAddMenuModal(false); setNewMenu({ name: '', price: '', image: null });
    } else showAlert('Error', error?.message);
 };
  
 const requestDeleteMenu = (menu) => setMenuToDelete(menu);
 const confirmDeleteMenu = async () => {
    if (menuToDelete && selectedOutlet) {
        const { error } = await supabase.from('menus').delete().eq('id', menuToDelete.id);
        if (!error) {
            setAllMenus(prev => ({ ...prev, [selectedOutlet.id]: prev[selectedOutlet.id].filter(m => m.id !== menuToDelete.id) }));
            setMenuToDelete(null);
        } else showAlert('Error', error.message);
    }
 };

 const requestEdit = (outlet) => { setEditingOutlet({ ...outlet, image: outlet.imageOnline }); setShowEditOutletModal(true); };
 const requestEditMenu = (menu) => { setEditingMenu({ ...menu, image: menu.imageOnline, price: formatRupiahInput(menu.price) }); setShowEditMenuModal(true); };

 const handleUpdateMenu = async (e) => {
    e.preventDefault();
    let imageUrl = await uploadImageToSupabase(editingMenu.image, 'menus');
    const { error } = await supabase.from('menus').update({
        name: editingMenu.name, price: parseRupiah(editingMenu.price), image_url: imageUrl
    }).eq('id', editingMenu.id);

    if (!error) {
        setAllMenus(prev => ({ ...prev, [selectedOutlet.id]: prev[selectedOutlet.id].map(m => m.id === editingMenu.id ? { ...m, ...editingMenu, price: parseRupiah(editingMenu.price), imageOnline: imageUrl } : m) }));
        setShowEditMenuModal(false); setEditingMenu(null);
    } else showAlert('Error', error.message);
 };

 const handleOutletImageChange = async (e) => { const file = e.target.files[0]; if (file) { const resized = await resizeImage(file); if(resized) setNewOutlet({ ...newOutlet, image: resized }); }};
 const handleEditOutletImageChange = async (e) => { const file = e.target.files[0]; if (file) { const resized = await resizeImage(file); if(resized) setEditingOutlet({ ...editingOutlet, image: resized }); }};
 const handleImageChange = async (e) => { const file = e.target.files[0]; if (file) { const resized = await resizeImage(file); if(resized) setNewMenu({ ...newMenu, image: resized }); }};
 const handleEditMenuImageChange = async (e) => { const file = e.target.files[0]; if (file) { const resized = await resizeImage(file); if(resized) setEditingMenu({ ...editingMenu, image: resized }); }};
 const handleAdminClick = () => { if (isAdmin) setIsAdmin(false); else { setShowLoginModal(true); setLoginError(false); setPasswordInput(''); } };
 const submitLogin = (e) => { e.preventDefault(); if (passwordInput === ADMIN_PIN) { setIsAdmin(true); setDirection('forward'); setCurrentPage('list'); setShowLoginModal(false); } else setLoginError(true); };
 const handleSecretTrigger = () => { setShowLoginModal(true); setLoginError(false); setPasswordInput(''); };
 const handleLogoutAdmin = () => setIsAdmin(false);
 const handleOpenAddMenu = (type) => { setMenuAddType(type); setShowAddMenuModal(true); setNewMenu({ name: '', price: '', image: null }); };
 const animationClass = direction === 'back' ? 'animate-slide-in-left' : 'animate-slide-in-right';

 return (
   <>
     <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap'); .font-inter { font-family: 'Inter', sans-serif; } @keyframes slide-in-right { from { opacity: 0; transform: translateX(10%); } to { opacity: 1; transform: translateX(0); } } .animate-slide-in-right { animation: slide-in-right 0.3s ease-out forwards; } @keyframes slide-in-left { from { opacity: 0; transform: translateX(-10%); } to { opacity: 1; transform: translateX(0); } } .animate-slide-in-left { animation: slide-in-left 0.3s ease-out forwards; } @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } } .animate-fade-in { animation: fade-in 0.3s ease-out forwards; } @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; } @keyframes zoom-in { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } } .animate-zoom-in { animation: zoom-in 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }`}</style>
     {zoomedImage && <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4" onClick={() => setZoomedImage(null)}><div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}><button onClick={() => setZoomedImage(null)} className="absolute top-4 right-4 text-white p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-50"><XIcon className="w-8 h-8" /></button><img src={zoomedImage} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-zoom-in" /></div></div>}
     <Modal isOpen={alertInfo.show} className="max-w-xs text-center" zIndex="z-[150]"><div className="flex justify-center mb-3"><div className="bg-blue-100 p-3 rounded-full"><Info className="w-6 h-6 text-[#0B2545]" /></div></div><h3 className="text-lg font-bold text-[#0B2545] mb-2">{alertInfo.title}</h3><p className="text-sm text-slate-600 mb-6">{alertInfo.message}</p><button onClick={() => setAlertInfo({ ...alertInfo, show: false })} className="w-full py-2 text-sm font-bold text-white bg-[#0B2545] rounded-lg hover:bg-[#163A66]">OK</button></Modal>
     <Modal isOpen={!!outletToDelete} className="max-w-sm text-center"><h3 className="text-lg font-bold">Hapus Outlet?</h3><div className="flex gap-3 mt-4"><button onClick={() => setOutletToDelete(null)} className="flex-1 py-2 bg-gray-100 rounded">Batal</button><button onClick={confirmDelete} className="flex-1 py-2 bg-red-600 text-white rounded">Hapus</button></div></Modal>
     <Modal isOpen={!!menuToDelete} className="max-w-sm text-center"><h3 className="text-lg font-bold">Hapus Menu?</h3><div className="flex gap-3 mt-4"><button onClick={() => setMenuToDelete(null)} className="flex-1 py-2 bg-gray-100 rounded">Batal</button><button onClick={confirmDeleteMenu} className="flex-1 py-2 bg-red-600 text-white rounded">Hapus</button></div></Modal>
     <Modal isOpen={showLoginModal} className="max-w-xs text-center"><div className="flex justify-center mb-4"><div className="bg-slate-100 p-3 rounded-full"><LockKeyhole className="w-6 h-6 text-[#0B2545]" /></div></div><h3 className="text-center font-bold text-[#0B2545] mb-2">Admin Login</h3><p className="text-center text-xs text-slate-400 mb-4">Klik 3x pada Logo untuk Membuka.</p><p className="text-center text-xs text-slate-400 mb-4">Masukkan PIN:</p><form onSubmit={submitLogin}><input type="password" autoFocus className="w-full text-center text-2xl tracking-widest border border-slate-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-[#0B2545] outline-none" value={passwordInput} onChange={(e) => { setPasswordInput(e.target.value); setLoginError(false); }} placeholder="••••" maxLength={4} />{loginError && <p className="text-center text-xs text-red-500 font-bold mb-3">PIN Salah!</p>}<div className="flex gap-2"><button type="button" onClick={() => setShowLoginModal(false)} className="flex-1 py-2 text-sm font-bold text-slate-500 bg-slate-100 rounded-lg hover:bg-slate-200">Batal</button><button type="submit" className="flex-1 py-2 text-sm font-bold text-white bg-[#0B2545] rounded-lg hover:bg-[#163A66]">Masuk</button></div></form></Modal>
     <Modal isOpen={showAddModal} className="max-w-md"><h3 className="text-lg font-bold text-[#0B2545] mb-4">Tambah Outlet Baru</h3><form onSubmit={handleAddOutlet} className="space-y-4 mt-4"><label className="block w-full h-32 bg-gray-100 border-2 border-dashed flex items-center justify-center cursor-pointer rounded-xl hover:border-[#0B2545] transition-colors relative overflow-hidden">{newOutlet.image ? <img src={newOutlet.image} className="h-full w-full object-cover" /> : <div className="text-center"><Camera className="w-6 h-6 mx-auto text-slate-400" /><span className="text-xs text-slate-400">Upload Foto</span></div>}<input type="file" hidden onChange={handleOutletImageChange} accept="image/png, image/jpeg, image/jpg" /></label><input value={newOutlet.name} onChange={e=>setNewOutlet({...newOutlet, name: e.target.value})} placeholder="Nama Outlet" className="w-full border p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0B2545]" required /><div className="grid grid-cols-2 gap-2"><select value={newOutlet.block} onChange={e=>setNewOutlet({...newOutlet, block: e.target.value, number: '1'})} className="w-full border p-2.5 rounded-lg text-sm outline-none bg-white">{Object.entries(BLOCK_LIMITS).map(([blockKey, limit]) => { const count = outlets.filter(o => o.block === blockKey).length; return (<option key={blockKey} value={blockKey}>Blok {blockKey} (Sisa {limit - count})</option>); })}</select><select value={newOutlet.number} onChange={e => setNewOutlet({...newOutlet, number: e.target.value})} className="w-full border p-2.5 rounded-lg text-sm outline-none bg-white">{Array.from({ length: BLOCK_LIMITS[newOutlet.block] }, (_, i) => { const num = i + 1; const codeToCheck = `${newOutlet.block}${num}`; const isTaken = outlets.some(o => o.code === codeToCheck); const outletName = isTaken ? outlets.find(o => o.code === codeToCheck).name : ''; return (<option key={num} value={num} className={isTaken ? "text-red-500 bg-red-50" : "text-green-600"}>{num} {isTaken ? `(Terisi: ${outletName})` : "(Kosong)"}</option>); })}</select></div><div className="flex gap-3 mt-4"><button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">Batal</button><button type="submit" className="flex-1 py-2.5 text-sm font-bold text-white bg-[#0B2545] rounded-xl hover:bg-[#163A66] transition-colors shadow-lg shadow-blue-900/20">Simpan</button></div></form></Modal>
     <Modal isOpen={showEditOutletModal} className="max-w-md"><h3 className="text-lg font-bold text-[#0B2545] mb-4">Edit Outlet</h3>{editingOutlet && (<form onSubmit={handleUpdateOutlet} className="space-y-4 mt-4"><label className="block w-full h-32 bg-gray-100 border-2 border-dashed flex items-center justify-center cursor-pointer rounded-xl hover:border-[#0B2545] transition-colors relative overflow-hidden">{editingOutlet.image ? <img src={editingOutlet.image} className="h-full w-full object-cover" /> : <span>Ganti Foto</span>}<input type="file" hidden onChange={handleEditOutletImageChange} accept="image/png, image/jpeg, image/jpg" /></label><input value={editingOutlet.name} onChange={e=>setEditingOutlet({...editingOutlet, name: e.target.value})} className="w-full border p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0B2545]" /><div className="grid grid-cols-1 gap-2"><select value={editingOutlet.block || 'A'} disabled className="w-full border p-2.5 rounded-lg text-sm outline-none bg-gray-100 text-gray-500"><option>{editingOutlet.block || 'A'}</option></select></div><div className="flex gap-3 mt-4"><button type="button" onClick={() => setShowEditOutletModal(false)} className="flex-1 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Batal</button><button type="submit" className="flex-1 py-2.5 text-sm font-bold text-white bg-[#0B2545] rounded-lg hover:bg-[#163A66]">Simpan Perubahan</button></div></form>)}</Modal>
     <Modal isOpen={showEditContactModal} className="max-w-md"><h3 className="text-lg font-bold text-[#0B2545] mb-4">Edit Kontak Outlet</h3>{editingContact && (<form onSubmit={handleUpdateContact} className="space-y-4 mt-4"><div className="grid grid-cols-2 gap-3"><div><label className="text-xs font-bold text-slate-500">Instagram (Tanpa @)</label><input value={editingContact.ig || ''} onChange={e=>setEditingContact({...editingContact, ig: e.target.value})} placeholder="username" className="w-full border p-2 rounded text-sm mt-1" /></div><div><label className="text-xs font-bold text-slate-500">WhatsApp</label><input value={editingContact.wa || ''} onChange={e=>setEditingContact({...editingContact, wa: e.target.value})} placeholder="08xxx" className="w-full border p-2 rounded text-sm mt-1" /></div></div><div className="space-y-3 pt-2"><label className="text-xs font-bold text-slate-500">Nama Akun Aplikasi (Bukan Link)</label><input value={editingContact.gofood || ''} onChange={e=>setEditingContact({...editingContact, gofood: e.target.value})} placeholder="Nama di GoFood" className="w-full border p-2 rounded text-sm" /><input value={editingContact.shopee || ''} onChange={e=>setEditingContact({...editingContact, shopee: e.target.value})} placeholder="Nama di ShopeeFood" className="w-full border p-2 rounded text-sm" /><input value={editingContact.grab || ''} onChange={e=>setEditingContact({...editingContact, grab: e.target.value})} placeholder="Nama di GrabFood" className="w-full border p-2 rounded text-sm" /></div><div className="flex gap-3 mt-4"><button type="button" onClick={() => setShowEditContactModal(false)} className="flex-1 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Batal</button><button type="submit" className="flex-1 py-2.5 text-sm font-bold text-white bg-[#0B2545] rounded-lg hover:bg-[#163A66]">Simpan</button></div></form>)}</Modal>
     <Modal isOpen={showAddMenuModal} className="max-w-md"><h3>Tambah Menu {menuAddType === 'special' ? 'Spesial' : 'Lainnya'}</h3><form onSubmit={handleAddMenuSubmit} className="space-y-4 mt-4">{menuAddType === 'special' && (<label className="block w-full h-32 bg-gray-100 border-2 border-dashed flex items-center justify-center cursor-pointer rounded-xl overflow-hidden hover:border-[#0B2545] transition-colors relative overflow-hidden">{newMenu.image ? <img src={newMenu.image} className="h-full w-full object-cover" /> : <div className="text-center"><Camera className="w-6 h-6 mx-auto text-slate-400" /><span className="text-xs text-slate-400">Upload Foto</span></div>}<input type="file" hidden onChange={handleImageChange} accept="image/png, image/jpeg, image/jpg" /></label>)}<input value={newMenu.name} onChange={e=>setNewMenu({...newMenu, name: e.target.value})} placeholder="Nama Menu" className="w-full border p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0B2545]" required /><input type="text" value={newMenu.price} onChange={e=>setNewMenu({...newMenu, price: formatRupiahInput(e.target.value)})} placeholder="Harga (Rp)" className="w-full border p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0B2545]" required /><div className="flex gap-3 mt-4"><button type="button" onClick={() => setShowAddMenuModal(false)} className="flex-1 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">Batal</button><button type="submit" className="flex-1 py-2.5 text-sm font-bold text-white bg-[#0B2545] rounded-xl hover:bg-[#163A66] transition-colors shadow-lg shadow-blue-900/20">Tambah</button></div></form></Modal>
     <Modal isOpen={showEditMenuModal} className="max-w-md"><h3 className="text-lg font-bold text-[#0B2545] mb-4">Edit Menu</h3>{editingMenu && (<form onSubmit={handleUpdateMenu} className="space-y-4 mt-4">{(editingMenu.image || (allMenus[selectedOutlet.id] && allMenus[selectedOutlet.id].indexOf(editingMenu) < 6)) && (<label className="block w-full h-32 bg-gray-100 border-2 border-dashed flex items-center justify-center cursor-pointer rounded-xl overflow-hidden hover:border-[#0B2545] transition-colors relative overflow-hidden">{editingMenu.image ? <img src={editingMenu.image} className="h-full w-full object-cover" /> : <span className="text-xs">Foto</span>}<input type="file" hidden onChange={handleEditMenuImageChange} accept="image/png, image/jpeg, image/jpg" /></label>)}<input value={editingMenu.name} onChange={e=>setEditingMenu({...editingMenu, name: e.target.value})} className="w-full border p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0B2545]" /><input type="text" value={editingMenu.price} onChange={e=>setEditingMenu({...editingMenu, price: formatRupiahInput(e.target.value)})} className="w-full border p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0B2545]" /><div className="flex gap-3 mt-4"><button type="button" onClick={() => setShowEditMenuModal(false)} className="flex-1 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">Batal</button><button type="submit" className="flex-1 py-2.5 text-sm font-bold text-white bg-[#0B2545] rounded-lg hover:bg-[#163A66] transition-colors shadow-lg shadow-blue-900/20">Simpan Perubahan</button></div></form>)}</Modal>
     {currentPage === 'landing' && <LandingPage onGoToList={handleGoToList} animationClass={animationClass} onSecretTrigger={handleSecretTrigger} />}
     {currentPage === 'list' && <OutletListPage onBack={handleBack} onOpenMenu={handleOpenMenu} animationClass={animationClass} outlets={outlets} allMenus={allMenus} isAdmin={isAdmin} onLogoutAdmin={handleLogoutAdmin} onSecretTrigger={handleSecretTrigger} onRequestDelete={requestDelete} onRequestEdit={requestEdit} onAdd={() => setShowAddModal(true)} searchQuery={searchQuery} draftQuery={draftQuery} setDraftQuery={setDraftQuery} executeSearch={executeSearch} />}
     {currentPage === 'menu' && <MenuPage onBack={handleBack} outlet={selectedOutlet} animationClass={animationClass} onZoomImage={setZoomedImage} menuList={selectedOutlet ? (allMenus[selectedOutlet.id] || []) : []} isAdmin={isAdmin} onAddMenu={handleOpenAddMenu} onRequestDeleteMenu={requestDeleteMenu} onRequestEditMenu={requestEditMenu} onRequestEditOutlet={requestEditContact} />}
   </>
 );
}