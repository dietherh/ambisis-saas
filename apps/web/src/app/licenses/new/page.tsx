"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewLicensePage() {
  const router = useRouter();
  const [companies, setCompanies] = useState([]);
  const [companyId, setCompanyId] = useState("");
  const [issuedAt, setIssuedAt] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  useEffect(() => {
    async function loadCompanies() {
      const token = getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCompanies(data);
    }
    loadCompanies();
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();

    const token = getToken();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/licenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        companyId,
        issuedAt,
        expiresAt,
      }),
    });

    router.push("/licenses");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Nova Licença</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <select
          className="w-full border p-2 rounded"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
        >
          <option value="">Selecione a empresa</option>
          {companies.map((c: any) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="w-full border p-2 rounded"
          value={issuedAt}
          onChange={(e) => setIssuedAt(e.target.value)}
        />

        <input
          type="date"
          className="w-full border p-2 rounded"
          value={expiresAt}
          onChange={(e) => setExpiresAt(e.target.value)}
        />

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