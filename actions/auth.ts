"use server";

import User from "@/app/models/user";
import { connectToDatabase } from "@/utils/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
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

    const isPasswordValid = bcrypt.compareSync(password, userExists.password);
    if (!isPasswordValid) {
      return {
        success: false,
        error: "Invalid password",
      };
    }

    (await cookies()).set(
      "user",
      JSON.stringify({
        id: userExists.id,
        role: userExists.role,
        email: userExists.email,
      })
    );
    return {
      success: true,
      data: {
        id: userExists.id,
        role: userExists.role,
        email: userExists.email,
      },
    };
  } catch (_error) {
    console.error("Error connecting to database:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
  role: "admin" | "user" = "user"
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

    if (userExists) {
      return {
        success: false,
        error: "User already exists",
      };
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
      name,
      email,
      role,
      password: hashedPassword,
    });

    await newUser.save();

    return { success: true, data: newUser };
  } catch (error) {
    console.error("Error connecting to database:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

export async function isAuthenticated() {
  try {
    const userCookie = (await cookies()).get("user");
    if (!userCookie) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
