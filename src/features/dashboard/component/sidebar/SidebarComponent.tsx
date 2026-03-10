"use client";

import { CSidebar, CSidebarNav } from "@coreui/react";
import { FaUser, FaCity } from "react-icons/fa";
import { PiBagFill } from "react-icons/pi";
import { ButtonWidget } from "@/src/shared/widget/button/ButtonWidget";
import { FaCircleCheck } from "react-icons/fa6";
import styles from "./sidebar-component.module.css";

interface NavigationItem {
  label: string;
  icon: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

interface SidebarProps {
  userName: string;
  userEmail: string;
  role: string;
  company: string;
  division: string;
  navigation: NavigationItem[];
  onLogout?: () => void;
}

export default function SideBarComponent({
  userName,
  userEmail,
  role,
  company,
  division,
  navigation,
  onLogout,
}: SidebarProps) {
  return (
    <CSidebar className={`${styles.sidebar} border-end custom-sidebar`} visible>
      <div className={styles.sidebarContainer}>
        <div>
          {/* USER PROFILE */}
          <div className={`${styles.topSidebar} border-bottom`}>
            <div className={styles.personalSideBar}>
              <div className={styles.logoContent}>
                <div className={styles.userProfile}>
                  <div className={styles.logoUser}>
                    <FaUser />
                  </div>

                  <div className={styles.userInfo}>
                    <p className={styles.userName}>{userName}</p>
                    <p className={styles.userEmail}>{userEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.roleSidebar}>
              <div>
                <p className={styles.roleTitle}>Role</p>
                <p className={styles.roleName}>{role}</p>
              </div>

              <FaCircleCheck className={styles.roleIcon} />
            </div>
          </div>

          {/* ORGANIZATION */}
          <CSidebarNav className="border-bottom">
            <div className={styles.topContentSidebar}>
              <p className={styles.titleName}>Organization</p>

              <div className={styles.ptSection}>
                <div className={styles.ptIcon}>
                  <FaCity />
                </div>

                <div className={styles.ptContent}>
                  <p className={styles.ptTitle}>Company</p>
                  <p className={styles.ptName}>{company}</p>
                </div>
              </div>

              <div className={styles.ptSection}>
                <div className={styles.ptIcon}>
                  <PiBagFill />
                </div>

                <div className={styles.ptContent}>
                  <p className={styles.ptTitle}>Division</p>
                  <p className={styles.ptName}>{division}</p>
                </div>
              </div>
            </div>
          </CSidebarNav>

          {/* NAVIGATION */}
          <CSidebarNav className="border-bottom">
            <div className={styles.topContentSidebar}>
              <p className={styles.titleName}>Navigation</p>

              {navigation.map((item, index) => (
                <ButtonWidget
                  key={index}
                  variant={item.variant || "secondary"}
                  label={item.label}
                  icon={item.icon}
                  onClick={item.onClick}
                />
              ))}
            </div>
          </CSidebarNav>
        </div>

        {/* LOGOUT */}
        <div className={styles.buttonLogout}>
          <ButtonWidget label="Logout" icon={<FaUser />} onClick={onLogout} />
        </div>
      </div>
    </CSidebar>
  );
}
