"use client";

import { useRef } from "react";
import {
  FaCheck,
  FaCircle,
  FaCircleCheck,
  FaCity,
  FaPencil,
  FaPlus,
  FaUser,
} from "react-icons/fa6";
import styles from "./pages.module.css";
import {
  CSidebar,
  CSidebarHeader,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import { ButtonWidget } from "@/src/shared/widget/button/ButtonWidget";

export default function DashboardPage() {
  return (
    <div className={styles.dashboardLayout}>
      <div className={styles.sidebar}>
        <CSidebar
          className={`${styles.sidebar} border-end custom-sidebar`}
          visible={true}
        >
          <div className={`${styles.topSidebar} border-bottom`}>
            <div className={styles.personalSideBar}>
              <div className={styles.logoContent}>
                <div className={styles.userProfile}>
                  <div className={styles.logoUser}>
                    <FaUser />
                  </div>
                  <div className={styles.userInfo}>
                    <p className={styles.userName}>Thiyara Al- Mawaddah</p>
                    <p className={styles.userEmail}>thiyaraal@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.roleSidebar}>
              <div className={styles.roleContent}>
                <p className={styles.roleTitle}>Role</p>
                <p className={styles.roleName}>Administrator</p>
              </div>
              <FaCircleCheck className={styles.roleIcon} />
            </div>
          </div>

          <CSidebarNav>
            <div className={styles.topContentSidebar}>
              <p className={styles.titleName}>File Management</p>
              <div className={styles.cardTagAdmin}>
                <span className={styles.circleTag}></span>
                <p className={styles.nameTag}>Administrator</p>
              </div>
            </div>
          </CSidebarNav>

          <CSidebarHeader className="border-top">
            <CSidebarToggler />
          </CSidebarHeader>
        </CSidebar>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.navbar}>
          <div className={styles.contentLeft}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <FaPencil />
              </div>
              <p className={styles.logoText}>ELERA</p>
            </div>
          </div>
          <div className={styles.contentRight}>
            <p className={styles.title}>Document Signing Workflow</p>
            <p className={styles.subtitle}>
              Manage and sign your documents electronically
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
