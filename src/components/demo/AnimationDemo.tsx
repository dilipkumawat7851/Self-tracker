"use client";

import React from "react";
import DemoCard, { DemoCardProps } from "./DemoCard";

interface AnimationDemoProps extends Partial<DemoCardProps> {
  title: string;
  description: string;
  animationType?: "dynamic" | "overwrite" | "magnetic" | "gesture" | "stagger";
}

export default function AnimationDemo({
  title,
  description,
  animationType = "dynamic",
  category = "TWEENS & PHYSICS",
  accentColor = "#8b5cf6",
  defaultMode = "dynamic",
  codeSnippet,
  ...rest
}: AnimationDemoProps) {
  return (
    <DemoCard
      category={category}
      title={title}
      description={description}
      animationType={animationType}
      accentColor={accentColor}
      defaultMode={defaultMode}
      codeSnippet={codeSnippet}
      {...rest}
    />
  );
}
