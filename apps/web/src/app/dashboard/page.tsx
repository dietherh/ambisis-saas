import { cookies } from "next/headers";
import { DashboardAdmin } from "./components/DashboardAdmin";
import { DashboardOperator } from "./components/DashboardOperator";
import { can } from "../lib/permissions";

export default async function DashboardPage() {
  const token = cookies().get("token")?.value;

  if (!token) {
    return <p>Não autenticado</p>;
  }

  // carregar usuário
  const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  }).then((r) => r.json());

  // carregar dados do dashboard
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  }).then((r) => r.json());

  if (can.manageUsers(user.role)) {
    return <DashboardAdmin data={data} />;
  }

  return <DashboardOperator data={data} />;
}