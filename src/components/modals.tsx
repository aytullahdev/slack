"use client";
import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";
import { useEffect, useState } from "react";

export const Modals = () => {
  const [mounded, setMounded] = useState(false);

  useEffect(() => {
    setMounded(true);
  }, []);

  if (!mounded) return null;
  return (
    <>
      <CreateWorkspaceModal />
    </>
  );
};
