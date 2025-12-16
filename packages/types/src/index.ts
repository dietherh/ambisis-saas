// packages/types/index.ts
export * from "./schemas";

export type OrganizationDTO = {
  id: string;
  name: string;
  createdAt: Date;
};

export type UserDTO = {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'OPERADOR';
  organizationId: string;
  createdAt: Date;
};

export type CompanyDTO = {
  id: string;
  name: string;
  organizationId: string;
  createdAt: Date;
};

export type LicenseDTO = {
  id: string;
  number: string;
  status: string;
  issueDate: Date;
  expiryDate: Date;
  companyId: string;
  organizationId: string;
  createdAt: Date;
};