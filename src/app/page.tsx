"use client";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import UserButton from "../features/auth/components/user-button";
import { useEffect, useMemo } from "react";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useRouter } from "next/navigation";
export default function Home() {
  const { isOpen, open } = useCreateWorkspaceModal();
  const { data, isLoading } = useGetWorkspaces();
  const router = useRouter();
  const workspaceId = useMemo(() => {
    return data?.[0]?._id;
  }, [data]);

  useEffect(() => {
    if (isLoading) return;
    if (workspaceId) {
      router.push(`/workspace/${workspaceId}`);
    } else if (!isOpen) {
      open();
    }
  }, [workspaceId, isLoading, open]);
  return (
    <div>
      <UserButton />
    </div>
  );
}
