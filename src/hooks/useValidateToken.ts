"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

interface ValidationResult {
  valid: boolean;
  email?: string;
}

export function useValidateToken(token: string | null) {
  const [isValid, setIsValid] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("Nenhum token fornecido.");
      setIsLoading(false);
      return;
    }

    const validate = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get<ValidationResult>(
          `/intentions/validate?token=${token}`
        );

        if (response.data.valid) {
          setIsValid(true);
          setEmail(response.data.email || null);
        } else {
          setError("Token inválido ou expirado.");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Token inválido ou expirado.");
      } finally {
        setIsLoading(false);
      }
    };

    validate();
  }, [token]);

  return { isValid, email, isLoading, error };
}
