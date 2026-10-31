import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Bot, CheckCircle2, Menu, Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { cartTotals, mxn, useStore } from "@/lib/store";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
  { to: "/admin", label: "Admin" },
] as const;

export function Navbar() {
  const { cart, setCartOpen } = useStore();
  const [open, setOpen] = useState(false);
  const count = cart.reduce((s, i) => s + i.qty, 0);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-extrabold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand"><Bot className="h-5 w-5" /></span>
          Wapp<span className="text-primary">ify</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} activeOptions={{ exact: l.to === "/" }}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground"
              activeProps={{ className: "!text-foreground bg-muted" }}>{l.label}</Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link to="/login" className="hidden btn-ghost !py-2 text-sm sm:inline-flex">Ingresar</Link>
          <button aria-label="Abrir carrito" onClick={() => setCartOpen(true)} className="relative grid h-10 w-10 place-items-center rounded-xl bg-cta text-cta-foreground transition hover:scale-105">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && <span key={count} className="animate-pop absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-xs font-bold text-accent-foreground">{count}</span>}
          </button>
          <button aria-label="Menú" className="grid h-10 w-10 place-items-center rounded-xl border border-border md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="animate-pop border-t border-border px-4 py-3 md:hidden">
          {[...links, { to: "/login", label: "Ingresar" } as const].map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground">{l.label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}

function Overlay({ onClose, children, side }: { onClose: () => void; children: ReactNode; side?: boolean }) {
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm animate-in fade-in" onClick={onClose} />
      {side ? children : <div className="relative m-auto w-full max-w-lg p-4">{children}</div>}
    </div>
  );
}

export function Modal({ onClose, children, title }: { onClose: () => void; children: ReactNode; title: string }) {
  return (
    <Overlay onClose={onClose}>
      <div className="surface animate-pop relative max-h-[90vh] overflow-y-auto p-6">
        <button aria-label="Cerrar" onClick={onClose} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        <h2 className="mb-4 text-xl font-bold">{title}</h2>
        {children}
      </div>
    </Overlay>
  );
}

export function CartDrawer() {
  const { cart, services, cartOpen, setCartOpen, setQty, removeFromCart, setCheckoutOpen } = useStore();
  if (!cartOpen) return null;
  const t = cartTotals(cart, services);
  return (
    <Overlay side onClose={() => setCartOpen(false)}>
      <aside className="relative ml-auto flex h-full w-full max-w-md flex-col border-l border-border bg-card animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="flex items-center gap-2 text-lg font-bold"><ShoppingCart className="h-5 w-5 text-cta" /> Tu carrito</h2>
          <button aria-label="Cerrar carrito" onClick={() => setCartOpen(false)}><X className="h-5 w-5" /></button>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {cart.length === 0 && <p className="py-16 text-center text-muted-foreground">Tu carrito está vacío.</p>}
          {cart.map((i) => {
            const s = services.find((x) => x.id === i.id);
            if (!s) return null;
            return (
              <div key={i.id} className="rounded-xl border border-border bg-background p-4">
                <div className="flex justify-between gap-2">
                  <div><p className="font-semibold">{s.name}</p><p className="text-sm text-soft">{mxn(s.price)} / mes</p></div>
                  <button aria-label="Eliminar" onClick={() => removeFromCart(i.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-lg border border-border">
                    <button aria-label="Menos" className="p-2 hover:text-cta" onClick={() => setQty(i.id, i.qty - 1)}><Minus className="h-4 w-4" /></button>
                    <span className="w-6 text-center font-semibold">{i.qty}</span>
                    <button aria-label="Más" className="p-2 hover:text-cta" onClick={() => setQty(i.id, i.qty + 1)}><Plus className="h-4 w-4" /></button>
                  </div>
                  <span className="font-bold">{mxn(s.price * i.qty)}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="space-y-2 border-t border-border p-5 text-sm">
          <Row k="Subtotal" v={mxn(t.subtotal)} />
          <Row k="IVA (16%)" v={mxn(t.iva)} />
          <div className="flex justify-between pt-2 text-lg font-bold"><span>Total</span><span className="text-cta">{mxn(t.total)}</span></div>
          <button disabled={!cart.length} className="btn-cta mt-3 w-full" onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}>Proceder al pago</button>
        </div>
      </aside>
    </Overlay>
  );
}
const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex justify-between text-muted-foreground"><span>{k}</span><span className="text-foreground">{v}</span></div>
);

export function CheckoutModal() {
  const { checkoutOpen, setCheckoutOpen, cart, services, clearCart } = useStore();
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  if (!checkoutOpen) return null;
  const t = cartTotals(cart, services);
  const close = () => { setCheckoutOpen(false); setDone(false); setErrors({}); };
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const err: Record<string, string> = {};
    if (!f["negocio"]?.trim()) err["negocio"] = "Requerido";
    if (!f["nombre"]?.trim()) err["nombre"] = "Requerido";
    if (!/^\S+@\S+\.\S+$/.test(f["email"] || "")) err["email"] = "Correo inválido";
    if (!/^\d{10}$/.test((f["tel"] || "").replace(/\D/g, ""))) err["tel"] = "10 dígitos";
    setErrors(err);
    if (Object.keys(err).length) return;
    clearCart();
    setDone(true);
  };
  return (
    <Modal title={done ? "¡Contratación exitosa!" : "Checkout"} onClose={close}>
      {done ? (
        <div className="py-6 text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-accent animate-pop" />
          <p className="mt-4 text-muted-foreground">Recibimos tu solicitud. Te contactaremos por WhatsApp en menos de 24 h para activar tu automatización.</p>
          <button className="btn-cta mt-6" onClick={close}>Listo</button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-3" noValidate>
          <Field name="negocio" label="Nombre del comercio" error={errors["negocio"]} />
          <Field name="nombre" label="Responsable" error={errors["nombre"]} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field name="email" label="Correo" type="email" error={errors["email"]} />
            <Field name="tel" label="WhatsApp" error={errors["tel"]} />
          </div>
          <label className="block text-sm">
            <span className="mb-1 block text-muted-foreground">Método de pago</span>
            <select name="pago" className="field">
              <option>Tarjeta de crédito / débito</option><option>Transferencia SPEI</option><option>OXXO Pay</option>
            </select>
          </label>
          <div className="flex justify-between rounded-xl bg-background p-3 font-bold"><span>Total a pagar</span><span className="text-cta">{mxn(t.total)}</span></div>
          <button className="btn-cta w-full">Confirmar contratación</button>
        </form>
      )}
    </Modal>
  );
}

export function Field({ name, label, type = "text", error, textarea, defaultValue }: { name: string; label: string; type?: string; error?: string | undefined; textarea?: boolean; defaultValue?: string | number | undefined }) {
  const cls = `field ${error ? "!border-destructive" : ""}`;
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-muted-foreground">{label}</span>
      {textarea ? <textarea name={name} rows={4} className={cls} defaultValue={defaultValue} /> : <input name={name} type={type} className={cls} defaultValue={defaultValue} />}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border py-8 text-center text-sm text-muted-foreground">
      © 2026 Wappify · Proyecto integrador Tecnolochicas · Hecho por Ericka Infante
    </footer>
  );
}
