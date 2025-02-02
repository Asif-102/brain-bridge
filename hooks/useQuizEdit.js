import { QuizEditContext } from "@/context";
import { useContext } from "react";

export default function useQuizEdit() {
  return useContext(QuizEditContext);
}
