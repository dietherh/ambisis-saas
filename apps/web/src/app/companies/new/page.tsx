"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCompanySchema } from "@ambisis/types";
import { z } from "zod";

type FormData = z.infer<typeof CreateCompanySchema>;

export default function NewCompanyPage() {
  const form = useForm<FormData>({
    resolver: zodResolver(CreateCompanySchema),
  });

  async function onSubmit(data: FormData) {
    const token = getToken();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    // redirect...
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <input {...form.register("name")} placeholder="Nome" />
      {form.formState.errors.name && (
        <p className="text-red-600">{form.formState.errors.name.message}</p>
      )}

      <input {...form.register("document")} placeholder="Documento" />
      {form.formState.errors.document && (
        <p className="text-red-600">{form.formState.errors.document.message}</p>
      )}

      <button type="submit">Salvar</button>
    </form>
  );
}

function getToken() {
  const match = document.cookie.match(/token=([^;]+)/);
  return match ? match[1] : "";
}