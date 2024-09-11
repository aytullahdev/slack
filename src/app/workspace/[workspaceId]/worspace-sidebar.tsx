import { useCurrentMember } from "@/features/member/api/use-current-members";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { AlertTriangle, Loader } from "lucide-react";
import { WorkSpaceHeader } from "./workspace-header";

export const WorkspaceSideBar = () => {
  const workspaceId = useWorkspaceId();
  const { data: member, isLoading: isMemberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: isWorkSpaceLoading } =
    useGetWorkspace(workspaceId);

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
    <WorkSpaceHeader workspace={workspace} isAdmin={member.role === "admin"} />
  );
};
