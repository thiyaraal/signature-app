import { cilSpeedometer } from "@coreui/icons";
import { SidebarStaticSection } from "../types/SideBarTypes";

export const sidebarStaticSections: SidebarStaticSection[] = [
  {
    title: "Master",
    items: [
      {
        label: "Master Company",
        path: "/master/company",
        icon: cilSpeedometer,
      },
      { label: "Master Role", path: "/master/role", icon: cilSpeedometer },
      { label: "Master User", path: "/master/user", icon: cilSpeedometer },
      {
        label: "Master Storage",
        path: "/master/storage",
        icon: cilSpeedometer,
      },
    ],
  },
  {
    title: "Company Setup",
    items: [
      {
        label: "Master Division",
        path: "/setup/division",
        icon: cilSpeedometer,
      },
      {
        label: "User Division Access",
        path: "/setup/division-access",
        icon: cilSpeedometer,
      },
    ],
  },
];
