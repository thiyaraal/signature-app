import {
  FaPaperPlane,
  FaUser,
  FaEye,
  FaUserAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { ProgressBar } from "react-bootstrap";
import { RiProgress2Fill } from "react-icons/ri";
import styles from "./document-card.module.css";
import { ButtonWidget } from "@/src/shared/widget/button/ButtonWidget";
import { FaPencil, FaSeedling } from "react-icons/fa6";
import { ProgressCard } from "../../../../shared/widget/card/ProgressCard";
import { BsPencilSquare, BsSendFill } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";

const statusSigned = [
  {
    icon: <FaCheckCircle />,
    status: "Signed",
    amount: "3",
    color: "var(--primary-green)",
    backColor: "var(--cardColor-green)",
    borderColor: "var(--border-green)",
  },
  {
    icon: <FaCheckCircle />,
    status: "Pending",
    amount: "4",
    color: "var(--primary-orange)",
    backColor: "var(--cardColor-orange)",
    borderColor: "var(--border-orange)",
  },
  {
    icon: <FaCheckCircle />,
    status: "Rejected",
    amount: "3",
    color: "var(--primary-red)",
    backColor: "var(--cardColor-red)",
    borderColor: "var(--border-red)",
  },
];

interface DocumentCardProps {
  title: string;
  description: string;
  uploadedBy: string;
  uploadedDate: string;
  signerCount: string;
  status: string;
  progress: number;
  signatories: string;
}

export default function DocumentCard({
  title,
  description,
  uploadedBy,
  uploadedDate,
  signerCount,
  status,
  progress,
  signatories,
}: DocumentCardProps) {
  return (
    <div className={styles.contentCard}>
      <div className={styles.iconCard}>
        <BsPencilSquare />
      </div>

      <div className={styles.contentCardRight}>
        <div className={styles.contentCardTop}>
          <div className={styles.titleCard}>
            <p className={styles.titleDocument}>{title}</p>
            <p className={styles.subtitleDocument}>{description}</p>

            <div className={styles.uploadDetail}>
              <span>Uploaded: {uploadedDate}</span>

              <div className={styles.uploadSigned}>
                <FaUserAlt />
                <span>{signerCount} Approver</span>
              </div>
            </div>
          </div>

          <div className={styles.statusCard}>
            <span className={styles.iconStatusCard}>
              <RiProgress2Fill />
            </span>
            <span className={styles.statusText}>{status}</span>
          </div>
        </div>
        <div className={styles.listStatusSigned}>
          {statusSigned.map((status, index) => (
            <div
              key={index}
              className={styles.statusSignedCard}
              style={{
                borderColor: status.color,
                backgroundColor: status.backColor,
              }}
            >
              <div className={styles.statusTop} style={{ color: status.color }}>
                {status.icon}
                <p className={styles.statusSigned}>{status.status}</p>
              </div>
              <p className={styles.amount} style={{ color: status.color }}>
                {status.amount}
              </p>
            </div>
          ))}
        </div>
        <div className={styles.progressBar}>
          <p className={styles.progressTop}>
            <p className={styles.ProgressTitle}> Progress</p>
            <p className={styles.progressPercent}> 67%</p>
          </p>
          <ProgressBar now={progress} variant="success" />
        </div>
        <div className={styles.infoCard}>
          <p className={styles.infoIcon}>
            <MdOutlineCancel />
          </p>
          <div className={styles.infoContent}>
            <p className={styles.infoTitle}>Document Rejected</p>
            <p className={styles.infoDescription}>
              This document was rejected by Budi Santoso during the approval
              process. View approval flow below to see rejection reason.
            </p>
            <p className={styles.infoRequired}>
              Action required: Revise the document and resubmit for approval.
            </p>
          </div>
        </div>

        <div className={styles.actionButton}>
          <ButtonWidget
            width={"20%"}
            variant="secondary"
            label="View Approval Flow"
            icon={<FaEye />}
          />

          <ButtonWidget
            width={"20%"}
            label="Revise & Resubmit"
            variant="primary"
            icon={<BsSendFill />}
          />
        </div>
      </div>
    </div>
  );
}
