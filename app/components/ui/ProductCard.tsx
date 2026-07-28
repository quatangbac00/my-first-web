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

  const discount =
    product.oldPrice &&
    Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:shadow-xl">
      <div className="relative">
        {discount && (
          <div className="absolute left-3 top-3 z-10 rounded-lg bg-red-500 px-2 py-1 text-xs font-bold text-white">
            -{discount}%
          </div>
        )}

        {product.badge && (
          <div className="absolute right-3 top-3 z-10 rounded-lg bg-orange-500 px-2 py-1 text-xs text-white">
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

        <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-1 text-center text-xs text-white">
          🚚 Freeship từ 199K
        </div>
      </div>

      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="min-h-[48px] cursor-pointer line-clamp-2 font-bold text-gray-950 hover:text-orange-500">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-yellow-500">⭐ {product.rating}</span>

          <span className="text-gray-500">Đã bán {product.sold}</span>
        </div>

        <div className="mt-3 flex items-end gap-2">
          <span className="text-xl font-bold text-red-600">
            {product.price.toLocaleString("vi-VN")}đ
          </span>

          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              {product.oldPrice.toLocaleString("vi-VN")}đ
            </span>
          )}
        </div>

        <div className="mt-3 rounded-lg bg-orange-100 px-3 py-2 text-sm text-orange-700">
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