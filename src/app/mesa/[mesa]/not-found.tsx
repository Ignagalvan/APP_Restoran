import { CircleAlert } from "lucide-react";

export default function TableNotFound() {
  return (
    <main className="mx-auto grid min-h-svh w-full max-w-md place-items-center bg-background px-6 text-center text-foreground">
      <section>
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-secondary text-primary">
          <CircleAlert className="size-6" aria-hidden="true" />
        </span>
        <h1 className="mt-5 font-display text-3xl font-semibold">No encontramos esta mesa</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">El QR puede no ser válido o la mesa ya no está visible. Pedile ayuda al personal del restaurante.</p>
      </section>
    </main>
  );
}
