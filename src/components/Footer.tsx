import { Phone, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface-dark-light border-t-4 border-primary">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div>
            <a href="#" className="inline-flex items-center gap-2.5 text-2xl font-black text-primary mb-3">
              <span className="text-secondary text-3xl">🔥</span> Don Vicente
            </a>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              La mejor comida rápida chilena. Churrascos, completos y hamburguesas con el sabor de siempre.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3" style={{ color: "rgba(255,255,255,0.9)" }}>
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/10">
                <Phone className="w-4 h-4 text-secondary" />
              </div>
              <span className="text-sm font-medium">+56 9 7252 1711</span>
            </div>
            <div className="flex items-center gap-3" style={{ color: "rgba(255,255,255,0.9)" }}>
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/10">
                <MapPin className="w-4 h-4 text-secondary" />
              </div>
              <span className="text-sm font-medium">Lo Errázuriz 4437, Cerrillos</span>
            </div>
            <div className="flex items-center gap-3" style={{ color: "rgba(255,255,255,0.9)" }}>
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/10">
                <Clock className="w-4 h-4 text-secondary" />
              </div>
              <span className="text-sm font-medium">Lun-Sáb 18:00 - 00:00</span>
            </div>
          </div>
        </div>
        <div className="border-t border-white/[0.06] pt-6 text-center text-muted-foreground text-xs">
          © 2026 Don Vicente. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
