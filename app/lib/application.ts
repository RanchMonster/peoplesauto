declare const brand: unique symbol;
type Brand<T, B> = T & { readonly [brand]: B };

export type PhoneNumber = Brand<string, "PhoneNumber">;
export type EmailAddress = Brand<string, "EmailAddress">;
export type SocialSecurityNumber = Brand<string, "SocialSecurityNumber">;
export type DriverLicenseNumber = Brand<string, "DriverLicenseNumber">;
export type ZipCode = Brand<string, "ZipCode">;

export enum State {
   Alabama = "AL",
   Alaska = "AK",
   Arizona = "AZ",
   Arkansas = "AR",
   California = "CA",
   Colorado = "CO",
   Connecticut = "CT",
   Delaware = "DE",
   DistrictOfColumbia = "DC",
   Florida = "FL",
   Georgia = "GA",
   Hawaii = "HI",
   Idaho = "ID",
   Illinois = "IL",
   Indiana = "IN",
   Iowa = "IA",
   Kansas = "KS",
   Kentucky = "KY",
   Louisiana = "LA",
   Maine = "ME",
   Maryland = "MD",
   Massachusetts = "MA",
   Michigan = "MI",
   Minnesota = "MN",
   Mississippi = "MS",
   Missouri = "MO",
   Montana = "MT",
   Nebraska = "NE",
   Nevada = "NV",
   NewHampshire = "NH",
   NewJersey = "NJ",
   NewMexico = "NM",
   NewYork = "NY",
   NorthCarolina = "NC",
   NorthDakota = "ND",
   Ohio = "OH",
   Oklahoma = "OK",
   Oregon = "OR",
   Pennsylvania = "PA",
   RhodeIsland = "RI",
   SouthCarolina = "SC",
   SouthDakota = "SD",
   Tennessee = "TN",
   Texas = "TX",
   Utah = "UT",
   Vermont = "VT",
   Virginia = "VA",
   Washington = "WA",
   WestVirginia = "WV",
   Wisconsin = "WI",
   Wyoming = "WY",
}

export const STATE_CODES = Object.values(State) as State[];

export enum ResidenceType {
   Rent = "RENT",
   Own = "OWN",
}

export type EmploymentRecord = {
   employerName: string;
   employerPhone?: PhoneNumber;
   occupation?: string;
   yearsAtJob: number;
   monthsAtJob: number;
};

export type EmploymentInfo = {
   monthlyIncome: number;
   employmentHistory: EmploymentRecord[];
};

export type EmploymentStatus =
   | "FULL_TIME"
   | "PART_TIME"
   | "SELF_EMPLOYED"
   | "RETIRED";

export type ResidenceInfo = {
   address: string;
   city: string;
   state: State;
   zip: ZipCode;
   country: string;
   yearsAtAddress: number;
   monthsAtAddress: number;
   residenceType: ResidenceType;
};

export type PersonalInfo = {
   firstName: string;
   lastName: string;
   middleInitial?: string;
   email: EmailAddress;
   dateOfBirth: Date;
   phone: PhoneNumber;
   socialSecurityNumber: SocialSecurityNumber;
   driversLicenseNumber: DriverLicenseNumber;
};

export type LoanDetails = {
   downPayment: number;
   tradeInValue?: number;
   coApplicant: boolean;
};

export type LoanApplication = {
   personalInfo: PersonalInfo;
   residenceInfo: ResidenceInfo;
   employmentInfo: EmploymentInfo;
   loanDetails: LoanDetails;
};

export function isPhoneNumber(value: string): value is PhoneNumber {
   return /^\+?1?\s*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(value);
}

export function isEmailAddress(value: string): value is EmailAddress {
   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isSocialSecurityNumber(
   value: string
): value is SocialSecurityNumber {
   return /^(?!000|666|9\d{2})\d{3}-?\d{2}-?\d{4}$/.test(value);
}

export function isDriverLicenseNumber(
   value: string
): value is DriverLicenseNumber {
   return /^[A-Za-z0-9]{5,17}$/.test(value);
}

export function isZipCode(value: string): value is ZipCode {
   return /^\d{5}(-\d{4})?$/.test(value);
}

export function isState(value: string): value is State {
   return STATE_CODES.includes(value as State);
}

export function isResidenceType(value: string): value is ResidenceType {
   return value === ResidenceType.Rent || value === ResidenceType.Own;
}

export function isMiddleInitial(value: string): boolean {
   return /^[A-Za-z]$/.test(value);
}

export function isAgeAtLeast18(dateOfBirth: Date): boolean {
   const cutoff = new Date();
   cutoff.setFullYear(cutoff.getFullYear() - 18);
   return dateOfBirth <= cutoff;
}
