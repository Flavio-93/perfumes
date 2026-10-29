import { perfumes } from "@/data/perfumes";
import ProductDetail from "./ProductDetail";
import { Suspense } from "react";

export function generateStaticParams() {
  return perfumes.map((perfume) => ({
    id: perfume.id,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-dark flex items-center justify-center text-brand-gold text-xs uppercase tracking-widest">Cargando producto...</div>}>
      <ProductDetail id={resolvedParams.id} />
    </Suspense>
  );
}
