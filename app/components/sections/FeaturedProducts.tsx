"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/app/components/ui/ProductCard";
import FadeIn from "@/app/components/ui/FadeIn";
import type { Product } from "@/data/products";
import { supabase } from "@/lib/supabase";

type SupabaseProduct = {
  id: number | string;
  name: string;
  price: number | string;
  image_url: string | null;
  description: string | null;
  is_active: boolean;
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("id", { ascending: false });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const formattedProducts: Product[] = (
        (data as SupabaseProduct[]) || []
      ).map((item) => ({
        id: item.id,
        name: item.name,
        price: Number(item.price),
        image: item.image_url || "/images/products/placeholder.jpg",
        category: "Sản phẩm",
        featured: true,
        isNew: false,
        rating: 5,
        sold: 0,
        description: item.description || "",
      }));

      setProducts(formattedProducts);
      setLoading(false);
    }

    loadProducts();
  }, []);

  return (
    <FadeIn>
      <section id="products" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                ⭐ Sản phẩm nổi bật
              </h2>

              <p className="mt-2 text-gray-500">
                Những sản phẩm được khách hàng yêu thích nhất
              </p>
            </div>

            <button className="font-semibold text-orange-500 hover:underline">
              Xem tất cả →
            </button>
          </div>

          {loading && <p className="text-gray-600">Đang tải sản phẩm...</p>}

          {error && <p className="text-red-600">Lỗi: {error}</p>}

          {!loading && !error && products.length === 0 && (
            <p className="text-gray-600">Chưa có sản phẩm.</p>
          )}

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
            {products.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>
    </FadeIn>
  );
}