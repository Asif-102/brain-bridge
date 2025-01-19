"use server";

import { signIn } from "@/auth";

export async function credentialLogin(formData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (error) {
    console.log("🚀 ~ credentialLogin ~ error:", error.message);
    // throw new Error(error.message);
    throw new Error("Invalid Email or Password");
  }
}
