import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";

import { useNewJoinCode } from "@/features/workspaces/api/use-new-joincode";

import { useConfirm } from "@/hooks/use-confirm";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

import { CopyIcon, RefreshCcw, TrashIcon } from "lucide-react";

import { toast } from "sonner";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
  joinCode: string;
};
export const InviteModal = ({ open, setOpen, name, joinCode }: Props) => {
  const workspaceId = useWorkspaceId();
  const { mutate: createNewJoinCode, isPending } = useNewJoinCode();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "This will deactivate the current code"
  );
  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/join/${workspaceId}`;
    navigator.clipboard.writeText(inviteLink).then(() => {
      toast.success("Invite link copied to clipboard");
    });
  };
  return (
    <>
      <ConfirmDialog />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-white">
            <DialogTitle>Invite people to {name}</DialogTitle>
            <DialogDescription>
              use the following code to invite people to this workspace
            </DialogDescription>
            <div className="flex flex-col gap-y-4 items-center justify-center py-10">
              <p className="text-4xl  font-bold tracking-widest uppercase">
                {joinCode}
              </p>
              <Button
                onClick={() => {
                  handleCopy();
                }}
                variant={"ghost"}
                size={"sm"}
              >
                <CopyIcon className="size-5 ml-2" />
              </Button>
            </div>
            <div className="flex items-center justify-between w-full">
              <Button
                disabled={isPending}
                onClick={async () => {
                  const ok = await confirm();
                  if (!ok) return;
                  createNewJoinCode(
                    { workspaceId },
                    {
                      onSuccess: () => {
                        toast.success("New code generated");
                      },
                      onError: () => {
                        toast.error("Failed to generate new code");
                      },
                    }
                  );
                }}
                variant={"outline"}
              >
                New code
                <RefreshCcw className="size-5 ml-2" />
              </Button>
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
