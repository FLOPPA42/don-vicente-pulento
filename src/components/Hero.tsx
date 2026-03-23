import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "@phosphor-icons/react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();

  // Parallax effect: video se mueve frame por frame con el scroll
  const videoY = useTransform(scrollY, [0, 800], [0, -400]);
  // Opacidad del video: se desvanece progresivamente al hacer scroll
  const videoOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {
      // Autoplay puede estar bloqueado, está bien
    });

    return () => {
      // Limpieza si es necesaria
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Video background - responde al scroll frame por frame */}
      <motion.div
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ 
          y: videoY,
          opacity: videoOpacity
        }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/video-bg.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay gradients para profundidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
        
        {/* Mesh gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-transparent to-secondary/15 mix-blend-overlay" />
      </motion.div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        <div className="h-screen flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-5xl"
          >
            {/* Decorative element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-50 animate-pulse" />
                <span className="relative text-5xl md:text-6xl">🔥</span>
              </div>
            </motion.div>

            {/* Main headline con text-balance */}
            <h1 className="text-balance text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white drop-shadow-2xl mb-6">
              <span className="block">Los Mejores</span>
              <span className="block bg-gradient-to-r from-yellow-300 via-primary-foreground to-secondary-foreground bg-clip-text text-transparent">
                Churrascos
              </span>
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light"
            >
              Sabor auténtico de Chile en cada bocado
            </motion.p>

            {/* CTA Buttons con microinteracciones */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a
                href="#menu"
                className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary to-primary/90 px-8 py-4 text-base font-bold text-primary-foreground uppercase tracking-wider shadow-glow-green hover:shadow-glow-green/70 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
              >
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                <span className="relative z-10">Ver menú</span>
              </a>

              <a
                href="#ubicacion"
                className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-secondary to-secondary/90 px-8 py-4 text-base font-bold text-secondary-foreground uppercase tracking-wider shadow-glow-yellow hover:shadow-glow-yellow/70 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                <span className="relative z-10">Ver ubicación</span>
              </a>

              <a
                href={import.meta.env.VITE_WHATSAPP_URL || "https://wa.me/56972521711?text=Hola%20Don%20Vicente!%20Quiero%20hacer%20un%20pedido"}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-8 py-4 text-base font-bold text-white uppercase tracking-wider shadow-glow-green hover:shadow-glow-green/70 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                <span className="relative z-10">Pedir ahora</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator con animación mejorada */}
      <motion.a
        href="#promociones"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: 0.8, 
          ease: [0.16, 1, 0.3, 1],
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 group"
      >
        <div className="relative">
          <div className="absolute -inset-3 bg-gradient-to-r from-primary to-secondary rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
          <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border">
            <ArrowDown 
              size={24} 
              weight="bold" 
              className="text-primary group-hover:text-secondary transition-colors"
            />
          </div>
        </div>
      </motion.a>
    </section>
  );
}