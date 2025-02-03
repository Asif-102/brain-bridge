"use client";

import { Trash } from "lucide-react";

import {
  changeQuizSetPublishState,
  deleteQuizSetWithQuizzes,
} from "@/app/actions/quiz";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const QuizSetAction = ({ quizSetId, isActive }) => {
  const router = useRouter();
  const [action, setAction] = useState(null);
  const [published, setPublished] = useState(isActive);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      switch (action) {
        case "change-active": {
          const activeState = await changeQuizSetPublishState(quizSetId);
          setPublished(!activeState);
          toast.success("The quiz set has been updated successfully.");
          router.refresh();
          break;
        }

        case "delete": {
          if (published) {
            toast.error(
              "A published quiz set can not be deleted. First unpublish it, then delete."
            );
          } else {
            await deleteQuizSetWithQuizzes(quizSetId);
            toast.success("The quiz set has been deleted successfully");
            router.push(`/dashboard/quiz-sets/`);
          }

          break;
        }

        default: {
          throw new Error("Invalid Quiz set Action");
        }
      }
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAction("change-active")}
        >
          {published ? "Unpublish" : "Publish"}
        </Button>

        <Button
          type="submit"
          name="action"
          value="delete"
          size="sm"
          onClick={() => setAction("delete")}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};
