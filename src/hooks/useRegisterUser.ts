"use client";

import { useState } from "react";
import { api } from "@/lib/api";

interface RegisterFormData {
  token: string;
  name: string;
  password: string;
  company?: string;
}

export function useRegisterUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const registerUser = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      await api.post("/users/register", data);
      setIsSuccess(true);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Erro ao registrar. Tente novamente.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { registerUser, isLoading, isSuccess, error };
}
