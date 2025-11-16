"use client";

import type { ComponentType } from "react";
import {
  Plus,
  DotsThreeOutline,
  UsersThree,
  ShareNetwork,
  Handshake,
  IconProps,
} from "phosphor-react";

const stats: Array<{
  label: string;
  value: string;
  icon: ComponentType<IconProps>;
}> = [
  { label: "Membros Ativos", value: "42", icon: UsersThree },
  { label: "Indicações no Mês", value: "15", icon: ShareNetwork },
  { label: "Obrigados no Mês", value: "8", icon: Handshake },
];

export default function AdminDashboardPage() {
  return (
    <section className="mx-auto w-full max-w-7xl">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white/0 p-4">
        <h1 className="text-3xl font-black tracking-[-0.033em] text-gray-900 sm:text-4xl dark:text-gray-100">
          Dashboard de Performance
        </h1>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-[#135bec] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#135bec]/90"
          >
            <Plus size={18} weight="bold" aria-hidden="true" />
            Adicionar Relatório
          </button>
          <button
            type="button"
            className="hidden items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-[#101622] dark:text-gray-100 dark:hover:bg-gray-800 sm:flex"
          >
            <DotsThreeOutline size={18} weight="bold" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex min-w-[180px] flex-1 flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/50"
          >
            <div className="flex items-center justify-between">
              <p className="text-base font-medium text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
              <stat.icon
                size={28}
                weight="duotone"
                className="text-gray-500 dark:text-gray-400"
                aria-hidden="true"
              />
            </div>
            <p className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}