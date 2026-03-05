"use client";

import dynamic from "next/dynamic";
import { Rnd } from "react-rnd";
import { Signer, SignatureField } from "../../hooks/useSignEditor";
import { usePDFViewer } from "../../hooks/usePDFViewer";
import styles from "./pdf-viewer.module.css";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

const PDFDocument = dynamic(
  () => import("react-pdf").then((mod) => mod.Document),
  { ssr: false },
);

const PDFPage = dynamic(() => import("react-pdf").then((mod) => mod.Page), {
  ssr: false,
});

type Props = {
  fileUrl: string | null;
  setFileUrl: (v: string | null) => void;
  currentPage: number;
  setCurrentPage: (v: number) => void;
  numPages: number;
  setNumPages: (v: number) => void;
  signers: Signer[];
  fieldsOnCurrentPage: SignatureField[];
  updateField: (signerId: string, patch: Partial<SignatureField>) => void;
  placingSignerId: string | null;
  selectedSignerId: string | null;
  setSelectedSignerId: (id: string | null) => void;
};

export default function PdfViewer({
  fileUrl,
  setFileUrl,
  currentPage,
  setCurrentPage,
  numPages,
  setNumPages,
  signers,
  fieldsOnCurrentPage,
  updateField,
  placingSignerId,
  selectedSignerId,
  setSelectedSignerId,
}: Props) {
  const { pageHeight, setPageHeight, isClient, pageWidth, getSignerName } =
    usePDFViewer(signers);

  if (!isClient) return <div>Loading PDF viewer...</div>;

  return (
    <div>
      <div className={styles.toolbar}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const url = URL.createObjectURL(file);
            setFileUrl(url);
          }}
        />

        <div className={styles.pageNav}>
          <button
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ← Prev
          </button>
          <span className={styles.pageInfo}>
            Page {currentPage} / {numPages || 1}
          </span>
          <button
            disabled={currentPage >= numPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next →
          </button>
        </div>
      </div>

      {placingSignerId && (
        <div className={styles.placingBannerPdf}>
          📍 Placement Mode — <strong>{getSignerName(placingSignerId)}</strong>:
          drag &amp; resize kotak untuk atur posisi tanda tangan
        </div>
      )}

      {!fileUrl ? (
        <div className={styles.empty}>
          Silakan upload file PDF untuk memulai editing.
        </div>
      ) : (
        <PDFDocument
          file={fileUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          <div
            className={styles.pdfContainer}
            style={{ height: pageHeight || "auto" }}
          >
            <PDFPage
              pageNumber={currentPage}
              width={pageWidth}
              onLoadSuccess={(page) => {
                const viewport = page.getViewport({
                  scale: pageWidth / page.originalWidth,
                });
                setPageHeight(viewport.height);
              }}
            />

            <div className={styles.overlay} style={{ height: pageHeight }}>
              {fieldsOnCurrentPage.map((field) => {
                const isSelected = selectedSignerId === field.signerId;
                const isPlacing = placingSignerId === field.signerId;
                const signerName = getSignerName(field.signerId);

                return (
                  <Rnd
                    key={field.signerId}
                    bounds="parent"
                    enableResizing
                    size={{ width: field.w, height: field.h }}
                    position={{ x: field.x, y: field.y }}
                    onDragStop={(e, d) => {
                      updateField(field.signerId, { x: d.x, y: d.y });
                    }}
                    onResizeStop={(e, dir, ref, delta, pos) => {
                      updateField(field.signerId, {
                        x: pos.x,
                        y: pos.y,
                        w: ref.offsetWidth,
                        h: ref.offsetHeight,
                      });
                    }}
                    disableDragging={!isPlacing && !isSelected}
                  >
                    <div
                      onClick={() => setSelectedSignerId(field.signerId)}
                      className={
                        isSelected
                          ? styles.fieldSelected
                          : isPlacing
                            ? styles.fieldPlacing
                            : styles.field
                      }
                    >
                      {field.signature ? (
                        <img src={field.signature} alt="signature" />
                      ) : field.text ? (
                        <span className={styles.fieldText}>{field.text}</span>
                      ) : (
                        <span className={styles.fieldLabel}>{signerName}</span>
                      )}
                    </div>
                  </Rnd>
                );
              })}
            </div>
          </div>
        </PDFDocument>
      )}
    </div>
  );
}
