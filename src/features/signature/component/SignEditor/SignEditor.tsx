"use client";

import PdfViewer from "../PDFViewer/PDFViewer";
import SignerPanel from "../SignerPanel/SignerPanel";
import SignaturePadSection from "../SignaturePasSection/SignaturePadSection";
import styles from "./sign-editor.module.css";
import { useSignEditor } from "../../hooks/useSignEditor";

export default function SignEditor() {
  const {
    fileUrl,
    setFileUrl,
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
  } = useSignEditor();

  return (
    <div className={styles.wrapper}>
      <div className={styles.cardWide}>
        <h2 className={styles.title}>📄 PDF Sign Editor</h2>

        <div className={styles.editorLayout}>
          <SignerPanel
            signers={signers}
            fields={fields}
            placingSignerId={placingSignerId}
            onAddSigner={addSigner}
            onRemoveSigner={removeSigner}
            onSetPosition={handleSetPosition}
            onDonePlacing={() => setPlacingSignerId(null)}
          />

          <div className={styles.pdfSection}>
            <PdfViewer
              fileUrl={fileUrl}
              setFileUrl={setFileUrl}
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
