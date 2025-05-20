"use server";

import User from "@/app/models/user";
import { connectToDatabase } from "@/utils/db";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(64, "Password must be at most 64 characters"),
});

type Response =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      data: unknown;
    };

export async function loginUser(
  email: string,
  password: string
): Promise<Response> {
  const result = loginSchema.safeParse({ email, password });
  if (!result.success) {
    return {
      success: false,
      error: result.error.errors[0].message,
    };
  }
  try {
    await connectToDatabase();

    const userExists = await User.findOne({ email });

    if (!userExists) {
      return {
        success: false,
        error: "User does not exist",
      };
    }
    return { success: true, data: userExists };
  } catch (error) {
    console.error("Error connecting to database:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
