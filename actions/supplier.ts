"use server";

import Supplier, { ISupplier } from "@/app/models/supplier";
import { connectToDatabase } from "@/utils/db";
import { z } from "zod";

type Response<T> =
  | { success: true; data: T }
  | { success: false; error: string };

const supplierSchema = z.object({
  name: z.string().min(1, "Supplier name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string(),
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

    const newSupplier = new Supplier(supplier);
    await newSupplier.save();

    return { success: true, data: JSON.parse(JSON.stringify(newSupplier)) };
  } catch (error) {
    console.error("Error adding supplier:", error);
    return { success: false, error: "Failed to add supplier" };
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
