"use client";
import React from "react";
import { Toolbar } from "./toolbar";
import { SideBar } from "./sidebar";

const WorkSpaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full ">
      <Toolbar />
      <div className="flex  h-[calc(100vh-40px)]">
        <SideBar />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default WorkSpaceLayout;
