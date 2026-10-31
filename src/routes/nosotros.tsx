import { createFileRoute } from "@tanstack/react-router";
import { Eye, Github, Heart, Linkedin, Target } from "lucide-react";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros — Wappify" },
      { name: "description", content: "Hacemos que la tecnología trabaje para las PyMEs. Conoce a Ericka Infante." },
      { property: "og:title", content: "Nosotros — Wappify" },
      { property: "og:description", content: "Misión, visión y equipo de Wappify." },
    ],
  }),
  component: Nosotros,
});

const cards = [
  { icon: Target, title: "Misión", text: "Democratizar la automatización para que cualquier PyME venda y entregue sin fricción desde WhatsApp." },
  { icon: Eye, title: "Visión", text: "Ser la plataforma conversacional líder para comercios locales en Latinoamérica." },
  { icon: Heart, title: "Valores", text: "Simplicidad, cercanía con el cliente, innovación responsable y transparencia." },
];

function Nosotros() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">Hacemos que la tecnología <span className="text-brand">trabaje para las PyMEs</span></h1>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {cards.map((c) => (
          <div key={c.title} className="surface lift p-6">
            <c.icon className="h-8 w-8 text-cta" />
            <h3 className="mt-4 text-xl font-bold text-primary">{c.title}</h3>
            <p className="mt-2 text-muted-foreground">{c.text}</p>
          </div>
        ))}
      </div>
      <h2 className="mt-20 text-3xl font-bold text-primary">Equipo</h2>
      <div className="surface lift mt-6 flex max-w-2xl flex-col items-center gap-6 p-8 text-center sm:flex-row sm:text-left">
        <div className="grid h-28 w-28 shrink-0 place-items-center rounded-full bg-brand text-4xl font-extrabold shadow-glow">EI</div>
        <div>
          <h3 className="text-2xl font-bold">Ericka Infante</h3>
          <p className="font-semibold text-cta">Lead Full Stack Developer & Project Lead</p>
          <p className="mt-2 text-muted-foreground">Diseña y desarrolla Wappify de punta a punta: desde la experiencia de usuario hasta la lógica de automatización, con el objetivo de llevar herramientas de nivel empresarial a los comercios locales.</p>
          <div className="mt-4 flex justify-center gap-3 sm:justify-start">
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-10 w-10 place-items-center rounded-xl border border-border hover:border-primary hover:text-primary"><Github className="h-5 w-5" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-xl border border-border hover:border-cta hover:text-cta"><Linkedin className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
