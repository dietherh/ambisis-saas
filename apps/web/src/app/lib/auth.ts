export function logout() {
  // remove o token salvo
  localStorage.removeItem("token");

  // redireciona para o login
  window.location.href = "/login";
}