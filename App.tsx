/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Copy, 
  Check, 
  Sparkles, 
  Newspaper, 
  Heart, 
  ShieldCheck, 
  Quote, 
  Award,
  Globe2
} from 'lucide-react';

interface ArticleItem {
  outlet: string;
  category: string;
  title: string;
  quote: string;
  highlight: string;
  date: string;
}

interface ContentTranslation {
  tagline: string;
  dealsLabel: string;
  email: string;
  copyEmail: string;
  copied: string;
  sendEmail: string;
  aboutTitle: string;
  aboutBio: string;
  newsSectionTitle: string;
  newsSectionSubtitle: string;
  pressInquiry: string;
  rights: string;
  articles: ArticleItem[];
}

const TRANSLATIONS: Record<'en' | 'es', ContentTranslation> = {
  en: {
    tagline: "Just a girl spreading self love.",
    dealsLabel: "For brand deals & collaborations",
    email: "collab@graciebon.com",
    copyEmail: "Copy email",
    copied: "Copied!",
    sendEmail: "Send Email",
    aboutTitle: "About Gracie Bon",
    aboutBio: "Gracie Bon is a renowned Panamanian digital creator, curve fashion icon, and global body-positivity ambassador. With millions of followers worldwide, Gracie uses her influential platform to champion self-acceptance, normalize natural beauty, raise awareness for health conditions like lipedema, and advocate for size inclusivity across travel and lifestyle industries.",
    newsSectionTitle: "Press & Positive Media Coverage",
    newsSectionSubtitle: "Recognized by leading international publications for her advocacy, confidence, and impact on modern culture.",
    pressInquiry: "For press interviews, media features, or official statements, contact:",
    rights: "All Rights Reserved",
    articles: [
      {
        outlet: "PinkNews",
        category: "Health & Advocacy",
        date: "Feature Story",
        title: "Championing Lipedema Awareness & Mental Well-being",
        quote: "Gracie Bon brings vital visibility to lipedema, helping millions understand the condition with honesty, grace, and compassion.",
        highlight: "Lauded for her bravery in breaking the stigma around chronic lymphatic health conditions and fostering a supportive community for women everywhere."
      },
      {
        outlet: "Daily Record & International Press",
        category: "Inclusivity Advocacy",
        date: "Global News",
        title: "Leading the Movement for Accessible & Size-Inclusive Travel",
        quote: "Sparking an essential global conversation on dignity, comfort, and standard accommodation for passengers of all shapes.",
        highlight: "Highlighted by global media outlets for courageously advocating for broader airline seating and respectful travel experiences for curvy individuals."
      },
      {
        outlet: "Bored Panda & Lifestyle Media",
        category: "Body Positivity",
        date: "Inspiring Voices",
        title: "Radical Self-Love: Normalizing Natural Beauty & Stretch Marks",
        quote: "A beacon of body confidence who empowers people to love every curve and celebrate who they truly are.",
        highlight: "Celebrated for sharing unfiltered photos and uplifting messages that dismantle unrealistic social media beauty standards."
      },
      {
        outlet: "Curve Fashion & Digital Trends",
        category: "Fashion & Influence",
        date: "Industry Spotlight",
        title: "Redefining Fashion Standards & Inclusive Representation",
        quote: "Transforming the curve apparel space with vibrant confidence and unprecedented engagement.",
        highlight: "Acclaimed as a top collaborator for major curve fashion labels, proving that high fashion and self-assurance belong to every body type."
      }
    ]
  },
  es: {
    tagline: "Solo una chica compartiendo amor propio.",
    dealsLabel: "Para acuerdos de marca y colaboraciones",
    email: "collab@graciebon.com",
    copyEmail: "Copiar correo",
    copied: "¡Copiado!",
    sendEmail: "Enviar correo",
    aboutTitle: "Sobre Gracie Bon",
    aboutBio: "Gracie Bon es una reconocida creadora digital panameña, icono de la moda curvy y embajadora global del amor propio. Con millones de seguidores en todo el mundo, Gracie utiliza su influyente plataforma para promover la autoaceptación, visibilizar la belleza natural, crear conciencia sobre afecciones de salud como el lipedema y defender la inclusión en los viajes y la moda.",
    newsSectionTitle: "Prensa y Cobertura Mediática",
    newsSectionSubtitle: "Reconocida por destacados medios internacionales por su defensa del amor propio, confianza e impacto cultural.",
    pressInquiry: "Para entrevistas de prensa, notas editoriales o declaraciones oficiales, escribe a:",
    rights: "Todos los derechos reservados",
    articles: [
      {
        outlet: "PinkNews",
        category: "Salud y Visibilidad",
        date: "Reportaje Especial",
        title: "Promoviendo la Conciencia sobre el Lipedema y la Salud Mental",
        quote: "Gracie Bon brinda una visibilidad vital al lipedema, ayudando a millones a comprender esta condición con honestidad y valentía.",
        highlight: "Elogiada por romper el tabú sobre afecciones linfáticas crónicas y construir una comunidad de apoyo incondicional para mujeres de todo el mundo."
      },
      {
        outlet: "Daily Record y Prensa Internacional",
        category: "Defensa e Inclusión",
        date: "Noticias Globales",
        title: "Liderando la Petición por Viajes Accesibles e Inclusivos",
        quote: "Abriendo una conversación indispensable sobre dignidad, comodidad e inclusión para viajeros de todas las contexturas.",
        highlight: "Destacada por medios globales por alzar la voz con firmeza en favor de asientos más amplios y respetuosos en las aerolíneas comerciales."
      },
      {
        outlet: "Bored Panda y Medios de Estilo de Vida",
        category: "Amor Propio",
        date: "Voces Inspiradoras",
        title: "Amor Propio Radical: Normalizando la Belleza Natural",
        quote: "Un faro de confianza que inspira a miles a amar sus curvas y sentirse orgullosas de su autenticidad.",
        highlight: "Reconocida por compartir imágenes reales sin filtros ni estereotipos, desmitificando los estándares irreales de las redes sociales."
      },
      {
        outlet: "Moda Curvy y Tendencias Globales",
        category: "Moda e Influencia",
        date: "Enfoque de Industria",
        title: "Redefiniendo los Estándares de la Moda y la Representación",
        quote: "Transformando la industria textil y curvy con una energía arrolladora e impacto sin precedentes.",
        highlight: "Aclamada como una de las principales figuras de las marcas de moda inclusiva, demostrando que el estilo y la elegancia no tienen talla."
      }
    ]
  }
};

export default function App() {
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    setMounted(true);
    // Initial language detection
    const userLang = navigator.language?.split('-')[0];
    if (userLang === 'es') setLang('es');
  }, []);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(t.email);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = t.email;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center overflow-x-hidden bg-brand-dark selection:bg-brand-primary/30">
      {/* Top Header with Language Controls above the picture */}
      <header className="relative z-30 w-full max-w-3xl mx-auto px-6 pt-6 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-brand-primary/70" />
          <span className="text-[11px] uppercase tracking-widest text-brand-primary/60 font-semibold font-sans">
            Official Site
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => setLang('en')}
            className={`text-xs uppercase tracking-widest font-bold transition-all cursor-pointer ${
              lang === 'en' 
                ? 'text-brand-primary underline underline-offset-4' 
                : 'text-brand-primary/50 hover:text-brand-primary/80'
            } drop-shadow`}
          >
            EN
          </button>
          <span className="text-xs text-brand-primary/30">|</span>
          <button 
            type="button"
            onClick={() => setLang('es')}
            className={`text-xs uppercase tracking-widest font-bold transition-all cursor-pointer ${
              lang === 'es' 
                ? 'text-brand-primary underline underline-offset-4' 
                : 'text-brand-primary/50 hover:text-brand-primary/80'
            } drop-shadow`}
          >
            ES
          </button>
        </div>
      </header>

      {/* Picture as Hero Background */}
      <div className="absolute inset-x-0 top-0 h-[62vh] sm:h-[72vh] z-0 overflow-hidden pointer-events-none flex justify-center">
        <div className="relative w-full max-w-md sm:max-w-xl h-full">
          <img 
            src="/photo.jpg" 
            alt="Gracie Bon" 
            className="w-full h-full object-cover object-top"
          />
          {/* Subtle top shading for contrast */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-brand-dark/60 to-transparent" />
          {/* Lower gradient that fades seamlessly into the darker background */}
          <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-brand-dark via-brand-dark/90 to-transparent" />
        </div>
      </div>

      {/* Main Container */}
      <main className="relative z-20 flex-1 w-full max-w-3xl mx-auto px-5 sm:px-6 flex flex-col items-center pt-8 pb-16">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex flex-col items-center mt-6 sm:mt-12 text-center"
        >
          {/* Titles */}
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl leading-[0.88] mb-3 text-brand-primary uppercase tracking-tighter drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            Hey<br />BonBon
          </h1>

          {/* Subtitle / Tagline */}
          <div className="flex items-center justify-center gap-1.5 mb-12 sm:mb-16">
            <Sparkles className="w-4 h-4 text-brand-primary/80 shrink-0" />
            <p className="text-sm sm:text-base font-medium text-brand-primary/95 tracking-wide drop-shadow font-sans">
              {t.tagline}
            </p>
            <Sparkles className="w-4 h-4 text-brand-primary/80 shrink-0" />
          </div>
        </motion.div>

        {/* About Gracie Bon Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-2xl bg-brand-dark/90 backdrop-blur-md border border-brand-primary/20 rounded-3xl p-6 sm:p-8 shadow-xl mb-12"
        >
          <div className="flex items-center gap-2.5 mb-3.5">
            <Heart className="w-5 h-5 text-brand-primary fill-brand-primary/20" />
            <h2 className="text-xl sm:text-2xl font-display uppercase tracking-wide text-brand-primary">
              {t.aboutTitle}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-brand-primary/85 leading-relaxed font-sans font-light">
            {t.aboutBio}
          </p>
        </motion.div>

        {/* News & Press Highlights Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-2xl flex flex-col items-center"
        >
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/25 text-brand-primary text-xs uppercase tracking-widest font-semibold mb-3">
              <Newspaper className="w-3.5 h-3.5" />
              <span>In The News</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-wide text-brand-primary mb-2">
              {t.newsSectionTitle}
            </h2>
            <p className="text-xs sm:text-sm text-brand-primary/70 max-w-lg font-sans">
              {t.newsSectionSubtitle}
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 gap-5 w-full">
            {t.articles.map((item, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="group relative bg-brand-dark/75 hover:bg-brand-dark/90 border border-brand-primary/25 hover:border-brand-primary/50 transition-all duration-300 rounded-2xl p-5 sm:p-6 shadow-lg shadow-black/40"
              >
                {/* Card Top Metadata */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs uppercase tracking-wider text-brand-primary bg-brand-primary/15 px-2.5 py-1 rounded-md border border-brand-primary/20">
                      {item.outlet}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-brand-primary/60 font-sans">
                      • {item.category}
                    </span>
                  </div>
                  <span className="text-[11px] text-brand-primary/50 font-sans">
                    {item.date}
                  </span>
                </div>

                {/* Article Headline */}
                <h3 className="text-base sm:text-lg font-bold text-brand-primary tracking-tight mb-2.5 font-sans leading-snug">
                  {item.title}
                </h3>

                {/* Editorial Quote */}
                <div className="relative pl-4 border-l-2 border-brand-primary/40 my-3 text-xs sm:text-sm italic text-brand-primary/90 font-sans leading-relaxed">
                  <Quote className="w-3.5 h-3.5 text-brand-primary/40 absolute -left-2 -top-1 bg-brand-dark" />
                  "{item.quote}"
                </div>

                {/* Editorial Summary */}
                <p className="text-xs sm:text-sm text-brand-primary/75 leading-relaxed font-sans font-light">
                  {item.highlight}
                </p>
              </motion.article>
            ))}
          </div>

          {/* Press Inquiries Reminder Card */}
          <div className="w-full mt-8 bg-brand-primary/10 border border-brand-primary/30 rounded-2xl p-4 sm:p-5 text-center flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-left">
              <Award className="w-5 h-5 text-brand-primary shrink-0" />
              <p className="text-xs text-brand-primary/80 font-sans">
                {t.pressInquiry} <span className="font-bold text-brand-primary">{t.email}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="px-3.5 py-1.5 rounded-lg bg-brand-primary text-brand-dark font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              {copied ? t.copied : t.copyEmail}
            </button>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-30 w-full max-w-3xl mx-auto px-6 py-8 text-center border-t border-brand-primary/10 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-[11px] text-brand-primary/40 font-sans tracking-widest uppercase">
          © {new Date().getFullYear()} Gracie Bon. {t.rights}.
        </p>
        <div className="flex items-center gap-1.5 text-[11px] text-brand-primary/40 font-sans tracking-wider">
          <Globe2 className="w-3 h-3" />
          <span>Global Brand Partnerships & Positive Vibes</span>
        </div>
      </footer>
    </div>
  );
}
