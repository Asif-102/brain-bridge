"use server";

import { Lesson } from "@/model/lesson-model";
import { Module } from "@/model/module-model";
import { create } from "@/queries/lessons";
import dbConnect from "@/service/mongo";

export async function createLesson(data) {
  try {
    const title = data.get("title");
    const slug = data.get("slug");
    const moduleId = data.get("moduleId");
    const order = data.get("order");

    console.log(title, slug, moduleId, order);

    const createdLesson = await create({ title, slug, order });
    console.log(createdLesson);

    await dbConnect();

    const cmodule = await Module.findById(moduleId);
    cmodule.lessonIds.push(createdLesson._id);
    cmodule.save();

    return createdLesson;
  } catch (err) {
    throw new Error(err);
  }
}

export async function reOrderLesson(data) {
  try {
    await dbConnect();

    await Promise.all(
      data.map(async (element) => {
        await Lesson.findByIdAndUpdate(element.id, { order: element.position });
      })
    );
  } catch (err) {
    throw new Error(err);
  }
}

export async function updateLesson(lessonId, data) {
  console.log("**** updateLesson", lessonId, data);
  try {
    await dbConnect();

    await Lesson.findByIdAndUpdate(lessonId, data);
  } catch (err) {
    throw new Error(err);
  }
}
