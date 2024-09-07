import UserButton from "@/features/auth/components/user-button";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { SideBarButton } from "./sidebar-button";
import { BellIcon, Home, MessageSquare, MoreHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";

export const SideBar = () => {
  const pathName = usePathname();
  return (
    <aside className="w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center  pt-[9px] pb-4">
      <WorkspaceSwitcher />
      <SideBarButton
        icon={Home}
        label="Home"
        isActive={pathName.includes("workspace")}
      />
      <SideBarButton icon={MessageSquare} label="Home" />
      <SideBarButton icon={BellIcon} label="Activity" />
      <SideBarButton icon={MoreHorizontal} label="More" />
      <div className="flex flex-col justify-center items-center mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};
