export class User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'OPERADOR';
  organizationId: string;
  createdAt: Date;
}