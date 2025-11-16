const requests = [
  {
    nome: "Beatriz Costa",
    email: "beatriz.costa@example.com",
    empresa: "InnovateTech",
    motivo: "Expandir minha rede profissional.",
  },
  {
    nome: "Carlos Mendes",
    email: "carlos.mendes@example.com",
    empresa: "Solutions Co",
    motivo: "Buscar novas oportunidades de negócio.",
  },
  {
    nome: "Daniela Almeida",
    email: "daniela.almeida@example.com",
    empresa: "FutureWorks",
    motivo: "Conectar com líderes da indústria.",
  },
  {
    nome: "Eduardo Santos",
    email: "eduardo.santos@example.com",
    empresa: "DataDriven Inc.",
    motivo: "Compartilhar conhecimento e aprender.",
  },
];

export default function AdminIntencoesPage() {
  return (
    <section className="mx-auto w-full max-w-7xl">
      <header className="mb-8">
        <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-gray-900 dark:text-white">
          Admin: Gestão de Intenções
        </h1>
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
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {requests.map((request) => (
                  <tr key={request.email}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      {request.nome}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {request.email}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {request.empresa}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {request.motivo}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="rounded bg-[#198754] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#156c43]"
                        >
                          APROVAR
                        </button>
                        <button
                          type="button"
                          className="rounded bg-[#DC3545] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#b02a37]"
                        >
                          RECUSAR
                        </button>
                      </div>
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
