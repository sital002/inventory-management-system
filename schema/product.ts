import { nameSchema, stringSchema } from "@/utils/schema";
import { z } from "zod";


export const productSchema = z.object({
  name: nameSchema,
  sku: stringSchema
    .min(3, "SKU must be at least 3 characters")
    .max(50, "SKU must be less than 50 characters"),
  barcode: stringSchema.optional().or(z.literal("")),
  categoryId: z.string().min(1, "Please select a category"),
  supplierId: z.string().min(1, "Please select a supplier"),
  brand: stringSchema.optional().or(z.literal("")),
  description: stringSchema.optional().or(z.literal("")),
  unit: z.string().min(1, "Unit is required"),

  costPrice: z
    .string()
    .min(1, "Cost price is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Cost price must be a positive number"
    ),
  sellingPrice: z
    .string()
    .min(1, "Selling price is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Selling price must be a positive number"
    ),
  discountPrice: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => !val || (!isNaN(Number(val)) && Number(val) >= 0),
      "Discount price must be a positive number"
    ),

  initialStock: z
    .string()
    .min(1, "Initial stock is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Initial stock must be a non-negative number"
    ),
  lowStockThreshold: z
    .string()
    .min(1, "Low stock threshold is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Low stock threshold must be a non-negative number"
    ),

  weight: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => !val || (!isNaN(Number(val)) && Number(val) > 0),
      "Weight must be a positive number"
    ),
  dimensions: z.string().optional().or(z.literal("")),

  isPerishable: z.boolean(),
  isActive: z.boolean(),
  trackInventory: z.boolean(),
  requiresRefrigeration: z.boolean(),
  isOrganic: z.boolean(),
});