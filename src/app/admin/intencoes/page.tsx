"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from "next/navigation";
import { useGetIntentions } from "@/hooks/useGetIntentions";
import { useUpdateIntentionStatus } from '@/hooks/useUpdateIntentionStatus';

interface Intention {
  id: string;
  name: string;
  email: string;
  company?: string;
  reason?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  created_at: string;
}

export default function AdminIntencoesPage() {
  const searchParams = useSearchParams();
  const adminKey = searchParams.get("key");
  const { intentions: fetchedIntentions, isLoading, error } = useGetIntentions(adminKey);
  const { updateStatus, isLoading: isUpdating, error: updateError } = useUpdateIntentionStatus(adminKey);
  const [intentions, setIntentions] = useState<Intention[]>([]);

  useEffect(() => {
    setIntentions(fetchedIntentions);
  }, [fetchedIntentions]);

  const handleApprove = async (intentionId: string) => {
    const result = await updateStatus(intentionId, 'APPROVE');
    if (result?.success) {
      setIntentions(currentIntentions =>
        currentIntentions.map(intention =>
          intention.id === intentionId
            ? { ...intention, status: 'APPROVED' as const }
            : intention
        )
      );
    }
  };

  const handleReject = async (intentionId: string) => {
    const result = await updateStatus(intentionId, 'REJECT');
    if (result?.success) {
      setIntentions(currentIntentions =>
        currentIntentions.map(intention =>
          intention.id === intentionId
            ? { ...intention, status: 'REJECTED' as const }
            : intention
        )
      );
    }
  };

  const sortedIntentions = useMemo(() => {
    return [...intentions].sort((a, b) => {
      if (a.status === 'PENDING' && b.status !== 'PENDING') return -1;
      if (a.status !== 'PENDING' && b.status === 'PENDING') return 1;
      return 0;
    });
  }, [intentions]);

  if (isLoading) {
    return (
      <section className="mx-auto w-full max-w-7xl">
        <p className="text-center text-lg">Carregando intenções...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto w-full max-w-7xl">
        <p className="text-center text-lg text-red-500">{error}</p>
      </section>
    );
  }

  if (intentions.length === 0) {
    return (
      <section className="mx-auto w-full max-w-7xl">
        <p className="text-center text-lg">Nenhuma intenção encontrada.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl">
      <header className="mb-8">
        <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-gray-900 dark:text-white">
          Admin: Gestão de Intenções
        </h1>
        {updateError && (
          <p className="text-red-500 mt-4">{updateError}</p>
        )}
      </header>

      <div className="w-full @container">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-[#151c2c]">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Nome
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Empresa
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Motivo
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {sortedIntentions.map((intention) => (
                  <tr key={intention.id}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      {intention.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {intention.email}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {intention.company || "-"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {intention.reason || "-"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {intention.status}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      {intention.status === "PENDING" && (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleApprove(intention.id)}
                            disabled={isUpdating}
                            className="rounded bg-[#198754] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#156c43] disabled:opacity-50"
                          >
                            APROVAR
                          </button>
                          <button
                            type="button"
                            onClick={() => handleReject(intention.id)}
                            disabled={isUpdating}
                            className="rounded bg-[#DC3545] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#b02a37] disabled:opacity-50"
                          >
                            RECUSAR
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
