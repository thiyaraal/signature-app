"use client";

import { useState, useMemo } from "react";
import PdfViewer from "./PDFViewer";
import SignerPanel from "./SignerPanel";
import SignaturePadSection from "./SignaturePadSection";
import styles from "./sign-editor.module.css";

// ─── Types ──────────────────────────────────────────────────────────────────
export type Signer = {
  id: string;
  name: string;
};

export type SignatureField = {
  signerId: string;
  page: number;
  x: number;
  y: number;
  w: number;
  h: number;
  signature?: string;
  text?: string;
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function SignEditor() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [signers, setSigners] = useState<Signer[]>([]);
  const [fields, setFields] = useState<Map<string, SignatureField>>(new Map());

  // ID signer yang sedang dalam "placement mode"
  const [placingSignerId, setPlacingSignerId] = useState<string | null>(null);
  // ID signer yang field-nya sedang dipilih (untuk signature pad)
  const [selectedSignerId, setSelectedSignerId] = useState<string | null>(null);

  // ── Signer actions ────────────────────────────────────────────────────────
  const addSigner = (name: string) => {
    const id = `signer-${Date.now()}`;
    setSigners((prev) => [...prev, { id, name }]);
  };

  const removeSigner = (id: string) => {
    setSigners((prev) => prev.filter((s) => s.id !== id));
    setFields((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
    if (placingSignerId === id) setPlacingSignerId(null);
    if (selectedSignerId === id) setSelectedSignerId(null);
  };

  // ── Set / Edit position ───────────────────────────────────────────────────
  const handleSetPosition = (signerId: string) => {
    if (!fields.has(signerId)) {
      // Buat field baru di posisi default halaman saat ini
      setFields((prev) =>
        new Map(prev).set(signerId, {
          signerId,
          page: currentPage,
          x: 80,
          y: 120,
          w: 220,
          h: 60,
        }),
      );
    } else {
      // Navigasi ke halaman field sudah ada
      const f = fields.get(signerId)!;
      setCurrentPage(f.page);
    }
    setPlacingSignerId(signerId);
    setSelectedSignerId(signerId);
  };

  // ── Update field (posisi / ukuran / tanda tangan) ─────────────────────────
  const updateField = (signerId: string, patch: Partial<SignatureField>) => {
    setFields((prev) => {
      const existing = prev.get(signerId);
      if (!existing) return prev;
      return new Map(prev).set(signerId, { ...existing, ...patch });
    });
  };

  // ── Derived ───────────────────────────────────────────────────────────────
  const fieldsOnCurrentPage = useMemo(
    () => Array.from(fields.values()).filter((f) => f.page === currentPage),
    [fields, currentPage],
  );

  const selectedSigner = signers.find((s) => s.id === selectedSignerId);
  const selectedField = selectedSignerId
    ? fields.get(selectedSignerId)
    : undefined;

  return (
    <div className={styles.wrapper}>
      <div className={styles.cardWide}>
        <h2 className={styles.title}>📄 PDF Sign Editor</h2>

        <div className={styles.editorLayout}>
          {/* ── Signer Sidebar ── */}
          <SignerPanel
            signers={signers}
            fields={fields}
            placingSignerId={placingSignerId}
            onAddSigner={addSigner}
            onRemoveSigner={removeSigner}
            onSetPosition={handleSetPosition}
            onDonePlacing={() => setPlacingSignerId(null)}
          />

          {/* ── Main PDF Area ── */}
          <div className={styles.pdfSection}>
            <PdfViewer
              fileUrl={fileUrl}
              setFileUrl={(url) => {
                setFileUrl(url);
                setCurrentPage(1);
              }}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              numPages={numPages}
              setNumPages={setNumPages}
              signers={signers}
              fieldsOnCurrentPage={fieldsOnCurrentPage}
              updateField={updateField}
              placingSignerId={placingSignerId}
              selectedSignerId={selectedSignerId}
              setSelectedSignerId={setSelectedSignerId}
            />

            {/* Signature pad muncul hanya jika field sudah dipilih */}
            {selectedField && selectedSigner && (
              <SignaturePadSection
                signer={selectedSigner}
                field={selectedField}
                updateField={updateField}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
