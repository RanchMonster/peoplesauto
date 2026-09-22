"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Header } from "@/components/header";
import {
   isAgeAtLeast18,
   isDriverLicenseNumber,
   isEmailAddress,
   isMiddleInitial,
   isPhoneNumber,
   isResidenceType,
   isSocialSecurityNumber,
   isState,
   isZipCode,
   ResidenceType,
   STATE_CODES,
} from "@/lib/application";

type EmploymentFormEntry = {
   employerName: string;
   employerPhone: string;
   occupation: string;
   yearsAtJob: string;
   monthsAtJob: string;
};

type RawForm = {
   firstName: string;
   lastName: string;
   middleInitial: string;
   email: string;
   phone: string;
   dateOfBirth: string;
   ssn: string;
   driversLicense: string;
   address: string;
   city: string;
   state: string;
   zip: string;
   country: string;
   yearsAtAddress: string;
   monthsAtAddress: string;
   residenceType: string;
   employment: EmploymentFormEntry[];
   monthlyIncome: string;
   downPayment: string;
   tradeInValue: string;
   coApplicant: string;
};

type Errors = Record<string, string>;

const emptyEmploymentEntry = (): EmploymentFormEntry => ({
   employerName: "",
   employerPhone: "",
   occupation: "",
   yearsAtJob: "",
   monthsAtJob: "",
});

const initialForm: RawForm = {
   firstName: "",
   lastName: "",
   middleInitial: "",
   email: "",
   phone: "",
   dateOfBirth: "",
   ssn: "",
   driversLicense: "",
   address: "",
   city: "",
   state: "",
   zip: "",
   country: "USA",
   yearsAtAddress: "",
   monthsAtAddress: "",
   residenceType: "",
   employment: [emptyEmploymentEntry()],
   monthlyIncome: "",
   downPayment: "",
   tradeInValue: "",
   coApplicant: "no",
};

const sectionHeading = "mt-2 text-lg font-semibold text-zinc-900";

type TextFieldProps = {
   id: string;
   label: string;
   value: string;
   error?: string;
   type?: string;
   placeholder?: string;
   min?: number;
   onChange: (value: string) => void;
   colSpan?: string;
};

function TextField({
   id,
   label,
   value,
   error,
   type = "text",
   placeholder,
   min,
   onChange,
   colSpan,
}: TextFieldProps) {
   return (
      <div className={colSpan}>
         <label
            htmlFor={`field-${id}`}
            className={`form-label ${error ? "text-red-700" : ""}`}
         >
            {label}
         </label>
         <input
            id={`field-${id}`}
            type={type}
            value={value}
            min={min}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={error ? "form-input-error" : "form-input"}
            aria-invalid={!!error}
         />
         {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
   );
}

type SelectFieldProps = {
   id: string;
   label: string;
   value: string;
   error?: string;
   options: { value: string; label: string }[];
   onChange: (value: string) => void;
   colSpan?: string;
};

function SelectField({
   id,
   label,
   value,
   error,
   options,
   onChange,
   colSpan,
}: SelectFieldProps) {
   return (
      <div className={colSpan}>
         <label
            htmlFor={`field-${id}`}
            className={`form-label ${error ? "text-red-700" : ""}`}
         >
            {label}
         </label>
         <select
            id={`field-${id}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={error ? "form-input-error" : "form-input"}
            aria-invalid={!!error}
         >
            <option value="" disabled>
               Select
            </option>
            {options.map((o) => (
               <option key={o.value} value={o.value}>
                  {o.label}
               </option>
            ))}
         </select>
         {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
   );
}

function PersonalSection({
   form,
   errors,
   set,
}: {
   form: RawForm;
   errors: Errors;
   set: (key: keyof RawForm) => (value: string) => void;
}) {
   return (
      <section className="grid gap-4 sm:grid-cols-2">
         <h2 className={`${sectionHeading} col-span-full`}>
            Personal Information
         </h2>
         <TextField
            id="firstName"
            label="First name"
            value={form.firstName}
            error={errors.firstName}
            onChange={set("firstName")}
         />
         <TextField
            id="lastName"
            label="Last name"
            value={form.lastName}
            error={errors.lastName}
            onChange={set("lastName")}
         />
         <TextField
            id="middleInitial"
            label="Middle initial (optional)"
            value={form.middleInitial}
            error={errors.middleInitial}
            placeholder="e.g. R"
            onChange={set("middleInitial")}
         />
         <TextField
            id="dateOfBirth"
            label="Date of birth"
            value={form.dateOfBirth}
            error={errors.dateOfBirth}
            type="date"
            onChange={set("dateOfBirth")}
         />
         <TextField
            id="email"
            label="Email"
            type="email"
            value={form.email}
            error={errors.email}
            placeholder="you@example.com"
            onChange={set("email")}
            colSpan="sm:col-span-2"
         />
         <TextField
            id="phone"
            label="Phone"
            type="tel"
            value={form.phone}
            error={errors.phone}
            placeholder="(555) 123-4567"
            onChange={set("phone")}
         />
         <TextField
            id="ssn"
            label="Social Security Number"
            value={form.ssn}
            error={errors.ssn}
            placeholder="123-45-6789"
            onChange={set("ssn")}
         />
         <TextField
            id="driversLicense"
            label="Driver's license number"
            value={form.driversLicense}
            error={errors.driversLicense}
            placeholder="License number"
            onChange={set("driversLicense")}
            colSpan="sm:col-span-2"
         />
      </section>
   );
}

function ResidenceSection({
   form,
   errors,
   set,
}: {
   form: RawForm;
   errors: Errors;
   set: (key: keyof RawForm) => (value: string) => void;
}) {
   return (
      <section className="grid gap-4 sm:grid-cols-2">
         <h2 className={`${sectionHeading} col-span-full`}>Residence</h2>
         <TextField
            id="address"
            label="Street address"
            value={form.address}
            error={errors.address}
            placeholder="123 Main St"
            onChange={set("address")}
            colSpan="sm:col-span-2"
         />
         <TextField
            id="city"
            label="City"
            value={form.city}
            error={errors.city}
            onChange={set("city")}
         />
         <SelectField
            id="state"
            label="State"
            value={form.state}
            error={errors.state}
            onChange={set("state")}
            options={STATE_CODES.map((code) => ({ value: code, label: code }))}
         />
         <TextField
            id="zip"
            label="ZIP"
            value={form.zip}
            error={errors.zip}
            placeholder="75087"
            onChange={set("zip")}
         />
         <TextField
            id="country"
            label="Country"
            value={form.country}
            error={errors.country}
            onChange={set("country")}
         />
         <TextField
            id="yearsAtAddress"
            label="Years at address"
            type="number"
            min={0}
            value={form.yearsAtAddress}
            error={errors.yearsAtAddress}
            onChange={set("yearsAtAddress")}
         />
         <TextField
            id="monthsAtAddress"
            label="Months at address"
            type="number"
            min={0}
            value={form.monthsAtAddress}
            error={errors.monthsAtAddress}
            onChange={set("monthsAtAddress")}
         />
         <SelectField
            id="residenceType"
            label="Residence type"
            value={form.residenceType}
            error={errors.residenceType}
            onChange={set("residenceType")}
            options={[
               { value: ResidenceType.Rent, label: "Rent" },
               { value: ResidenceType.Own, label: "Own" },
            ]}
            colSpan="sm:col-span-2"
         />
      </section>
   );
}

function EmploymentRecordSection({
   index,
   entry,
   errors,
   setEntry,
}: {
   index: number;
   entry: EmploymentFormEntry;
   errors: Errors;
   setEntry: (field: keyof EmploymentFormEntry) => (value: string) => void;
}) {
   const prefix = `employment-${index}`;
   const heading = index === 0 ? "Current Employer" : "Previous Employer";
   return (
      <section className="grid gap-4 sm:grid-cols-2">
         <h3 className={`${sectionHeading} col-span-full`}>
            {heading}
            {index > 0 && (
               <span className="ml-2 font-normal text-zinc-400">(optional)</span>
            )}
         </h3>
         <TextField
            id={`${prefix}-employerName`}
            label="Employer"
            value={entry.employerName}
            error={errors[`${prefix}-employerName`]}
            placeholder="Employer name"
            onChange={setEntry("employerName")}
         />
         <TextField
            id={`${prefix}-occupation`}
            label="Occupation"
            value={entry.occupation}
            error={errors[`${prefix}-occupation`]}
            onChange={setEntry("occupation")}
         />
         <TextField
            id={`${prefix}-employerPhone`}
            label="Employer phone (optional)"
            type="tel"
            value={entry.employerPhone}
            error={errors[`${prefix}-employerPhone`]}
            placeholder="(555) 123-4567"
            onChange={setEntry("employerPhone")}
            colSpan="sm:col-span-2"
         />
         <TextField
            id={`${prefix}-yearsAtJob`}
            label="Years at job"
            type="number"
            min={0}
            value={entry.yearsAtJob}
            error={errors[`${prefix}-yearsAtJob`]}
            onChange={setEntry("yearsAtJob")}
         />
         <TextField
            id={`${prefix}-monthsAtJob`}
            label="Months at job"
            type="number"
            min={0}
            value={entry.monthsAtJob}
            error={errors[`${prefix}-monthsAtJob`]}
            onChange={setEntry("monthsAtJob")}
         />
      </section>
   );
}

function LoanDetailsSection({
   form,
   errors,
   set,
}: {
   form: RawForm;
   errors: Errors;
   set: (key: keyof RawForm) => (value: string) => void;
}) {
   return (
      <section className="grid gap-4 sm:grid-cols-2">
         <h2 className={`${sectionHeading} col-span-full`}>Loan Details</h2>
         <TextField
            id="downPayment"
            label="Down payment"
            type="number"
            min={0}
            value={form.downPayment}
            error={errors.downPayment}
            placeholder="e.g. 2000"
            onChange={set("downPayment")}
         />
         <TextField
            id="tradeInValue"
            label="Trade-in value (optional)"
            type="number"
            min={0}
            value={form.tradeInValue}
            error={errors.tradeInValue}
            placeholder="e.g. 5000"
            onChange={set("tradeInValue")}
         />
         <SelectField
            id="coApplicant"
            label="Co-applicant"
            value={form.coApplicant}
            error={errors.coApplicant}
            onChange={set("coApplicant")}
            options={[
               { value: "no", label: "No" },
               { value: "yes", label: "Yes" },
            ]}
            colSpan="sm:col-span-2"
         />
      </section>
   );
}

function validDateOfBirth(value: string): string | undefined {
   if (!value) return "Date of birth is required.";
   const dob = new Date(value);
   if (Number.isNaN(dob.getTime())) return "Enter a valid date.";
   if (dob > new Date()) return "Date of birth cannot be in the future.";
   if (!isAgeAtLeast18(dob)) return "You must be at least 18 years old.";
   return undefined;
}

function requiredNumber(
   value: string,
   message: string,
   {
      allowZero = false,
      positive = false,
   }: { allowZero?: boolean; positive?: boolean } = {}
): string | undefined {
   if (value === "" || value === null || value === undefined) return message;
   const n = Number(value);
   if (Number.isNaN(n)) return "Must be a valid number.";
   if (positive && n <= 0) return "Must be greater than zero.";
   if (!allowZero && n < 0) return "Cannot be negative.";
   return undefined;
}

function optionalNumber(value: string): string | undefined {
   if (value === "" || value === null || value === undefined) return undefined;
   return requiredNumber(value, "Must be a valid number.");
}

function entryIsEmpty(entry: EmploymentFormEntry): boolean {
   return (
      entry.employerName === "" &&
      entry.employerPhone === "" &&
      entry.occupation === "" &&
      entry.yearsAtJob === "" &&
      entry.monthsAtJob === ""
   );
}

export default function ApplyPage() {
   const [form, setForm] = useState<RawForm>(initialForm);
   const [errors, setErrors] = useState<Errors>({});

   const set =
      (key: keyof RawForm) =>
      (value: string) =>
         setForm((f) => ({ ...f, [key]: value }));

   const firstEntry = form.employment[0] ?? emptyEmploymentEntry();
   const firstHasDuration =
      firstEntry.yearsAtJob !== "" || firstEntry.monthsAtJob !== "";
   const tenureMonths = firstHasDuration
      ? (parseInt(firstEntry.yearsAtJob, 10) || 0) * 12 +
        (parseInt(firstEntry.monthsAtJob, 10) || 0)
      : Infinity;
   const minSections = tenureMonths < 24 ? 2 : 1;
   const shownSections = Math.max(1, form.employment.length, minSections);
   const shownEntries = Array.from({ length: shownSections }, (_, i) =>
      form.employment[i] ?? emptyEmploymentEntry()
   );

   const setEntry =
      (index: number) =>
      (field: keyof EmploymentFormEntry) =>
      (value: string) =>
         setForm((f) => {
            const arr = f.employment.slice();
            while (arr.length <= index) arr.push(emptyEmploymentEntry());
            arr[index] = { ...arr[index], [field]: value };
            return { ...f, employment: arr };
         });

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const nextErrors: Errors = {};
      const addOrder: string[] = [];
      const addError = (key: string, message: string) => {
         if (!(key in nextErrors)) {
            nextErrors[key] = message;
            addOrder.push(key);
         }
      };

      if (!form.firstName.trim()) addError("firstName", "First name is required.");
      if (!form.lastName.trim()) addError("lastName", "Last name is required.");
      if (form.middleInitial && !isMiddleInitial(form.middleInitial))
         addError("middleInitial", "Enter a single letter.");
      if (!isEmailAddress(form.email.trim()))
         addError("email", "Enter a valid email address.");
      if (!isPhoneNumber(form.phone.trim()))
         addError("phone", "Enter a valid phone number.");
      const dobError = validDateOfBirth(form.dateOfBirth);
      if (dobError) addError("dateOfBirth", dobError);
      if (!isSocialSecurityNumber(form.ssn.trim()))
         addError("ssn", "Enter a valid SSN (123-45-6789).");
      if (!isDriverLicenseNumber(form.driversLicense.trim()))
         addError("driversLicense", "Enter a valid driver's license number.");
      if (!form.address.trim()) addError("address", "Street address is required.");
      if (!form.city.trim()) addError("city", "City is required.");
      if (!isState(form.state)) addError("state", "Select a state.");
      if (!isZipCode(form.zip.trim())) addError("zip", "Enter a valid ZIP code.");
      if (!form.country.trim()) addError("country", "Country is required.");
      if (!form.yearsAtAddress && !form.monthsAtAddress)
         addError("yearsAtAddress", "Enter time at this address.");
      const yearsAtAddressError = optionalNumber(form.yearsAtAddress);
      if (yearsAtAddressError) addError("yearsAtAddress", yearsAtAddressError);
      const monthsAtAddressError = optionalNumber(form.monthsAtAddress);
      if (monthsAtAddressError) addError("monthsAtAddress", monthsAtAddressError);
      if (!isResidenceType(form.residenceType))
         addError("residenceType", "Select a residence type.");

      shownEntries.forEach((entry, i) => {
         const prefix = `employment-${i}`;
         if (i > 0 && entryIsEmpty(entry)) return;
         if (!entry.employerName.trim())
            addError(`${prefix}-employerName`, "Employer name is required.");
         if (entry.employerPhone && !isPhoneNumber(entry.employerPhone.trim()))
            addError(`${prefix}-employerPhone`, "Enter a valid phone number.");
         if (!entry.yearsAtJob && !entry.monthsAtJob)
            addError(`${prefix}-yearsAtJob`, "Enter time at this job.");
         const yearsError = optionalNumber(entry.yearsAtJob);
         if (yearsError) addError(`${prefix}-yearsAtJob`, yearsError);
         const monthsError = optionalNumber(entry.monthsAtJob);
         if (monthsError) addError(`${prefix}-monthsAtJob`, monthsError);
      });

      const incomeError = requiredNumber(form.monthlyIncome, "Monthly income is required.", {
         allowZero: true,
         positive: true,
      });
      if (incomeError) addError("monthlyIncome", incomeError);
      const downError = requiredNumber(form.downPayment, "Down payment is required.", {
         allowZero: true,
      });
      if (downError) addError("downPayment", downError);
      const tradeError = optionalNumber(form.tradeInValue);
      if (tradeError) addError("tradeInValue", tradeError);
      if (form.coApplicant !== "yes" && form.coApplicant !== "no")
         addError("coApplicant", "Select co-applicant.");

      setErrors(nextErrors);
      if (addOrder.length > 0) {
         const el = document.getElementById(`field-${addOrder[0]}`);
         el?.scrollIntoView({ behavior: "smooth", block: "center" });
         el?.focus();
      }
   };

   return (
      <div className="min-h-screen bg-page font-sans text-zinc-900">
         <Header />

         <main className="mx-auto max-w-2xl px-4 py-12">
            <h1 className="text-2xl font-bold">Loan Application</h1>
            <p className="mt-1 text-sm text-zinc-600">
               Good credit, bad credit — no problem. Apply in minutes.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-10">
               {Object.keys(errors).length > 0 && (
                  <div className="rounded border-2 border-red-600 bg-red-50 p-4 text-sm text-red-700">
                     <p className="font-semibold">
                        Please fix the highlighted fields to continue.
                     </p>
                  </div>
               )}

               <PersonalSection form={form} errors={errors} set={set} />
               <ResidenceSection form={form} errors={errors} set={set} />

               <section className="space-y-8">
                  <h2 className={sectionHeading}>Employment</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                     <TextField
                        id="monthlyIncome"
                        label="Monthly income"
                        type="number"
                        min={0}
                        value={form.monthlyIncome}
                        error={errors.monthlyIncome}
                        placeholder="e.g. 3500"
                        onChange={set("monthlyIncome")}
                        colSpan="sm:col-span-2"
                     />
                  </div>
                  {shownEntries.map((entry, i) => (
                     <EmploymentRecordSection
                        key={`employment-${i}`}
                        index={i}
                        entry={entry}
                        errors={errors}
                        setEntry={setEntry(i)}
                     />
                  ))}
               </section>

               <LoanDetailsSection form={form} errors={errors} set={set} />

               <button
                  type="submit"
                  className="w-full rounded bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
               >
                  Submit Application
               </button>
            </form>
         </main>
      </div>
   );
}
