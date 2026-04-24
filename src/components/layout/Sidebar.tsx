import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../ui/app-sidebar";

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="flex flex-col w-full min-w-0">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Sidebar;
