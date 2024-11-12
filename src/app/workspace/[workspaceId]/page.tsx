"use client";
import { useGetChannels } from "@/features/channels/api/use-get-challes";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel";
import { useCurrentMember } from "@/features/member/api/use-current-members";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Loader, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";
const WorkspacePage = () => {
  const { open, isOpen } = useCreateChannelModal();
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { data: workspace, isLoading: isWorkspaceLoading } =
    useGetWorkspace(workspaceId);
  const { data: channels, isLoading: isChannelsLoading } = useGetChannels({
    workspaceId,
  });
  const { data: member, isLoading: isMemberLoading } = useCurrentMember({
    workspaceId,
  });

  const isAdmin = useMemo(() => {
    return member?.role === "admin";
  }, [member?.role]);
  const channelId = useMemo(() => {
    return channels?.[0]?._id;
  }, [channels]);

  useEffect(() => {
    if (isChannelsLoading || isWorkspaceLoading || isMemberLoading || !member)
      return;

    if (channelId) {
      router.push(`/workspace/${workspaceId}/channel/${channelId}`);
    } else if (!isOpen && isAdmin) {
      open();
    }
  }, [
    channelId,
    isChannelsLoading,
    isWorkspaceLoading,
    router,
    workspace,
    workspaceId,
    isOpen,
    open,
    isMemberLoading,
    member,
    isAdmin,
  ]);

  if (isWorkspaceLoading || isChannelsLoading) {
    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="h-full flex flex-1 items-center justify-center flex-col gap-2">
        <TriangleAlert className="size-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">No channel found</span>
      </div>
    );
  }

  return null;
};

export default WorkspacePage;
