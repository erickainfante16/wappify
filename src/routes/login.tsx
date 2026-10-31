import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Bot, LogIn } from "lucide-react";
import { toast } from "sonner";
import { Field } from "@/components/Layout";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Iniciar sesión — AutoFlow" },
      { name: "description", content: "Accede a tu cuenta de AutoFlow." },
      { property: "og:title", content: "Iniciar sesión — AutoFlow" },
      { property: "og:description", content: "Acceso para clientes y dueños de negocio." },
    ],
  }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const err: Record<string, string> = {};
    if (!/^\S+@\S+\.\S+$/.test(f.email || "")) err.email = "Correo inválido";
    if ((f.password || "").length < 6) err.password = "Mínimo 6 caracteres";
    setErrors(err);
    if (Object.keys(err).length) return;
    toast.success("¡Bienvenida de vuelta!");
    nav({ to: "/admin" });
  };
  return (
    <section className="bg-hero grid min-h-[80vh] place-items-center px-4 py-14">
      <form onSubmit={submit} noValidate className="surface animate-pop w-full max-w-sm space-y-4 p-8 shadow-glow">
        <div className="text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand"><Bot className="h-6 w-6" /></span>
          <h1 className="mt-4 text-2xl font-bold">Inicia sesión</h1>
          <p className="text-sm text-muted-foreground">Clientes y dueños de negocio</p>
        </div>
        <Field name="email" label="Correo" type="email" error={errors.email} />
        <Field name="password" label="Contraseña" type="password" error={errors.password} />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted-foreground"><input type="checkbox" name="remember" className="accent-cta" /> Recordarme</label>
          <a href="#" className="text-cta hover:underline">¿Olvidaste?</a>
        </div>
        <button className="btn-cta w-full"><LogIn className="h-4 w-4" /> Iniciar sesión</button>
      </form>
    </section>
  );
}
