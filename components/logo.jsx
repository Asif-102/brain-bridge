import logo from "@/assets/dr_logo.svg";
import { cn } from "@/lib/utils";
import Image from "next/image";
export const Logo = ({ className = "" }) => {
  return (
    <div className="flex items-center justify-center space-x-1">
      <Image
        className={cn("max-w-[100px]", className)}
        width={18}
        height={18}
        src={logo}
        alt="logo"
      />
      <span className="text-sm font-bold">BrainBridge</span>
    </div>
  );
};
