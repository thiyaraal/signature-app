import axios from "axios";
import { SignatureDocumentDTO } from "../dto/signature.dto";

const BASE_URL = "https://69b38857e224ec066bdc5be5.mockapi.io";

export class SignatureRepository {
  async getDocuments(): Promise<SignatureDocumentDTO[]> {
    const response = await fetch(`${BASE_URL}/signature/document`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return response.json();
  }
  async deleteDocument(id: string): Promise<void> {
    const response = await axios.delete(`${BASE_URL}/signature/document/${id}`);

    if (response.status !== 200) {
    }
  }
  async updateDocument(id: string, payload: any) {
    const response = await axios.put(
      `${BASE_URL}/signature/document/${id}`,
      payload
    );

      

    if (response.status !== 200) {
      throw new Error("Failed to update document");
    }

   return response.data;
  }
  async postDocument(payload: any) {
    const response = await axios.post(
      `${BASE_URL}/signature/document`,
      payload
    );

    if (response.status !== 201) {
      throw new Error("Failed to create document");
    }

   return response.data;
  }
}
