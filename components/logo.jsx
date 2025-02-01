"use client";

import logo_black from "@/assets/dr_logo_black.svg";
import logo_white from "@/assets/dr_logo_white.svg";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";

export const Logo = ({ className = "" }) => {
  const { theme } = useTheme();

  return (
    <Image
      className={cn("max-w-[100px]", className)}
      src={theme === "dark" ? logo_white : logo_black}
      alt="logo"
    />
  );
};
