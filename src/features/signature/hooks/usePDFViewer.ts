import { useEffect, useState } from "react";

export function usePDFViewer(signers: any[]) {
  const [pageHeight, setPageHeight] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);
  const pageWidth = 780;

  useEffect(() => {
    setIsClient(true);

    import("react-pdf").then((pdf) => {
      pdf.pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url,
      ).toString();
    });
  }, []);

  const getSignerName = (signerId: string) =>
    signers.find((s) => s.id === signerId)?.name ?? "Unknown";

  return {
    pageHeight,
    setPageHeight,
    isClient,
    pageWidth,
    getSignerName,
  };
}
