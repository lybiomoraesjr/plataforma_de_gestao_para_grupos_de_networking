export default function CadastroPage() {
  return (
    <main>
      <h1>Complete seu Cadastro</h1>
      <p>Seu convite foi validado! Por favor, complete suas informações.</p>

      <form>
        <div>
          <label htmlFor="fullName">Nome Completo</label>
          <input id="fullName" name="fullName" type="text" />
        </div>

        <div>
          <label htmlFor="phone">Telefone / WhatsApp</label>
          <input id="phone" name="phone" type="tel" />
        </div>

        <div>
          <label htmlFor="password">Crie uma Senha</label>
          <input id="password" name="password" type="password" />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirme sua Senha</label>
          <input id="confirmPassword" name="confirmPassword" type="password" />
        </div>

        <button type="submit">Finalizar Cadastro</button>
      </form>
    </main>
  )
}