"use client";

import { useState } from "react";
import { api } from "@/lib/api";

interface IntentionFormData {
  name: string;
  email: string;
  company?: string;
  reason?: string;
}

export function useSubmitIntention() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const submitIntention = async (data: IntentionFormData) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      await api.post("/intentions", data);
      setIsSuccess(true);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Erro ao enviar. Tente novamente.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { submitIntention, isLoading, isSuccess, error };
}
