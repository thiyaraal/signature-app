import {
  FaPaperPlane,
  FaUser,
  FaEye,
  FaUserAlt,
  FaCheckCircle,
  FaInfoCircle,
} from "react-icons/fa";
import { ProgressBar } from "react-bootstrap";
import { RiProgress2Fill } from "react-icons/ri";
import { ButtonWidget } from "@/src/shared/widget/button/ButtonWidget";
import { BsPencilSquare, BsSendFill } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import styles from "./history-card.module.css";
import { FaInfo, FaUpload } from "react-icons/fa6";

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

interface HistoryCardProps {
  title: string;
  description: string;
  uploadedBy: string;
  uploadedDate: string;
  signerCount: string;
  status: string;
  progress: number;
  signatories: string;
}

export default function HistoryCard({
  title,
  description,
  uploadedBy,
  uploadedDate,
  signerCount,
  status,
  progress,
  signatories,
}: HistoryCardProps) {
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
              <div className={styles.tagUpluoadSign}>
                <FaUpload />
                <p> Your Upluoaded Document</p>
              </div>

              <div className={styles.statusCard}>
                <FaCheckCircle />
                <p>{signerCount} Approver</p>
              </div>
            </div>
          </div>

          <div className={styles.statusCardHistory}>
            <span className={styles.iconStatusCard}>
              <RiProgress2Fill />
            </span>
            <span className={styles.statusText}>{status}</span>
          </div>
        </div>
        <div className={styles.uploadStatusContainer}>
          <div className={styles.row}>
            <div className={styles.item}>
              <p className={styles.label}>Uploaded By</p>
              <p className={styles.value}>{uploadedBy}</p>
            </div>

            <div className={styles.item}>
              <p className={styles.label}>Completed On</p>
              <p className={styles.value}>{uploadedDate}</p>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.item}>
              <p className={styles.label}>Total Signature</p>
              <p className={styles.value}>{signerCount}</p>
            </div>

            <div className={styles.item}>
              <p className={styles.label}>Status</p>
              <p className={styles.value}>{status}</p>
            </div>
          </div>
        </div>

        <div className={styles.infoCard}>
          <p className={styles.infoIcon}>
            <FaInfoCircle />
          </p>
          <div className={styles.infoContent}>
            <p className={styles.infoTitle}>Document Rejected</p>
            <p className={styles.infoDescription}>
              This document was rejected by Budi Santoso during the approval
              process. View approval flow below to see rejection reason.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
