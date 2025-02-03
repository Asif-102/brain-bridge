"use client";
import { createCheckoutSession } from "@/app/actions/stripe";
import { Button, buttonVariants } from "@/components/ui/button";
import { LOGIN } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function EnrollCourse({ asLink, courseId }) {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session } = useSession();

  const [hasEnrollment, setHasEnrollment] = useState(false);

  const formAction = async (data) => {
    if (!session) {
      router.push(`${LOGIN}?redirect=${pathname}`);
      return;
    }

    const chk = await fetch("/api/enrollments/hasenrollment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseId,
      }),
    });

    const checkHasEnrollment = await chk.json();
    if (checkHasEnrollment) {
      toast.success(`You already enrolled this course.`);
      setHasEnrollment(checkHasEnrollment);
      return;
    }

    const { url } = await createCheckoutSession(data);
    window.location.assign(url);
  };

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="courseId" value={courseId} />
        <input type="hidden" name="pathname" value={pathname} />
        {asLink ? (
          hasEnrollment ? (
            <Link
              href={`/courses/${courseId}/lesson`}
              variant="ghost"
              className="text-xs text-sky-700 h-7 gap-1 flex items-center"
            >
              Access Course
              <ArrowRight className="w-3" />
            </Link>
          ) : (
            <Button
              type="submit"
              variant="ghost"
              className="text-xs text-sky-700 h-7 gap-1"
            >
              Enroll
              <ArrowRight className="w-3" />
            </Button>
          )
        ) : (
          <Button type="submit" className={cn(buttonVariants({ size: "lg" }))}>
            Enroll Now
          </Button>
        )}
      </form>
    </>
  );
}
