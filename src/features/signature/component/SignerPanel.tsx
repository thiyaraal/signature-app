"use client";

import { useState } from "react";
import { Signer, SignatureField } from "./SignEditor";
import styles from "./sign-editor.module.css";

type Props = {
  signers: Signer[];
  fields: Map<string, SignatureField>;
  placingSignerId: string | null;
  onAddSigner: (name: string) => void;
  onRemoveSigner: (id: string) => void;
  onSetPosition: (id: string) => void;
  onDonePlacing: () => void;
};

export default function SignerPanel({
  signers,
  fields,
  placingSignerId,
  onAddSigner,
  onRemoveSigner,
  onSetPosition,
  onDonePlacing,
}: Props) {
  const [newName, setNewName] = useState("");

  const handleAdd = () => {
    if (!newName.trim()) return;
    onAddSigner(newName.trim());
    setNewName("");
  };

  return (
    <div className={styles.signerPanel}>
      <h3 className={styles.panelTitle}>✍️ Signers</h3>

      {/* Add Signer Form */}
      <div className={styles.addSignerForm}>
        <input
          type="text"
          placeholder="Nama penanda tangan..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          className={styles.signerInput}
        />
        <button onClick={handleAdd} className={styles.addBtn}>
          + Add
        </button>
      </div>

      {/* Signer List */}
      <div className={styles.signerList}>
        {signers.length === 0 && (
          <p className={styles.emptySigners}>
            Belum ada signer. Tambahkan signer di atas.
          </p>
        )}

        {signers.map((signer) => {
          const field = fields.get(signer.id);
          const isPlacing = placingSignerId === signer.id;

          return (
            <div
              key={signer.id}
              className={`${styles.signerCard} ${isPlacing ? styles.signerCardActive : ""}`}
            >
              {/* Avatar + Info */}
              <div className={styles.signerInfo}>
                <div className={styles.signerAvatar}>
                  {signer.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className={styles.signerName}>{signer.name}</div>
                  <div className={styles.signerStatus}>
                    {field ? (
                      <span className={styles.statusSet}>
                        ✓ Page {field.page} — posisi diset
                      </span>
                    ) : (
                      <span className={styles.statusUnset}>
                        Belum ada posisi
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className={styles.signerActions}>
                {isPlacing ? (
                  <button className={styles.doneBtn} onClick={onDonePlacing}>
                    ✓ Done
                  </button>
                ) : (
                  <button
                    className={styles.setPositionBtn}
                    onClick={() => onSetPosition(signer.id)}
                  >
                    {field ? "✏️ Edit" : "📍 Set Position"}
                  </button>
                )}
                <button
                  className={styles.removeBtn}
                  onClick={() => onRemoveSigner(signer.id)}
                  title="Hapus signer"
                >
                  🗑
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Placement Mode Banner */}
      {placingSignerId && (
        <div className={styles.placingBanner}>
          📍 Drag kotak di PDF untuk atur posisi tanda tangan
        </div>
      )}
    </div>
  );
}
