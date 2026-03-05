import { useState, useMemo } from "react";

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

export function useSignEditor() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [signers, setSigners] = useState<Signer[]>([]);
  const [fields, setFields] = useState<Map<string, SignatureField>>(new Map());

  const [placingSignerId, setPlacingSignerId] = useState<string | null>(null);
  const [selectedSignerId, setSelectedSignerId] = useState<string | null>(null);

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

  const handleSetPosition = (signerId: string) => {
    if (!fields.has(signerId)) {
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
      const f = fields.get(signerId)!;
      setCurrentPage(f.page);
    }
    setPlacingSignerId(signerId);
    setSelectedSignerId(signerId);
  };

  const updateField = (signerId: string, patch: Partial<SignatureField>) => {
    setFields((prev) => {
      const existing = prev.get(signerId);
      if (!existing) return prev;
      return new Map(prev).set(signerId, { ...existing, ...patch });
    });
  };

  const fieldsOnCurrentPage = useMemo(
    () => Array.from(fields.values()).filter((f) => f.page === currentPage),
    [fields, currentPage],
  );

  const selectedSigner = signers.find((s) => s.id === selectedSignerId);
  const selectedField = selectedSignerId
    ? fields.get(selectedSignerId)
    : undefined;

  return {
    fileUrl,
    setFileUrl: (url: string | null) => {
      setFileUrl(url);
      setCurrentPage(1);
    },
    numPages,
    setNumPages,
    currentPage,
    setCurrentPage,
    signers,
    fields,
    addSigner,
    removeSigner,
    handleSetPosition,
    updateField,
    placingSignerId,
    setPlacingSignerId,
    selectedSignerId,
    setSelectedSignerId,
    fieldsOnCurrentPage,
    selectedSigner,
    selectedField,
  };
}
