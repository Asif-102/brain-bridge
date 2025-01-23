import { replaceMongoIdInObject } from "@/lib/convertData";
import { Assessment } from "@/model/assessment-model";
import { Report } from "@/model/report-model";
import dbConnect from "@/service/mongo";

export async function getAReport(filter) {
  try {
    await dbConnect();

    const report = await Report.findOne(filter)
      .populate({
        path: "quizAssessment",
        model: Assessment,
      })
      .lean();
    return replaceMongoIdInObject(report);
  } catch (error) {
    throw new Error(error);
  }
}
