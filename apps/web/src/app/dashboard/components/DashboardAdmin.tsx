export function DashboardAdmin({ data }: { data: any }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard (Admin)</h1>

      <div className="grid grid-cols-4 gap-4">
        <Card title="Empresas" value={data.companies} />
        <Card title="Licenças" value={data.licenses} />
        <Card title="Usuários" value={data.users} />
        <Card title="Licenças a expirar" value={data.expiringLicenses} />
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white p-6 rounded shadow text-center">
      <p className="text-gray-500">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}