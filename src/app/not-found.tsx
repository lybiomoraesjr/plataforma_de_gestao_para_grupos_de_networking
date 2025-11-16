import Link from "next/link";
import { WarningCircleIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <main className="flex h-screen w-full flex-col bg-[#f6f6f8] font-sans text-[#111318] dark:bg-[#101622] dark:text-white">
      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="flex max-w-[960px] flex-1 flex-col items-center text-center">
          <WarningCircleIcon
            size={96}
            weight="duotone"
            className="mb-6 text-[#135bec]"
            aria-hidden="true"
          />
          <h1 className="px-4 pb-3 text-[32px] font-bold leading-tight">
            Página Não Encontrada
          </h1>
          <p className="px-4 pb-4 text-base font-normal leading-normal text-[#616f89] dark:text-gray-300">
            A página que você está procurando não existe ou não pôde ser
            encontrada.
          </p>
          <Link
            href="/"
            className="px-4 text-sm font-semibold text-[#135bec] underline transition-colors hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#135bec]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f6f8] dark:focus-visible:ring-offset-[#101622]"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </main>
  );
}

