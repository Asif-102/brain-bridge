"use client"; // Ensure this is a client component if you're using hooks like useState

import { updateCourse } from "@/app/actions/course"; // Assuming you have an action to update the course
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const LearningForm = ({ initialData, courseId }) => {
  const [learning, setLearning] = useState(initialData?.learning || []);
  const [isEditing, setIsEditing] = useState(false);
  const [newObjective, setNewObjective] = useState("");

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const handleAddObjective = () => {
    if (newObjective.trim() === "") {
      toast.error("Learning objective cannot be empty");
      return;
    }
    setLearning((prev) => [...prev, newObjective]);
    setNewObjective("");
  };

  const handleRemoveObjective = (index) => {
    setLearning((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async () => {
    try {
      await updateCourse(courseId, { learning }); // Update the course with the new learning objectives
      toast.success("Learning objectives updated successfully");
      toggleEdit();
    } catch (error) {
      toast.error("Failed to update learning objectives");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Learning Objectives
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>
      {!isEditing && (
        <div className="mt-2">
          {learning.length === 0 && (
            <p className="text-sm text-slate-500 italic">
              No learning objectives added
            </p>
          )}
          <ul className="list-disc pl-6">
            {learning.map((objective, index) => (
              <li key={index} className="text-sm text-slate-700">
                {objective}
              </li>
            ))}
          </ul>
        </div>
      )}
      {isEditing && (
        <div className="space-y-4 mt-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Add a learning objective"
              value={newObjective}
              onChange={(e) => setNewObjective(e.target.value)}
            />
            <Button variant="ghost" onClick={handleAddObjective}>
              <PlusCircle className="h-4 w-4 mr-2" />
            </Button>
          </div>
          <ul className="list-disc pl-6">
            {learning.map((objective, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-sm text-slate-700"
              >
                {objective}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveObjective(index)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
          <Button onClick={onSubmit} className="mt-4">
            Save
          </Button>
        </div>
      )}
    </div>
  );
};
