
// Vehicle data
export type Vehicle = {
   id: string;
   name: string;
   trim: string;
   body: string;
   year: number;
   miles: number;
   price: number;
   monthly?: number;
   image: string;
};

export enum Rate {
   Excellent = 0.0525,
   Good = 0.0999,
   Fair = 0.1299,
   Poor = 0.18,
}

export function getRate(creditScore: number): Rate {
   if (creditScore >= 780) {
      return Rate.Excellent;
   } else if (creditScore >= 650) {
      return Rate.Good;
   } else if (creditScore >= 600) {
      return Rate.Fair;
   }
   return Rate.Poor;
}

// rate is an annual APR; the amortization formula uses the monthly rate
export function calculateTotalMonthly(
   months: number,
   price: number,
   rate: number,
   downPayment: number
): number {
   const principal = price - downPayment;
   const monthlyRate = rate / 12;
   return (
      principal *
      ((monthlyRate * (1 + monthlyRate) ** months) /
         ((1 + monthlyRate) ** months - 1))
   );
}

// default template for vehicles
export const VEHICLES: Vehicle[] = [
   {
      id: "silverado",
      name: "Chevrolet Silverado 1500",
      trim: "Z71 Extended Cab 4WD",
      body: "Pickup",
      year: 2004,
      miles: 174500,
      price: 5650,
      monthly: 98,
      image:
         "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=900&q=70",
   },
   {
      id: "maxima",
      name: "Nissan Maxima",
      trim: "3.5 SL Sedan",
      body: "Sedan",
      year: 2005,
      miles: 187320,
      price: 3500,
      monthly: 61,
      image:
         "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=900&q=70",
   },
   {
      id: "mini",
      name: "MINI Cooper S",
      trim: "Convertible",
      body: "Convertible",
      year: 2012,
      miles: 71941,
      price: 9761,
      monthly: 170,
      image:
         "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=70",
   },
   {
      id: "raptor",
      name: "Ford F-150 Raptor",
      trim: "4x4 SuperCrew",
      body: "Pickup",
      year: 2018,
      miles: 59530,
      price: 44995,
      monthly: 781,
      image:
         "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=70",
   },
   {
      id: "wrangler",
      name: "Jeep Wrangler Rubicon",
      trim: "4x4",
      body: "SUV",
      year: 2011,
      miles: 139400,
      price: 13431,
      monthly: 261,
      image:
         "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=70",
   },
   {
      id: "mustang",
      name: "Ford Mustang GT",
      trim: "Coupe",
      body: "Coupe",
      year: 2007,
      miles: 105000,
      price: 11500,
      monthly: 200,
      image:
         "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=900&q=70",
   },
];
export function getVehicle(id: string): Vehicle | undefined {
   return VEHICLES.find((v) => v.id === id);
}
