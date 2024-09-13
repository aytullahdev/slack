import { atom, useAtom } from "jotai";

const createChannelAtom = atom(false);

export const useCreateChannelModal = () => {
  const [isOpen, setIsOpen] = useAtom(createChannelAtom);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, open, close };
};
