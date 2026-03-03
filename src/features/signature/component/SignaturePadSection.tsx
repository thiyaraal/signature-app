"use client";

import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Field } from "./SignEditor";
import styles from "./sign-editor.module.css";

type Mode = "signature" | "text";

type Props = {
  selectedField?: Field;
  updateField: (id: string, patch: Partial<Field>) => void;
};

export default function SignaturePadSection({
  selectedField,
  updateField,
}: Props) {
  const sigRef = useRef<SignatureCanvas>(null);
  const [mode, setMode] = useState<Mode>("signature");
  const [textInput, setTextInput] = useState("");

  const saveSignature = () => {
    if (!selectedField) return;
    const dataUrl = sigRef.current?.toDataURL();
    if (dataUrl) {
      updateField(selectedField.id, { signature: dataUrl, text: undefined });
    }
  };

  const clearSignature = () => {
    sigRef.current?.clear();
    if (selectedField) {
      updateField(selectedField.id, { signature: undefined });
    }
  };

  const applyText = () => {
    if (!selectedField || !textInput.trim()) return;
    updateField(selectedField.id, {
      text: textInput.trim(),
      signature: undefined,
    });
    setTextInput("");
  };

  const clearText = () => {
    setTextInput("");
    if (selectedField) {
      updateField(selectedField.id, { text: undefined });
    }
  };

  return (
    <div className={styles.signatureSection}>
      <h3>
        {selectedField
          ? `Edit: ${selectedField.label}`
          : "Pilih kotak di PDF terlebih dahulu"}
      </h3>

      {/* Toggle Mode */}
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

      {/* Signature Mode */}
      {mode === "signature" && (
        <>
          <SignatureCanvas
            ref={sigRef}
            penColor="black"
            canvasProps={{
              width: 500,
              height: 180,
            }}
          />
          <div className={styles.signatureButtons}>
            <button onClick={clearSignature}>Clear</button>
            <button disabled={!selectedField} onClick={saveSignature}>
              Apply Signature
            </button>
          </div>
        </>
      )}

      {/* Text Mode */}
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
            <button
              disabled={!selectedField || !textInput.trim()}
              onClick={applyText}
            >
              Apply Text
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
