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

  const policyPages = [
    "huong-dan-mua-hang",
    "chinh-sach-van-chuyen",
    "chinh-sach-doi-tra",
    "hinh-thuc-thanh-toan",
  ].map((path) => ({
    url: `${siteUrl}/${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...policyPages,
    ...productPages,
  ];
}
