import { z } from "zod";

export const CreateCompanySchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  document: z.string().min(8, "Documento inválido"),
});

export const UpdateCompanySchema = CreateCompanySchema.partial();

export const CreateLicenseSchema = z.object({
  companyId: z.string().uuid("ID da empresa inválido"),
  issuedAt: z.string(),
  expiresAt: z.string(),
});

export const UpdateLicenseSchema = CreateLicenseSchema.partial();

export const CreateUserSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  role: z.enum(["admin", "operator"]),
});

export const UpdateUserSchema = CreateUserSchema.partial();