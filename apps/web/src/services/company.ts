import { CompanyDTO } from "@ambisis/types/src";

export async function getCompanies(): Promise<CompanyDTO[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies`);
  return res.json();
}