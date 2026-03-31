import { useState } from "react";

interface CreateModalProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function CreateModal({
  onClose,
  onSave,
}: CreateModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedBy, setUploadedBy] = useState("");
  const [status, setStatus] = useState("In Progress");

const handleSubmit = () => {
  const payload = {
    title,
    description,
    uploadedBy,
    status,
  };

  onSave(payload);
};

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3>Create Document</h3>

        <input
          style={input}
          placeholder="Document Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          style={input}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          style={input}
          placeholder="Uploaded By"
          value={uploadedBy}
          onChange={(e) => setUploadedBy(e.target.value)}
        />

        <select
          style={input}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>

        <div style={buttonContainer}>
          <button style={buttonPrimary} onClick={handleSubmit}>
            Save
          </button>

          <button style={buttonSecondary} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}


const overlay: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modal: React.CSSProperties = {
  background: "white",
  padding: 20,
  borderRadius: 10,
  width: 320,
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const input: React.CSSProperties = {
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const buttonContainer: React.CSSProperties = {
  display: "flex",
  gap: 10,
  marginTop: 10,
};

const buttonPrimary: React.CSSProperties = {
  background: "#4CAF50",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: 6,
  cursor: "pointer",
};

const buttonSecondary: React.CSSProperties = {
  background: "#ccc",
  border: "none",
  padding: "8px 12px",
  borderRadius: 6,
  cursor: "pointer",
};