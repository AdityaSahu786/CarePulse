"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image";


 
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
 
const RegisterForm = ({ user}: { user: User }) => {
    
    const router = useRouter();
    const [isLoading, setisLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",

    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setisLoading(true);

    try {
        const userData = { name, email, phone };

        const user = await createUser(userData);

        if(user) router.push(`/patients/${user.$id}/register`)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Welcome 👋</h1>
            <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
          <h2 className="sub-header">Personal Information.</h2>
          </div>
        </section>


       <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="name"
        label="Fullname"
        placeholder="Aditya Sahu"
        iconSrc="/assets/icons/user.svg"
        iconAlt="user"
        />
        
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="email"
        label="Email"
        placeholder="sahuadi786@gmail.com"
        iconSrc="/assets/icons/user.svg"
        iconAlt="email"
        />

        <CustomFormField
        fieldType={FormFieldType.PHONE_INPUT}
        control={form.control}
        name="phone"
        label="Phone Number"
        placeholder="(+91) 123-456-123"
        
        />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
        fieldType={FormFieldType.DATE_PICKER}
        control={form.control}
        name="birthDate"
        label="Date of Birth"
        
        />

        <CustomFormField
        fieldType={FormFieldType.SKELETON}
        control={form.control}
        name="gender"
        label="Gender"
         renderSKeleton={(field) => (
           <FormControl>
             <RadioGroup className="flex h-11 gap-1 xl:justify-between" onValueChange={field.onChange} defaultValue={field.value}>
                 {GenderOptions.map((option) => (
                  <div key={option} className="radio-group">
                     <RadioGroupItem value={option} id={option} />
                     <Label htmlFor={option} className="cursor-pointer">
                       {option}
                     </Label>
                  </div>
                 ))}                 
             </RadioGroup>
           </FormControl>
         )}
        
        />
        </div>

        

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
           fieldType={FormFieldType.INPUT}
           control={form.control}
           name="address"
           label="Address"
           placeholder="14th Street, New York"
            />

            <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="occupation"
            label="Occupation"
            placeholder="Software Engineer"
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="emergencyContactName"
        label="EmergencyContact"
        placeholder="Guardian's name"
        />

        <CustomFormField
        fieldType={FormFieldType.PHONE_INPUT}
        control={form.control}
        name="emergencyContactNumber"
        label="Emergency Contact Number"
        placeholder="(+91) 123-456-123"
        
        />
        </div>
         

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
          <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>
           
        <CustomFormField
        fieldType={FormFieldType.SELECT}
        control={form.control}
        name="primaryPhysician"
        label="Primary Physician"
        placeholder="Select a physician"
        >
          {Doctors.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
                   
                  <div className="flex cursor-pointer items-center gap-2">
                      <Image 
                        src={doctor.image}
                        width={32}
                        height={32}
                        alt={doctor.name}
                        className="rounded-full
                        border border-dark-500"
                        />
                        <p>{doctor.name}</p>
                  </div>

            </SelectItem>
          ))}
        </CustomFormField>
        
        

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
           fieldType={FormFieldType.INPUT}
           control={form.control}
           name="insuranceProvider"
           label="Insurance provider"
           placeholder="BlueCross BlueShield"
            />

            <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insurancePolicyNumber"
            label="Insurance policy number"
            placeholder="ABC12345"
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
           fieldType={FormFieldType.TEXTAREA}
           control={form.control}
           name="allergies"
           label="Allergies (if any)"
           placeholder="Peanut, Penicillin, Pollen"
            />

            <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="currentMedication"
            label="Current medication (if any)"
            placeholder="Ibuprofen 200mg,
             Pracetamol 500 mg"
            />
        </div>

      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  </Form>
  )
}

export default RegisterForm