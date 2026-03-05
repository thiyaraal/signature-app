"use client";

import SignatureCanvas from "react-signature-canvas";
import { Signer, SignatureField } from "../../hooks/useSignEditor";
import { useSignaturePad } from "../../hooks/useSignaturePad";
import styles from "./signature-pad.module.css";

type Props = {
  signer: Signer;
  field: SignatureField;
  updateField: (signerId: string, patch: Partial<SignatureField>) => void;
};

export default function SignaturePadSection({
  signer,
  field,
  updateField,
}: Props) {
  const {
    sigRef,
    mode,
    setMode,
    textInput,
    setTextInput,
    saveSignature,
    clearSignature,
    applyText,
    clearText,
  } = useSignaturePad(signer.id, field.text ?? "", updateField);

  return (
    <div className={styles.signatureSection}>
      <h3>
        ✍️ Tanda Tangan untuk: <strong>{signer.name}</strong>
      </h3>

      <div className={styles.modeToggle}>
        <button
          className={mode === "signature" ? styles.modeActive : styles.modeBtn}
          onClick={() => setMode("signature")}
        >
          ✍️ Signature
        </button>
        <button
          className={mode === "text" ? styles.modeActive : styles.modeBtn}
          onClick={() => setMode("text")}
        >
          📝 Text
        </button>
      </div>

      {mode === "signature" && (
        <>
          <SignatureCanvas
            ref={sigRef}
            penColor="black"
            canvasProps={{ width: 500, height: 180 }}
          />
          <div className={styles.signatureButtons}>
            <button onClick={clearSignature}>Clear</button>
            <button onClick={saveSignature}>Apply Signature</button>
          </div>
        </>
      )}

      {mode === "text" && (
        <div className={styles.textInputWrapper}>
          <textarea
            className={styles.textArea}
            placeholder="Ketik teks di sini..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            rows={4}
          />
          <div className={styles.signatureButtons}>
            <button onClick={clearText}>Clear</button>
            <button disabled={!textInput.trim()} onClick={applyText}>
              Apply Text
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
