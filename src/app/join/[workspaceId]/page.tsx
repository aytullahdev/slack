"use client";
import { Button } from "@/components/ui/button";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";
import { useJoin } from "@/features/workspaces/api/use-join";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import VerificationInput from "react-verification-input";
import { Id } from "../../../../convex/_generated/dataModel";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
type Props = {
  params: {
    workspaceId: Id<"workspaces">;
  };
};
const JoinWorkspacePage = ({ params }: Props) => {
  const { workspaceId } = params;
  const router = useRouter();
  const { data: workspace, isLoading: isWorkspaceInfoLoading } =
    useGetWorkspaceInfo(workspaceId);

  const isMember = useMemo(() => workspace?.isMember, [workspace?.isMember]);

  useEffect(() => {
    if (isMember) {
      router.push(`/workspace/${workspaceId}`);
    }
  }, [isMember, router, workspaceId]);
  const { mutate: joinWorkspace, isPending } = useJoin();
  const handleJoin = (joinCode: string) => {
    joinWorkspace(
      {
        workspaceId,
        joinCode,
      },
      {
        onSuccess: (id) => {
          toast.success("Successfully joined workspace");
          // Redirect to workspace page
          router.push(`/workspaces/${id}`);
        },
        onError: () => {
          toast.error("Failed to join workspace");
        },
      }
    );
  };
  if (isWorkspaceInfoLoading) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <Loader className="size-6 text-muted-foreground animate-spin" />
      </div>
    );
  }
  return (
    <div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-md">
      <Image src={"/logo.svg"} width={50} height={50} alt="logo" />
      <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <p className="text-2xl font-bold">Join workspace</p>
          <p className="text-md text-muted-foreground">
            Enter the workspace code to join
          </p>
        </div>
        <VerificationInput
          onComplete={handleJoin}
          classNames={{
            container: cn(
              "flex gap-x-2",
              isPending && "cursor-not-allowed opacity-50"
            ),
            character:
              "uppercase h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium text-gray-500",
            characterInactive: "bg-muted",
            characterSelected: "bg-white text-black",
            characterFilled: "bg-white text-black",
          }}
          length={6}
          autoFocus
        />
        <div className="flex gap-x-4">
          <Button size={"lg"} variant={"outline"} asChild>
            <Link href={"/"}>Back</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JoinWorkspacePage;
