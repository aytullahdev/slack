import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const CreateWorkspaceModal = () => {
  const { isOpen, close } = useCreateWorkspaceModal();
  const { mutate, data, isPending } = useCreateWorkspace();
  const [name, setName] = useState("");
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      {
        name,
      },
      {
        onSuccess(id) {
          toast.success("Workspace created successfully");
          router.push(`/workspace/${id}`);
          close();
        },
      }
    );
  };
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a workspace</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            disabled={isPending}
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
            minLength={3}
            placeholder="Workspace name eg: My workspace"
          />
          <div className="flex justify-end">
            <Button disabled={isPending}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
