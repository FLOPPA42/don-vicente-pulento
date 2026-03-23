import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowDown } from "@phosphor-icons/react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();

  const videoY = useTransform(scrollY, [0, 800], [0, -300]);
  const videoOpacity = useTransform(scrollY, [0, 600], [0.8, 0.1]); // Reduced initial brightness for contrast

  // Update video frame using a highly optimized raw DOM loop (bypasses React & Framer Motion entirely)
  useEffect(() => {
    let animationFrameId: number;
    let targetTime = 0;

    const renderLoop = () => {
      const video = videoRef.current;
      if (video && video.readyState >= 1) { // Asegura que duration exista
        // Read directly from the browser to avoid hook propagation delays
        const scrollY = window.scrollY;
        const maxScrollDistance = 500; 
        const progress = Math.min(Math.max(scrollY / maxScrollDistance, 0), 0.999);
        
        targetTime = progress * video.duration;

        // Actualizamos cada frame disponible sin el debounce arbitrario
        if (Math.abs(video.currentTime - targetTime) > 0.005) {
          video.currentTime = targetTime;
        }
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    // Begin infinite optimized loop
    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 100, damping: 20 }
    },
  };

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-surface-dark flex items-center">
      {/* Background Frame with video integration */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ 
          y: videoY,
          opacity: videoOpacity
        }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
        >
          <source src="/video-bg.mp4" type="video/mp4" />
        </video>
        
        {/* Deep asymmetric gradient for left-aligned text */}
        <div className="absolute inset-0 bg-gradient-to-r from-surface-dark via-surface-dark/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-surface-dark via-surface-dark/50 to-transparent" />
      </motion.div>

      {/* Mandatory noise filter - FIXED to prevent GPU repaints on scroll (CRITICAL PERF) */}
      <div className="fixed inset-0 pointer-events-none noise-overlay z-50 mix-blend-overlay" style={{ opacity: 0.5 }} />

      {/* Asymmetrical Layout Content */}
      <div className="container relative z-10 px-6 sm:px-12 lg:px-24 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full lg:w-[65%] flex flex-col justify-center min-h-[100dvh] pt-20 pb-12"
        >
          {/* Eyebrow / Decorative */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
            <div className="h-[2px] w-12 bg-primary"></div>
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs sm:text-sm">
              Sabor Auténtico de Barrio
            </span>
          </motion.div>

          {/* Premium Typography Implementation (Geist Sans) */}
          <motion.h1 
            variants={itemVariants}
            className="text-balance text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter text-white leading-[0.9] mb-10"
          >
            Los Mejores<br/>
            <span className="text-secondary inline-block mt-2 drop-shadow-[0_0_40px_rgba(250,204,21,0.2)]">
              Churrascos
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl lg:text-2xl text-zinc-400 max-w-[50ch] leading-relaxed mb-14 font-light"
          >
            Descubre la verdadera experiencia culinaria local con ingredientes frescos y una preparación experta diseñada para encender tus sentidos.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 items-start"
          >
            <motion.a
              href="#menu"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="liquid-glass-dark hover:bg-white/10 px-10 py-5 rounded-[2rem] text-white font-bold tracking-widest uppercase text-sm transition-colors border-white/20 w-full sm:w-auto text-center"
            >
              Ver menú
            </motion.a>
            <motion.a
              href={import.meta.env.VITE_WHATSAPP_URL || "https://wa.me/56972521711?text=Hola%20Don%20Vicente!%20Quiero%20hacer%20un%20pedido"}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="bg-primary text-primary-foreground px-10 py-5 rounded-[2rem] font-bold tracking-widest uppercase text-sm shadow-[0_20px_40px_-15px_rgba(220,38,38,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(220,38,38,0.6)] w-full sm:w-auto text-center transition-all"
            >
              Pedir ahora
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating scroll indicator positioned asymmetrically */}
      <motion.a
        href="#promociones"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 1, type: "spring" }}
        className="absolute bottom-12 right-12 lg:right-24 z-20 group hidden md:flex items-center justify-center w-20 h-20 liquid-glass rounded-full hover:bg-white/20 transition-all cursor-pointer"
      >
        <ArrowDown size={28} className="text-zinc-400 group-hover:text-primary group-hover:translate-y-2 transition-all duration-300" />
      </motion.a>
    </section>
  );
}