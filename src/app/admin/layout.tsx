import React from "react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex" }}>
      <aside
        style={{
          width: "240px",
          borderRight: "1px solid #ccc",
          padding: "16px",
        }}
      >
        <div>
          <h1>Admin Panel</h1>
          <p>Networking Group</p>
        </div>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <Link href="/admin/dashboard">Dashboard</Link>
          <Link href="/admin/intencoes">Intenções</Link>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: "20px" }}>{children}</main>
    </div>
  );
}
