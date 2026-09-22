import Link from "next/link";

export function Header() {
   return (
      <header className="sticky top-0 z-50 bg-page">
         <div className="mx-auto grid max-w-6xl grid-cols-3 items-center px-4 py-3">
            <Link
               href="/sell"
               className="justify-self-start flex items-center gap-3 rounded-lg border border-zinc-200 bg-white py-2 pl-4 pr-2 transition hover:border-blue-700"
            >
               <span className="text-sm font-semibold leading-tight text-zinc-900">
                  We buy
                  <br />
                  vehicles
               </span>
               <span className="rounded-md bg-blue-700 px-6 py-3 text-base font-semibold text-white">
                  Sell your vehicle to us
               </span>
            </Link>
            <Link href="/" className="justify-self-center text-center leading-tight">
               <span className="block text-xl font-black uppercase tracking-tight text-zinc-900">
                  Peoples Auto
               </span>
               <span className="block text-[11px] font-medium uppercase tracking-widest text-zinc-500">
                  Rockwall, TX
               </span>
            </Link>
            <div></div>
         </div>
      </header>
   );
}
