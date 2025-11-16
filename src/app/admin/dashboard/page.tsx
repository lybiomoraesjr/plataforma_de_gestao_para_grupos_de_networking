import React from 'react'

export default function AdminDashboardPage() {
  return (
    <main>
      <h1>Dashboard de Performance</h1>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ border: '1px solid #ccc', padding: '16px' }}>
          <h2>Membros Ativos</h2>
          <p>42</p>
        </div>

        <div style={{ border: '1px solid #ccc', padding: '16px' }}>
          <h2>Indicações no Mês</h2>
          <p>15</p>
        </div>

        <div style={{ border: '1px solid #ccc', padding: '16px' }}>
          <h2>Obrigados no Mês</h2>
          <p>8</p>
        </div>
      </div>
    </main>
  )
}