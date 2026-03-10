"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaCheck,
  FaCircle,
  FaCircleCheck,
  FaCity,
  FaEye,
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
import { Nav, ProgressBar } from "react-bootstrap";

import SignEditor from "../../features/signature/component/SignEditor/SignEditor";
import { RiProgress2Fill } from "react-icons/ri";
import SideBarComponent from "@/src/features/dashboard/component/sidebar/SidebarComponent";
import DocumentNav from "@/src/features/dashboard/component/navbar/NavbarComponent";

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
        <SideBarComponent
          userName="Thiyara Al-Mawaddah"
          userEmail="thiyaraal@gmail.com"
          role="Administrator"
          company="PT Technology Indonesia"
          division="IT & Development"
          navigation={[
            {
              label: "Document",
              icon: <FaPencil />,
              variant: "primary",
            },
            {
              label: "User Management",
              icon: <FaUser />,
            },
          ]}
        />
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
            <div key={index} className={styles.gridProgressCard}>
              <ProgressCard
                icon={card.icon}
                amount={card.amount}
                title={card.title}
                cardColor={card.cardColor}
                borderColor={card.borderColor}
                iconColor={card.iconColor}
              />
            </div>
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

            <div className={styles.contentCardRight}>
              <div className={styles.contentCardTop}>
                <div className={styles.titleCard}>
                  <p className={styles.titleDocument}>NDA Agreement 2025.pdf</p>
                  <p className={styles.subtitleDocument}>
                    Non-Disclosure Agreement for new project collaboration
                  </p>
                  <div className={styles.uploadDetail}>
                    <span>Uploaded by Thiyara Al-Mawaddah</span>
                    <span>Uploaded on 2025-01-01</span>

                    <div className={styles.uploadSigned}>
                      <FaUser />
                      <span>0/2 Signers</span>
                    </div>
                  </div>
                </div>

                <div className={styles.statusCard}>
                  <span className={styles.iconStatusCard}>
                    <RiProgress2Fill />
                  </span>
                  <span className={styles.statusText}>In-progress</span>
                </div>
              </div>

              <div className={styles.progressBar}>
                <ProgressBar now={60} />
                <p className={styles.signatories}>
                  Signatories : Thiyara Al-Mawaddah, Budi Santoso
                </p>
              </div>
              <div className={styles.actionButton}>
                <ButtonWidget
                  width={"20%"}
                  colorButton="var(--primary-green)"
                  label="Sign Now"
                  variant="primary"
                  onClick={() => {}}
                  icon={<FaPencil />}
                />
                <ButtonWidget
                  width={"20%"}
                  label="View Detail"
                  variant="secondary"
                  onClick={() => {}}
                  icon={<FaEye />}
                />
              </div>
            </div>
          </div>
          <div className={styles.contentCard}>
            <div className={styles.iconCard}>
              <FaPaperPlane />
            </div>

            <div className={styles.contentCardRight}>
              <div className={styles.contentCardTop}>
                <div className={styles.titleCard}>
                  <p className={styles.titleDocument}>NDA Agreement 2025.pdf</p>
                  <p className={styles.subtitleDocument}>
                    Non-Disclosure Agreement for new project collaboration
                  </p>
                  <div className={styles.uploadDetail}>
                    <span>Uploaded by Thiyara Al-Mawaddah</span>
                    <span>Uploaded on 2025-01-01</span>

                    <div className={styles.uploadSigned}>
                      <FaUser />
                      <span>0/2 Signers</span>
                    </div>
                  </div>
                </div>

                <div className={styles.statusCard}>
                  <span className={styles.iconStatusCard}>
                    <RiProgress2Fill />
                  </span>
                  <span className={styles.statusText}>In-progress</span>
                </div>
              </div>

              <div className={styles.progressBar}>
                <ProgressBar now={60} />
                <p className={styles.signatories}>
                  Signatories : Thiyara Al-Mawaddah, Budi Santoso
                </p>
              </div>
              <div className={styles.actionButton}>
                <ButtonWidget
                  width={"20%"}
                  colorButton="var(--primary-green)"
                  label="Sign Now"
                  variant="primary"
                  onClick={() => {}}
                  icon={<FaPencil />}
                />
                <ButtonWidget
                  width={"20%"}
                  label="View Detail"
                  variant="secondary"
                  onClick={() => {}}
                  icon={<FaEye />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
