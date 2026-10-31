import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Category = "Planes" | "Módulos";
export type Service = {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  features: string[];
};
export type CartItem = { id: string; qty: number };

export const IVA_RATE = 0.16;

export function cartTotals(items: CartItem[], services: Service[]) {
  const subtotal = items.reduce((s, i) => {
    const sv = services.find((x) => x.id === i.id);
    return s + (sv ? sv.price * i.qty : 0);
  }, 0);
  const iva = Math.round(subtotal * IVA_RATE * 100) / 100;
  return { subtotal, iva, total: subtotal + iva };
}

export const mxn = (n: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(n);

export const seedServices: Service[] = [
  { id: "starter", name: "Plan Starter", category: "Planes", price: 499, description: "Ideal para comenzar a vender por WhatsApp.", features: ["Bot de catálogo 24/7", "Hasta 500 conversaciones/mes", "Respuestas automáticas", "Soporte por correo"] },
  { id: "pro", name: "Plan Pro", category: "Planes", price: 1199, description: "Para PyMEs con pedidos diarios.", features: ["Conversaciones ilimitadas", "Cotizaciones automáticas", "Panel de pedidos", "Soporte prioritario"] },
  { id: "business", name: "Plan Business", category: "Planes", price: 2499, description: "Multisucursal y equipos de ventas.", features: ["Multiusuario", "Reportes avanzados", "Integraciones API", "Gerente de cuenta"] },
  { id: "pagos", name: "Módulo Pasarela de Pagos", category: "Módulos", price: 349, description: "Cobra dentro del chat con enlaces seguros.", features: ["Tarjeta y transferencia", "Links de pago", "Conciliación automática"] },
  { id: "logistica", name: "Módulo Logística de Envíos", category: "Módulos", price: 399, description: "Coordina entregas sin intervención manual.", features: ["Rastreo en tiempo real", "Asignación de repartidor", "Avisos al cliente"] },
  { id: "ia", name: "Módulo Asistente IA", category: "Módulos", price: 299, description: "Respuestas naturales a preguntas frecuentes.", features: ["Entiende lenguaje natural", "Aprende de tu catálogo", "Escala a humano"] },
];

type Store = {
  services: Service[];
  saveService: (s: Service) => void;
  deleteService: (id: string) => void;
  cart: CartItem[];
  addToCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (v: boolean) => void;
};

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>(seedServices);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const s = localStorage.getItem("af_services");
      const c = localStorage.getItem("af_cart");
      if (s) setServices(JSON.parse(s));
      if (c) setCart(JSON.parse(c));
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("af_services", JSON.stringify(services));
    localStorage.setItem("af_cart", JSON.stringify(cart));
  }, [services, cart, loaded]);

  const value: Store = {
    services,
    saveService: (s) =>
      setServices((p) => (p.some((x) => x.id === s.id) ? p.map((x) => (x.id === s.id ? s : x)) : [...p, s])),
    deleteService: (id) => {
      setServices((p) => p.filter((x) => x.id !== id));
      setCart((p) => p.filter((x) => x.id !== id));
    },
    cart,
    addToCart: (id) =>
      setCart((p) => (p.some((x) => x.id === id) ? p.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x)) : [...p, { id, qty: 1 }])),
    setQty: (id, qty) => setCart((p) => p.map((x) => (x.id === id ? { ...x, qty: Math.max(1, qty) } : x))),
    removeFromCart: (id) => setCart((p) => p.filter((x) => x.id !== id)),
    clearCart: () => setCart([]),
    cartOpen, setCartOpen, checkoutOpen, setCheckoutOpen,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useStore outside provider");
  return c;
}
