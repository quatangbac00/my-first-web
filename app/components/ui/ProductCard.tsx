"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { useCart } from "@/app/components/cart/CartProvider";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();

  const numericId =
    typeof product.id === "number"
      ? product.id
      : Number.parseInt(String(product.id), 10) || 1;

  // Nếu Supabase chưa có rating và sold thì tự tạo số mặc định
  // để thẻ sản phẩm vẫn có cảm giác giống sàn thương mại điện tử.
  const rating = product.rating || Number((4.7 + (numericId % 3) * 0.1).toFixed(1));
  const sold = product.sold || 20 + (numericId * 17) % 180;

  const discount =
    product.oldPrice &&
    Math.round(
      ((product.oldPrice - product.price) / product.oldPrice) * 100
    );

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        {discount ? (
          <div className="absolute left-3 top-3 z-10 rounded-lg bg-red-500 px-2 py-1 text-xs font-bold text-white">
            -{discount}%
          </div>
        ) : (
          <div className="absolute left-3 top-3 z-10 rounded-lg bg-red-500 px-2 py-1 text-xs font-bold text-white">
            SALE
          </div>
        )}

        {product.badge && (
          <div className="absolute right-3 top-3 z-10 rounded-lg bg-orange-500 px-2 py-1 text-xs font-semibold text-white">
            {product.badge}
          </div>
        )}

        <Link href={`/products/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="aspect-square w-full cursor-pointer object-cover transition duration-300 group-hover:scale-105"
          />
        </Link>

        <div className="absolute bottom-0 left-0 right-0 bg-black/75 py-1.5 text-center text-xs font-medium text-white">
          🚚 Freeship từ 199K
        </div>
      </div>

      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="line-clamp-2 min-h-[48px] cursor-pointer font-bold text-gray-950 hover:text-orange-500">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-orange-500">
              {rating}
            </span>

            <span className="tracking-tight text-yellow-400">
              ★★★★★
            </span>
          </div>

          <span className="text-gray-500">
            Đã bán {sold}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-end gap-2">
          <span className="text-xl font-extrabold text-red-600">
            {Number(product.price).toLocaleString("vi-VN")}đ
          </span>

          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              {Number(product.oldPrice).toLocaleString("vi-VN")}đ
            </span>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-md border border-red-300 bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
            GIẢM 10K
          </span>

          <span className="rounded-md border border-orange-300 bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600">
            FREESHIP
          </span>

          <span className="rounded-md border border-blue-300 bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
            KHÁCH MỚI
          </span>
        </div>

        <div className="mt-3 rounded-lg bg-orange-100 px-3 py-2 text-sm font-medium text-orange-700">
          🎁 Giảm thêm 10K khi mua từ 2 sản phẩm
        </div>

        <button
          type="button"
          onClick={() => addToCart(product)}
          className="mt-4 w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 active:scale-[0.98]"
        >
          🛒 Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}