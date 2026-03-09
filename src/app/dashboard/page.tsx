"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaCheck,
  FaCircle,
  FaCircleCheck,
  FaCity,
  FaInfo,
  FaPaperPlane,
  FaPencil,
  FaUser,
} from "react-icons/fa6";
import styles from "./pages.module.css";
import { CSidebar, CSidebarNav } from "@coreui/react";
import { ButtonWidget } from "@/src/shared/widget/button/ButtonWidget";
import { PiBagFill } from "react-icons/pi";
import { FaInfoCircle, FaTimes, FaTimesCircle } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { ProgressCard } from "@/src/shared/widget/card/ProgressCard";
import { Nav } from "react-bootstrap";
import CustomNav from "@/src/features/dashboard/component/sidebar/NavbarComponent";
import DocumentNav from "@/src/features/dashboard/component/sidebar/NavbarComponent";
import SignEditor from "../../features/signature/component/SignEditor/SignEditor";

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
                    variant="primary"
                    label="Document"
                    icon={<FaPencil />}
                    onClick={() => {}}
                  />

                  <ButtonWidget
                    variant="secondary"
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
        <div className={`${styles.progressCardList} border-top border-bottom`}>
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
        <div className={styles.navbar}>
          <DocumentNav />
        </div>
        <div className={styles.contentNavbar}>
          <div className={styles.contentCard}>
            <div className={styles.iconCard}>
              <FaPaperPlane />
            </div>
            <div className={styles.titleCard}>
              <p>NDA Agreement 2025.pdf</p>
              <p>Non-Disclosure Agreement for new project collaboration</p>
              <div className={styles.upluoadDeatil}>
                <p className={styles.upluoader}>
                  Uploaded by Thiyara Al-Mawaddah
                </p>
                <p className={styles.upluoadDate}>Uploaded on 2025-01-01</p>
                <div className={styles.upluoadSigned}>
                  <FaUser />
                  <p>0/2 SignEditor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
