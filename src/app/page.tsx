
'use client';

import React from 'react';
import { SparkleIcon } from "@/components/icons";
import { useSubmitIntention } from '@/hooks/useSubmitIntention';

export default function HomePage() {
  const { submitIntention, isLoading, isSuccess, error } = useSubmitIntention();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    await submitIntention(data as any);
  };

  return (
    <main className="min-h-screen bg-[#f6f6f8] px-4 py-10 font-sans dark:bg-[#101622] sm:py-16">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-5xl flex-col overflow-x-hidden rounded-2xl bg-white shadow-sm dark:bg-[#121a2b]">
        <header className="flex items-center justify-center border-b border-[#f0f2f4] px-6 py-4 dark:border-white/10">
          <div className="flex items-center gap-3 text-[#111318] dark:text-white">
            <SparkleIcon
              size={32}
              weight="fill"
              className="text-[#135bec]"
              aria-hidden="true"
            />
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
              Networking Group
            </h2>
          </div>
        </header>

        <section className="flex flex-1 justify-center px-6 py-10 sm:px-10 sm:py-16">
          <div className="flex w-full max-w-2xl flex-1 flex-col">
            <div className="mb-8 flex flex-col gap-3 text-center">
              <h1 className="text-3xl font-black leading-tight tracking-[-0.033em] text-[#111318] dark:text-white sm:text-4xl">
                Formulário de Intenção para Grupo de Networking
              </h1>
              <p className="text-base font-normal leading-normal text-[#616f89] dark:text-slate-400">
                Preencha os campos abaixo para expressar seu interesse em
                participar do nosso grupo.
              </p>
            </div>

            {isSuccess ? (
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow dark:border-slate-800 dark:bg-[#121a2b] sm:p-10">
                <p className="text-center text-lg font-semibold text-[#111318] dark:text-white">
                  Obrigado! Intenção enviada.
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow dark:border-slate-800 dark:bg-[#121a2b] sm:p-10">
                {error && (
                  <p className="mb-4 text-center text-red-500">{error}</p>
                )}
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  <div className="flex min-w-40 flex-1 flex-col">
                    <label
                      className="pb-2 text-base font-medium leading-normal text-[#111318] dark:text-slate-200"
                      htmlFor="nome"
                    >
                      Nome
                    </label>
                    <input
                      className="flex h-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-[#dbdfe6] bg-white p-[15px] text-base font-normal leading-normal text-[#111318] placeholder:text-[#616f89] focus:outline-none focus:ring-2 focus:ring-[#135bec]/50 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:placeholder:text-slate-500"
                      id="nome"
                      name="name"
                      placeholder="Digite seu nome completo"
                      type="text"
                      required
                    />
                  </div>

                  <div className="flex min-w-40 flex-1 flex-col">
                    <label
                      className="pb-2 text-base font-medium leading-normal text-[#111318] dark:text-slate-200"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="flex h-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-[#dbdfe6] bg-white p-[15px] text-base font-normal leading-normal text-[#111318] placeholder:text-[#616f89] focus:outline-none focus:ring-2 focus:ring-[#135bec]/50 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:placeholder:text-slate-500"
                      id="email"
                      name="email"
                      placeholder="exemplo@email.com"
                      type="email"
                      required
                    />
                  </div>

                  <div className="flex min-w-40 flex-1 flex-col">
                    <label
                      className="pb-2 text-base font-medium leading-normal text-[#111318] dark:text-slate-200"
                      htmlFor="empresa"
                    >
                      Empresa
                    </label>
                    <input
                      className="flex h-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-[#dbdfe6] bg-white p-[15px] text-base font-normal leading-normal text-[#111318] placeholder:text-[#616f89] focus:outline-none focus:ring-2 focus:ring-[#135bec]/50 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:placeholder:text-slate-500"
                      id="empresa"
                      name="company"
                      placeholder="Onde você trabalha?"
                      type="text"
                    />
                  </div>

                  <div className="flex min-w-40 flex-1 flex-col">
                    <label
                      className="pb-2 text-base font-medium leading-normal text-[#111318] dark:text-slate-200"
                      htmlFor="motivo"
                    >
                      Por que você quer participar?
                    </label>
                    <textarea
                      className="flex min-h-32 w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg border border-[#dbdfe6] bg-white p-[15px] text-base font-normal leading-normal text-[#111318] placeholder:text-[#616f89] focus:outline-none focus:ring-2 focus:ring-[#135bec]/50 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:placeholder:text-slate-500"
                      id="motivo"
                      name="reason"
                      placeholder="Conte-nos um pouco sobre seus objetivos e o que espera do grupo."
                    />
                  </div>

                  <button
                    className="mt-4 flex h-12 w-full items-center justify-center rounded-lg bg-[#135bec] px-6 text-base font-semibold leading-normal text-white transition-colors duration-200 hover:bg-[#135bec]/90 disabled:opacity-50"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Enviando..." : "Enviar Intenção"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
