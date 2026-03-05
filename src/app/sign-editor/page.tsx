// "use client";

import SignEditor from "@/src/features/signature/component/SignEditor/SignEditor";

// import { useMemo, useState, useEffect, useRef } from "react";
// import { Rnd } from "react-rnd";
// import dynamic from "next/dynamic";
// import SignatureCanvas from "react-signature-canvas";

// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";

// const PDFDocument = dynamic(
//   () => import("react-pdf").then((mod) => mod.Document),
//   { ssr: false },
// );
// const PDFPage = dynamic(() => import("react-pdf").then((mod) => mod.Page), {
//   ssr: false,
// });

// type Field = {
//   id: string;
//   page: number;
//   x: number;
//   y: number;
//   w: number;
//   h: number;
//   label: string;
//   signature?: string;
// };

// export default function SignEditorPage() {
//   const [fileUrl, setFileUrl] = useState<string | null>(null);
//   const [numPages, setNumPages] = useState<number>(0);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [isClient, setIsClient] = useState(false);
//   const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
//   const sigRef = useRef<SignatureCanvas>(null);

//   useEffect(() => {
//     setIsClient(true);

//     import("react-pdf").then((pdf) => {
//       pdf.pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//         "pdfjs-dist/build/pdf.worker.min.mjs",
//         import.meta.url,
//       ).toString();
//     });
//   }, []);

//   const pageWidth = 800;

//   const [fields, setFields] = useState<Field[]>([
//     { id: "f1", page: 1, x: 80, y: 120, w: 220, h: 60, label: "TTD - User 1" },
//     { id: "f2", page: 2, x: 120, y: 200, w: 220, h: 60, label: "TTD - User 2" },
//   ]);

//   const fieldsByPage = useMemo(() => {
//     const map = new Map<number, Field[]>();
//     for (const f of fields) {
//       if (!map.has(f.page)) map.set(f.page, []);
//       map.get(f.page)!.push(f);
//     }
//     return map;
//   }, [fields]);

//   const updateField = (id: string, patch: Partial<Field>) => {
//     setFields((prev) =>
//       prev.map((f) => (f.id === id ? { ...f, ...patch } : f)),
//     );
//   };

//   const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
//   const goToNextPage = () =>
//     setCurrentPage((prev) => Math.min(prev + 1, numPages));

//   const saveSignature = () => {
//     if (!selectedFieldId) {
//       alert("Silakan klik/pilih salah satu kotak TTD di PDF terlebih dahulu.");
//       return;
//     }

//     if (sigRef.current) {
//       const dataUrl = sigRef.current.toDataURL();
//       updateField(selectedFieldId, { signature: dataUrl });
//     }
//   };

//   const clearSignature = () => {
//     if (selectedFieldId) {
//       updateField(selectedFieldId, { signature: undefined });
//     }
//     sigRef.current?.clear();
//   };

//   const selectedFieldLabel = useMemo(() => {
//     return fields.find((f) => f.id === selectedFieldId)?.label;
//   }, [fields, selectedFieldId]);

//   if (!isClient) {
//     return <div>Loading editor...</div>;
//   }

//   return (
//     <div
//       style={{
//         padding: 24,
//         background: "#f8fafc",
//         minHeight: "100vh",
//         fontFamily: "Inter, sans-serif",
//       }}
//     >
//       <div
//         style={{
//           maxWidth: pageWidth + 40,
//           margin: "0 auto",
//           background: "white",
//           padding: 24,
//           borderRadius: 16,
//           boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
//         }}
//       >
//         <h2 style={{ marginBottom: 20, color: "#1e293b" }}>PDF Sign Editor</h2>

//         {/* Toolbar Top */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: 24,
//             padding: 16,
//             background: "#f1f5f9",
//             borderRadius: 12,
//           }}
//         >
//           <div style={{ display: "flex", gap: 12 }}>
//             <input
//               type="file"
//               accept="application/pdf"
//               style={{
//                 fontSize: "14px",
//                 color: "#64748b",
//               }}
//               onChange={(e) => {
//                 const file = e.target.files?.[0];
//                 if (!file) return;
//                 if (fileUrl) URL.revokeObjectURL(fileUrl);
//                 const url = URL.createObjectURL(file);
//                 setFileUrl(url);
//                 setCurrentPage(1);
//               }}
//             />
//           </div>

//           <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
//             <button
//               onClick={goToPrevPage}
//               disabled={currentPage <= 1}
//               style={{
//                 padding: "8px 16px",
//                 borderRadius: 8,
//                 border: "1px solid #e2e8f0",
//                 background: currentPage <= 1 ? "#f8fafc" : "white",
//                 cursor: currentPage <= 1 ? "not-allowed" : "pointer",
//                 fontWeight: 600,
//                 color: "#475569",
//               }}
//             >
//               &lt; Prev
//             </button>

//             <span
//               style={{
//                 fontWeight: 700,
//                 color: "#334155",
//                 minWidth: 100,
//                 textAlign: "center",
//               }}
//             >
//               PAGE {currentPage} / {numPages || 1}
//             </span>

//             <button
//               onClick={goToNextPage}
//               disabled={currentPage >= numPages}
//               style={{
//                 padding: "8px 16px",
//                 borderRadius: 8,
//                 border: "1px solid #e2e8f0",
//                 background: currentPage >= numPages ? "#f8fafc" : "white",
//                 cursor: currentPage >= numPages ? "not-allowed" : "pointer",
//                 fontWeight: 600,
//                 color: "#475569",
//               }}
//             >
//               Next &gt;
//             </button>
//           </div>

//           <button
//             onClick={() => {
//               console.log("FIELDS:", fields);
//               alert("Posisi field dicetak ke console.");
//             }}
//             style={{
//               padding: "8px 20px",
//               borderRadius: 8,
//               background: "#2563eb",
//               color: "white",
//               border: "none",
//               fontWeight: 600,
//               cursor: "pointer",
//             }}
//           >
//             Save Configuration
//           </button>
//         </div>

//         {/* PDF Canvas Area */}
//         {!fileUrl ? (
//           <div
//             style={{
//               padding: 60,
//               border: "2px dashed #cbd5e1",
//               borderRadius: 12,
//               textAlign: "center",
//               color: "#94a3b8",
//             }}
//           >
//             Silakan pilih file PDF untuk memulai editing.
//           </div>
//         ) : (
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               overflow: "auto",
//               padding: "20px 0",
//               background: "#e2e8f0",
//               borderRadius: 12,
//             }}
//           >
//             <PDFDocument
//               file={fileUrl}
//               onLoadSuccess={({ numPages }) => setNumPages(numPages)}
//               loading={
//                 <div style={{ padding: 40, textAlign: "center" }}>
//                   Loading PDF...
//                 </div>
//               }
//             >
//               <div
//                 style={{
//                   position: "relative",
//                   width: pageWidth,
//                   boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
//                   border: "1px solid #e2e8f0",
//                 }}
//               >
//                 {/* PDF Page Terpilih */}
//                 <PDFPage pageNumber={currentPage} width={pageWidth} />

//                 {/* Overlay layer khusus untuk page ini */}
//                 <div
//                   style={{
//                     position: "absolute",
//                     left: 0,
//                     top: 0,
//                     width: "100%",
//                     height: "100%",
//                     pointerEvents: "none",
//                     zIndex: 10,
//                   }}
//                 >
//                   {(fieldsByPage.get(currentPage) ?? []).map((field) => (
//                     <Rnd
//                       key={field.id}
//                       bounds="parent"
//                       default={{
//                         x: field.x,
//                         y: field.y,
//                         width: field.w,
//                         height: field.h,
//                       }}
//                       onDragStart={() => setSelectedFieldId(field.id)}
//                       onDragStop={(e, d) =>
//                         updateField(field.id, { x: d.x, y: d.y })
//                       }
//                       onResizeStop={(e, dir, ref, delta, pos) => {
//                         updateField(field.id, {
//                           x: pos.x,
//                           y: pos.y,
//                           w: ref.offsetWidth,
//                           h: ref.offsetHeight,
//                         });
//                       }}
//                       enableResizing
//                       style={{ pointerEvents: "auto", zIndex: 20 }}
//                     >
//                       <div
//                         onClick={() => setSelectedFieldId(field.id)}
//                         style={{
//                           width: "100%",
//                           height: "100%",
//                           border:
//                             selectedFieldId === field.id
//                               ? "3px solid #ef4444"
//                               : "2px dashed #2563eb",
//                           background: field.signature
//                             ? "white"
//                             : "rgba(37, 99, 235, 0.15)",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           fontWeight: 700,
//                           fontSize: "14px",
//                           color: "#1e40af",
//                           userSelect: "none",
//                           cursor: "grab",
//                           borderRadius: 4,
//                           overflow: "hidden",
//                           transition: "border 0.2s ease",
//                         }}
//                       >
//                         {field.signature ? (
//                           <img
//                             src={field.signature}
//                             alt="signature"
//                             style={{
//                               width: "100%",
//                               height: "100%",
//                               objectFit: "contain",
//                             }}
//                           />
//                         ) : (
//                           field.label
//                         )}
//                       </div>
//                     </Rnd>
//                   ))}
//                 </div>
//               </div>
//             </PDFDocument>
//           </div>
//         )}

//         {/* Signature Pad Section */}
//         <div
//           id="signature-pad"
//           style={{
//             marginTop: 40,
//             padding: 24,
//             borderTop: "2px solid #f1f5f9",
//             textAlign: "center",
//             background: selectedFieldId ? "#fff7ed" : "transparent",
//             borderRadius: 12,
//             transition: "background 0.3s ease",
//           }}
//         >
//           <h3 style={{ marginBottom: 8, color: "#334155" }}>
//             {selectedFieldId
//               ? `Draw Signature for: ${selectedFieldLabel}`
//               : "Pilih kotak TTD di PDF untuk mulai tanda tangan"}
//           </h3>
//           {selectedFieldId && (
//             <p style={{ fontSize: 13, color: "#ea580c", marginBottom: 16 }}>
//               Tanda tangan ini hanya akan muncul di kotak yang Anda pilih.
//             </p>
//           )}

//           <div
//             style={{
//               display: "inline-block",
//               border: selectedFieldId
//                 ? "2px solid #ea580c"
//                 : "1px solid #cbd5e1",
//               borderRadius: 8,
//               background: "white",
//             }}
//           >
//             <SignatureCanvas
//               ref={sigRef}
//               penColor="black"
//               canvasProps={{
//                 width: 500,
//                 height: 180,
//                 className: "sigCanvas",
//               }}
//             />
//           </div>

//           <div
//             style={{
//               marginTop: 16,
//               display: "flex",
//               justifyContent: "center",
//               gap: 12,
//             }}
//           >
//             <button
//               onClick={clearSignature}
//               style={{
//                 padding: "10px 24px",
//                 borderRadius: 8,
//                 border: "1px solid #e2e8f0",
//                 background: "white",
//                 color: "#475569",
//                 fontWeight: 600,
//                 cursor: "pointer",
//               }}
//             >
//               Clear
//             </button>
//             <button
//               onClick={saveSignature}
//               disabled={!selectedFieldId}
//               style={{
//                 padding: "10px 24px",
//                 borderRadius: 8,
//                 background: selectedFieldId ? "#ea580c" : "#94a3b8",
//                 color: "white",
//                 border: "none",
//                 fontWeight: 600,
//                 cursor: selectedFieldId ? "pointer" : "not-allowed",
//               }}
//             >
//               Apply to Selected Field
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function SignPage() {
  return <SignEditor />;
}
