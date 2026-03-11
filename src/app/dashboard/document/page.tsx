import { FaBarsProgress, FaPencil } from "react-icons/fa6";
import styles from "./pages.module.css";
import { ButtonWidget } from "@/src/shared/widget/button/ButtonWidget";
import { ProgressCard } from "@/src/shared/widget/card/ProgressCard";
import DocumentNav from "@/src/features/dashboard/component/navbar/NavbarComponent";
import DocumentCard from "@/src/features/Document/component/my-document-card/DocumentCard";
import { IoIosTime } from "react-icons/io";
import { FaCheckCircle, FaFileAlt } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
export default function DocumentPage() {
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
      cardColor: "#FFFBD2",
      borderColor: "#f7f1b4ff",
      iconColor: "#F5A623",
    },
    {
      icon: <FaCheckCircle />,
      amount: "12",
      title: "Completed",
      cardColor: "#E7FDEE",
      borderColor: "#c1f4d1ff",
      iconColor: "#1ABC9C",
    },
    {
      icon: <FaBarsProgress />,
      amount: "5",
      title: "In Progress",
      cardColor: "#E6F1FF",
      borderColor: "#b0cdf1ff",
      iconColor: "#225087ff",
    },
    {
      icon: <GiCancel />,
      amount: "2",
      title: "Rejected",
      cardColor: "#FFE6E7",
      borderColor: "#f3c8cbff",
      iconColor: "#ec6272ff",
    },
    {
      icon: <FaFileAlt />,
      amount: "7",
      title: "Total Document",
      cardColor: "#F7F0FF",
      borderColor: "#e2d7efff",
      iconColor: "#7e23bfff",
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
        <DocumentNav />
      </div>
      <div className={styles.contentNavbar}>
        {documents.map((doc, index) => (
          <DocumentCard key={index} {...doc} />
        ))}
      </div>
    </>
  );
}
