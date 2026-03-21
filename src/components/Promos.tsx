import { useScrollReveal } from "@/hooks/useScrollReveal";
import promoChurrascos from "@/assets/promo-churrascos.jpg";
import promoFamiliar from "@/assets/promo-familiar.jpg";
import promoItaliano from "@/assets/promo-italiano.jpg";

const WHATSAPP_BASE = "https://wa.me/56972521711?text=";

const promos = [
  {
    title: "2x1 Churrascos",
    desc: "Todos los martes, elige tu churrasco favorito y lleva 2 al precio de 1",
    img: promoChurrascos,
    badge: "Más Popular",
    featured: true,
    msg: "Hola!%20Quiero%20la%20promo%202x1%20de%20churrascos",
  },
  {
    title: "Combo Familiar",
    desc: "2 Churrascos + Papas fritas grandes + 2 Bebidas",
    img: promoFamiliar,
    msg: "Hola!%20Quiero%20el%20Combo%20Familiar",
  },
  {
    title: "Combo Italiano",
    desc: "2 Completos Italianos + Papas fritas + 2 Bebidas",
    img: promoItaliano,
    msg: "Hola!%20Quiero%20el%20Combo%20Italiano",
  },
];

export default function Promos() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="promociones"
      className="relative py-24 sm:py-32 noise-overlay overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(5 72% 46%) 0%, hsl(5 72% 36%) 100%)" }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10" style={{ background: "hsl(42 95% 55%)" }} />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-5" style={{ background: "hsl(42 95% 55%)" }} />

      <div className="container relative z-10" ref={ref}>
        <div className={`text-center mb-16 ${isVisible ? "animate-reveal-up" : "opacity-0"}`}>
          <span className="inline-block text-4xl mb-4">🔥</span>
          <h2 className="text-3xl sm:text-5xl font-black text-primary-foreground uppercase mb-4 text-balance tracking-tight">
            Promociones Imperdibles
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-md mx-auto">
            Aprovecha nuestras ofertas especiales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {promos.map((p, i) => (
            <div
              key={p.title}
              className={`group relative bg-card rounded-2xl overflow-hidden shadow-warm-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-warm-xl ${
                p.featured ? "ring-2 ring-secondary ring-offset-2 ring-offset-transparent md:scale-[1.03]" : ""
              } ${isVisible ? "animate-reveal-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {p.badge && (
                <span className="absolute top-4 right-4 z-10 bg-secondary text-secondary-foreground text-[11px] font-bold uppercase px-3 py-1.5 rounded-full shadow-glow-yellow tracking-wider">
                  {p.badge}
                </span>
              )}
              <div className="overflow-hidden aspect-[4/3]">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-primary mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 text-pretty leading-relaxed">{p.desc}</p>
                <a
                  href={`${WHATSAPP_BASE}${p.msg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-2.5 text-[13px] font-bold text-whatsapp-foreground uppercase tracking-wider transition-all duration-200 hover:bg-whatsapp-hover hover:shadow-glow-green hover:-translate-y-0.5 active:scale-[0.97]"
                >
                  <WhatsappIcon /> Lo quiero
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
