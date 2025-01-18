import { Button } from "@/components/ui/button";
import { Spinner } from "./ui/spinner";

export function ButtonLoading() {
  return (
    <Button disabled>
      <Spinner size="small" className="text-muted" />
      Please wait
    </Button>
  );
}
