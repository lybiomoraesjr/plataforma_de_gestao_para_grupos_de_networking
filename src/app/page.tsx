export default function HomePage() {
  return (
    <main>
      <div>
        <h1>Formulário de Intenção para Grupo de Networking</h1>
        <p>
          Preencha os campos abaixo para expressar seu interesse em participar
          do nosso grupo.
        </p>
      </div>

      <div>
        <form>
          <div>
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              placeholder="Digite seu nome completo"
              type="text"
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input id="email" placeholder="exemplo@email.com" type="email" />
          </div>

          <div>
            <label htmlFor="empresa">Empresa</label>
            <input id="empresa" placeholder="Onde você trabalha?" type="text" />
          </div>

          <div>
            <label htmlFor="motivo">Por que você quer participar?</label>
            <textarea
              id="motivo"
              placeholder="Conte-nos um pouco sobre seus objetivos e o que espera do grupo."
            ></textarea>
          </div>

          <button type="submit">Enviar Intenção</button>
        </form>
      </div>
    </main>
  );
}
