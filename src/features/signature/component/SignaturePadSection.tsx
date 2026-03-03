"use client";

import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Signer, SignatureField } from "./SignEditor";
import styles from "./sign-editor.module.css";

type Props = {
  signer: Signer;
  field: SignatureField;
  updateField: (signerId: string, patch: Partial<SignatureField>) => void;
};

type Mode = "signature" | "text";

export default function SignaturePadSection({
  signer,
  field,
  updateField,
}: Props) {
  const sigRef = useRef<SignatureCanvas>(null);
  const [mode, setMode] = useState<Mode>("signature");
  const [textInput, setTextInput] = useState(field.text ?? "");

  const saveSignature = () => {
    const dataUrl = sigRef.current?.toDataURL();
    if (dataUrl) {
      updateField(signer.id, { signature: dataUrl, text: undefined });
    }
  };

  const clearSignature = () => {
    sigRef.current?.clear();
    updateField(signer.id, { signature: undefined });
  };

  const applyText = () => {
    if (!textInput.trim()) return;
    updateField(signer.id, { text: textInput.trim(), signature: undefined });
  };

  const clearText = () => {
    setTextInput("");
    updateField(signer.id, { text: undefined });
  };

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
