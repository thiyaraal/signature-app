"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Rnd } from "react-rnd";
import { Field } from "./SignEditor";
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
  fieldsByPage: Map<number, Field[]>;
  updateField: (id: string, patch: Partial<Field>) => void;
  selectedFieldId: string | null;
  setSelectedFieldId: (id: string) => void;
};

export default function PdfViewer(props: Props) {
  const {
    fileUrl,
    setFileUrl,
    currentPage,
    setCurrentPage,
    numPages,
    setNumPages,
    fieldsByPage,
    updateField,
    selectedFieldId,
    setSelectedFieldId,
  } = props;
  const [pageHeight, setPageHeight] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);
  const pageWidth = 800;

  useEffect(() => {
    setIsClient(true);
    import("react-pdf").then((pdf) => {
      pdf.pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url,
      ).toString();
    });
  }, []);

  if (!isClient) return <div>Loading PDF...</div>;

  return (
    <>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const url = URL.createObjectURL(file);
            setFileUrl(url);
            setCurrentPage(1);
          }}
        />

        <div>
          <button
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          <span>
            PAGE {currentPage} / {numPages || 1}
          </span>

          <button
            disabled={currentPage >= numPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {!fileUrl ? (
        <div className={styles.empty}>
          Silakan pilih file PDF untuk memulai editing.
        </div>
      ) : (
        <PDFDocument
          file={fileUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          <div className={styles.pdfContainer} style={{ height: pageHeight }}>
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
              {(fieldsByPage.get(currentPage) ?? []).map((field) => (
                <Rnd
                  key={field.id}
                  bounds="parent"
                  enableResizing
                  size={{
                    width: field.w,
                    height: field.h,
                  }}
                  position={{
                    x: field.x,
                    y: field.y,
                  }}
                  onDragStop={(e, d) =>
                    updateField(field.id, { x: d.x, y: d.y })
                  }
                  onResizeStop={(e, dir, ref, delta, pos) =>
                    updateField(field.id, {
                      x: pos.x,
                      y: pos.y,
                      w: ref.offsetWidth,
                      h: ref.offsetHeight,
                    })
                  }
                >
                  <div
                    onClick={() => setSelectedFieldId(field.id)}
                    className={
                      selectedFieldId === field.id
                        ? styles.selectedField
                        : styles.field
                    }
                  >
                    {field.signature ? (
                      <img src={field.signature} alt="signature" />
                    ) : field.text ? (
                      <span className={styles.fieldText}>{field.text}</span>
                    ) : (
                      field.label
                    )}
                  </div>
                </Rnd>
              ))}
            </div>
          </div>
        </PDFDocument>
      )}
    </>
  );
}
