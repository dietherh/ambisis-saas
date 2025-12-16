export const PERMISSIONS = {
  admin: {
    companies: ['create', 'update', 'delete', 'view'],
    users: ['create', 'update', 'delete', 'view'],
    licenses: ['create', 'update', 'delete', 'view'],
  },
  operator: {
    companies: ['view'], // sem dados sensíveis
    users: [],
    licenses: ['create', 'update', 'delete', 'view'],
  },
};