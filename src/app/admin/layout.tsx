import React, { ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EnvelopeSimpleOpenIcon, GaugeIcon } from "@/components/icons";


const navItems: Array<{
  href: string;
  label: string;
  icon: ComponentType<any>;
}> = [
  { href: "/admin/dashboard", label: "Dashboard", icon: GaugeIcon },
  { href: "/admin/intencoes", label: "Intenções", icon: EnvelopeSimpleOpenIcon },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f6f6f8] font-sans text-gray-900 dark:bg-[#101622] dark:text-gray-100">
      <div className="flex min-h-screen">
        <aside className="flex w-64 shrink-0 flex-col border-r border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-[#151c2c]">
          <div className="mb-8 flex items-center gap-3">
            <div
              className="size-10 rounded-full bg-cover bg-center bg-no-repeat"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCg3uBXGDmiLWlq-EvuwTztdFIV4tDsgawpYh-x4yTcgn2-tgtPsP0fa-GjGAPuPxfmE97AnosOEOLPXEkF4giVKqjg1UQKJwNWfblq7-5s31nwwYxmkz4mpwx1BccyghxGBz96TVim3K5TywbffIJMG3Q-vb8XBWsKEBLK9vjS-dKgQW5p2AxJxfVBxLLLiDmSUttASifpxAeBr9Gfp7o7vIStsBw5OTHwe4p254BlQ5jkBGkB-QXM-bwnjFUc9d7R0of2F6MThjyD')",
              }}
            />
            <div className="flex flex-col">
              <h1 className="text-base font-medium leading-normal text-gray-900 dark:text-white">
                Admin Panel
              </h1>
              <p className="text-sm font-normal leading-normal text-gray-500 dark:text-gray-400">
                Networking Group
              </p>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin/dashboard" &&
                  pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal transition-colors",
                    isActive
                      ? "bg-[#135bec]/20 text-[#135bec] dark:bg-[#135bec]/30 dark:text-[#135bec]"
                      : "text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800/50",
                  ].join(" ")}
                >
                  <item.icon
                    size={22}
                    weight={isActive ? "fill" : "regular"}
                    className={
                      isActive
                        ? "text-[#135bec] dark:text-[#135bec]"
                        : "text-gray-800 dark:text-gray-200"
                    }
                    aria-hidden="true"
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex flex-1 flex-col p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
