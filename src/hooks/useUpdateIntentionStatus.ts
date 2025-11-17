"use client";

import { useState } from "react";
import { createAdminApi } from "@/lib/api";

type Action = "APPROVE" | "REJECT";

interface UpdateResult {
  success: boolean;
  registrationLink?: string;
}

export function useUpdateIntentionStatus(adminKey: string | null) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = async (
    intentionId: string,
    action: Action
  ): Promise<UpdateResult | null> => {
    if (!adminKey) {
      setError("Chave de admin não fornecida.");
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const adminApi = createAdminApi(adminKey);

      const response = await adminApi.patch(`/intentions/${intentionId}`, {
        action,
      });

      return {
        success: true,
        registrationLink: response.data.registrationLink,
      };
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Erro ao atualizar status.";
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateStatus, isLoading, error };
}
