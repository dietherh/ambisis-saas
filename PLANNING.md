# Planejamento - Ambisis SaaS

## 📌 Work Breakdown Structure (WBS)
1. **Setup monorepo**
   - Turborepo configurado
   - Pacotes compartilhados (tsconfig, eslint, prettier, types)
   - Docker Compose inicial

2. **Backend base**
   - NestJS bootstrap
   - Integração com Prisma
   - Modelagem e migrações (Organization, User, Company, License)

3. **Autenticação e RBAC**
   - JWT login
   - Guards para RBAC
   - Policies desacopladas para roles (ADMIN, OPERADOR)

4. **API de domínio**
   - Endpoints de Companies e Licenses
   - Validação com Zod
   - Tenant isolation em todas as queries

5. **Frontend**
   - Next.js App Router
   - Dashboard adaptado por role
   - UI com TailwindCSS
   - Data fetching tipado

6. **Qualidade e entrega**
   - Testes unitários básicos (RBAC, services)
   - Documentação final
   - Vídeo de tour pela arquitetura

---

## ⏱️ Estimativa vs. Realidade

### Estimativa inicial
- Monorepo + infra: 6h
- Backend base: 10h
- Auth + RBAC: 12h
- API domínio: 12h
- Frontend: 14h
- Testes + docs: 8h

**Total estimado:** ~62h (8 dias úteis)

### Realidade esperada
Como ainda não tenho experiência profissional em NestJS/Next.js, o tempo real pode ser maior (~70–80h).  
Principais riscos: curva de aprendizado em Next.js App Router e integração JWT + SSR.

---

## 📅 Simulação de prazo
Se fosse um projeto real iniciado na segunda-feira de manhã, eu prometeria a entrega do MVP em **10–12 dias úteis**.  

### Justificativa
- Multi-tenancy e RBAC exigem cuidado extra para evitar falhas de segurança.
- A curva de aprendizado em tecnologias novas aumenta o tempo real.
- O prazo considera testes mínimos e documentação clara para garantir qualidade.