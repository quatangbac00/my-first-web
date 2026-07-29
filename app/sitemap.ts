import type { MetadataRoute } from "next";
import { supabase } from "../lib/supabase";

const baseUrl = "https://ga-cham-chi.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: products, error } = await supabase
    .from("products")
    .select("id")
    .eq("is_active", true)
    .order("id", { ascending: true });

  const productPages =
    !error && products
      ? products.map((product) => ({
          url: `${baseUrl}/products/${product.id}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        }))
      : [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...productPages,
  ];
}