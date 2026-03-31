import { useEffect, useState } from "react";
import { SignatureDocument } from "../model/siganture.mode";
import { SignatureRepository } from "../repository/siganture.respository";
import { SignatureService } from "../services/signature.service";

export function useSignatureDocuments() {
  const [data, setData] = useState<SignatureDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const repo = new SignatureRepository();
    const service = new SignatureService(repo);

    service
      .getDocuments()
      .then((res) => setData(res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const deleteDocument = async (id: string) => {
    try {
      const repo = new SignatureRepository();
      const service = new SignatureService(repo);

      await service.deleteDocument(id);

      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const updateDocument = async (updated: SignatureDocument) => {
    try {
      const repo = new SignatureRepository();
      const service = new SignatureService(repo);

      const result = await service.updateDocument(updated);

      setData((prev) =>
        prev.map((item) => (item.id === result.id ? result : item)),
      );
    } catch (err: any) {
      console.log(err);
    }
  };

const postDocument = async (newDoc: any) => {
  try {
    const repo = new SignatureRepository();
    const service = new SignatureService(repo);

    const result = await service.postDocument(newDoc);

    setData((prev) => [...prev, result]);
  } catch (err: any) {
    console.log(err);
  }
};

  return { data, loading, error, deleteDocument, updateDocument, postDocument };
}
