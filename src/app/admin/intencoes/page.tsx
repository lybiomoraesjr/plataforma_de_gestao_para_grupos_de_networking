export default function AdminDashboardPage() {
  return (
    <section>
      <header>
        <h1>Dashboard de Performance</h1>
      </header>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            border: "1px solid #ccc",
            padding: "16px",
            minWidth: "200px",
          }}
        >
          <div>
            <p>Membros Ativos</p>
          </div>
          <p style={{ fontSize: "2.5rem", fontWeight: "bold" }}>42</p>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "16px",
            minWidth: "200px",
          }}
        >
          <div>
            <p>Indicações no Mês</p>
          </div>
          <p style={{ fontSize: "2.5rem", fontWeight: "bold" }}>15</p>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "16px",
            minWidth: "200px",
          }}
        >
          <div>
            <p>Obrigados no Mês</p>
          </div>
          <p style={{ fontSize: "2.5rem", fontWeight: "bold" }}>8</p>
        </div>
      </div>
    </section>
  );
}
