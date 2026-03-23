import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    text: "Los mejores churrascos que he probado! El Mega Churrasco es perfecto para compartir con toda la familia un fin de semana.",
    author: "Carlos M.",
    role: "Cliente Frecuente",
    span: "md:col-span-5",
    color: "from-primary/10 to-transparent",
  },
  {
    text: "El completo italiano es igual que los de antes, de verdad! Y la atención por WhatsApp es súper rápida.",
    author: "María José R.",
    role: "Vecina de Cerrillos",
    span: "md:col-span-7",
    color: "from-secondary/10 to-transparent",
  },
  {
    text: "Las papas supremas son increíbles! Siempre pido por delivery y llega todo super caliente y rico. 100% recomendado.",
    author: "Diego S.",
    role: "Fan del Delivery",
    span: "md:col-span-12",
    color: "from-white/5 to-transparent flex-col md:flex-row gap-12 items-center",
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section className="py-32 bg-surface-dark relative overflow-hidden">
      {/* Abstract Background Diffusion */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 blur-[150px] rounded-full opacity-50 pointer-events-none" />

      <div className="container px-6 sm:px-12 relative z-10" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-12 bg-secondary"></div>
            <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs">Reseñas</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter text-balance leading-tight">
            Lo que dicen <br/>
            nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">clientes</span>
          </h2>
        </motion.div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 + 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { type: "spring", stiffness: 100 } }}
              className={`liquid-glass-dark border-zinc-800 p-10 sm:p-12 rounded-[2.5rem] flex flex-col justify-between overflow-hidden relative group diffusion-shadow ${t.span}`}
            >
              {/* Subtle gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br opacity-50 transition-opacity duration-500 group-hover:opacity-100 ${t.color}`} />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <Quote className="w-10 h-10 text-white/20 mb-8" strokeWidth={1.5} />
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-zinc-300 md:text-lg leading-relaxed mb-8 font-light text-pretty">
                    "{t.text}"
                  </p>
                </div>

                <div className="mt-auto border-t border-white/10 pt-6">
                  <span className="font-bold text-white tracking-wide block text-sm mb-1">{t.author}</span>
                  <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
