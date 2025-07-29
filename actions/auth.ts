"use server";

import User, { UserType } from "@/models/user";
import { connectToDatabase } from "@/utils/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { nameSchema } from "@/utils/schema";
import { isValidObjectId } from "mongoose";

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
  } catch (error) {
    console.error("Error connecting to database:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

const userSchema = z.object({
  name: nameSchema,
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
});



export async function registerUser(
  name: string,
  email: string,
  password: string,
  role: "admin" | "user" = "admin"
): Promise<Response> {
  const result = userSchema.safeParse({ name, email, password });
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

    return { success: true, data: JSON.parse(JSON.stringify(newUser)) };
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

export async function getUserData() {
  try {
    const userCookie = (await cookies()).get("user");
    if (!userCookie) {
      return null;
    }
    const userData = JSON.parse(userCookie.value);
    if (!userData || !userData.id) {
      return null;
    }
    await connectToDatabase();
    const user = await User.findById(userData.id).select("-password").lean();
    if (!user) {
      return null;
    }
    return user;

  } catch {
    return null
  }
}

export async function getUsers() {
  try {
    await connectToDatabase();
    const isLoggedIn = await isAuthenticated();
    if (!isLoggedIn) return [];
    const users = await User.find();
    return JSON.parse(JSON.stringify(users)) as UserType[]

  } catch {
    return []
  }

}

const updateUserSchema = z.object({
  name: nameSchema,
});

export async function updateUser(data: z.infer<typeof updateUserSchema>, id: string): Promise<{ success: boolean, error?: string, data?: string }> {
  try {
    await connectToDatabase();
    const isLoggedIn = await isAuthenticated();
    if (!isLoggedIn) return { success: false, error: "User isnot loggedin" };
    if (!id) return { success: false, error: "Id is missing" };
    if (!isValidObjectId(id)) return { success: false, error: "Invalid Id" };
    const parsedData = updateUserSchema.safeParse(data);
    if (!parsedData.success) return { success: false, error: parsedData.error.errors[0].message };
    const user = await User.findById(id);
    if (!user) return { success: false, error: "User not found" };
    user.name = parsedData.data.name;
    await user.save();
    return { success: true, data: "User updated successfully" };
  }
  catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Failed to update data" }
  }

}