export class UpdateUserDto {
  email: string;
  name: string;
  role: 'ADMIN' | 'OPERADOR';
  organizationId: string;
  password: string;
}