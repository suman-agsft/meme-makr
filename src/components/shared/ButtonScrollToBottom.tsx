"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

interface ButtonScrollToBottomProps extends ButtonProps {
  isAtBottom: boolean;
  scrollToBottom: () => void;
}

export function ButtonScrollToBottom({
  className,
  isAtBottom,
  scrollToBottom,
  ...props
}: ButtonScrollToBottomProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "absolute right-4 top-2  z-10 bg-background transition-opacity duration-300 ",
        isAtBottom ? "opacity-0" : "opacity-100",
        className
      )}
      onClick={() => scrollToBottom()}
      {...props}
    >
      <ArrowDown />
      <span className="sr-only">Scroll to bottom</span>
    </Button>
  );
}
