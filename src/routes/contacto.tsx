import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mail, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Field } from "@/components/Layout";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Wappify" },
      { name: "description", content: "Escríbenos y automatiza tu negocio por WhatsApp con Wappify." },
      { property: "og:title", content: "Contacto — Wappify" },
      { property: "og:description", content: "Soporte por WhatsApp, correo y formulario para PyMEs." },
    ],
  }),
  component: Contacto,
});

const schema = z.object({
  nombre: z.string().trim().min(2, "Ingresa tu nombre").max(100),
  negocio: z.string().trim().min(2, "Ingresa tu negocio").max(100),
  email: z.string().trim().email("Correo inválido").max(255),
  mensaje: z.string().trim().min(10, "Mínimo 10 caracteres").max(1000),
});

function Contacto() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!r.success) {
      setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message])));
      return;
    }
    setErrors({});
    e.currentTarget.reset();
    toast.success("¡Mensaje enviado! Te responderemos pronto.");
  };
  const info = [
    { icon: MessageCircle, label: "WhatsApp soporte", value: "+52 55 0000 0000", cls: "text-accent" },
    { icon: Mail, label: "Correo", value: "hola@wappify.mx", cls: "text-cta" },
    { icon: Clock, label: "Horario", value: "Lun–Vie 9:00–18:00", cls: "text-primary" },
  ];
  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-5">
      <div className="md:col-span-2">
        <h1 className="text-4xl font-extrabold text-primary">Contáctenos</h1>
        <p className="mt-2 text-soft">¿Listo para automatizar tu negocio? Hablemos.</p>
        <div className="mt-8 space-y-4">
          {info.map((i) => (
            <div key={i.label} className="surface lift flex items-center gap-4 p-4">
              <i.icon className={`h-6 w-6 ${i.cls}`} />
              <div><p className="text-xs text-muted-foreground">{i.label}</p><p className="font-semibold">{i.value}</p></div>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={submit} noValidate className="surface space-y-4 p-6 md:col-span-3">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="nombre" label="Nombre" error={errors["nombre"]} />
          <Field name="negocio" label="Negocio" error={errors["negocio"]} />
        </div>
        <Field name="email" label="Correo" type="email" error={errors["email"]} />
        <Field name="mensaje" label="¿Qué te gustaría automatizar?" textarea error={errors["mensaje"]} />
        <button className="btn-cta w-full"><Send className="h-4 w-4" /> Enviar mensaje</button>
      </form>
    </section>
  );
}
