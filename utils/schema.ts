import { z } from "zod";

export const nameSchema = z
    .string({ required_error: "Name is missing" })
    .min(3, "Name must be atleast 3 characters")
    .regex(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces").max(64, "Name must be atmost 64 character");