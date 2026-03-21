import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    text: "Los mejores churrascos que he probado! El Mega Churrasco es perfecto para compartir con la familia.",
    author: "Carlos M.",
    role: "Cliente frecuente",
  },
  {
    text: "El completo italiano es igual que los de antes, de verdad! Y la atención por WhatsApp es súper rápida.",
    author: "María José R.",
    role: "Vecina de Cerrillos",
  },
  {
    text: "Las papas supremas son increíbles! Siempre pido por delivery y llega todo caliente y rico.",
    author: "Diego S.",
    role: "Fan del delivery",
  },
];

export default function Testimonials() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="container" ref={ref}>
        <div className={`text-center mb-16 ${isVisible ? "animate-reveal-up" : "opacity-0"}`}>
          <span className="inline-block text-4xl mb-4">⭐</span>
          <h2 className="text-3xl sm:text-5xl font-black text-primary uppercase tracking-tight mb-4 text-balance">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Más de 1.000 pedidos mensuales nos respaldan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.author}
              className={`relative bg-card rounded-2xl p-8 shadow-warm transition-all duration-500 hover:-translate-y-2 hover:shadow-warm-lg group ${
                isVisible ? "animate-reveal-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-secondary/30 mb-4 transition-colors duration-300 group-hover:text-secondary/50" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>

              <p className="text-foreground/80 leading-relaxed mb-6 text-pretty text-[15px]">
                "{t.text}"
              </p>

              <div className="pt-5 border-t border-border">
                <span className="font-bold text-foreground text-sm block">{t.author}</span>
                <span className="text-muted-foreground text-xs">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
