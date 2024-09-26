"use client";
import React, { useState, useEffect, useRef } from "react";
import { CSSProperties, ReactNode } from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { SendHorizonal } from "lucide-react";

type ArrowProps = {
  w?: string | number;
  h?: string | number;
  color?: string;
};

type TooltipProps = {
  children: ReactNode;
  label: string | ReactNode;
  position?: "top" | "right" | "bottom" | "left" | undefined;
  className?: string;
  style?: CSSProperties;
  arrow?: ArrowProps;
  bg?: string;
};

const TooltipComponent = (props: TooltipProps) => {
  const { label, children, position, className, style, arrow, bg } = props;
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsVisible(!isVisible);

    if (!isVisible) {
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent
          ref={tooltipRef}
          className={twMerge(
            clsx(
              `text-foreground z-[99999] text-[12px] bg-gray-foreground dark:bg-gray-800 ${className}`
            )
          )}
          style={{
            border: "none",
            ...style,
          }}
          side={position ?? "bottom"}
          onClick={(e) => e.stopPropagation()}
        >
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipComponent;
