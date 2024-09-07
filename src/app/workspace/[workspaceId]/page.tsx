"use client";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import React from "react";
const WorkspacePage = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorkspace(workspaceId);

  return <div>Work Space</div>;
};

export default WorkspacePage;
