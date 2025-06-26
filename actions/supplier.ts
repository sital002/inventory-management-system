"use server";

import Product from "@/models/product";
import Supplier, { ISupplier } from "@/models/supplier";
import { connectToDatabase } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type Response<T> =
  | { success: true; data: T }
  | { success: false; error: string };

const supplierSchema = z.object({
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

export async function addNewSupplier(
  supplier: z.infer<typeof supplierSchema>
): Promise<Response<ISupplier>> {
  try {
    await connectToDatabase();
    const result = supplierSchema.safeParse(supplier);
    if (!result.success) {
      return { success: false, error: result.error.errors[0].message };
    }

    const newSupplier = new Supplier(result.data);

    await newSupplier.save();
    if (!newSupplier) {
      return { success: false, error: "Failed to create supplier" };
    }
    return { success: true, data: JSON.parse(JSON.stringify(newSupplier)) };
  } catch (error) {
    console.error("Error adding supplier:", error);
    return { success: false, error: "Failed to add supplier" };
  }
}

export async function updateSupplier(
  supplierId: string,
  supplier: z.infer<typeof supplierSchema>
): Promise<Response<ISupplier>> {
  try {
    await connectToDatabase();
    const result = supplierSchema.safeParse(supplier);
    if (!result.success) {
      return { success: false, error: result.error.errors[0].message };
    }

    const supplierExists = Supplier.find({ _id: supplierId });
    if (!supplierExists) {
      return { success: false, error: "Supplier not found" };
    }
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      supplierId,
      result.data
    ).lean();

    if (!updatedSupplier) {
      return { success: false, error: "Failed to update supplier" };
    }
    return { success: true, data: JSON.parse(JSON.stringify(updatedSupplier)) };
  } catch (error) {
    console.error("Error updating supplier:", error);
    return { success: false, error: "Failed to update supplier" };
  }
}

export async function deleteSupplier(id: string): Promise<Response<string>> {
  try {
    await connectToDatabase();
    const supplierExists = await Supplier.findById(id);
    if (!supplierExists) {
      return { success: false, error: "Supplier not found" };
    }
    const deletedSupplier = await Supplier.findByIdAndDelete(id);
    await Product.deleteMany({ supplierId: id });

    if (!deletedSupplier) {
      return { success: false, error: "Failed to delete supplier" };
    }

    revalidatePath("/dashboard/suppliers");
    return { success: true, data: "Supplier deleted successfully" };
  } catch (error) {
    console.error("Error deleting supplier:", error);
    return { success: false, error: "Failed to delete supplier" };
  }
}

export async function getAllSuppliers(): Promise<Response<ISupplier[]>> {
  try {
    await connectToDatabase();
    const suppliers = await Supplier.find().lean();
    if (!suppliers) {
      return { success: false, error: "No suppliers found" };
    }
    return { success: true, data: JSON.parse(JSON.stringify(suppliers)) };
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return { success: false, error: "Failed to fetch suppliers" };
  }
}
