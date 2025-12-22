/**
 * processor.js
 * Berisi logika inti pengolahan citra, database rekomendasi, dan algoritma klasifikasi.
 * Memisahkan ini dari UI membuat kode lebih fokus dan mudah dimodifikasi.
 */

// --- 1. DATABASE REKOMENDASI ---
export const recommendations = {
  mentah: {
    status: "MENTAH (Unripe)",
    description: "Pisang masih keras, kulit dominan hijau, rasa sepat/kurang manis.",
    action: "Peraman (Simpan di suhu ruang 2-3 hari).",
    food: [
      "Keripik Pisang (Banana Chips)",
      "Pisang Rebus (Boiled Green Banana)",
      "Kari Pisang (Masakan savory)"
    ],
    color: "text-green-600",
    bgColor: "bg-green-100",
    borderColor: "border-green-500"
  },
  matang: {
    status: "MATANG (Ripe)",
    description: "Pisang berwarna kuning cerah, tekstur pas, rasa manis optimal.",
    action: "Siap dimakan langsung (Table Banana).",
    food: [
      "Dimakan Langsung (Buah Meja)",
      "Pisang Goreng Crispy",
      "Pisang Molen",
      "Smoothie Pisang (Segar)"
    ],
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    borderColor: "border-yellow-500"
  },
  lewat_matang: {
    status: "LEWAT MATANG (Overripe)",
    description: "Kulit penuh bercak coklat/hitam, tekstur lembek, aroma menyengat, sangat manis.",
    action: "Jangan dibuang! Ini pemanis alami terbaik.",
    food: [
      "Banana Bread / Bolu Pisang (Best!)",
      "Pancake Pisang (Tanpa gula tambahan)",
      "Es Krim Pisang (Nice Cream)",
      "Nugget Pisang"
    ],
    color: "text-amber-700",
    bgColor: "bg-amber-100",
    borderColor: "border-amber-600"
  }
};

// --- 2. FUNGSI UTILITAS: RGB ke HSV ---
function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, v = max;
  const d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max === min) h = 0;
  else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h * 360, s * 100, v * 100];
}

// --- 3. ALGORITMA UTAMA ---
// Fungsi ini menerima array piksel mentah, memprosesnya, dan mengembalikan data hasil.
export function processBananaImage(data, width, height) {
  // Siapkan array kosong untuk menampung data visualisasi
  // Uint8ClampedArray adalah tipe data standar untuk manipulasi piksel canvas
  const valueArr = new Uint8ClampedArray(data.length);
  const greenArr = new Uint8ClampedArray(data.length);
  const yellowArr = new Uint8ClampedArray(data.length);
  const brownArr = new Uint8ClampedArray(data.length);
  const combinedArr = new Uint8ClampedArray(data.length);

  let greenCount = 0;
  let yellowCount = 0;
  let brownCount = 0;

  // LOOPING PIKSEL
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i+1], b = data[i+2]; // Alpha ada di i+3

    // Konversi ke HSV
    const [h, s, v] = rgbToHsv(r, g, b);

    // --- VISUALISASI 1: Value Channel (Grayscale Kecerahan) ---
    const grayVal = (v / 100) * 255; 
    valueArr[i] = grayVal;     // R
    valueArr[i+1] = grayVal;   // G
    valueArr[i+2] = grayVal;   // B
    valueArr[i+3] = 255;       // Alpha

    // --- LOGIKA SEGMENTASI (WHITELIST) ---
    
    // 1. Coklat/Bercak (Brown Spots)
    const isBrown = ((h >= 0 && h <= 30) || (h >= 340 && h <= 360) || v < 40) && (s > 20 && v < 85);
    
    // 2. Hijau (Green)
    const isGreen = !isBrown && (h >= 75 && h <= 180) && (v > 25);

    // 3. Kuning (Yellow)
    const isYellow = !isBrown && !isGreen && (h >= 35 && h < 75) && (v > 40) && (s > 25);

    // PENGISIAN PIKSEL KE MASING-MASING BUFFER
    if (isBrown) {
        brownCount++;
        // Mask Coklat
        brownArr[i] = 139; brownArr[i+1] = 69; brownArr[i+2] = 19; brownArr[i+3] = 255;
        // Combined
        combinedArr[i] = 139; combinedArr[i+1] = 69; combinedArr[i+2] = 19; combinedArr[i+3] = 255;
    } else if (isGreen) {
        greenCount++;
        // Mask Hijau
        greenArr[i] = 0; greenArr[i+1] = 255; greenArr[i+2] = 0; greenArr[i+3] = 255;
        // Combined
        combinedArr[i] = 0; combinedArr[i+1] = 255; combinedArr[i+2] = 0; combinedArr[i+3] = 255;
    } else if (isYellow) {
        yellowCount++;
        // Mask Kuning
        yellowArr[i] = 255; yellowArr[i+1] = 255; yellowArr[i+2] = 0; yellowArr[i+3] = 255;
        // Combined
        combinedArr[i] = 255; combinedArr[i+1] = 255; combinedArr[i+2] = 0; combinedArr[i+3] = 255;
    } else {
        // Background -> Transparan (Nilai 0 secara default di Uint8ClampedArray)
    }
  }

  // --- ANALISIS STATISTIK ---
  const totalFruitPixels = greenCount + yellowCount + brownCount;
  const safeTotal = totalFruitPixels > 0 ? totalFruitPixels : 1;

  const pGreen = (greenCount / safeTotal) * 100;
  const pYellow = (yellowCount / safeTotal) * 100;
  const pBrown = (brownCount / safeTotal) * 100;

  // --- KLASIFIKASI ---
  let resultKey = "matang";
  let error = null;

  if (totalFruitPixels < 1000) {
      error = "Objek pisang tidak terdeteksi dengan jelas. Pastikan pencahayaan cukup.";
  } else {
      // Rule-Based Classification
      if (pGreen > pYellow && pGreen > 35) { 
          resultKey = "mentah";
      } else if (pBrown > 15) { 
          resultKey = "lewat_matang";
      } else {
          resultKey = "matang";
      }
  }

  // Mengembalikan objek paket lengkap
  return {
      stats: { 
          green: pGreen.toFixed(1), 
          yellow: pYellow.toFixed(1), 
          brown: pBrown.toFixed(1) 
      },
      resultKey,
      error,
      masks: {
          value: valueArr,
          green: greenArr,
          yellow: yellowArr,
          brown: brownArr,
          combined: combinedArr
      }
  };
}