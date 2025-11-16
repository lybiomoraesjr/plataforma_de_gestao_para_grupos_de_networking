export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f6f6f8] px-4 py-10 font-sans dark:bg-[#101622] sm:py-16">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-5xl flex-col overflow-x-hidden rounded-2xl bg-white shadow-sm dark:bg-[#121a2b]">
        <header className="flex items-center justify-center border-b border-[#f0f2f4] px-6 py-4 dark:border-white/10">
          <div className="flex items-center gap-3 text-[#111318] dark:text-white">
            <div className="size-6 text-[#135bec]">
              <svg
                fill="currentColor"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_6_543)">
                  <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"></path>
                  <path
                    clipRule="evenodd"
                    d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z"
                    fill="currentColor"
                    fillRule="evenodd"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_6_543">
                    <rect fill="white" height="48" width="48"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
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

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow dark:border-slate-800 dark:bg-[#121a2b] sm:p-10">
              <form className="flex flex-col gap-6">
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
                    placeholder="Digite seu nome completo"
                    type="text"
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
                    placeholder="exemplo@email.com"
                    type="email"
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
                    placeholder="Conte-nos um pouco sobre seus objetivos e o que espera do grupo."
                  />
                </div>

                <button
                  className="mt-4 flex h-12 w-full items-center justify-center rounded-lg bg-[#135bec] px-6 text-base font-semibold leading-normal text-white transition-colors duration-200 hover:bg-[#135bec]/90"
                  type="submit"
                >
                  Enviar Intenção
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
