import "server-only";

import { supabase } from "@/lib/supabase";

export type StorefrontProduct = {
  id: number | string;
  name: string;
  price: number | string;
  sale_price?: number | string | null;
  image_url: string | null;
  description: string | null;
  category: string | null;
  stock: number;
  is_active: boolean;
};

export type StorefrontVariant = {
  id: number;
  product_id: number | string;
  name: string;
  price: number | string;
  sale_price?: number | string | null;
  stock: number;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
};

const DATA_TIMEOUT_MS = 8_000;

async function withTimeout<T>(request: PromiseLike<T>): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  try {
    return await Promise.race([
      Promise.resolve(request),
      new Promise<T>((_, reject) => {
        timeoutId = setTimeout(() => {
          reject(new Error("Supabase request timed out"));
        }, DATA_TIMEOUT_MS);
      }),
    ]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

export async function getActiveProducts() {
  const [productResult, variantResult] = await Promise.all([
    withTimeout(
      supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("id", { ascending: false })
    ),
    withTimeout(
      supabase
        .from("product_variants")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .order("id", { ascending: true })
    ),
  ]);

  if (productResult.error || variantResult.error) {
    throw new Error(
      productResult.error?.message ||
        variantResult.error?.message ||
        "Không thể tải dữ liệu sản phẩm."
    );
  }

  return {
    products: (productResult.data || []) as StorefrontProduct[],
    variants: (variantResult.data || []) as StorefrontVariant[],
  };
}

export async function getActiveProduct(productId: number) {
  const [productResult, variantResult] = await Promise.all([
    withTimeout(
      supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .eq("is_active", true)
        .single()
    ),
    withTimeout(
      supabase
        .from("product_variants")
        .select("*")
        .eq("product_id", productId)
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .order("id", { ascending: true })
    ),
  ]);

  if (productResult.error || !productResult.data) return null;
  if (variantResult.error) throw new Error(variantResult.error.message);

  return {
    product: productResult.data as StorefrontProduct,
    variants: (variantResult.data || []) as StorefrontVariant[],
  };
}
