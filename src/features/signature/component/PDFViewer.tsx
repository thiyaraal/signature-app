"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Rnd } from "react-rnd";
import { Signer, SignatureField } from "./SignEditor";
import styles from "./sign-editor.module.css";

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
  const [pageHeight, setPageHeight] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);
  const pageWidth = 780;

  useEffect(() => {
    setIsClient(true);
    import("react-pdf").then((pdf) => {
      pdf.pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url,
      ).toString();
    });
  }, []);

  if (!isClient) return <div>Loading PDF viewer...</div>;

  const getSignerName = (signerId: string) =>
    signers.find((s) => s.id === signerId)?.name ?? "Unknown";

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
                      console.log(
                        `[COORD] ${signerName} - Page: ${currentPage}, x: ${Math.round(d.x)}, y: ${Math.round(d.y)}`,
                      );
                      updateField(field.signerId, { x: d.x, y: d.y });
                    }}
                    onResizeStop={(e, dir, ref, delta, pos) => {
                      console.log(
                        `[RESIZE] ${signerName} - Page: ${currentPage}, x: ${Math.round(pos.x)}, y: ${Math.round(pos.y)}, w: ${ref.offsetWidth}, h: ${ref.offsetHeight}`,
                      );
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
