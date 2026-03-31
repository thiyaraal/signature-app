import { useState } from "react";

export default function EditModal({ data, onClose, onSave }: any) {
    const overlay: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999,
};

const modal: React.CSSProperties = {
  background: "white",
  padding: 20,
  borderRadius: 10,
  width: 300,
};
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);

  const handleSave = () => {
    const updated = {
      ...data,
      title,
      description,
    };

    onSave(updated);
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3>Edit Document</h3>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{ width: "100%", marginBottom: 10 }}
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          style={{ width: "100%", marginBottom: 10 }}
        />

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}