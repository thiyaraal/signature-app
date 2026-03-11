"use client";

import styles from "./pages.module.css";
import { FaPencil, FaUser } from "react-icons/fa6";
import SideBarComponent from "@/src/features/dashboard/component/sidebar/SidebarComponent";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const navigation = [
    {
      label: "Document",
      icon: <FaPencil />,
      path: "/dashboard/document",
    },
    {
      label: "User Management",
      icon: <FaUser />,
      path: "/dashboard/user-management",
    },
  ];

  // const navItems = navigation.map((item) => ({
  //   label: item.label,
  //   icon: item.icon,
  //   variant: (pathname === item.path ? "gradasi-blue" : "secondary") as
  //     | "gradasi-blue"
  //     | "secondary",
  //   onClick: () => router.push(item.path),
  // }));

  return (
    <div className={styles.dashboardLayout}>
      <div className={styles.sidebar}>
        <SideBarComponent
          userName="Thiyara Al-Mawaddah"
          userEmail="thiyaraal@gmail.com"
          role="Administrator"
          company="PT Technology Indonesia"
          division="IT & Development"
          navigation={navigation.map((item) => ({
            label: item.label,
            icon: item.icon,
            variant: pathname === item.path ? "gradasi-blue" : "secondary",
            onClick: () => router.push(item.path),
          }))}
        />
      </div>

      <div className={styles.mainContent}>{children}</div>
    </div>
  );
}
