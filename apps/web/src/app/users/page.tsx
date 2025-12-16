"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function load() {
      const token = getToken();
      const res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data);
    }
    load();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Usuários</h1>
        <Link href="/users/new" className="bg-blue-600 text-white px-4 py-2 rounded">
          Novo Usuário
        </Link>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u: any) => (
            <tr key={u.id} className="border-b">
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.role}</td>
              <td className="p-3 text-center">
                <Link href={`/users/${u.id}`} className="text-blue-600 hover:underline">
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getToken() {
  const match = document.cookie.match(/token=([^;]+)/);
  return match ? match[1] : "";
}