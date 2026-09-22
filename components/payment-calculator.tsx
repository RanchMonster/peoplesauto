"use client";

import { calculateTotalMonthly, getRate } from "@/lib/inventory";
import { useMemo, useState } from "react";

const MIN_SCORE = 300;
const MAX_SCORE = 850;
const TERM_MONTHS = 60;

type PaymentCalculatorProps = {
   price: number;
};

export function PaymentCalculator({ price }: PaymentCalculatorProps) {
   const [creditScore, setCreditScore] = useState(MIN_SCORE);
   const [downPayment, setDownPayment] = useState(1);

   const monthlyPayment = useMemo(() => {
      const rate = getRate(creditScore);
      return calculateTotalMonthly(TERM_MONTHS, price, rate, downPayment);
   }, [creditScore, price, downPayment]);

   return (
      <div className="rounded border border-zinc-200 bg-white p-6">
         <h2 className="text-lg font-bold text-zinc-900">
            Estimate your payment
         </h2>
         <p className="mt-1 text-sm text-zinc-500">
            Adjust your credit score and down payment to see your monthly
            estimate.
         </p>

         <div className="mt-6 space-y-2">
            <label htmlFor="credit-score" className="form-label">
               Credit score
            </label>
            <div className="flex items-center gap-3">
               <input
                  id="credit-score"
                  type="number"
                  min={MIN_SCORE}
                  max={MAX_SCORE}
                  value={creditScore}
                  onChange={(e) => {
                     const value = Math.round(Number(e.target.value));
                     if (Number.isNaN(value)) {
                        setCreditScore(MIN_SCORE);
                     } else {
                        setCreditScore(
                           Math.min(MAX_SCORE, Math.max(MIN_SCORE, value))
                        );
                     }
                  }}
                  className="form-input w-24"
               />
               <input
                  aria-label="Credit score slider"
                  type="range"
                  min={MIN_SCORE}
                  max={MAX_SCORE}
                  step={1}
                  value={creditScore}
                  onChange={(e) => setCreditScore(Number(e.target.value))}
                  className="w-full accent-blue-700"
               />
            </div>
            <div className="flex justify-between text-xs text-zinc-400">
               <span>{MIN_SCORE}</span>
               <span>{MAX_SCORE}</span>
            </div>
         </div>

         <div className="mt-6">
            <label htmlFor="down-payment" className="form-label">
               Down payment
            </label>
            <input
               id="down-payment"
               type="number"
               min={1}
               max={price}
               step={100}
               value={downPayment}
               onChange={(e) =>
                  setDownPayment(
                     Math.min(price, Math.max(1, Number(e.target.value) || 1))
                  )
               }
               className="form-input"
            />
         </div>

         <div className="mt-6 rounded border border-zinc-200 bg-zinc-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
               Estimated monthly payment
            </p>
            <p className="mt-1 text-3xl font-black text-zinc-900">
               ${monthlyPayment.toFixed(2)}
            </p>
            <p className="mt-1 text-xs text-zinc-500">{TERM_MONTHS} months</p>
         </div>
      </div>
   );
}