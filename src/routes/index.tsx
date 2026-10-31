import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCheck, MessageCircle, Settings2, Truck, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wappify — Vende y entrega por WhatsApp en automático" },
      { name: "description", content: "Cotizaciones, catálogo, pedidos y entregas 100% autónomos por WhatsApp para PyMEs." },
      { property: "og:title", content: "Wappify — Vende y entrega por WhatsApp en automático" },
      { property: "og:description", content: "Automatización conversacional y logística para PyMEs." },
    ],
  }),
  component: Index,
});

const chat: { from: "in" | "out"; text: string }[] = [
  { from: "in", text: "Hola 👋 ¿Tienen chocolates para regalo?" },
  { from: "out", text: "¡Hola! Soy el asistente de Chocolatería Luna 🌙 Este es nuestro catálogo:\n🍫 Caja Trufas x12 — $280\n🎁 Caja Regalo Luna — $450\n🌰 Barra Almendra 70% — $95" },
  { from: "in", text: "Quiero 1 Caja Regalo Luna" },
  { from: "out", text: "Perfecto ✅ Total: $450 MXN. ¿A qué dirección la enviamos?" },
  { from: "in", text: "Av. Reforma 123, CDMX" },
  { from: "out", text: "¡Pedido #1042 confirmado! 🛵 Tu repartidor llega hoy entre 4 y 5 pm. Te avisaré cuando esté en camino." },
];

function Phone() {
  const [n, setN] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setN((v) => (v >= chat.length + 2 ? 1 : v + 1)), 1600);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative mx-auto w-[300px] rounded-[2.5rem] border-[10px] border-secondary bg-chat shadow-glow">
      <div className="flex items-center gap-3 rounded-t-[1.8rem] bg-secondary px-4 py-3">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-lg">🌙</div>
        <div><p className="text-sm font-semibold">Chocolatería Luna</p><p className="text-xs text-accent">en línea · bot Wappify</p></div>
      </div>
      <div className="flex h-[440px] flex-col justify-end gap-2 overflow-hidden p-3">
        {chat.slice(0, Math.min(n, chat.length)).map((m, i) => (
          <div key={i} className={`animate-pop max-w-[85%] whitespace-pre-line rounded-2xl px-3 py-2 text-[13px] leading-snug ${m.from === "in" ? "self-end rounded-br-sm bg-chat-out" : "self-start rounded-bl-sm bg-secondary"}`}>
            {m.text}
            {m.from === "in" && <CheckCheck className="ml-1 inline h-3 w-3 text-cta" />}
          </div>
        ))}
      </div>
    </div>
  );
}

const steps = [
  { icon: Settings2, title: "1. Configura", text: "Sube tu catálogo, precios y zonas de entrega en minutos." },
  { icon: MessageCircle, title: "2. Conecta WhatsApp", text: "Tu bot atiende, cotiza y toma pedidos 24/7 de forma autónoma." },
  { icon: Truck, title: "3. Entrega", text: "Asignamos repartidor y avisamos al cliente en cada etapa." },
];

function Index() {
  return (
    <>
      <section className="bg-hero">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
          <div className="animate-pop">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent"><Zap className="h-3.5 w-3.5" /> Automatización para PyMEs</span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-6xl">Tu negocio vende por <span className="text-brand">WhatsApp</span>, incluso mientras duermes.</h1>
            <p className="mt-5 text-lg text-soft">Wappify responde, cotiza, toma pedidos y coordina entregas de forma 100% autónoma.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/servicios" className="btn-cta">Ver Servicios <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/contacto" className="btn-ghost">Contacto</Link>
            </div>
          </div>
          <Phone />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pt-20">
        <h2 className="text-center text-3xl font-bold text-primary">¿Cómo funciona?</h2>
        <p className="mt-2 text-center text-muted-foreground">Tres pasos para automatizar tu comercio.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.title} className="surface lift group p-6">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/20 text-primary transition group-hover:bg-cta group-hover:text-cta-foreground"><s.icon className="h-6 w-6" /></div>
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
