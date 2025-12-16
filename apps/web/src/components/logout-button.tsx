"use client";

export function LogoutButton() {
  function handleLogout() {
    document.cookie = "token=; Max-Age=0; path=/";
    window.location.href = "/login";
  }

  return (
    <button
      onClick={handleLogout}
      className="text-red-600 hover:underline"
    >
      Sair
    </button>
  );
}