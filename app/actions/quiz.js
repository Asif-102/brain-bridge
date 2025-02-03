"use server";

import { getSlug } from "@/lib/convertData";
import { TransformedQuizData } from "@/lib/quiz-helper";
import { Quizset } from "@/model/quizset-model";
import { Quiz } from "@/model/quizzes-model";
import { createQuiz } from "@/queries/quizzes";
import dbConnect from "@/service/mongo";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function updateQuizSet(quizset, dataToUpdate) {
  try {
    await dbConnect();

    await Quizset.findByIdAndUpdate(quizset, dataToUpdate);
  } catch (e) {
    throw new Error(e);
  }
}

export async function addQuizToQuizSet(quizSetId, quizData) {
  try {
    console.log(quizSetId, quizData);

    const transformedQuizData = TransformedQuizData(quizData);

    console.log(transformedQuizData);
    const createdQuizId = await createQuiz(transformedQuizData);
    console.log(createdQuizId);

    await dbConnect();

    const quizSet = await Quizset.findById(quizSetId);
    quizSet.quizIds.push(createdQuizId);
    quizSet.save();
  } catch (e) {
    throw new Error(e);
  }
}

export async function doCreateQuizSet(data) {
  try {
    data["slug"] = getSlug(data.tite);

    await dbConnect();

    const craetedQuizSet = await Quizset.create(data);
    return craetedQuizSet?._id.toString();
  } catch (e) {
    throw new Error(e);
  }
}

export async function deleteQuiz(quizId, quizSetId) {
  try {
    await dbConnect();

    const quizSet = await Quizset.findById(quizSetId);
    quizSet.quizIds.pull(new mongoose.Types.ObjectId(quizId));
    await Quiz.findByIdAndDelete(quizId);
    quizSet.save();
  } catch (e) {
    throw new Error(e);
  }
}

export async function updateQuiz(quizId, dataToUpdate) {
  try {
    const transformedQuizData = TransformedQuizData(dataToUpdate);

    await dbConnect();

    await Quiz.findByIdAndUpdate(quizId, transformedQuizData);
  } catch (e) {
    throw new Error(e);
  }
}

export async function changeQuizSetPublishState(quizSetId) {
  try {
    await dbConnect();

    const quizSet = await Quizset.findById(quizSetId);
    const res = await Quizset.findByIdAndUpdate(
      quizSetId,
      { active: !quizSet.active },
      { lean: true }
    );
    return res.active;
  } catch (err) {
    throw new Error(err);
  }
}

export async function deleteQuizSetWithQuizzes(quizSetId) {
  try {
    await dbConnect();

    const quizSet = await Quizset.findById(quizSetId);
    if (!quizSet) {
      throw new Error("Quizset not found");
    }

    await Quiz.deleteMany({ _id: { $in: quizSet.quizIds } });

    await Quizset.findByIdAndDelete(quizSetId);
    revalidatePath("/dashboard/quiz-sets");
  } catch (err) {
    throw new Error(err);
  }
}
