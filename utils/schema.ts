import { z } from "zod";

export const nameSchema = z
    .string({ required_error: "Name is missing" })
    .min(3, "Name must be atleast 3 characters")
    .regex(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces").max(64, "Name must be atmost 64 character");


export const phoneSchema = z
    .string({ required_error: "Phone is required" }).min(1, "Phone is required")
    .regex(
        /^9[87][0-9]{8}$/,
        "Phone number must be exactly 10 digits and start with 98 or 97"
    );



export const stringSchema = z
    .string({ required_error: "Fileld is missing" }).trim()
    .min(3, "Fileld must be atleast 3 characters")
    .regex(/^[A-Za-z\s]+$/, "Fileld can only contain letters and spaces").max(64, "Fileld must be atmost 64 character");
