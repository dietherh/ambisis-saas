export function DashboardOperator({ data }: { data: any }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard (Operador)</h1>

      <div className="grid grid-cols-3 gap-4">
        <Card title="Licenças" value={data.licenses} />
        <Card title="Licenças a expirar" value={data.expiringLicenses} />
        <Card title="Licenças vencidas" value={data.expiredLicenses ?? 0} />
      </div>

      <p className="mt-6 text-gray-600">
        Você possui acesso limitado. Para gerenciar empresas ou usuários, contate um administrador.
      </p>
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