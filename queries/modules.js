import { replaceMongoIdInObject } from "@/lib/convertData";
import { Module } from "@/model/module.model";
import dbConnect from "@/service/mongo";

export async function create(moduleData) {
  try {
    await dbConnect();

    const courseModule = await Module.create(moduleData);
    return JSON.parse(JSON.stringify(courseModule));
  } catch (e) {
    throw new Error(e);
  }
}

export async function getModule(moduleId) {
  try {
    await dbConnect();

    const courseModule = await Module.findById(moduleId).lean();
    return replaceMongoIdInObject(courseModule);
  } catch (e) {
    throw new Error(e);
  }
}
