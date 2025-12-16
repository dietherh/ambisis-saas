"use client";

import { useEffect, useState } from "react";

export function useSession() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${getTokenFromCookie()}`,
          },
        });

        if (!res.ok) {
          setUser(null);
        } else {
          const data = await res.json();
          setUser(data);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  return { user, loading };
}

function getTokenFromCookie() {
  const match = document.cookie.match(/token=([^;]+)/);
  return match ? match[1] : null;
}