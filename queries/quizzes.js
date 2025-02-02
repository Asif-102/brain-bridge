import { replaceMongoIdInArray } from "@/lib/convertData";
import { Quizset } from "@/model/quizset-model";
import dbConnect from "@/service/mongo";

export async function getAllQuizSets(excludeUnPublished) {
  try {
    await dbConnect();

    let quizSets = [];
    if (excludeUnPublished) {
      quizSets = await Quizset.find({ active: true }).lean();
    } else {
      quizSets = await Quizset.find().lean();
    }
    return replaceMongoIdInArray(quizSets);
  } catch (e) {
    throw new Error(e);
  }
}
