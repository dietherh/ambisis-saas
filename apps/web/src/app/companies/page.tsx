import { cookies } from "next/headers";
import Link from "next/link";
import { can } from "../lib/permissions";
import { CompanyDTO } from "@ambisis/types";

export default async function CompaniesPage() {
  const token = cookies().get("token")?.value;

  const companies: CompanyDTO[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  }).then((r) => r.json());

  const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  }).then((r) => r.json());

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Empresas</h1>

        {can.manageCompanies(user.role) && (
          <Link href="/companies/new" className="bg-blue-600 text-white px-4 py-2 rounded">
            Nova Empresa
          </Link>
        )}
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Nome</th>
            {can.manageCompanies(user.role) && (
              <th className="p-3 text-left">Documento</th>
            )}
            <th className="p-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((c: any) => (
            <tr key={c.id} className="border-b">
              <td className="p-3">{c.name}</td>

              {can.manageCompanies(user.role) && (
                <td className="p-3">{c.document}</td>
              )}

              <td className="p-3 text-center">
                {can.manageCompanies(user.role) ? (
                  <Link href={`/companies/${c.id}`} className="text-blue-600 hover:underline">
                    Editar
                  </Link>
                ) : (
                  <span className="text-gray-400">Sem permissão</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}