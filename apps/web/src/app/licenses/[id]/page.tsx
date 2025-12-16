"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditLicensePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [license, setLicense] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const token = getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/licenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setLicense(data);
    }
    load();
  }, [id]);

  async function handleSubmit(e: any) {
    e.preventDefault();

    const token = getToken();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/licenses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        issuedAt: license.issuedAt,
        expiresAt: license.expiresAt,
      }),
    });

    router.push("/licenses");
  }

  async function handleDelete() {
    const token = getToken();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/licenses/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    router.push("/licenses");
  }

  if (!license) return <p>Carregando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Editar Licença</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={license.issuedAt.split("T")[0]}
          onChange={(e) => setLicense({ ...license, issuedAt: e.target.value })}
        />

        <input
          type="date"
          className="w-full border p-2 rounded"
          value={license.expiresAt.split("T")[0]}
          onChange={(e) => setLicense({ ...license, expiresAt: e.target.value })}
        />

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