/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useAnimation, AnimatePresence } from 'motion/react';
import React, { useState, useRef } from 'react';

type Language = 'en' | 'es';

const TRANSLATIONS = {
  en: {
    pressAndHold: "Exclusive Content",
    social: "Social",
    inquiries: "Inquiries",
    lang: "ES",
    collab: "collab@graciebon.com",
    ageWarning: "Are you 18 or older?",
    yes: "Yes",
    no: "No"
  },
  es: {
    pressAndHold: "Contenido Exclusivo",
    social: "Redes",
    inquiries: "Contacto",
    lang: "EN",
    collab: "collab@graciebon.com",
    ageWarning: "¿Eres mayor de 18 años?",
    yes: "Sí",
    no: "No"
  }
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [isHolding, setIsHolding] = useState(false);
  const [showAgeModal, setShowAgeModal] = useState(false);
  const holdTimer = useRef<NodeJS.Timeout | null>(null);
  const controls = useAnimation();
  const t = TRANSLATIONS[lang];

  const handleStart = () => {
    setIsHolding(true);
    controls.start({
      width: '100%',
      transition: { duration: 1.5, ease: "linear" }
    });
    
    holdTimer.current = setTimeout(() => {
      setShowAgeModal(true);
      handleEnd();
    }, 1500);
  };

  const handleEnd = () => {
    setIsHolding(false);
    if (holdTimer.current) clearTimeout(holdTimer.current);
    controls.start({
      width: '0%',
      transition: { duration: 0.3 }
    });
  };

  const handleAgeConfirm = (over18: boolean) => {
    setShowAgeModal(false);
    if (over18) {
      window.open('https://onlyfans.com', '_blank');
    }
  };
  return (
    <div className="relative h-screen w-full bg-brand-pink text-brand-maroon flex flex-col p-8 overflow-hidden font-sans selection:bg-brand-maroon selection:text-brand-pink">
      {/* Dynamic Background Noise */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Floating Aesthetic Elements */}
      <motion.div 
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-80 h-80 border border-brand-maroon/10 rounded-full md:block"
      />

      {/* Header / Logo Section */}
      <header className="relative z-20 flex flex-col items-center pt-4">
        <nav className="w-full flex justify-end items-center mb-4">
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
            className="text-[10px] tracking-[0.2em] font-black border-2 border-brand-maroon px-4 py-1.5 hover:bg-brand-maroon hover:text-brand-pink transition-all uppercase rounded-full"
          >
            {t.lang}
          </motion.button>
        </nav>

        {/* 50% Smaller Circular Photo Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="relative flex flex-col items-center"
        >
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-brand-maroon overflow-hidden bg-white/20 p-1 mb-3 shadow-lg relative z-10 transition-all duration-500 hover:rotate-3">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                (e.target as HTMLImageElement).style.opacity = '0';
                (e.target as HTMLImageElement).parentElement?.classList.add('bg-brand-maroon/10');
              }}
            />
          </div>
          
          {/* Artistic Logo Font: Shrikhand for a bold, feminine, artistic look */}
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-logo text-brand-maroon leading-none text-center tracking-normal"
          >
            GRACIE BON
          </motion.h1>
          
          <div className="absolute top-0 -inset-3 border border-dashed border-brand-maroon/10 rounded-full animate-spin-slow pointer-events-none" />
        </motion.div>
      </header>

      {/* Hero Section - Perfectly Centered Circular Button */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="text-center"
        >
          {/* Central Circular Button Hero */}
          <div className="relative flex items-center justify-center touch-none select-none group">
            <motion.button
              onMouseDown={handleStart}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={handleStart}
              onTouchEnd={handleEnd}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-56 h-56 md:w-64 md:h-64 rounded-full border-[6px] border-brand-maroon overflow-hidden group cursor-pointer bg-transparent transition-all shadow-[20px_20px_0px_0px_rgba(92,6,31,1)] hover:shadow-none translate-x-[-10px] translate-y-[-10px] hover:translate-x-0 hover:translate-y-0 flex items-center justify-center text-center p-12 active:shadow-inner"
            >
              {/* Radial Progress Fill */}
              <motion.div 
                animate={{
                    clipPath: isHolding ? 'circle(100% at 50% 50%)' : 'circle(0% at 50% 50%)'
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 bg-brand-maroon z-0"
              />
              
              <span className={`relative z-10 text-xs md:text-base tracking-[0.5em] font-[900] uppercase transition-colors duration-500 leading-normal ${isHolding ? 'text-brand-pink' : 'text-brand-maroon'}`}>
                {t.pressAndHold}
              </span>
            </motion.button>
            
            {/* Pulsing Outer Rings */}
            <motion.div 
               animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.4, 0.1] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="absolute w-72 h-72 md:w-80 md:h-80 border-2 border-brand-maroon/10 rounded-full pointer-events-none"
            />
            <motion.div 
               animate={{ scale: [1.3, 1, 1.3], opacity: [0.05, 0.2, 0.05] }}
               transition={{ duration: 5, repeat: Infinity }}
               className="absolute w-80 h-80 md:w-[400px] md:h-[400px] border border-brand-maroon/5 rounded-full pointer-events-none"
            />

            {/* Hold Feedback */}
            <AnimatePresence>
              {isHolding && (
                <motion.div
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: 1, scale: 1.5 }}
                  exit={{ opacity: 0, scale: 1.8 }}
                  className="absolute inset-0 border-4 border-brand-maroon/30 rounded-full pointer-events-none"
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>

      {/* Bottom Footer Details */}
      <footer className="relative z-10 flex justify-between items-end font-sans">
        <div className="flex gap-12 w-full md:w-auto justify-between md:justify-start border-t-2 border-brand-maroon/10 pt-6 md:pt-0">
          <div className="space-y-1">
            <p className="text-[8px] uppercase tracking-widest font-black opacity-40">{t.social}</p>
            <p className="text-[11px] font-black uppercase hover:italic transition-all">@graciebon</p>
          </div>
          <div className="space-y-1">
            <p className="text-[8px] uppercase tracking-widest font-black opacity-40">{t.inquiries}</p>
            <p className="text-[11px] font-black uppercase">{t.collab}</p>
          </div>
        </div>
      </footer>

      {/* Age Verification Modal */}
      <AnimatePresence>
        {showAgeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-maroon/90 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-brand-pink border-4 border-brand-maroon p-8 md:p-12 rounded-[2rem] max-w-sm w-full text-center shadow-[20px_20px_0px_0px_rgba(92,6,31,0.5)]"
            >
              <h2 className="text-2xl md:text-3xl font-serif font-black mb-8 leading-tight">
                {t.ageWarning}
              </h2>
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => handleAgeConfirm(true)}
                  className="w-full bg-brand-maroon text-brand-pink py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform active:scale-95"
                >
                  {t.yes}
                </button>
                <button 
                  onClick={() => handleAgeConfirm(false)}
                  className="w-full border-2 border-brand-maroon text-brand-maroon py-4 rounded-full font-black uppercase tracking-widest hover:bg-brand-maroon hover:text-brand-pink transition-all active:scale-95"
                >
                  {t.no}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
