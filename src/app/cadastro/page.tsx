'use client';

import React, { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useValidateToken } from '@/hooks/useValidateToken';
import { EyeIcon } from "@/components/icons";

export default function CadastroPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const { isValid, email, isLoading, error } = useValidateToken(token);

  useEffect(() => {
    if (!isLoading) {
      if (!isValid || error) {
        router.push('/acesso-negado');
      }
    }
  }, [isLoading, isValid, error, router]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-[#f6f6f8] px-4 py-10 font-sans dark:bg-[#101622] sm:py-16">
        <p className="text-center text-lg">Verificando convite...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#f6f6f8] px-4 py-10 font-sans dark:bg-[#101622] sm:py-16">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-sm dark:bg-[#121a2b]/80 sm:p-8 md:p-10">
        <div className="flex flex-col gap-6">
          <header className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-black leading-tight tracking-tight text-gray-900 dark:text-white">
              Complete seu Cadastro
            </h1>
            <p className="text-base font-normal text-gray-600 dark:text-gray-300">
              Seu convite foi validado! Por favor, complete suas informações.
            </p>
          </header>

          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col">
              <label
                className="pb-2 text-base font-medium leading-normal text-gray-800 dark:text-gray-200"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="flex h-14 w-full flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-gray-100 p-4 text-base font-normal leading-normal text-gray-500 placeholder:text-gray-500 focus:border-[#135bec] focus:ring-2 focus:ring-[#135bec]/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                id="email"
                type="email"
                value={email || ''}
                disabled
                readOnly
              />
            </div>

            <div className="flex flex-col">
              <label
                className="pb-2 text-base font-medium leading-normal text-gray-800 dark:text-gray-200"
                htmlFor="name"
              >
                Nome Completo
              </label>
              <input
                className="flex h-14 w-full flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-white p-4 text-base font-normal leading-normal text-gray-800 placeholder:text-gray-500 focus:border-[#135bec] focus:ring-2 focus:ring-[#135bec]/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
                id="name"
                name="name"
                placeholder="Digite seu nome completo"
                type="text"
              />
            </div>

            <div className="flex flex-col">
              <label
                className="pb-2 text-base font-medium leading-normal text-gray-800 dark:text-gray-200"
                htmlFor="company"
              >
                Empresa
              </label>
              <input
                className="flex h-14 w-full flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-white p-4 text-base font-normal leading-normal text-gray-800 placeholder:text-gray-500 focus:border-[#135bec] focus:ring-2 focus:ring-[#135bec]/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
                id="company"
                name="company"
                placeholder="Onde você trabalha?"
                type="text"
              />
            </div>

            <div className="flex flex-col">
              <label
                className="pb-2 text-base font-medium leading-normal text-gray-800 dark:text-gray-200"
                htmlFor="password"
              >
                Crie uma Senha
              </label>
              <div className="relative flex w-full items-stretch">
                <input
                  className="flex h-14 w-full flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-white p-4 pr-12 text-base font-normal leading-normal text-gray-800 placeholder:text-gray-500 focus:border-[#135bec] focus:ring-2 focus:ring-[#135bec]/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
                  id="password"
                  name="password"
                  type="password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <EyeIcon size={20} weight="regular" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="flex h-14 w-full items-center justify-center rounded-lg bg-[#135bec] px-6 text-base font-semibold text-white transition-colors hover:bg-[#135bec]/90 focus:outline-none focus:ring-2 focus:ring-[#135bec] focus:ring-offset-2 dark:focus:ring-offset-[#101622]"
              >
                Finalizar Cadastro e Acessar
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}