import type { Metadata } from "next";
import { Header } from "../components/header";
import { PhotoUpload } from "../components/photo-upload";

export const metadata: Metadata = {
   title: "Sell Your Vehicle | Peoples Auto",
};

const labelClasses =
   "mb-1.5 block text-sm font-medium text-zinc-700";
const inputClasses =
   "w-full bg-white rounded border-2 border-zinc-400 px-3 py-2 text-sm outline-none focus:border-blue-700";

export default function SellPage() {
   return (
      <div className="min-h-screen bg-page font-sans text-zinc-900">
         <Header />

         <main className="mx-auto max-w-xl px-4 py-12">
            <h1 className="text-2xl font-bold">Sell Your Vehicle</h1>
            <form className="mt-6 space-y-5">
               <div>
                  <label htmlFor="vin" className={labelClasses}>
                     VIN #
                  </label>
                  <input
                     id="vin"
                     type="text"
                     placeholder="e.g. 1HGCM82633A123456"
                     className={inputClasses}
                  />
               </div>
               <div>
                  <label htmlFor="photos" className={labelClasses}>
                     Photos
                  </label>
                  <PhotoUpload />
               </div>
               <div>
                  <label htmlFor="mileage" className={labelClasses}>
                     Mileage
                  </label>
                  <input
                     id="mileage"
                     type="number"
                     min={0}
                     placeholder="e.g. 125000"
                     className={inputClasses}
                  />
               </div>
               <div>
                  <label htmlFor="condition" className={labelClasses}>
                     Condition
                  </label>
                  <select id="condition" defaultValue="" className={inputClasses}>
                     <option value="" disabled>
                        Select condition
                     </option>
                     <option value="new">New</option>
                     <option value="used">Used</option>
                     <option value="refurbished">Refurbished</option>
                  </select>
               </div>
               <div>
                  <label htmlFor="notes" className={labelClasses}>
                     Notes
                  </label>
                  <textarea
                     id="notes"
                     rows={4}
                     placeholder="Does it have any damage?"
                     className={`${inputClasses} resize-y`}
                  />
               </div>
               <button
                  type="submit"
                  className="w-full rounded bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
               >
                  Submit
               </button>
            </form>
         </main>
      </div>
   );
}
