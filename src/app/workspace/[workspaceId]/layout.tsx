"use client";
import React from "react";
import { Toolbar } from "./toolbar";
import { SideBar } from "./sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { WorkspaceSideBar } from "./worspace-sidebar";

const WorkSpaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full ">
      <Toolbar />
      <div className="flex  h-[calc(100vh-40px)]">
        <SideBar />
        <ResizablePanelGroup direction="horizontal" autoSaveId="rsworkspace">
          <ResizablePanel
            defaultSize={20}
            minSize={11}
            className="bg-[#5E2C5F]"
          >
            <WorkspaceSideBar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20} defaultSize={20}>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default WorkSpaceLayout;
