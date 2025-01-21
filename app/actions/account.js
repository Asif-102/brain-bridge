"use server";

import { User } from "@/model/user-model";
import dbConnect from "@/service/mongo";
import { revalidatePath } from "next/cache";

export async function updateUserInfo(email, updatedData) {
  try {
    await dbConnect();

    const filter = { email: email };
    await User.findOneAndUpdate(filter, updatedData);
    revalidatePath("/account");
  } catch (error) {
    throw new Error(error);
  }
}
