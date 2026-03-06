"use client";

import {
  FaCheck,
  FaCircle,
  FaCircleCheck,
  FaCity,
  FaPencil,
  FaUser,
} from "react-icons/fa6";
import styles from "./pages.module.css";
import { CSidebar, CSidebarNav } from "@coreui/react";
import { ButtonWidget } from "@/src/shared/widget/button/ButtonWidget";
import { PiBagFill } from "react-icons/pi";
import { FaTimes, FaTimesCircle } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { ProgressCard } from "@/src/shared/widget/card/ProgressCard";

export default function DashboardPage() {
  const progressCards = [
    {
      icon: <IoIosTime />,
      amount: "3",
      title: "Pending my Signature",
      cardColor: "#FFF7E6",
      borderColor: "#F5A623",
      iconColor: "#F5A623",
    },
    {
      icon: <FaCheck />,
      amount: "12",
      title: "Completed",
      cardColor: "#E8F8F5",
      borderColor: "#1ABC9C",
      iconColor: "#1ABC9C",
    },
    {
      icon: <FaPencil />,
      amount: "5",
      title: "Draft",
      cardColor: "#EEF3FF",
      borderColor: "#4A6CF7",
      iconColor: "#4A6CF7",
    },
    {
      icon: <FaCircle />,
      amount: "2",
      title: "Rejected",
      cardColor: "#FFECEC",
      borderColor: "#E74C3C",
      iconColor: "#E74C3C",
    },
    {
      icon: <FaCircleCheck />,
      amount: "7",
      title: "Approved",
      cardColor: "#F1FFF5",
      borderColor: "#2ECC71",
      iconColor: "#2ECC71",
    },
  ];
  return (
    <div className={styles.dashboardLayout}>
      <div className={styles.sidebar}>
        <CSidebar
          className={`${styles.sidebar} border-end custom-sidebar`}
          visible={true}
        >
          <div className={styles.sidebarContainer}>
            <div>
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
                  <div>
                    <p className={styles.roleTitle}>Role</p>
                    <p className={styles.roleName}>Administrator</p>
                  </div>
                  <FaCircleCheck className={styles.roleIcon} />
                </div>
              </div>

              <CSidebarNav className="border-bottom">
                <div className={styles.topContentSidebar}>
                  <p className={styles.titleName}>Organization</p>

                  <div className={styles.ptSection}>
                    <div className={styles.ptIcon}>
                      <FaCity />
                    </div>

                    <div className={styles.ptContent}>
                      <p className={styles.ptTitle}>Company</p>
                      <p className={styles.ptName}>PT Technology Indonesia</p>
                    </div>
                  </div>

                  <div className={styles.ptSection}>
                    <div className={styles.ptIcon}>
                      <PiBagFill />
                    </div>

                    <div className={styles.ptContent}>
                      <p className={styles.ptTitle}>Division</p>
                      <p className={styles.ptName}>IT & Development</p>
                    </div>
                  </div>
                </div>
              </CSidebarNav>

              <CSidebarNav className="border-bottom">
                <div className={styles.topContentSidebar}>
                  <p className={styles.titleName}>NAVIGATION</p>

                  <ButtonWidget
                    label="Document"
                    icon={<FaPencil />}
                    onClick={() => {}}
                  />

                  <ButtonWidget
                    label="User Management"
                    icon={<FaUser />}
                    onClick={() => {}}
                  />
                </div>
              </CSidebarNav>
            </div>

            <div className={styles.buttonLogout}>
              <ButtonWidget
                label="Logout"
                icon={<FaUser />}
                onClick={() => {}}
              />
            </div>
          </div>
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
        <div className={styles.buttonUploadDocument}>
          <ButtonWidget
            label="Upload Document"
            icon={<FaPencil />}
            onClick={() => {}}
          />
        </div>

        <div className={styles.progressCardList}>
          {progressCards.map((card, index) => (
            <ProgressCard
              key={index}
              icon={card.icon}
              amount={card.amount}
              title={card.title}
              cardColor={card.cardColor}
              borderColor={card.borderColor}
              iconColor={card.iconColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
