"use client";
import { addNewSupplier, updateSupplier } from "@/actions/supplier";
import { ISupplier } from "@/app/models/supplier";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(100, "Email must be less than 100 characters"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  address: z
    .string()
    .min(1, "Address is required")
    .max(200, "Address must be less than 200 characters"),
  city: z
    .string()
    .min(1, "City is required")
    .max(100, "City must be less than 100 characters"),
  state: z
    .string()
    .min(1, "State is required")
    .max(100, "State must be less than 100 characters"),
  postalCode: z
    .string()
    .max(20, "Postal code must be less than 20 characters")
    .optional()
    .nullable(),
  taxId: z
    .string()
    .min(1, "Tax ID is required")
    .max(50, "Tax ID must be less than 50 characters"),
  website: z
    .string()
    .url("Invalid URL")
    .max(100, "Website must be less than 100 characters")
    .optional()
    .nullable(),
  contactPerson: z
    .string()
    .min(1, "Contact person is required")
    .max(100, "Contact person must be less than 100 characters"),
});

type SupplierFormProps =
  | {
      update: true;
      supplierId: string;
      data: ISupplier;
      hanldeClose?: () => void;
    }
  | { update?: false };
export default function SupplierForm(props: SupplierFormProps) {
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: props.update
      ? props.data
      : {
          name: "Test Supplier",
          email: "test@gmail.com",
          phone: "9876543212",
          address: "Test ",
          city: "test",
          state: "test",
          postalCode: "44200",
          taxId: "test3223",
          website: null,
          contactPerson: "432432432",
        },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    setLoading(true);
    if (props.update) {
      const result = await updateSupplier(props.supplierId, values);
      if (!result.success) {
        setError(result.error);
        setLoading(false);
        return;
      }
      props.hanldeClose?.();
      setLoading(false);
      redirect("/dashboard/suppliers");
    }
    const result = await addNewSupplier(values);
    if (!result.success) {
      setError(result.error);
      setLoading(false);
      return;
    }
    setLoading(false);
    redirect("/dashboard/suppliers");
  }

  return (
    <div className="m-2 md:px-10 my-3">
      <h2 className="text-xl bold text-center my-2">
        {props.update ? "Update Supplier" : "Add new Supplier"}
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="flex gap-2 my-6">
            <div className="w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="ABC Pvt Ltd" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="johndoe@gmai.com"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex gap-2 my-6">
            <div className="w-full">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone *</FormLabel>
                    <FormControl>
                      <Input placeholder="98********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address * </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ratnangar-3, Tandi"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex gap-2 my-6">
            <div className="w-full">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City *</FormLabel>
                    <FormControl>
                      <Input placeholder="Bharatpur" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Bagmati"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex gap-2 my-6">
            <div className="w-full">
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="44200"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="taxId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Id (Pan No.) *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="9423******"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex gap-2 my-6">
            <div className="w-full">
              <FormField
                control={form.control}
                name="contactPerson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact person *</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example.com"
                        className="w-full"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {error && <p className="text-destructive"> Error: {error}</p>}
          <Button className="w-full" disabled={loading}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
