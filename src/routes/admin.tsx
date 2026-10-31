import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Field, Modal } from "@/components/Layout";
import { mxn, useStore, type Category, type Service } from "@/lib/store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Panel de Administración — AutoFlow" },
      { name: "description", content: "Gestiona los servicios y paquetes de AutoFlow." },
      { property: "og:title", content: "Panel de Administración — AutoFlow" },
      { property: "og:description", content: "CRUD de servicios y paquetes." },
    ],
  }),
  component: Admin,
});

function Admin() {
  const { services, saveService, deleteService } = useStore();
  const [editing, setEditing] = useState<Service | "new" | null>(null);
  const [toDelete, setToDelete] = useState<Service | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const err: Record<string, string> = {};
    if (!f.name?.trim()) err.name = "Requerido";
    const price = Number(f.price);
    if (!(price > 0)) err.price = "Precio mayor a 0";
    setErrors(err);
    if (Object.keys(err).length) return;
    const id = editing && editing !== "new" ? editing.id : crypto.randomUUID();
    saveService({
      id, name: f.name.trim(), category: f.category as Category, price,
      description: f.description.trim(),
      features: f.features.split("\n").map((s) => s.trim()).filter(Boolean),
    });
    toast.success(editing === "new" ? "Servicio creado" : "Servicio actualizado");
    setEditing(null);
  };
  const cur = editing && editing !== "new" ? editing : undefined;

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><h1 className="text-4xl font-extrabold text-primary">Gestor de Servicios</h1><p className="text-soft">{services.length} registros</p></div>
        <button className="btn-cta" onClick={() => { setErrors({}); setEditing("new"); }}><Plus className="h-4 w-4" /> Nuevo servicio</button>
      </div>
      <div className="surface mt-8 overflow-x-auto">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="border-b border-border text-muted-foreground">
            <tr><th className="p-4">Nombre</th><th className="p-4">Categoría</th><th className="p-4">Precio</th><th className="p-4">Beneficios</th><th className="p-4 text-right">Acciones</th></tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id} className="border-b border-border/60 transition last:border-0 hover:bg-muted">
                <td className="p-4 font-semibold">{s.name}</td>
                <td className="p-4"><span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">{s.category}</span></td>
                <td className="p-4">{mxn(s.price)}</td>
                <td className="p-4 text-muted-foreground">{s.features.length}</td>
                <td className="p-4 text-right">
                  <button aria-label="Editar" onClick={() => { setErrors({}); setEditing(s); }} className="mr-2 rounded-lg p-2 text-cta hover:bg-background"><Pencil className="h-4 w-4" /></button>
                  <button aria-label="Eliminar" onClick={() => setToDelete(s)} className="rounded-lg p-2 text-destructive hover:bg-background"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
            {!services.length && <tr><td colSpan={5} className="p-10 text-center text-muted-foreground">Sin servicios.</td></tr>}
          </tbody>
        </table>
      </div>

      {editing && (
        <Modal title={cur ? "Editar servicio" : "Nuevo servicio"} onClose={() => setEditing(null)}>
          <form onSubmit={submit} noValidate className="space-y-3">
            <Field name="name" label="Nombre" defaultValue={cur?.name} error={errors.name} />
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm"><span className="mb-1 block text-muted-foreground">Categoría</span>
                <select name="category" defaultValue={cur?.category ?? "Planes"} className="field"><option>Planes</option><option>Módulos</option></select>
              </label>
              <Field name="price" label="Precio (MXN)" type="number" defaultValue={cur?.price} error={errors.price} />
            </div>
            <Field name="description" label="Descripción" defaultValue={cur?.description} />
            <Field name="features" label="Beneficios (uno por línea)" textarea defaultValue={cur?.features.join("\n")} />
            <button className="btn-cta w-full">Guardar</button>
          </form>
        </Modal>
      )}
      {toDelete && (
        <Modal title="Confirmar eliminación" onClose={() => setToDelete(null)}>
          <div className="flex gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4">
            <AlertTriangle className="h-5 w-5 shrink-0 text-destructive" />
            <p>¿Eliminar <b>{toDelete.name}</b>? Esta acción no se puede deshacer.</p>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <button className="btn-ghost" onClick={() => setToDelete(null)}>Cancelar</button>
            <button className="btn-cta !bg-destructive !text-destructive-foreground" onClick={() => { deleteService(toDelete.id); toast.success("Servicio eliminado"); setToDelete(null); }}>Eliminar</button>
          </div>
        </Modal>
      )}
    </section>
  );
}
