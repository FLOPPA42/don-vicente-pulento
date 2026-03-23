import heroBg from "@/assets/hero-bg.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background image with parallax-like scale */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Multi-layer overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      <div
        ref={ref}
        className={`relative z-10 max-w-3xl px-6 py-20 text-center ${
          isVisible ? "animate-slide-up" : "opacity-0"
        }`}
      >
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 px-4 py-1.5 mb-8"
          style={{ animationDelay: "100ms" }}
        >
          <span className="text-sm">🔥</span>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/90">
            Desde Cerrillos, Santiago
          </span>
        </div>

        <h1
          className="text-5xl sm:text-6xl lg:text-[4.5rem] font-black leading-[0.92] mb-6 text-balance"
          style={{ color: "white", textShadow: "0 4px 24px rgba(0,0,0,0.5)" }}
        >
          Los Mejores{" "}
          <span className="text-secondary block mt-1" style={{ textShadow: "0 2px 16px rgba(218,165,32,0.3)" }}>
            Churrascos
          </span>{" "}
          <span className="block mt-1">de Chile</span>
        </h1>

        <p
          className="text-lg sm:text-xl max-w-lg mx-auto mb-10 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.85)", textShadow: "0 2px 10px rgba(0,0,0,0.4)" }}
        >
          Completo italiano, churrascos, hamburguesas y más. ¡Sabor que enamora!
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#promociones"
            className="rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground uppercase text-sm tracking-wider transition-all duration-200 hover:shadow-glow-red hover:-translate-y-1 active:scale-[0.97]"
          >
            Ver promociones
          </a>
          <a
            href="#menu"
            className="rounded-full bg-secondary px-8 py-4 font-bold text-secondary-foreground uppercase text-sm tracking-wider transition-all duration-200 hover:shadow-glow-yellow hover:bg-yellow-light hover:-translate-y-1 active:scale-[0.97]"
          >
            Ver menú completo
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#promociones"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float"
      >
        <ChevronDown className="w-8 h-8" style={{ color: "rgba(255,255,255,0.5)" }} />
      </a>
    </section>
  );
}
