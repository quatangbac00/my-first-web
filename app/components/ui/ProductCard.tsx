"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import type { Product } from "@/data/products";
import { useCart } from "@/app/components/cart/CartProvider";
import { formatPriceRange } from "@/lib/pricing";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();

  const numericId =
    typeof product.id === "number"
      ? product.id
      : Number.parseInt(String(product.id), 10) || 1;

  const rating =
    product.rating ||
    Number((4.7 + (numericId % 3) * 0.1).toFixed(1));

  const sold =
    product.sold || 20 + ((numericId * 17) % 180);

  const discount =
    product.oldPrice &&
    Math.round(
      ((product.oldPrice - product.price) /
        product.oldPrice) *
        100
    );

  const priceText = formatPriceRange(
    product.minPrice ?? product.price,
    product.maxPrice ?? product.price
  );

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#eadfc8] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#a8c98d] hover:shadow-[0_16px_40px_rgba(79,111,48,0.15)]">
      <div className="relative overflow-hidden bg-[#faf7ef]">
        <div className="absolute left-3 top-3 z-10">
          <span className="rounded-lg bg-[#e6462d] px-2.5 py-1 text-xs font-extrabold text-white shadow-sm">
            {discount ? `-${discount}%` : "BÁN CHẠY"}
          </span>
        </div>

        {product.badge && (
          <div className="absolute right-3 top-3 z-10">
            <span className="rounded-lg bg-[#f59e0b] px-2.5 py-1 text-xs font-bold text-white shadow-sm">
              {product.badge}
            </span>
          </div>
        )}

        <Link
          href={`/products/${product.id}`}
          className="block"
        >
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="aspect-square w-full object-contain p-3 transition duration-300 group-hover:scale-[1.04]"
          />
        </Link>
      </div>

      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="line-clamp-2 min-h-[44px] text-sm font-extrabold leading-5 text-[#2f2a22] transition hover:text-[#4f8f24] sm:text-base">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-2 text-xs">
          <span className="font-bold text-[#f59e0b]">
            ★★★★★
          </span>

          <span className="text-[#6f675b]">
            {rating}
          </span>

          <span className="text-[#aaa08f]">|</span>

          <span className="text-[#7f7668]">
            Đã bán {sold}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-end gap-2">
          <span className="text-lg font-black text-[#d9341f] sm:text-xl">
            {priceText}
          </span>

          {product.oldPrice && (
            <span className="text-xs text-[#aaa08f] line-through sm:text-sm">
              {Number(product.oldPrice).toLocaleString("vi-VN")}đ
            </span>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-md border border-[#efb2a8] bg-[#fff1ee] px-2 py-1 text-[10px] font-bold text-[#d83f28]">
            VOUCHER 10K
          </span>

          <span className="rounded-md border border-[#b9d99f] bg-[#f2faec] px-2 py-1 text-[10px] font-bold text-[#4f8f24]">
            FREESHIP
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 rounded-xl border border-[#d9cdae] bg-[#fffdf8] px-3 py-2.5 text-center text-sm font-bold text-[#554734] transition hover:border-[#8dbb6f] hover:text-[#3f771b]"
          >
            Xem chi tiết
          </Link>

          {product.hasVariants ? (
            <Link
              href={`/products/${product.id}`}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#4f8f24] text-white shadow-sm transition hover:bg-[#3f771b] active:scale-[0.97]"
              aria-label={`Chọn biến thể cho ${product.name}`}
            >
              <ShoppingCart className="h-5 w-5" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#4f8f24] text-white shadow-sm transition hover:bg-[#3f771b] active:scale-[0.97]"
              aria-label={`Thêm ${product.name} vào giỏ hàng`}
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
