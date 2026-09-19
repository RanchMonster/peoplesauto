import Image from "next/image";
import { Header } from "./components/header";

export default function Home() {
   return (
      <div className="min-h-screen bg-page font-sans text-zinc-900">
         <Header />

         <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 lg:grid-cols-[1.4fr_1fr]">
            <Image
               src="/trx-truck.png"
               alt="Ram 1500 TRX"
               width={1672}
               height={941}
               className="h-auto w-full object-cover"
            />
            <div className="flex flex-col justify-center rounded border border-zinc-200 bg-white p-8">
               <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                  Peoples Auto &middot; Rockwall, TX
               </p>
               <h1 className="mt-3 text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl">
                  Right ride at the right price.
               </h1>
               <p className="mt-3 text-zinc-600">
                  Good credit, bad credit — no problem.
               </p>
               <div className="mt-6 flex flex-wrap gap-3">
                  <button
                     className="rounded bg-zinc-900 px-6 py-3 text-base font-semibold text-white transition hover:bg-zinc-700"
                  >
                     Get approved
                  </button>
               </div>
            </div>
         </section>
      </div>
   );
}
