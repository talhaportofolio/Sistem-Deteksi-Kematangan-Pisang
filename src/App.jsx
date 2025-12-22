import React, { useState, useRef } from 'react';
import { Upload, Camera, Activity, Utensils, Info, Check, Layers, ChefHat, Eye } from 'lucide-react';
// Import logika dari file processor.js
import { processBananaImage, recommendations } from './processor';

/**
 * APLIKASI DETEKSI KEMATANGAN PISANG (BananaSmart)
 * UI Layer
 */

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // Referensi Canvas
  const originalCanvasRef = useRef(null);
  const valueCanvasRef = useRef(null);
  const greenMaskRef = useRef(null);
  const yellowMaskRef = useRef(null);
  const brownMaskRef = useRef(null);
  const combinedCanvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fungsi wrapper yang menghubungkan UI dengan Processor
  const processImage = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const img = new Image();
      img.src = selectedImage;
      img.onload = () => {
        // 1. SETUP CANVAS & RESIZE
        const width = 400;
        const scale = width / img.width;
        const height = img.height * scale;

        const refs = [originalCanvasRef, valueCanvasRef, greenMaskRef, yellowMaskRef, brownMaskRef, combinedCanvasRef];
        
        // Atur ukuran semua canvas
        refs.forEach(ref => {
            if (ref.current) {
                ref.current.width = width;
                ref.current.height = height;
            }
        });

        // Gambar citra asli
        const ctxOriginal = originalCanvasRef.current.getContext('2d');
        ctxOriginal.drawImage(img, 0, 0, width, height);

        // Ambil data piksel mentah dari canvas asli
        const frame = ctxOriginal.getImageData(0, 0, width, height);
        const data = frame.data;

        // 2. PANGGIL FUNGSI PEMROSESAN (dari processor.js)
        const result = processBananaImage(data, width, height);

        // Cek Error
        if (result.error) {
            alert(result.error);
            setIsProcessing(false);
            return;
        }

        // 3. GAMBAR HASIL VISUALISASI KE CANVAS
        // Fungsi helper untuk mengisi canvas
        const putDataToCanvas = (ref, pixelData) => {
            const ctx = ref.current.getContext('2d');
            const imgData = ctx.createImageData(width, height);
            imgData.data.set(pixelData); // Salin data dari processor ke canvas
            ctx.putImageData(imgData, 0, 0);
        };

        putDataToCanvas(valueCanvasRef, result.masks.value);
        putDataToCanvas(greenMaskRef, result.masks.green);
        putDataToCanvas(yellowMaskRef, result.masks.yellow);
        putDataToCanvas(brownMaskRef, result.masks.brown);
        putDataToCanvas(combinedCanvasRef, result.masks.combined);

        // 4. TAMPILKAN HASIL STATISTIK
        setAnalysisResult({
            ...recommendations[result.resultKey],
            stats: result.stats
        });
        setIsProcessing(false);
      };
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800 pb-10">
      {/* Header */}
      <div className="bg-yellow-400 text-yellow-900 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-full shadow-sm">
               <Utensils size={24} className="text-yellow-600"/>
            </div>
            <div>
                <h1 className="text-xl font-bold leading-tight">BananaSmart</h1>
                <p className="text-xs font-medium opacity-80">Sistem Deteksi Kematangan & Rekomendasi</p>
            </div>
          </div>
          <button className="bg-yellow-100 hover:bg-white text-yellow-800 px-4 py-2 rounded-lg text-sm font-bold transition">
            Kelompok 3
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* KOLOM KIRI: INPUT & HASIL */}
        <div className="lg:col-span-5 space-y-6">
            
            {/* 1. Card Input */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
                <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Camera className="text-yellow-500"/> 1. Input Citra Pisang
                </h2>
                <div className="relative group cursor-pointer border-2 border-dashed border-neutral-300 rounded-xl bg-neutral-50 hover:bg-yellow-50 transition p-8 flex flex-col items-center justify-center text-center">
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"/>
                    <Upload size={40} className="text-neutral-400 mb-3 group-hover:text-yellow-600"/>
                    <p className="text-sm font-medium text-neutral-600">Klik untuk upload foto pisang</p>
                    <p className="text-xs text-neutral-400 mt-1">Disarankan background polos/putih</p>
                </div>
                {selectedImage && (
                    <div className="mt-4 animate-fade-in">
                        <img src={selectedImage} alt="Preview" className="w-full h-56 object-cover rounded-xl shadow-sm border"/>
                        <button 
                            onClick={processImage}
                            disabled={isProcessing}
                            className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-xl shadow-md transition flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? <Activity className="animate-spin"/> : <Check/>}
                            {isProcessing ? 'Sedang Menganalisis...' : 'Analisis Kematangan'}
                        </button>
                    </div>
                )}
            </div>

            {/* 2. Card Hasil (Muncul setelah proses) */}
            {analysisResult && (
                <div className={`bg-white rounded-2xl shadow-lg border-l-8 overflow-hidden animate-slide-up ${analysisResult.borderColor}`}>
                    <div className={`${analysisResult.bgColor} p-6 border-b border-neutral-100`}>
                        <p className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1">Hasil Deteksi</p>
                        <h2 className={`text-3xl font-bold ${analysisResult.color}`}>{analysisResult.status}</h2>
                        <p className="text-sm mt-2 font-medium text-neutral-700">{analysisResult.description}</p>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="bg-green-50 p-2 rounded-lg border border-green-100">
                                <p className="text-xs text-neutral-500">Hijau</p>
                                <p className="font-bold text-green-600">{analysisResult.stats.green}%</p>
                            </div>
                            <div className="bg-yellow-50 p-2 rounded-lg border border-yellow-100">
                                <p className="text-xs text-neutral-500">Kuning</p>
                                <p className="font-bold text-yellow-600">{analysisResult.stats.yellow}%</p>
                            </div>
                            <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
                                <p className="text-xs text-neutral-500">Bercak</p>
                                <p className="font-bold text-amber-700">{analysisResult.stats.brown}%</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-neutral-800 mb-3 flex items-center gap-2">
                                <ChefHat size={20} className="text-neutral-500"/> Rekomendasi Olahan
                            </h3>
                            <ul className="space-y-2">
                                {analysisResult.food.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                                        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                                        <span className="text-sm font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3 text-blue-800 text-sm">
                            <Info className="shrink-0 mt-0.5" size={18}/>
                            <p>{analysisResult.action}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* KOLOM KANAN: VISUALISASI PROSES (6 TAHAPAN) */}
        <div className="lg:col-span-7">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
                <h2 className="font-bold text-lg mb-6 flex items-center gap-2">
                    <Activity className="text-yellow-500"/> Visualisasi Tahapan Proses
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Visual 1: Citra Asli */}
                    <div className="space-y-2">
                        <span className="text-[10px] uppercase font-bold bg-neutral-100 px-2 py-1 rounded text-neutral-600">1. Input & Resize</span>
                        <canvas ref={originalCanvasRef} className="w-full h-40 bg-neutral-100 rounded-lg object-contain border"/>
                        <p className="text-[10px] text-neutral-400">Citra diubah ke lebar 400px.</p>
                    </div>

                    {/* Visual 2: Value Channel (Grayscale) */}
                    <div className="space-y-2">
                        <span className="text-[10px] uppercase font-bold bg-gray-100 px-2 py-1 rounded text-gray-700 flex items-center gap-1"><Eye size={10}/> 2. Pre-process (Value/Kecerahan)</span>
                        <canvas ref={valueCanvasRef} className="w-full h-40 bg-neutral-100 rounded-lg object-contain border"/>
                        <p className="text-[10px] text-neutral-400">Representasi intensitas cahaya (V) dari HSV.</p>
                    </div>

                    {/* Visual 3: Masking Hijau */}
                    <div className="space-y-2">
                        <span className="text-[10px] uppercase font-bold bg-green-100 px-2 py-1 rounded text-green-700">3. Segmentasi Hijau</span>
                        <canvas ref={greenMaskRef} className="w-full h-40 bg-black rounded-lg object-contain border"/>
                        <p className="text-[10px] text-neutral-400">Area terdeteksi Mentah (Hue 75-180).</p>
                    </div>

                    {/* Visual 4: Masking Kuning */}
                    <div className="space-y-2">
                        <span className="text-[10px] uppercase font-bold bg-yellow-100 px-2 py-1 rounded text-yellow-700">4. Segmentasi Kuning</span>
                        <canvas ref={yellowMaskRef} className="w-full h-40 bg-black rounded-lg object-contain border"/>
                        <p className="text-[10px] text-neutral-400">Area terdeteksi Matang (Hue 35-75).</p>
                    </div>

                    {/* Visual 5: Masking Coklat */}
                    <div className="space-y-2">
                        <span className="text-[10px] uppercase font-bold bg-amber-100 px-2 py-1 rounded text-amber-800">5. Segmentasi Bercak</span>
                        <canvas ref={brownMaskRef} className="w-full h-40 bg-black rounded-lg object-contain border"/>
                        <p className="text-[10px] text-neutral-400">Area terdeteksi Busuk/Bercak (Low Value).</p>
                    </div>

                    {/* Visual 6: Gabungan */}
                    <div className="space-y-2">
                        <span className="text-[10px] uppercase font-bold bg-blue-100 px-2 py-1 rounded text-blue-800 flex items-center gap-1"><Layers size={10}/> 6. Hasil Segmentasi Gabungan</span>
                        <canvas ref={combinedCanvasRef} className="w-full h-40 bg-black rounded-lg object-contain border"/>
                        <p className="text-[10px] text-neutral-400">Total area pisang yang berhasil dipisahkan dari background.</p>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}