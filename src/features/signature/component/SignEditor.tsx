"use client";

import { useEffect, useMemo, useState } from "react";
import PdfViewer from "./PDFViewer";
import SignaturePadSection from "./SignaturePadSection";
import styles from "./sign-editor.module.css";

export type Field = {
  id: string;
  page: number;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  signature?: string;
  text?: string;
};

export default function SignEditor() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

  const [fields, setFields] = useState<Field[]>([]);

  useEffect(() => {
    if (numPages > 0) {
      const autoFields: Field[] = Array.from({ length: numPages }, (_, i) => ({
        id: `f${i + 1}`,
        page: i + 1,
        x: 80,
        y: 120,
        w: 220,
        h: 60,
        label: `TTD - User ${i + 1}`,
      }));
      setFields(autoFields);
    } else {
      setFields([]);
    }
  }, [numPages]);

  const fieldsByPage = useMemo(() => {
    const map = new Map<number, Field[]>();
    for (const f of fields) {
      if (!map.has(f.page)) map.set(f.page, []);
      map.get(f.page)!.push(f);
    }
    return map;
  }, [fields]);

  const updateField = (id: string, patch: Partial<Field>) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    );
  };

  const selectedField = fields.find((f) => f.id === selectedFieldId);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>PDF Sign Editor</h2>

        <PdfViewer
          fileUrl={fileUrl}
          setFileUrl={setFileUrl}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numPages={numPages}
          setNumPages={setNumPages}
          fieldsByPage={fieldsByPage}
          updateField={updateField}
          selectedFieldId={selectedFieldId}
          setSelectedFieldId={setSelectedFieldId}
        />

        <SignaturePadSection
          selectedField={selectedField}
          updateField={updateField}
        />
      </div>
    </div>
  );
}
