"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ReviewModal } from "./review-modal";

export const GiveReview = ({ courseId, testinomial }) => {
  console.log("🚀 ~ GiveReview ~ testinomial:", testinomial);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setIsReviewModalOpen(true)}
        variant="outline"
        className="w-full mt-6"
      >
        {testinomial ? "Update Review" : "Give Review"}
      </Button>
      {isReviewModalOpen && (
        <ReviewModal
          open={isReviewModalOpen}
          setOpen={setIsReviewModalOpen}
          courseId={courseId}
          testinomial={testinomial}
        />
      )}
    </>
  );
};
