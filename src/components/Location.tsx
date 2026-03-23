import { useScrollReveal } from "@/hooks/useScrollReveal";
import { MapPin, Clock, Phone } from "lucide-react";

export default function Location() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="ubicacion" className="py-24 sm:py-32 bg-warm-cream">
      <div className="container" ref={ref}>
        <div className={`text-center mb-16 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
          <span className="inline-block text-4xl mb-4">📍</span>
          <h2 className="text-3xl sm:text-5xl font-black text-primary uppercase tracking-tight text-balance">
            Visítanos
          </h2>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${isVisible ? "" : "opacity-0"}`}>
          <div className={isVisible ? "animate-slide-in-left" : ""}>
            {/* Hours card */}
            <div className="bg-card rounded-2xl p-8 shadow-warm mb-6">
              <h3 className="text-lg font-bold text-primary mb-5 flex items-center gap-2.5">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                Horarios de Atención
              </h3>
              <div className="space-y-0">
                <div className="flex justify-between py-4 border-b border-border">
                  <span className="font-semibold text-foreground">Lunes a Sábado</span>
                  <span className="text-muted-foreground font-medium">18:00 - 00:00</span>
                </div>
                <div className="flex justify-between py-4">
                  <span className="font-semibold text-foreground">Domingo</span>
                  <span className="text-muted-foreground font-medium">Cerrado</span>
                </div>
              </div>
            </div>

            {/* Address card */}
            <div className="bg-card rounded-2xl p-8 shadow-warm">
              <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2.5">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                Ubicación
              </h3>
              <p className="text-lg text-foreground mb-2 font-medium">
                Lo Errázuriz 4437
              </p>
              <p className="text-muted-foreground mb-6">
                Cerrillos, Santiago
              </p>

              <div className="flex items-center gap-2.5 text-muted-foreground mb-6 text-sm">
                <Phone className="w-4 h-4" />
                <span>+56 9 7252 1711</span>
              </div>

              <a
                href="https://wa.me/56972521711?text=Hola!%20Quiero%20saber%20la%20ubicacion%20exacta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-bold text-whatsapp-foreground uppercase text-[13px] tracking-wider transition-all duration-200 hover:bg-whatsapp-hover hover:shadow-glow-green hover:-translate-y-0.5 active:scale-[0.97]"
              >
                Consultar ubicación
              </a>
            </div>
          </div>

          <div className={`rounded-2xl overflow-hidden shadow-warm-lg ${isVisible ? "animate-slide-in-right" : ""}`}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.8!2d-70.710!3d-33.490!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c0f7e5e7a0a1%3A0x123456789abcdef!2zTG8gRXJyYXrDumx1cml6IDQ0MzcsIENlcnJpbGxvcywgU2FudGlhZ28!5e0!3m2!1ses!2scl!4v1234567890!5m2!1ses!2scl"
              width="100%"
              height="480"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Don Vicente"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
