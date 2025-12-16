Ambisis SaaS Multi-tenant
Ambisis – Plataforma SaaS Multi‑tenant
📌 Contexto
A Ambisis está expandindo sua plataforma para um modelo SaaS multi‑tenant.
Este repositório contém a arquitetura inicial e o planejamento para a construção de uma mini‑plataforma de Gestão de Conformidade Ambiental, com foco em:
- Escalabilidade
- Segurança
- Multi‑tenancy real
- Manutenibilidade
- Arquitetura modular
O objetivo é demonstrar como estruturar uma aplicação SaaS moderna, preparada para crescer e receber novos módulos.

🚀 Stack escolhida
Monorepo
- Turborepo para orquestrar apps e pacotes compartilhados.
Backend
- NestJS (Node.js)
- Prisma ORM
- MySQL
- JWT Authentication
- RBAC desacoplado
Frontend
- Next.js (App Router)
- Server Components + Client Components
- TailwindCSS
- React Hook Form + Zod
Infra
- Docker / Docker Compose
- Hot reload para API e Web
- Banco MySQL containerizado
Linguagem
- TypeScript full‑stack

🎯 Justificativa técnica
🧱 Por que NestJS no backend?
NestJS foi escolhido por ser o framework mais adequado para uma aplicação SaaS multi‑tenant:
- Arquitetura modular e escalável
- Injeção de dependência nativa
- Guards, Interceptors e Pipes ideais para RBAC e multi‑tenancy
- Suporte nativo a validação, middlewares e filtros
- Integração simples com Prisma
- Testabilidade com Jest integrada
- Facilita organização em domínios (Users, Companies, Licenses, Auth, Audit, Notifications)
Conclusão: NestJS é o framework mais alinhado com uma arquitetura corporativa e escalável.

🧬 Por que Prisma?
- Tipagem forte gerada automaticamente
- Migrações seguras e rápidas
- DX excelente
- Integração natural com NestJS
- Facilita multi‑tenancy com filtros por organizationId
- Permite validações e relacionamentos complexos com clareza

🖥️ Por que Next.js App Router?
- Suporte nativo a Server Components (ideal para dashboards e SSR)
- Melhor performance e SEO
- Separação clara entre SSR e CSR
- Rotas mais organizadas
- Integração perfeita com TypeScript
- Ideal para aplicações SaaS com dashboards dinâmicos

🧩 Por que Turborepo?
- Permite compartilhar código entre backend e frontend
- Facilita criação de pacotes internos (types, eslint-config, tsconfig)
- Build incremental
- Cache inteligente
- Organização profissional de monorepo

🏗️ Arquitetura do projeto
ambisis/
├─ apps/
│   ├─ api/                 # Backend NestJS
│   └─ web/                 # Frontend Next.js
│
├─ packages/
│   ├─ tsconfig/            # Configurações TypeScript compartilhadas
│   ├─ eslint-config/       # Regras de lint compartilhadas
│   ├─ prettier-config/     # Configuração de formatação
│   └─ types/               # DTOs, schemas Zod e interfaces compartilhadas
│
├─ docker-compose.yml       # Orquestração de MySQL, API e Web
├─ turbo.json               # Configuração do Turborepo
├─ README.md
└─ PLANNING.md              # Planejamento, estimativas e WBS



📊 Modelagem de dados
Entidades principais
- Organization → possui muitos Users e Companies
- User → pertence a uma Organization
- Company → pertence a uma Organization, possui muitas Licenses
- License → pertence a uma Company e a uma Organization
Multi‑tenancy
Todas as entidades possuem organizationId.
O backend valida em todas as queries que o usuário só acessa dados da sua própria organização, evitando IDOR.

🔒 Segurança
Isolamento de tenant
- Todas as queries usam organizationId no filtro
- Nenhuma rota permite acesso cruzado entre organizações
RBAC desacoplado
- Implementado via Guards + Decorators + Policies
- ADMIN
- CRUD completo de Companies, Users e Licenses
- OPERADOR
- CRUD de Licenses
- Leitura limitada de Companies (somente nome)
Auditoria
- Logs automáticos via Interceptor
- Registro de ações (create/update/delete)
Notificações
- Job diário para licenças expirando
- Página de notificações no frontend

🧪 Validações (Zod + DTOs compartilhados)
- Schemas Zod em packages/types
- Backend valida entrada via ZodValidationPipe
- Frontend valida formulários com React Hook Form + Zod
- Tipos compartilhados garantem consistência total

🐳 Execução local (Docker)
1. Criar arquivo .env na raiz
DATABASE_URL="mysql://root:root@db:3306/ambisis"
JWT_SECRET="sua_chave_secreta"
NEXT_PUBLIC_API_URL="http://localhost:3001"


2. Subir tudo com Docker
docker compose up --build


Isso irá subir:
- MySQL
- API NestJS
- Frontend Next.js
3. Rodar migrações
docker compose exec api npx prisma migrate deploy



🧰 Execução sem Docker (modo dev)
Backend
cd apps/api
npm install
npm run start:dev


Frontend
cd apps/web
npm install
npm run dev



🧪 Testes (opcional)
cd apps/api
npm run test

