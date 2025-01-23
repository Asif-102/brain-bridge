"use client";
import { createCheckoutSession } from "@/app/actions/stripe";
import { Button, buttonVariants } from "@/components/ui/button";
import { LOGIN } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function EnrollCourse({ asLink, courseId }) {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session } = useSession();

  const [hasEnrollment, setHasEnrollment] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/enrollments/hasEnrollment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId,
          email: session?.user?.email,
        }),
      });

      const data = await response.json();
      setHasEnrollment(data);
    };

    if (session?.user) {
      fetchData();
    }
  }, [session, courseId]);

  const formAction = async (data) => {
    if (!session) {
      router.push(`${LOGIN}?redirect=${pathname}`);
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
              href=""
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
