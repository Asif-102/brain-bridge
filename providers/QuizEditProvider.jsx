"use client";

import { QuizEditContext } from "@/context";
import { useState } from "react";

export default function QuizEditProvider({ children }) {
  const [editQuiz, setEditQuiz] = useState(null);
  return (
    <QuizEditContext.Provider value={{ editQuiz, setEditQuiz }}>
      {children}
    </QuizEditContext.Provider>
  );
}
