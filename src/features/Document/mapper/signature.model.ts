import { SignatureDocumentDTO } from "../dto/signature.dto";
import { SignatureDocument } from "../model/siganture.mode";

function formatDate(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function getProgress(status: string): number {
  if (status === "Completed") return 100;
  if (status === "In Progress") return 60;
  if (status === "Pending") return 20;
  return 0;
}

export function toSignatureDocument(
  dto: SignatureDocumentDTO,
): SignatureDocument {
  return {
    id: dto.id,
    title: dto.documentTitle,
    description: dto.subTitle,
    uploadedBy: dto.uploadedBy,
    uploadedDate: formatDate(dto.publishDate),
    status: dto.status,
    progress: getProgress(dto.status),

    signerCount: dto.signerCount,
    signatories: dto.signatories,
  };
}
