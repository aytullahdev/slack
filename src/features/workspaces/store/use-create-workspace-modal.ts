import { atom, useAtom } from "jotai";

const createWorkspaceModalAtom = atom(false);

export const useCreateWorkspaceModal = () => {
  const [isOpen, setIsOpen] = useAtom(createWorkspaceModalAtom);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, open, close };
};
