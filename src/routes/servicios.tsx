import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Search, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { mxn, useStore } from "@/lib/store";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios y Planes — AutoFlow" },
      { name: "description", content: "Planes y módulos de automatización por WhatsApp con precios en MXN." },
      { property: "og:title", content: "Servicios y Planes — AutoFlow" },
      { property: "og:description", content: "Elige tu plan y agrega módulos de pagos, logística e IA." },
    ],
  }),
  component: Servicios,
});

const cats = ["Todos", "Planes", "Módulos"] as const;

function Servicios() {
  const { services, addToCart } = useStore();
  const [cat, setCat] = useState<(typeof cats)[number]>("Todos");
  const [q, setQ] = useState("");
  const list = services.filter((s) => (cat === "Todos" || s.category === cat) && (s.name + s.description).toLowerCase().includes(q.toLowerCase()));
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-4xl font-extrabold text-primary">Servicios & Planes</h1>
      <p className="mt-2 text-soft">Arma la automatización perfecta para tu negocio.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${cat === c ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:text-foreground"}`}>{c}</button>
          ))}
        </div>
        <div className="relative sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar servicio..." className="field !pl-9" />
        </div>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s) => (
          <article key={s.id} className="surface lift flex flex-col p-6">
            <span className="w-fit rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">{s.category}</span>
            <h3 className="mt-3 text-xl font-bold">{s.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
            <p className="mt-4 text-3xl font-extrabold">{mxn(s.price)}<span className="text-sm font-medium text-muted-foreground"> /mes</span></p>
            <ul className="mt-4 flex-1 space-y-2 text-sm">
              {s.features.map((f) => <li key={f} className="flex gap-2"><Check className="h-4 w-4 shrink-0 text-accent" />{f}</li>)}
            </ul>
            <button className="btn-cta mt-6" onClick={() => { addToCart(s.id); toast.success(`${s.name} agregado al carrito`); }}>
              <ShoppingCart className="h-4 w-4" /> Agregar al Carrito
            </button>
          </article>
        ))}
        {!list.length && <p className="col-span-full py-10 text-center text-muted-foreground">No hay resultados.</p>}
      </div>
    </section>
  );
}
