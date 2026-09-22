import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { PaymentCalculator } from "@/components/payment-calculator";
import { getVehicle, VEHICLES } from "@/lib/inventory";

type DetailsPageProps = {
   params: Promise<{ id: string }>;
};

export function generateStaticParams() {
   return VEHICLES.map((v) => ({ id: v.id }));
}

export async function generateMetadata({
   params,
}: DetailsPageProps): Promise<Metadata> {
   const { id } = await params;
   const vehicle = getVehicle(id);
   if (!vehicle) {
      return { title: "Vehicle Details | Peoples Auto" };
   }
   return { title: `${vehicle.year} ${vehicle.name} | Peoples Auto` };
}

export default async function DetailsPage({ params }: DetailsPageProps) {
   const { id } = await params;
   const vehicle = getVehicle(id);
   if (!vehicle) {
      notFound();
   }

   return (
      <div className="min-h-screen bg-page font-sans text-zinc-900">
         <Header />

         <main className="mx-auto max-w-6xl px-4 py-10">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
               <section className="overflow-hidden rounded border border-zinc-200 bg-white">
                  <Image
                     src={vehicle.image}
                     alt={`${vehicle.year} ${vehicle.name}`}
                     width={900}
                     height={600}
                     className="h-80 w-full object-cover"
                  />
                  <div className="p-6">
                     <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                        {vehicle.body} &middot;{" "}
                        {vehicle.miles.toLocaleString()} mi
                     </p>
                     <h1 className="mt-2 text-2xl font-black tracking-tight text-zinc-900">
                        {vehicle.year} {vehicle.name}
                     </h1>
                     <p className="text-zinc-500">{vehicle.trim}</p>
                     <p className="mt-4 text-3xl font-bold text-zinc-900">
                        ${vehicle.price.toLocaleString()}
                     </p>
                  </div>
               </section>

               <PaymentCalculator price={vehicle.price} />
            </div>
         </main>
      </div>
   );
}