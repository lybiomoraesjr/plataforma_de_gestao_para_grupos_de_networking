"use client";

import { useState, useEffect } from "react";
import { createAdminApi } from "@/lib/api";

interface Intention {
  id: string;
  name: string;
  email: string;
  company?: string;
  reason?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  created_at: string;
}

export function useGetIntentions(adminKey: string | null) {
  const [data, setData] = useState<Intention[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!adminKey) {
      setIsLoading(false);
      return;
    }

    const fetchIntentions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const adminApi = createAdminApi(adminKey);

        const response = await adminApi.get<Intention[]>("/intentions");

        setData(response.data);
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Erro ao buscar intenções.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIntentions();
  }, [adminKey]);

  return { intentions: data, isLoading, error };
}
