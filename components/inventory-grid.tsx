"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Vehicle } from "@/lib/inventory";

const controlClasses =
   "rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-blue-700";

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
   return (
      <Link
         href={`/details/${vehicle.id}`}
         className="overflow-hidden rounded border border-zinc-200 bg-white transition hover:border-blue-700"
      >
         <Image
            src={vehicle.image}
            alt={`${vehicle.year} ${vehicle.name}`}
            width={900}
            height={600}
            className="h-52 w-full object-cover"
         />
         <div className="p-4">
            <h3 className="font-semibold text-zinc-900">
               {vehicle.year} {vehicle.name}
            </h3>
            <p className="text-sm text-zinc-500">{vehicle.trim}</p>
            <div className="mt-3 flex items-end justify-between border-t border-zinc-100 pt-3">
               <p className="text-xl font-bold text-zinc-900">
                  ${vehicle.price.toLocaleString()}
               </p>
               <p className="text-sm text-zinc-500">
                  {vehicle.miles.toLocaleString()} mi
               </p>
            </div>
         </div>
      </Link>
   );
}

export function InventoryGrid({ vehicles }: { vehicles: Vehicle[] }) {
   const [query, setQuery] = useState("");
   const [body, setBody] = useState("All");
   const [maxPrice, setMaxPrice] = useState("Any");

   const bodyTypes = ["All", ...new Set(vehicles.map((v) => v.body))];

   const filtered = useMemo(() => {
      const q = query.trim().toLowerCase();
      const max = maxPrice === "Any" ? Infinity : Number(maxPrice);
      return vehicles.filter((v) => {
         const text = `${v.year} ${v.name} ${v.trim}`.toLowerCase();
         const matchesQuery = !q || text.includes(q);
         const matchesBody = body === "All" || v.body === body;
         const matchesPrice = v.price <= max;
         return matchesQuery && matchesBody && matchesPrice;
      });
   }, [vehicles, query, body, maxPrice]);

   return (
      <>
         <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">Our Inventory</h2>
            <div className="flex flex-wrap items-center gap-2">
               <input
                  type="search"
                  placeholder="Search by make or model"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className={`${controlClasses} w-56`}
               />
               <select
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className={controlClasses}
               >
                  {bodyTypes.map((b) => (
                     <option key={b} value={b}>
                        {b === "All" ? "All Body Types" : b}
                     </option>
                  ))}
               </select>
               <select
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className={controlClasses}
               >
                  <option value="Any">Any Price</option>
                  <option value="5000">Under $5,000</option>
                  <option value="10000">Under $10,000</option>
                  <option value="15000">Under $15,000</option>
                  <option value="50000">Under $50,000</option>
               </select>
            </div>
         </div>

         {filtered.length === 0 ? (
            <p className="mt-10 rounded border border-zinc-300 bg-white p-8 text-center text-zinc-500">
               No vehicles match your search.
            </p>
         ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
               {filtered.map((v) => (
                  <VehicleCard key={v.id} vehicle={v} />
               ))}
            </div>
         )}
      </>
   );
}
