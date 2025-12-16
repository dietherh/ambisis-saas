
import { Sidebar } from "@/components/sidebar";
import { useSession } from "@/hooks/useSession";

export default function RootLayout({ children }) {
  const { user, loading } = useSession();

  if (loading) {
    return <div className="p-6">Carregando...</div>;
  }

  return (
    <html lang="pt-br">
      <body className="flex min-h-screen bg-gray-100">
        <Sidebar user={user} />
        <main className="flex-1 p-6">{children}</main>
      </body>
    </html>
  );
}