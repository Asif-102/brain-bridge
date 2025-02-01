"use client";

import logo_black from "@/assets/dr_logo_black.svg";
import logo_white from "@/assets/dr_logo_white.svg";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";

import { useEffect, useState } from "react";

export const Logo = ({ className = "" }) => {
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Set mounted to true once the component has mounted
  }, []);

  if (!mounted) return null; // Return nothing before the component is mounted

  return (
    <Image
      className={cn("max-w-[100px]", className)}
      src={resolvedTheme === "dark" ? logo_white : logo_black}
      alt="logo"
    />
  );
};
