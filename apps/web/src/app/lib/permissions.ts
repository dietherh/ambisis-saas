export const can = {
  viewCompanies: (role: string) => role === "admin",
  manageCompanies: (role: string) => role === "admin",
  manageUsers: (role: string) => role === "admin",
  manageLicenses: (role: string) => role === "admin" || role === "operator",
};