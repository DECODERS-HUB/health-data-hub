import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Network,
  Database,
  Code2,
  Shield,
  ScrollText,
  Activity,
  LogOut,
  Users,
  Key,
  Clock,
  Settings, // Import Settings icon
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
<<<<<<< HEAD

const menuItems = [
  { title: "Command Center", url: "/dashboard", icon: LayoutDashboard },
  { title: "Facility Registry", url: "/facilities", icon: Building2 },
  { title: "Interoperability", url: "/interoperability", icon: Network },
  { title: "Data Quality", url: "/data-quality", icon: Database },
  { title: "Developer Portal", url: "/developer", icon: Code2 },
  { title: "Consent & Identity", url: "/governance", icon: Shield },
  { title: "Audit Logs", url: "/audit", icon: ScrollText },
  { title: "System Health", url: "/health", icon: Activity },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
=======
import { useAuth, UserRole } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

const MoH_MENU: MenuItem[] = [
  { title: "Command Center", url: "/moh/dashboard", icon: LayoutDashboard },
  { title: "Facility Registry", url: "/moh/facilities", icon: Building2 },
  { title: "Registration Requests", url: "/moh/requests", icon: Clock },
  { title: "Interoperability", url: "/moh/interoperability", icon: Network },
  { title: "Data Quality", url: "/admin/data-quality", icon: Database },
  { title: "Governance", url: "/admin/governance", icon: Shield },
  { title: "User Management", url: "/moh/users", icon: Users },
  { title: "Audit Logs", url: "/shared/audit", icon: ScrollText },
  { title: "System Health", url: "/moh/health", icon: Activity },
  { title: "Settings", url: "/shared/settings", icon: Settings }, // Added Settings
];

const FACILITY_ADMIN_MENU: MenuItem[] = [
  { title: "Facility Dashboard", url: "/facility/dashboard", icon: LayoutDashboard },
  { title: "Data Quality Score", url: "/admin/data-quality", icon: Database },
  { title: "API & Integrations", url: "/shared/developer-portal", icon: Key },
  { title: "User Management", url: "/admin/governance", icon: Users },
  { title: "Facility Audit Logs", url: "/shared/audit", icon: ScrollText },
  { title: "Settings", url: "/shared/settings", icon: Settings }, // Added Settings
];

const DEVELOPER_MENU: MenuItem[] = [
  { title: "Developer Dashboard", url: "/developer/dashboard", icon: LayoutDashboard },
  { title: "Developer Portal", url: "/developer/portal", icon: Code2 },
  { title: "API Logs & Analytics", url: "/shared/audit", icon: ScrollText },
  { title: "Settings", url: "/shared/settings", icon: Settings }, // Added Settings
];

const getMenuItems = (role: UserRole): MenuItem[] => {
  switch (role) {
    case "MoH":
      return MoH_MENU;
    case "FacilityAdmin":
      return FACILITY_ADMIN_MENU;
    case "Developer":
      return DEVELOPER_MENU;
    default:
      return [];
  }
};

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const { role, logout, user } = useAuth();

  const menuItems = getMenuItems(role);
>>>>>>> master

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent>
        <div className="px-4 py-6 border-b border-border">
<<<<<<< HEAD
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_15px_hsl(var(--primary-glow)/0.5)]">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            {open && (
              <div>
                <h2 className="font-bold text-lg text-foreground">Hkit</h2>
                <p className="text-xs text-muted-foreground">Health Infrastructure</p>
              </div>
            )}
=======
          <div className="flex items-center justify-center">
            <img 
              src="/Hkit.png" 
              alt="Hkit Logo" 
              className="h-8 w-auto"
            />
>>>>>>> master
          </div>
        </div>

        <SidebarGroup>
<<<<<<< HEAD
          <SidebarGroupLabel className="text-muted-foreground">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
=======
          <SidebarGroupLabel className="text-muted-foreground">
            {role === "MoH" ? "Oversight" : user?.facilityName || user?.name}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname.startsWith(item.url); // Use startsWith for nested routes
>>>>>>> master
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        {open && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
<<<<<<< HEAD
    </Sidebar>
  );
}
=======
      
      {/* Logout Button at the bottom */}
      <div className="p-4 border-t border-border">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={logout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          {open && <span>Sign Out</span>}
        </Button>
      </div>
    </Sidebar>
  );
}
>>>>>>> master
