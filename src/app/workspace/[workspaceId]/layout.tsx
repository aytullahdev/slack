"use client";
import React from "react";
import { Toolbar } from "./toolbar";

const WorkSpaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full ">
      <Toolbar />
      {children}
    </div>
  );
};

export default WorkSpaceLayout;
