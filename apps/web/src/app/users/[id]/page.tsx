"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const token = getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUser(data);
    }
    load();
  }, [id]);

  async function handleSubmit(e: any) {
    e.preventDefault();

    const token = getToken();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });

    router.push("/users");
  }

  async function handleDelete() {
    const token = getToken();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    router.push("/users");
  }

  if (!user) return <p>Carregando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Editar Usuário</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          className="w-full border p-2 rounded"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <select
          className="w-full border p-2 rounded"
          value={user.role}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
        >
          <option value="admin">Admin</option>
          <option value="operator">Operador</option>
          <option value="viewer">Visualizador</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Salvar
        </button>
      </form>

      <button
        onClick={handleDelete}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
      >
        Excluir
      </button>
    </div>
  );
}

function getToken() {
  const match = document.cookie.match(/token=([^;]+)/);
  return match ? match[1] : "";
}