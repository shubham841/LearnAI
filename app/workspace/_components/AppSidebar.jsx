"use client";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Book,
  Compass,
  LayoutDashboard,
  PencilRulerIcon,
  WalletCards,
  UserCircle2Icon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AddNewCourseDialog from "./AddNewCourseDialog";

const SideBarOptions = [
  {
    title: "DashBoard",
    icon: LayoutDashboard,
    path: "/workspace",
  },
  {
    title: "My Learning",
    icon: Book,
    path: "/workspace/my-learning",
  },
  {
    title: "Explore Courses",
    icon: Compass,
    path: "/workspace/explore",
  },
  {
    title: "Billing",
    icon: WalletCards,
    path: "/workspace/billing",
  },
  {
    title: "Profile",
    icon: UserCircle2Icon,
    path: "/workspace/profile",
  },
];

export function AppSidebar() {
  const path = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className={"p-4"}>
        <Image src={"/logo.svg"} alt="logo" width={20} height={20} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <AddNewCourseDialog>
            <Button>Create New Course</Button>
          </AddNewCourseDialog>
        </SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {SideBarOptions.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className={"p-5"}>
                  <Link
                    href={item?.path}
                    className={`text-[17px] ${
                      path.includes(item.path) && "text-primary bg-gray-200"
                    }`}
                  >
                    <item.icon className="h-7 w-7" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
