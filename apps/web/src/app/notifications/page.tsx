import { cookies } from "next/headers";

export default async function NotificationsPage() {
  const token = cookies().get("token")?.value;

  const notifications = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  }).then((r) => r.json());

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Notificações</h1>

      <div className="space-y-4">
        {notifications.map((n: any) => (
          <div
            key={n.id}
            className={`p-4 rounded shadow ${
              n.read ? "bg-gray-100" : "bg-yellow-100"
            }`}
          >
            <p>{n.message}</p>
            <p className="text-sm text-gray-500">
              {new Date(n.createdAt).toLocaleString()}
            </p>

            {!n.read && (
              <form action={`/notifications/${n.id}/read`} method="POST">
                <button className="mt-2 text-blue-600 underline">
                  Marcar como lida
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}