
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

export const HERO_IMAGES = [
   {
      alt: "Ford F-150 Raptor",
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/2013_Ford_F-150_Raptor_SVT_Roush.jpg/1920px-2013_Ford_F-150_Raptor_SVT_Roush.jpg",
   },
   {
      alt: "Ram 1500 TRX",
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/16/Ram_1500_TRX_1X7A0057.jpg/1920px-Ram_1500_TRX_1X7A0057.jpg",
   },
];
