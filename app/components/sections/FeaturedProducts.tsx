"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import ProductCard from "@/app/components/ui/ProductCard";
import FadeIn from "@/app/components/ui/FadeIn";
import type { Product } from "@/data/products";
import { supabase } from "@/lib/supabase";
import {
  getProductPriceRange,
  getVariantEffectivePrice,
} from "@/lib/pricing";
import { matchesStorefrontCategory } from "@/lib/storefront-categories";

type SupabaseProduct = {
  id: number | string;
  name: string;
  price: number | string;
  sale_price?: number | string | null;
  image_url: string | null;
  description: string | null;
  category: string | null;
  is_active: boolean;
};

type SupabaseVariant = {
  product_id: number | string;
  price: number | string;
  sale_price?: number | string | null;
  is_active: boolean;
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const loadProducts = useCallback(async () => {
      setLoading(true);
      setError("");

      const [productResult, variantResult] = await Promise.all([
        supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("id", { ascending: false }),
        supabase
          .from("product_variants")
          .select("*")
          .eq("is_active", true),
      ]);

      if (productResult.error || variantResult.error) {
        setError(
          productResult.error?.message ||
            variantResult.error?.message ||
            "Không thể tải giá sản phẩm."
        );
        setLoading(false);
        return;
      }

      const variantsByProduct = new Map<string, SupabaseVariant[]>();

      for (const variant of
        (variantResult.data as SupabaseVariant[]) || []) {
        const key = String(variant.product_id);
        const current = variantsByProduct.get(key) || [];
        current.push(variant);
        variantsByProduct.set(key, current);
      }

      const formattedProducts: Product[] = (
        (productResult.data as SupabaseProduct[]) || []
      ).flatMap((item) => {
        const variants = variantsByProduct.get(String(item.id)) || [];
        const range = getProductPriceRange(item, variants);
        const productEffectivePrice = getVariantEffectivePrice(item);
        const regularProductPrice = Number(item.price);
        const hasProductSale =
          variants.length === 0 &&
          productEffectivePrice !== null &&
          productEffectivePrice < regularProductPrice;

        if (!range) {
          return [];
        }

        return [{
          id: item.id,
          name: item.name,
          price: range.minPrice,
          minPrice: range.minPrice,
          maxPrice: range.maxPrice,
          hasVariants: variants.length > 0,
          oldPrice: hasProductSale
            ? regularProductPrice
            : undefined,
          image:
            item.image_url || "/images/products/placeholder.jpg",
          category: item.category || "Chưa phân loại",
          featured: true,
          isNew: false,
          rating: 5,
          sold: 0,
          description: item.description || "",
        }];
      });

      setProducts(formattedProducts);
      setLoading(false);
  }, []);

  useEffect(() => {
    const initialLoad = window.setTimeout(() => {
      void loadProducts();
    }, 0);

    window.addEventListener("focus", loadProducts);

    return () => {
      window.clearTimeout(initialLoad);
      window.removeEventListener("focus", loadProducts);
    };
  }, [loadProducts]);

  useEffect(() => {
    function handleStoreSearch(event: Event) {
      const customEvent = event as CustomEvent<string>;

      setSearchQuery(customEvent.detail || "");
      setSelectedCategory("");
    }

    window.addEventListener("store-search", handleStoreSearch);

    return () => {
      window.removeEventListener(
        "store-search",
        handleStoreSearch
      );
    };
  }, []);

  useEffect(() => {
    function handleCategoryFilter(event: Event) {
      const customEvent = event as CustomEvent<string>;

      setSelectedCategory(customEvent.detail || "");
      setSearchQuery("");
    }

    window.addEventListener(
      "store-category-filter",
      handleCategoryFilter
    );

    return () => {
      window.removeEventListener(
        "store-category-filter",
        handleCategoryFilter
      );
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        !selectedCategory ||
        matchesStorefrontCategory(
          product.category,
          selectedCategory
        );

      const searchableText = [
        product.name,
        product.category,
        product.description,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [products, searchQuery, selectedCategory]);

  function clearFilters() {
    setSearchQuery("");
    setSelectedCategory("");
  }

  return (
    <FadeIn>
      <section
        id="products"
        className="border-y border-[#eee2ca] bg-[#fff9ec] py-14 sm:py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xl" aria-hidden="true">
                  🌿
                </span>

                <h2 className="text-3xl font-black tracking-tight text-[#4a3827]">
                  {selectedCategory || "Sản phẩm nổi bật"}
                </h2>

                <span className="text-xl" aria-hidden="true">
                  🌿
                </span>
              </div>

              <p className="mt-2 text-sm text-[#7a7162] sm:text-base">
                {selectedCategory
                  ? `Các sản phẩm thuộc danh mục ${selectedCategory}`
                  : "Những sản phẩm được khách hàng quan tâm tại Gà Chăm Chỉ"}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {searchQuery && (
                  <p className="inline-flex rounded-full bg-[#edf6e7] px-4 py-2 text-sm font-bold text-[#3e7427]">
                    Tìm kiếm: “{searchQuery}”
                  </p>
                )}

                {selectedCategory && (
                  <p className="inline-flex rounded-full bg-[#fff0df] px-4 py-2 text-sm font-bold text-[#c85a22]">
                    Danh mục: {selectedCategory}
                  </p>
                )}
              </div>
            </div>

            {searchQuery || selectedCategory ? (
              <button
                type="button"
                onClick={clearFilters}
                className="w-fit rounded-xl border border-[#d8cbaa] bg-white px-4 py-2 text-sm font-bold text-[#5d4c34] transition hover:border-[#8dbb6f] hover:text-[#3e7427]"
              >
                Xem tất cả sản phẩm
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  document
                    .getElementById("products")
                    ?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                }}
                className="w-fit text-sm font-bold text-[#4f8f24] transition hover:text-[#e6532f]"
              >
                Xem tất cả →
              </button>
            )}
          </div>

          {loading && (
            <div className="rounded-2xl border border-[#eadfc8] bg-white p-6 text-[#6d665b] shadow-sm">
              Đang tải sản phẩm...
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
              Lỗi: {error}
            </div>
          )}

          {!loading &&
            !error &&
            filteredProducts.length === 0 && (
              <div className="rounded-2xl border border-[#eadfc8] bg-white p-8 text-center shadow-sm">
                <p className="font-bold text-[#4a3827]">
                  Không tìm thấy sản phẩm phù hợp.
                </p>

                <p className="mt-2 text-sm text-[#7a7162]">
                  Sản phẩm có thể chưa được gán đúng danh mục hoặc chưa
                  được bật hiển thị.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-xl bg-[#4f8f24] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#3f771b]"
                >
                  Xem tất cả sản phẩm
                </button>
              </div>
            )}

          {!loading &&
            !error &&
            filteredProducts.length > 0 && (
              <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filteredProducts.map((item) => (
                  <ProductCard
                    key={item.id}
                    product={item}
                  />
                ))}
              </div>
            )}
        </div>
      </section>
    </FadeIn>
  );
}
