import { toSignatureDocument } from "../mapper/signature.model";
import { SignatureDocument } from "../model/siganture.mode";
import { SignatureRepository } from "../repository/siganture.respository";

export class SignatureService {
  constructor(private repository: SignatureRepository) {}

  async getDocuments(): Promise<SignatureDocument[]> {
    const dtos = await this.repository.getDocuments();

    return dtos.map(toSignatureDocument);
  }
  async deleteDocument(id: string): Promise<void> {
    await this.repository.deleteDocument(id);
  }
  async updateDocument(updated: SignatureDocument) {
    const payload = {
      documentTitle: updated.title,
      subTitle: updated.description,
    };

    const dto = await this.repository.updateDocument(updated.id, payload);

    return toSignatureDocument(dto);
  }

async postDocument(newDoc: any) {
  const payload = {
    documentTitle: newDoc.title,
    subTitle: newDoc.description,
    uploadedBy: newDoc.uploadedBy,
    status: newDoc.status,

    thumbnailUrl: "https://picsum.photos/200/300",
    createdAt: new Date().toISOString(),
    publishTime: new Date().toISOString(),
  };

  const dto = await this.repository.postDocument(payload);

  return toSignatureDocument(dto);
}
}
