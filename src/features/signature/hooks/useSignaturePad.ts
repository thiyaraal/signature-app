import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { SignatureField } from "./useSignEditor";

type Mode = "signature" | "text";

export function useSignaturePad(
  signerId: string,
  initialText: string,
  updateField: (signerId: string, patch: Partial<SignatureField>) => void,
) {
  const sigRef = useRef<SignatureCanvas>(null);
  const [mode, setMode] = useState<Mode>("signature");
  const [textInput, setTextInput] = useState(initialText);

  const saveSignature = () => {
    const dataUrl = sigRef.current?.toDataURL();
    if (dataUrl) {
      updateField(signerId, { signature: dataUrl, text: undefined });
    }
  };

  const clearSignature = () => {
    sigRef.current?.clear();
    updateField(signerId, { signature: undefined });
  };

  const applyText = () => {
    if (!textInput.trim()) return;
    updateField(signerId, { text: textInput.trim(), signature: undefined });
  };

  const clearText = () => {
    setTextInput("");
    updateField(signerId, { text: undefined });
  };

  return {
    sigRef,
    mode,
    setMode,
    textInput,
    setTextInput,
    saveSignature,
    clearSignature,
    applyText,
    clearText,
  };
}
