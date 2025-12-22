import React, { useState, useEffect, useCallback } from 'react';
import Cropper from 'react-easy-crop';

const createImage = (url) => new Promise((resolve, reject) => {
  const img = new Image();
  img.addEventListener('load', () => resolve(img));
  img.addEventListener('error', (e) => reject(e));
  img.setAttribute('crossOrigin', 'anonymous');
  img.src = url;
});

const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );
  return canvas.toDataURL('image/jpeg', 0.9);
};

export default function CropperModal({ isOpen, file, aspect = 1, onCancel, onConfirm }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  useEffect(() => {
    if (!file) { setImageSrc(null); return; }
    if (typeof file === 'string' && file.startsWith('data:')) {
      setImageSrc(file);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setImageSrc(e.target.result);
    reader.readAsDataURL(file);
  }, [file]);

  const onCropComplete = useCallback((_, pixelCrop) => {
    setCroppedAreaPixels(pixelCrop);
  }, []);

  const handleConfirm = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      const croppedDataUrl = await getCroppedImg(imageSrc, croppedAreaPixels);
      onConfirm && onConfirm(croppedDataUrl);
    } catch (err) {
      console.error('Crop failed', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl p-4">
        <div className="relative h-[60vh] bg-gray-100 rounded">
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          )}
        </div>
        <div className="flex items-center gap-3 mt-3">
          <input type="range" min={1} max={3} step={0.01} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="flex-1" />
          <button onClick={onCancel} className="py-2 px-4 bg-gray-100 rounded">Batal</button>
          <button onClick={handleConfirm} className="py-2 px-4 bg-[#0B2545] text-white rounded">Gunakan</button>
        </div>
      </div>
    </div>
  );
}
