import { getSlug } from "./convertData";

export const TransformedQuizData = (quizData) => {
  const transformedQuizData = {};

  transformedQuizData["title"] = quizData["title"];
  transformedQuizData["description"] = quizData["description"];
  transformedQuizData["slug"] = getSlug(quizData["title"]);
  transformedQuizData["options"] = [
    {
      text: quizData.optionA.label,
      is_correct: quizData.optionA.isTrue,
    },
    {
      text: quizData.optionB.label,
      is_correct: quizData.optionB.isTrue,
    },
    {
      text: quizData.optionC.label,
      is_correct: quizData.optionC.isTrue,
    },
    {
      text: quizData.optionD.label,
      is_correct: quizData.optionD.isTrue,
    },
  ];

  return transformedQuizData;
};
