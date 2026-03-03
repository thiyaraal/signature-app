"use client";

import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function DashboardPage() {
  const sigRef = useRef<SignatureCanvas>(null);

  const clear = () => {
    if (sigRef.current) {
      sigRef.current.clear();
    }
  };

  const save = () => {
    if (sigRef.current) {
      const dataUrl = sigRef.current.toDataURL();
      console.log(dataUrl);
    }
  };

  return (
    <div>
      <h2>Signature Pad</h2>

      <SignatureCanvas
        ref={sigRef}
        penColor="black"
        canvasProps={{
          width: 500,
          height: 200,
          className: "border",
        }}
      />

      <div style={{ marginTop: 10 }}>
        <button onClick={clear}>Clear</button>
        <button onClick={save}>Save</button>
      </div>
    </div>
  );
}
