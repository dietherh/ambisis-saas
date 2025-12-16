"use client";

import Link from "next/link";
import { LogoutButton } from "./logout-button";
import { useEffect, useState } from "react";


export function Sidebar({ user, can }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function load() {
      const token = getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCount(data.filter((n: any) => !n.read).length);
    }
    load();
  }, []);


  return (
    <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
      <div>
        <p className="font-bold">{user.email}</p>
        <p className="text-sm text-gray-500">{user.role}</p>
      </div>

      <nav className="space-y-4">
        <Link href="/dashboard" className="block hover:text-blue-600">
          Dashboard
        </Link>

        {can.viewCompanies(user.role) && (
          <Link href="/companies" className="block hover:text-blue-600">
            Empresas
          </Link>
        )}

        <Link href="/licenses" className="block hover:text-blue-600">
          Licenças
        </Link>

        {can.manageUsers(user.role) && (
          <Link href="/users" className="block hover:text-blue-600">
            Usuários
          </Link>
        )}

        <Link href="/notifications" className="flex items-center gap-2">
          Notificações
          {count > 0 && (
            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
              {count}
            </span>
          )}
        </Link>
      </nav>

      <div className="border-t pt-4">
        <LogoutButton />
      </div>
    </aside>
  );
}

function getToken() {
  const match = document.cookie.match(/token=([^;]+)/);
  return match ? match[1] : "";
}
