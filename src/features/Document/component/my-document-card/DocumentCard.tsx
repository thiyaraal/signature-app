import { FaPaperPlane, FaUser, FaEye } from "react-icons/fa";
import { ProgressBar } from "react-bootstrap";
import { RiProgress2Fill } from "react-icons/ri";
import styles from "./document-card.module.css";
import { ButtonWidget } from "@/src/shared/widget/button/ButtonWidget";
import { FaPencil } from "react-icons/fa6";

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
        <FaPaperPlane />
      </div>

      <div className={styles.contentCardRight}>
        <div className={styles.contentCardTop}>
          <div className={styles.titleCard}>
            <p className={styles.titleDocument}>{title}</p>
            <p className={styles.subtitleDocument}>{description}</p>

            <div className={styles.uploadDetail}>
              <span>Uploaded by {uploadedBy}</span>
              <span>Uploaded on {uploadedDate}</span>

              <div className={styles.uploadSigned}>
                <FaUser />
                <span>{signerCount} Signers</span>
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

        <div className={styles.progressBar}>
          <ProgressBar now={progress} />
          <p className={styles.signatories}>Signatories : {signatories}</p>
        </div>

        <div className={styles.actionButton}>
          <ButtonWidget
            width={"20%"}
            colorButton="var(--primary-green)"
            label="Sign Now"
            variant="primary"
            icon={<FaPencil />}
          />

          <ButtonWidget
            width={"20%"}
            label="View Detail"
            variant="secondary"
            icon={<FaEye />}
          />
        </div>
      </div>
    </div>
  );
}
