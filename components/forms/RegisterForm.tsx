"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"


 
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
          <h2 className="sub-header">Personal Information.</h2>
        </section>


       <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="name"
        label="Full name"
        placeholder="Aditya Sahu"
        iconSrc="/assets/icons/user.svg"
        iconAlt="user"
        />

      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  </Form>
  )
}

export default RegisterForm