import { validateEmail } from "@/lib/validation";
import { User } from "@/model/user-model";
import dbConnect from "@/service/mongo";

import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { firstName, lastName, email, password, confirmPassword, userRole } =
    await request.json();

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return new NextResponse("All fields are required", { status: 400 });
  }

  if (!validateEmail(email)) {
    return new NextResponse("Invalid email address", { status: 400 });
  }

  if (password.length < 6) {
    return new NextResponse("Password must be longer than 5 characters", {
      status: 400,
    });
  }

  if (password !== confirmPassword) {
    return new NextResponse("Passwords do not match", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: userRole,
  };
  console.log("🚀 ~ POST ~ newUser:", newUser);

  try {
    await dbConnect();

    // Check for duplicate user by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse("User with this email already exists", {
        status: 409, // Conflict status code
      });
    }

    await User.create(newUser);
    // await wait(3000);
    return new NextResponse("User has been created successfully", {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};
