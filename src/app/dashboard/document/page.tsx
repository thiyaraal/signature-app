"use client";

import { useState } from "react";
import { FaBarsProgress, FaPencil } from "react-icons/fa6";
import styles from "./pages.module.css";
import { ButtonWidget } from "@/src/shared/widget/button/ButtonWidget";
import { ProgressCard } from "@/src/shared/widget/card/ProgressCard";
import DocumentNav from "@/src/features/dashboard/component/navbar/NavbarComponent";
import SignatureCard from "@/src/features/Document/component/signature-card/SignatureCard";
import { IoIosTime } from "react-icons/io";
import { FaCheckCircle, FaFileAlt } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import DocumentCard from "@/src/features/Document/component/my-document-card/DocumentCard";
import HistoryCard from "../../../features/Document/component/history-card/HistoryCard";
export default function DocumentPage() {
  const [activeTab, setActiveTab] = useState("signature");

  const documents = [
    {
      title: "NDA Agreement 2025.pdf",
      description: "Non-Disclosure Agreement for new project collaboration",
      uploadedBy: "Thiyara Al-Mawaddah",
      uploadedDate: "2025-01-01",
      signerCount: "0/2",
      status: "In-progress",
      progress: 60,
      signatories: "Thiyara Al-Mawaddah, Budi Santoso",
    },
    {
      title: "Partnership Contract.pdf",
      description: "Agreement for partnership with external company",
      uploadedBy: "Budi Santoso",
      uploadedDate: "2025-01-02",
      signerCount: "1/2",
      status: "Pending",
      progress: 40,
      signatories: "Budi Santoso, Andi Saputra",
    },
    {
      title: "Service Agreement.pdf",
      description: "Contract for IT service collaboration",
      uploadedBy: "Andi Saputra",
      uploadedDate: "2025-01-03",
      signerCount: "2/2",
      status: "Completed",
      progress: 100,
      signatories: "Andi Saputra, Thiyara Al-Mawaddah",
    },
  ];
  const progressCards = [
    {
      icon: <IoIosTime />,
      amount: "3",
      title: "Pending my Signature",
      cardColor: "var(--cardColor-yellow)",
      borderColor: "var(--border-yellow)",
      iconColor: "var(--primary-yellow)",
    },
    {
      icon: <FaCheckCircle />,
      amount: "12",
      title: "Completed",
      cardColor: "var(--cardColor-green)",
      borderColor: "var(--border-green)",
      iconColor: "var(--primary-green)",
    },
    {
      icon: <FaBarsProgress />,
      amount: "5",
      title: "In Progress",
      cardColor: "var(--cardColor-blue)",
      borderColor: "var(--border-blue)",
      iconColor: "var(--primary-blue)",
    },
    {
      icon: <GiCancel />,
      amount: "2",
      title: "Rejected",
      cardColor: "var(--cardColor-red)",
      borderColor: "var(--border-red)",
      iconColor: "var(--primary-red)",
    },
    {
      icon: <FaFileAlt />,
      amount: "7",
      title: "Total Document",
      cardColor: "var(--cardColor-purple)",
      borderColor: "var(--border-purple)",
      iconColor: "var(--primary-purple)",
    },
  ];
  return (
    <>
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
          variant="gradasi-blue"
          label="Upload Document"
          icon={<FaPencil />}
        />
      </div>

      <div className={`${styles.progressCardList} border-top border-bottom`}>
        {progressCards.map((card, index) => (
          <div key={index} className={styles.gridProgressCard}>
            <ProgressCard {...card} />
          </div>
        ))}
      </div>

      <div className={styles.navbar}>
        <DocumentNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className={styles.contentNavbar}>
        {activeTab === "signature" &&
          documents.map((doc, index) => <SignatureCard key={index} {...doc} />)}
        {activeTab === "documents" &&
          documents.map((doc, index) => <DocumentCard key={index} {...doc} />)}
        {activeTab === "history" &&
          documents.map((doc, index) => <HistoryCard key={index} {...doc} />)}
      </div>
    </>
  );
}
