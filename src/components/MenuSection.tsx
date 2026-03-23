import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Flame, CircleDot, Beef, UtensilsCrossed, GlassWater } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import menuChurrascoClasico from "@/assets/menu-churrasco-clasico.jpg";
import menuChurrascoCompleto from "@/assets/menu-churrasco-completo.jpg";
import menuMegaChurrasco from "@/assets/menu-mega-churrasco.jpg";
import menuCompletoItaliano from "@/assets/menu-completo-italiano.jpg";
import menuCompletoAmericano from "@/assets/menu-completo-americano.jpg";
import menuCompletoDinamico from "@/assets/menu-completo-dinamico.jpg";
import menuHamburguesaClasica from "@/assets/menu-hamburguesa-clasica.jpg";
import menuHamburguesaDoble from "@/assets/menu-hamburguesa-doble.jpg";
import menuPapas from "@/assets/menu-papas-fritas.jpg";
import menuPapasSupremas from "@/assets/menu-papas-supremas.jpg";
import menuNuggets from "@/assets/menu-nuggets.jpg";
import menuBebidas from "@/assets/menu-bebidas.jpg";
import menuJugos from "@/assets/menu-jugos.jpg";
import menuEnergeticas from "@/assets/menu-energeticas.jpg";

const WHATSAPP_BASE = "https://wa.me/56972521711?text=";

interface MenuItem {
  name: string;
  desc: string;
  img: string;
  msg: string;
}

interface Category {
  title: string;
  icon: LucideIcon;
  items: MenuItem[];
}

const categories: Category[] = [
  {
    title: "Churrascos",
    icon: Flame,
    items: [
      { name: "Churrasco Clásico", desc: "Carne de vacuno en láminas, pan fresco, tomate, mayonesa", img: menuChurrascoClasico, msg: "Hola!%20Quiero%20un%20Churrasco%20Clasico" },
      { name: "Churrasco Completo", desc: "Con palta, tomate, mayonesa y queso derretido", img: menuChurrascoCompleto, msg: "Hola!%20Quiero%20un%20Churrasco%20Completo" },
      { name: "Mega Churrasco", desc: "Para compartir! 4 churrascos + papas grandes + 4 bebidas", img: menuMegaChurrasco, msg: "Hola!%20Quiero%20el%20Mega%20Churrasco" },
    ],
  },
  {
    title: "Completos",
    icon: CircleDot,
    items: [
      { name: "Completo Italiano", desc: "Palta, tomate, mayonesa — El clásico chileno", img: menuCompletoItaliano, msg: "Hola!%20Quiero%20un%20Completo%20Italiano" },
      { name: "Completo Americano", desc: "Con queso cheddar, tocino y mayonesa", img: menuCompletoAmericano, msg: "Hola!%20Quiero%20un%20Completo%20Americano" },
      { name: "Completo Dinámico", desc: "Con queso derretido, palta, tomate y mayonesa", img: menuCompletoDinamico, msg: "Hola!%20Quiero%20un%20Completo%20Dinamico" },
    ],
  },
  {
    title: "Hamburguesas",
    icon: Beef,
    items: [
      { name: "Hamburguesa Clásica", desc: "Carne 150g, lechuga, tomate, queso, mayonesa", img: menuHamburguesaClasica, msg: "Hola!%20Quiero%20una%20Hamburguesa%20Clasica" },
      { name: "Hamburguesa Doble", desc: "Doble carne 200g, doble queso, tocino, salsa especial", img: menuHamburguesaDoble, msg: "Hola!%20Quiero%20una%20Hamburguesa%20Doble" },
    ],
  },
  {
    title: "Papas & Nuggets",
    icon: UtensilsCrossed,
    items: [
      { name: "Papas Fritas", desc: "Porción pequeña o grande — Crujientes y doradas", img: menuPapas, msg: "Hola!%20Quiero%20unas%20Papas%20Fritas" },
      { name: "Papas Supremas", desc: "Con queso derretido, tocino, mayonesa y ketchup", img: menuPapasSupremas, msg: "Hola!%20Quiero%20unas%20Papas%20Supremas" },
      { name: "Nuggets", desc: "6 o 12 piezas — Con salsas para dipping", img: menuNuggets, msg: "Hola!%20Quiero%20unos%20Nuggets" },
    ],
  },
  {
    title: "Bebidas",
    icon: GlassWater,
    items: [
      { name: "Bebidas", desc: "Coca-Cola, Sprite, Fanta — 500ml o 1.5L", img: menuBebidas, msg: "Hola!%20Quiero%20una%20bebida" },
      { name: "Jugos Naturales", desc: "Naranja, Manzana, Piña — Recién exprimidos", img: menuJugos, msg: "Hola!%20Quiero%20un%20jugo%20natural" },
      { name: "Energéticas", desc: "Red Bull, Monster, Shark — 250ml", img: menuEnergeticas, msg: "Hola!%20Quiero%20una%20bebida%20energetica" },
    ],
  },
];

export default function MenuSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="menu" className="relative py-24 sm:py-32 bg-surface-dark noise-overlay overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />

      <div className="container relative z-10" ref={ref}>
        <div className={`text-center mb-16 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
          <span className="inline-block text-4xl mb-4">🍔</span>
          <h2 className="text-3xl sm:text-5xl font-black text-secondary uppercase mb-4 tracking-tight text-balance">
            Nuestro Menú
          </h2>
          <p className="text-lg max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
            Elige tu favorito y pídelo por WhatsApp
          </p>
        </div>

        {categories.map((cat) => (
          <CategoryBlock key={cat.title} category={cat} />
        ))}
      </div>
    </section>
  );
}

function CategoryBlock({ category }: { category: Category }) {
  const { ref, isVisible } = useScrollReveal();
  const Icon = category.icon;

  return (
    <div className="mb-20 last:mb-0" ref={ref}>
      <div className={`flex items-center gap-3 mb-10 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary/10">
          <Icon className="w-5 h-5 text-secondary" />
        </div>
        <h3 className="text-2xl font-bold" style={{ color: "white" }}>{category.title}</h3>
        <div className="flex-1 h-px bg-gradient-to-r from-primary/40 to-transparent ml-4" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {category.items.map((item, i) => (
          <div
            key={item.name}
            className={`group bg-surface-dark-card rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-warm-lg flex flex-col border border-white/[0.04] ${
              isVisible ? "animate-slide-up" : "opacity-0"
            }`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="overflow-hidden aspect-[4/3] relative">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Gradient fade at bottom of image */}
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-surface-dark-card to-transparent" />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h4 className="text-lg font-bold text-secondary mb-1.5">{item.name}</h4>
              <p className="text-sm mb-5 flex-1 text-pretty leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                {item.desc}
              </p>
              <a
                href={`${WHATSAPP_BASE}${item.msg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start rounded-full bg-primary px-5 py-2.5 text-[12px] font-bold text-primary-foreground uppercase tracking-wider transition-all duration-200 hover:shadow-glow-red hover:-translate-y-0.5 active:scale-[0.97]"
              >
                Lo quiero
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
