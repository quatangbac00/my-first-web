import type { MetadataRoute } from "next";
import { supabase } from "../lib/supabase";
import { siteUrl } from "../lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: products, error } = await supabase
    .from("products")
    .select("id")
    .eq("is_active", true)
    .order("id", { ascending: true });

  const productPages =
    !error && products
      ? products.map((product) => ({
          url: `${siteUrl}/products/${product.id}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        }))
      : [];

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...productPages,
  ];
}
