import { replaceMongoIdInArray } from "@/lib/convertData";
import { Quizset } from "@/model/quizset-model";
import { Quiz } from "@/model/quizzes-model";
import dbConnect from "@/service/mongo";

export async function getAllQuizSets(excludeUnPublished) {
  try {
    await dbConnect();

    const quizSets = await Quizset.find()
      .populate({
        path: "quizIds",
        model: Quiz,
      })
      .lean();
    return replaceMongoIdInArray(quizSets);
  } catch (err) {
    throw new Error(err);
  }
}
