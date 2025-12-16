"use client";

import { useEffect, useState } from "react";

export default function AuditPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function load() {
      const token = getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/audit`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setLogs(data);
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Logs de Auditoria</h1>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b">
            <th className="p-3">Data</th>
            <th className="p-3">Usuário</th>
            <th className="p-3">Ação</th>
            <th className="p-3">Entidade</th>
            <th className="p-3">ID</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log: any) => (
            <tr key={log.id} className="border-b">
              <td className="p-3">{new Date(log.createdAt).toLocaleString()}</td>
              <td className="p-3">{log.user?.email ?? "Sistema"}</td>
              <td className="p-3">{log.action}</td>
              <td className="p-3">{log.entity}</td>
              <td className="p-3">{log.entityId}</td>
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