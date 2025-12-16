import { cookies } from "next/headers";
import Link from "next/link";
import { can } from "../lib/permissions";
import { LicenseDTO } from "@ambisis/types";

export default async function LicensesPage() {
  const token = cookies().get("token")?.value;

  const licenses: LicenseDTO[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/licenses`, {
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
        <h1 className="text-2xl font-bold">Licenças</h1>

        {can.manageLicenses(user.role) && (
          <Link href="/licenses/new" className="bg-blue-600 text-white px-4 py-2 rounded">
            Nova Licença
          </Link>
        )}
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Empresa</th>
            <th className="p-3 text-left">Emitida em</th>
            <th className="p-3 text-left">Expira em</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {licenses.map((l: any) => (
            <tr key={l.id} className="border-b">
              <td className="p-3">{l.company.name}</td>
              <td className="p-3">{new Date(l.issuedAt).toLocaleDateString()}</td>
              <td className="p-3">{new Date(l.expiresAt).toLocaleDateString()}</td>

              <td className="p-3 text-center">
                {can.manageLicenses(user.role) ? (
                  <Link href={`/licenses/${l.id}`} className="text-blue-600 hover:underline">
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