# Ambisis - Plataforma SaaS Multi-tenant

## 📌 Contexto
A Ambisis está expandindo sua plataforma para um modelo SaaS multi-tenant.  
Este repositório contém a arquitetura inicial e o planejamento para a construção de uma mini-plataforma de Gestão de Conformidade Ambiental.

O objetivo é demonstrar como estruturar uma aplicação pensada para longevidade, manutenibilidade e escalabilidade.

---

## 🚀 Stack escolhida
- **Monorepo:** Turborepo
- **Backend:** NestJS (Node.js)
- **Frontend:** Next.js (App Router)
- **Database:** MySQL
- **ORM:** Prisma
- **Infra:** Docker / Docker Compose
- **Linguagem:** TypeScript (backend e frontend)

---

## 🎯 Justificativa técnica

### Por que NestJS?
- Arquitetura modular e escalável.
- Injeção de dependência nativa.
- Guards e interceptors que facilitam RBAC desacoplado.
- Integração simples com Prisma.
- Testabilidade com Jest integrada.

### Por que Prisma?
- Tipagem forte e geração automática de tipos.
- Migrações rápidas e seguras.
- Integração simples com NestJS.
- Facilita multi-tenancy com filtros por `organizationId`.

### Por que Next.js App Router?
- Suporte a SSR/CSR e Server Components.
- Flexibilidade para dashboards multi-role.
- Melhor experiência de desenvolvimento com TypeScript.

---

## 🏗️ Arquitetura planejada
ambisis/
├─ apps/
    │  
    ├─ api/                # Backend NestJS │  
    └─ web/                # Frontend Next.js 
├─ packages/ 
    │  
    ├─ tsconfig/           # Configurações TypeScript compartilhadas 
    │  
    ├─ eslint-config/      # Regras de lint 
    │  
    ├─ prettier-config/    # Configuração de formatação 
    │  
    └─ types/              # DTOs e interfaces compartilhadas 
├─ docker-compose.yml     # Orquestração de MySQL, API e Web 
├─ turbo.json             # Configuração do Turborepo 
├─ README.md 
└─ PLANNING.m

---

## 📊 Modelagem de dados

### Entidades principais
- **Organization** → possui muitos Users e Companies.
- **User** → pertence a uma Organization.
- **Company** → pertence a uma Organization, possui muitas Licenses.
- **License** → pertence a uma Company e a uma Organization.

### Relacionamentos
- Uma Organization tem muitos Users e muitas Companies.
- Uma Company tem muitas Licenses.

### Multi-tenancy
Todas as entidades possuem `organizationId`.  
O backend sempre valida que o usuário só acessa dados da sua própria organização, evitando vazamento de dados (IDOR).

---

## 🔒 Segurança
- Escopo por `organizationId` em todas as queries.
- RBAC desacoplado via Guards e Policies.
- ADMIN: acesso total dentro da organização.
- OPERADOR: acesso restrito (CRUD de Licenses, leitura limitada de Companies).

---

## 🐳 Execução local (Docker)
```bash
docker compose up --build