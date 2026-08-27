'use client';

import React, { useState } from 'react';
import {
  PlayCircle,
  Video,
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';


export default function DemoPage() {
  // =========================
  // Images
  // =========================

  const galleryImages = [
    '/images/Screenshot from 2026-08-24 02-19-34.png',
    '/images/12.png',
    '/images/13.png',
    '/images/Screenshot from 2026-08-24 02-20-26.png',
    '/images/Screenshot from 2026-08-26 00-15-50.png',
    '/images/Screenshot from 2026-08-26 00-18-49.png',
    '/images/Screenshot from 2026-08-26 00-20-45.png',
     '/images/Screenshot from 2026-08-26 00-17-26.png',
    '/images/Screenshot from 2026-08-24 01-40-41.png',
    '/images/Screenshot from 2026-08-24 01-38-51.png',
    '/images/Screenshot from 2026-08-24 01-37-27.png',
    '/images/Screenshot from 2026-08-14 22-46-04.png',
    '/images/Screenshot from 2026-08-24 16-28-28.png',
    '/images/Screenshot from.png',
    '/images/ver.png',


  ];


const [selectedImage, setSelectedImage] = useState<number | null>(null);
const nextImage = () => {
  setSelectedImage((prev) =>
    prev === null
      ? 0
      : prev === galleryImages.length - 1
        ? 0
        : prev + 1
  );
};

const prevImage = () => {
  setSelectedImage((prev) =>
    prev === null
      ? galleryImages.length - 1
      : prev === 0
        ? galleryImages.length - 1
        : prev - 1
  );
};

  
  // =========================
  // Videos
  // =========================

  const galleryVideos = [
    '/videos/demo-1.mp4',
   
  ];

const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
const nextVideo = () => {
  setSelectedVideo((prev) =>
    prev === null
      ? 0
      : prev === galleryVideos.length - 1
        ? 0
        : prev + 1
  );
};

const prevVideo = () => {
  setSelectedVideo((prev) =>
    prev === null
      ? galleryVideos.length - 1
      : prev === 0
        ? galleryVideos.length - 1
        : prev - 1
  );
};

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

      {/* =========================
          Header
      ========================= */}

      <div className="glass-panel p-6 sm:p-10 space-y-4 text-center max-w-3xl mx-auto bg-[#091424]">

        <div className="cyber-badge">
          <PlayCircle className="w-3.5 h-3.5 text-cyan-400" />

          <span>
            معرض الوجهات والتجربة
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100">
          معرض الوجهات والتجربة
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          قسم مخصص لاستعراض الوجهات والتجارب، مع عرض التفاصيل واللقطات والوسائط
          التي توضح تجربة BUNYANX بشكل تفاعلي ومميز.
        </p>

      </div>

      {/* =========================
          Media Grid
      ========================= */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* =========================
            Videos
        ========================= */}

        <div className="glass-panel p-4 sm:p-6 bg-dark-surface/80 border border-cyan-500/20 rounded-2xl">

          {/* Video Header */}

          <div className="flex items-center gap-3 mb-5">

            <div className="w-11 h-11 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Video className="w-5 h-5" />
            </div>

            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-100">
                قسم الفيديوهات والعروض الحية
              </h3>

              <p className="text-xs text-slate-400 mt-1">
                اضغط على أي فيديو لعرضه بحجم كامل
              </p>
            </div>

          </div>

          {/* Videos Grid */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

            {galleryVideos.map((video, index) => (

              <button
                key={video}
                type="button"
                onClick={() => setSelectedVideo(index)}
                className="group relative aspect-video overflow-hidden rounded-xl border border-cyan-500/20 bg-slate-950 hover:border-cyan-500/60 transition-all duration-300 cursor-pointer"
              >

                <video
                  src={video}
                  muted
                  playsInline
                  preload="none"
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                />

                {/* Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 group-hover:from-black/90 transition-colors flex items-center justify-center">

                  <div className="w-12 h-12 rounded-full bg-cyan-500/90 flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.5)] group-hover:scale-110 transition-transform">

                    <PlayCircle className="w-7 h-7" />

                  </div>

                </div>

                {/* Number */}

                <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/80 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-bold">
                  عرض الفيديو {index + 1}
                </div>

              </button>

            ))}

          </div>

        </div>

        {/* =========================
            Images
        ========================= */}

        <div className="glass-panel p-4 sm:p-6 bg-dark-surface/80 border border-blue-500/20 rounded-2xl">

          {/* Gallery Header */}

          <div className="flex items-center gap-3 mb-5">

            <div className="w-11 h-11 rounded-xl bg-blue-950/40 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ImageIcon className="w-5 h-5" />
            </div>

            <div>

              <h3 className="font-bold text-base sm:text-lg text-slate-100">
                معرض الصور ولقطات الأدلة
              </h3>

              <p className="text-xs text-slate-400 mt-1">
                اضغط على أي صورة لعرضها بحجم كامل
              </p>

            </div>

          </div>

          {/* Images Grid */}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">

            {galleryImages.map((image, index) => (

              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(index)}
                className="group relative aspect-video overflow-hidden rounded-xl border border-blue-500/20 bg-slate-950/50 hover:border-blue-500/60 transition-all duration-300"
              >

                <img
                  src={image}
                  alt={`لقطة ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay */}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">

                  <span className="opacity-0 group-hover:opacity-100 text-white text-xs sm:text-sm font-semibold transition-opacity">
                    عرض الصورة
                  </span>

                </div>

              </button>

            ))}

          </div>

        </div>

      </div>

      {/* ==================================================
          Fullscreen Image Viewer
      ================================================== */}

      {selectedImage !== null && (

        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >

          {/* Close */}

          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 z-30 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition"
            aria-label="إغلاق"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous */}

          {galleryImages.length > 1 && (

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-2 sm:left-5 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition"
              aria-label="الصورة السابقة"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

          )}

          {/* Image */}

          <div
            className="w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >

            <img
              src={galleryImages[selectedImage]}
              alt={`لقطة ${selectedImage + 1}`}
              className="max-w-full max-h-[90vh] sm:max-h-[92vh] object-contain rounded-lg select-none"
            />

          </div>

          {/* Next */}

          {galleryImages.length > 1 && (

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-2 sm:right-5 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition"
              aria-label="الصورة التالية"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

          )}

          {/* Counter */}

          <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/60 border border-white/10 text-white text-xs sm:text-sm">
            {selectedImage + 1} / {galleryImages.length}
          </div>

        </div>

      )}

      {/* ==================================================
          Fullscreen Video Viewer
      ================================================== */}

      {selectedVideo !== null && (

        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedVideo(null)}
        >

          {/* Close */}

          <button
            type="button"
            onClick={() => setSelectedVideo(null)}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 z-30 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition"
            aria-label="إغلاق الفيديو"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous */}

          {galleryVideos.length > 1 && (

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevVideo();
              }}
              className="absolute left-2 sm:left-5 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition"
              aria-label="الفيديو السابق"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

          )}

          {/* Video */}

          <div
            className="w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >

            <video
              key={galleryVideos[selectedVideo]}
              src={galleryVideos[selectedVideo]}
              controls
              autoPlay
              playsInline
              className="max-w-full max-h-[88vh] sm:max-h-[90vh] w-auto h-auto rounded-lg shadow-2xl"
            />

          </div>

          {/* Next */}

          {galleryVideos.length > 1 && (

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextVideo();
              }}
              className="absolute right-2 sm:right-5 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition"
              aria-label="الفيديو التالي"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

          )}

          {/* Counter */}

          <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/60 border border-white/10 text-white text-xs sm:text-sm">
            {selectedVideo + 1} / {galleryVideos.length}
          </div>

        </div>

      )}

    </div>
  );
}

