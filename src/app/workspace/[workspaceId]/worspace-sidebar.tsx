import { useCurrentMember } from "@/features/member/api/use-current-members";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageSquareText,
  SendHorizonal,
} from "lucide-react";
import { WorkSpaceHeader } from "./workspace-header";
import { SideBarItem } from "./sidebar-item";
import { useGetChannels } from "@/features/channels/api/use-get-challes";
import { WorkSpaceSection } from "./workspace-sections";
import { useGetMembers } from "@/features/member/api/use-get-members";
import { UserItem } from "./user-item";
import { useCreateChannel } from "@/features/channels/api/use-create-channel";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel";

export const WorkspaceSideBar = () => {
  const workspaceId = useWorkspaceId();
  const { data: member, isLoading: isMemberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: isWorkSpaceLoading } =
    useGetWorkspace(workspaceId);

  const { data: channels, isLoading: isChannelsLoading } = useGetChannels({
    workspaceId,
  });

  const { data: members, isLoading: isMembersLoading } = useGetMembers({
    workspaceId,
  });

  const { open } = useCreateChannelModal();
  if (isMemberLoading || isWorkSpaceLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-[#5E2C5F] ">
        <Loader className="animate-spin size-5" />
      </div>
    );
  }

  if (!member || !workspace) {
    return (
      <div className="flex flex-col gap-y-2 bg-[#5E2C5F] h-full items-center justify-center">
        <AlertTriangle className="size-5 text-wrap" />
        <p className="text-white text-sm">Workspace not found</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col bg-[#5E2C5F] h-full">
      <WorkSpaceHeader
        workspace={workspace}
        isAdmin={member.role === "admin"}
      />
      <div className="flex flex-col px-2 mt-3">
        <SideBarItem label="Thread" icon={MessageSquareText} id="thread" />
        <SideBarItem label="Drafts and Send" icon={SendHorizonal} id="drafts" />
      </div>
      <WorkSpaceSection
        label="Channels"
        hint="New channels"
        onNew={() => {
          open();
        }}
      >
        <>
          {channels?.map((item) => (
            <SideBarItem
              key={item._id}
              label={item.name}
              icon={HashIcon}
              id={item._id}
            />
          ))}
        </>
      </WorkSpaceSection>
      <WorkSpaceSection
        label="Direct Messages"
        hint="messages"
        onNew={() => {}}
      >
        {members?.map((item) => (
          <UserItem
            key={item._id}
            label={item.user.name}
            id={item._id}
            image={item.user.image}
          />
        ))}
      </WorkSpaceSection>
    </div>
  );
};
