Com certeza. Você já tem todas as peças-chave.

Aqui está um esqueleto robusto para o seu `ARQUITETURA.md`, já preenchido com tudo o que definimos (tecnologias, banco, endpoints) e estruturado para atender exatamente aos 4 entregáveis da Tarefa 1.

O diagrama da arquitetura (item 1) eu criei em Mermaid, que é um formato de texto que o GitHub/GitLab renderiza automaticamente.

[cite\_start]Você pode copiar e colar todo o conteúdo abaixo diretamente em um novo arquivo `ARQUITETURA.md` no seu repositório[cite: 45].

-----

````markdown
# Documento de Arquitetura: Plataforma de Gestão de Networking

[cite_start]Este documento detalha a visão de arquitetura para a plataforma de gestão de grupos de networking, conforme solicitado no teste técnico[cite: 3, 5].

## 1. Visão Geral e Tecnologias

[cite_start]O objetivo é criar um sistema centralizado para substituir controles manuais [cite: 4][cite_start], cobrindo desde a admissão de membros até o controle financeiro e de performance[cite: 8].

A stack técnica escolhida para este projeto é:

* [cite_start]**Frontend:** Next.js, React, Tailwind CSS, Phosphor Icons [cite: 24]
* [cite_start]**Backend:** Next.js API Routes (Node.js) [cite: 24]
* [cite_start]**Banco de Dados:** PostgreSQL [cite: 24]
* **ORM:** Sequelize
* [cite_start]**Testes:** Jest, React Testing Library [cite: 25]

## 2. Diagrama da Arquitetura

[cite_start]Este diagrama [cite: 16] ilustra os componentes principais da solução e seu fluxo de comunicação.

```mermaid
graph TD
    subgraph "Usuário"
        U(Membro / Admin)
    end

    subgraph "Frontend (Cliente)"
        APP[Next.js / React]
    end

    subgraph "Backend (Servidor)"
        API[Next.js API Routes]
        ORM[Sequelize]
    end

    subgraph "Banco de Dados"
        DB[(PostgreSQL)]
    end

    U --> APP
    APP -->|Requisições HTTP (fetch/axios)| API
    API -->|Consultas| ORM
    ORM -->|Conexão| DB
````

## 3\. Modelo de Dados (PostgreSQL)

[cite\_start]O modelo de dados [cite: 17] [cite\_start]foi projetado para suportar todas as funcionalidades do sistema[cite: 8].

### 3.1. Justificativa da Escolha (PostgreSQL)

[cite\_start]A escolha do **PostgreSQL** (um banco de dados SQL) foi feita pelos seguintes motivos[cite: 18]:

1.  **Natureza Relacional:** O desafio é inerentemente relacional (membros, indicações, pagamentos, reuniões). O Postgres gerencia chaves estrangeiras e relacionamentos complexos de forma robusta.
2.  **Integridade dos Dados:** O uso de tipos `ENUM` e `UUIDs`, além de constraints `FOREIGN KEY`, garante que os dados permaneçam limpos e consistentes.
3.  [cite\_start]**Funcionalidades Avançadas:** O Postgres é excelente para consultas complexas, o que será vital para os Dashboards de Performance e Relatórios[cite: 14, 15].
4.  **Escalabilidade:** É uma solução comprovada em produção que pode crescer junto com a plataforma.

### 3.2. Script SQL (Schema Completo)

Abaixo está o script SQL completo para a criação de todos os tipos e tabelas:

```sql
-- Habilita a geração de UUIDs (se ainda não estiver habilitada)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---
-- 1. Criação dos Tipos Personalizados (ENUMs)
-- ---
CREATE TYPE intention_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE referral_status AS ENUM ('SENT', 'IN_PROGRESS', 'CLOSED_WON', 'CLOSED_LOST');
CREATE TYPE payment_status AS ENUM ('PENDING', 'PAID', 'OVERDUE');
CREATE TYPE user_role AS ENUM ('MEMBER', 'ADMIN');
CREATE TYPE user_status AS ENUM ('ACTIVE', 'INACTIVE');

-- ---
-- 2. Tabela `users` (Membros e Admins)
-- ---
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    role user_role NOT NULL DEFAULT 'MEMBER',
    status user_status NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ---
-- 3. Tabela `intentions` (Intenções de Participação)
-- ---
CREATE TABLE intentions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    reason TEXT,
    status intention_status NOT NULL DEFAULT 'PENDING',
    registration_token VARCHAR(255) UNIQUE,
    token_expires_at TIMESTAMP WITH TIME ZONE,
    processed_by_admin_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ---
-- 4. Tabela `referrals` (Indicações de Negócios)
-- ---
CREATE TABLE referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referrer_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    referred_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    contact_name VARCHAR(255) NOT NULL,
    contact_company VARCHAR(255),
    description TEXT NOT NULL,
    status referral_status NOT NULL DEFAULT 'SENT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ---
-- 5. Tabela `meetings` (Reuniões do Grupo)
-- ---
CREATE TABLE meetings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    meeting_date TIMESTAMP WITH TIME ZONE NOT NULL,
    topic VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ---
-- 6. Tabela `meeting_checkins` (Presença nas Reuniões)
-- ---
CREATE TABLE meeting_checkins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    meeting_id UUID NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
    checkin_time TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(user_id, meeting_id) -- Garante que um usuário só possa fazer check-in uma vez por reunião
);

-- ---
-- 7. Tabela `payments` (Mensalidades)
-- ---
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    reference_period DATE NOT NULL,
    due_date DATE NOT NULL,
    status payment_status NOT NULL DEFAULT 'PENDING',
    payment_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ---
-- 8. Tabela `announcements` (Avisos e Comunicados)
-- ---
CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_admin_id UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ---
-- 9. Tabela `thanks_records` ("Obrigados" por Negócios Fechados)
-- ---
CREATE TABLE thanks_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    giver_user_id UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
    receiver_user_id UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
    referral_id UUID REFERENCES referrals(id) ON DELETE SET NULL,
    description TEXT,
    business_value DECIMAL(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ---
-- 10. Tabela `one_on_one_meetings` (Reuniões 1 a 1)
-- ---
CREATE TABLE one_on_one_meetings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member1_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    member2_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    meeting_date DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## 4\. Definição da API (REST)

[cite\_start]A especificação dos principais endpoints da API [cite: 20] [cite\_start]que suportarão o fluxo de admissão obrigatório[cite: 21].

### [cite\_start]Fluxo de Admissão de Membros [cite: 26, 27, 28, 29]

1.  **`POST /api/intentions`**

      * [cite\_start]**Descrição:** Submete um novo formulário de intenção[cite: 26].
      * **Request Body:** `{ "name": "...", "email": "...", "company": "...", "reason": "..." }`
      * **Response (201):** `{ "success": true, "intentionId": "..." }`

2.  **`GET /api/admin/intentions`**

      * [cite\_start]**Descrição:** Lista todas as intenções para a área do admin[cite: 27].
      * **Response (200):** `[ { "id": "...", "name": "...", "status": "PENDING", ... } ]`

3.  **`PATCH /api/admin/intentions/[id]`**

      * [cite\_start]**Descrição:** Aprova ou recusa uma intenção[cite: 28]. [cite\_start]Na aprovação, gera o token[cite: 29].
      * **Request Body:** `{ "action": "APPROVE" | "REJECT" }`
      * **Response (200):** `{ "success": true, "status": "APPROVED", "registrationLink": "..." }`
      * [cite\_start]*Nota: O `registrationLink` será logado no console para simular o envio[cite: 30].*

4.  **`GET /api/intentions/validate?token=...`**

      * [cite\_start]**Descrição:** Verifica se um token de cadastro é válido[cite: 29].
      * **Response (200):** `{ "valid": true, "email": "..." }`
      * **Response (404):** `{ "valid": false, "error": "Token inválido ou expirado" }`

5.  **`POST /api/users/register`**

      * [cite\_start]**Descrição:** Cria o novo usuário (membro) após o preenchimento do cadastro completo[cite: 10].
      * **Request Body:** `{ "token": "...", "name": "...", "email": "...", "company": "...", "password": "..." }`
      * **Response (201):** `{ "success": true, "userId": "..." }`

### Módulo Opcional (Exemplos)

  * [cite\_start]**`POST /api/referrals`** (Para Opção A: Sistema de Indicações [cite: 32])
  * [cite\_start]**`GET /api/dashboard`** (Para Opção B: Dashboard de Performance [cite: 34])

## 5\. Estrutura de Componentes (Frontend)

[cite\_start]A estrutura de componentes do React/Next.js [cite: 19] será organizada com foco na reutilização e separação de responsabilidades.

*(Nota: Esta seção será detalhada durante a implementação prática.)*

  * **`components/ui/`**: Componentes de UI puros e reutilizáveis (ex: `Button.tsx`, `Input.tsx`, `Card.tsx`).
  * **`components/features/`**: Componentes compostos que lidam com uma funcionalidade específica (ex: `IntentionForm.tsx`, `AdminIntentionsTable.tsx`).
  * **`lib/`**: Funções auxiliares, hooks customizados (ex: `useApi.ts`).
  * **`app/`**: (Ou `pages/`) Estrutura de rotas do Next.js.
      * `app/page.tsx` (Formulário de Intenção)
      * `app/admin/intentions/page.tsx` (Dashboard do Admin)
      * `app/cadastro-completo/page.tsx` (Formulário de Cadastro Completo)

<!-- end list -->

```

---

[cite_start]Este arquivo `ARQUITETURA.md` cobre **todos os 4 entregáveis** da Tarefa 1[cite: 16, 17, 19, 20].

Agora você pode focar em configurar o Sequelize para se conectar ao Postgres e começar a construir o primeiro endpoint (`POST /api/intentions`). Posso ajudar com a configuração do Sequelize, se quiser.
```