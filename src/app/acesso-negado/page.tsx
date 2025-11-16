import Link from "next/link";
import { LockSimpleIcon } from "../../components/icons";

export default function AccessDenied() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden">
      <div className="flex flex-col items-center justify-center text-center p-8">
        <div className="mb-6">
          <LockSimpleIcon
            size={96}
            className="text-red-500"
            weight="fill"
            aria-hidden="true"
          />
        </div>
        <div className="flex min-w-72 flex-col gap-3">
          <h1 className="text-slate-900 dark:text-slate-50 text-4xl font-black leading-tight tracking-[-0.033em]">
            Acesso Negado
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal">
            Você não tem permissão para acessar esta página.
          </p>
        </div>
        <div className="mt-8">
          <Link
            className="text-primary hover:underline text-sm font-medium leading-normal"
            href="/"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}
