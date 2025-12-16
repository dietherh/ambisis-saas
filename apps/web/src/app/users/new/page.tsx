"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewUserPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("operator");

  async function handleSubmit(e: any) {
    e.preventDefault();

    const token = getToken();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, password, role }),
    });

    router.push("/users");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Novo Usuário</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          className="w-full border p-2 rounded"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="operator">Operador</option>
          <option value="viewer">Visualizador</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Salvar
        </button>
      </form>
    </div>
  );
}

function getToken() {
  const match = document.cookie.match(/token=([^;]+)/);
  return match ? match[1] : "";
}