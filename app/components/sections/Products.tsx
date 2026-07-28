import Image from "next/image";
import {
  ArrowRight,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";

import FadeIn from "@/app/components/ui/FadeIn";

const products = [
  {
    name: "Bộ phụ kiện hóa trang quân đội",
    category: "Đồ hóa trang",
    price: "Liên hệ",
    description:
      "Bộ phụ kiện phù hợp để chụp ảnh, biểu diễn, hóa trang và sưu tầm.",
    image: "/images/products/phu-kien-quan-doi.jpg",
    shopeeUrl: "https://shopee.vn/gapy1993",
  },
  {
    name: "Mũ hóa trang phong cách quân sự",
    category: "Phụ kiện",
    price: "Liên hệ",
    description:
      "Thiết kế nổi bật, dễ phối cùng nhiều bộ trang phục hóa trang.",
    image: "/images/products/mu-hoa-trang.jpg",
    shopeeUrl: "https://shopee.vn/gapy1993",
  },
  {
    name: "Huy hiệu và vật phẩm sưu tầm",
    category: "Sưu tầm",
    price: "Liên hệ",
    description:
      "Nhiều mẫu huy hiệu và vật phẩm trang trí dành cho người yêu thích sưu tầm.",
    image: "/images/products/huy-hieu-suu-tam.jpg",
    shopeeUrl: "https://shopee.vn/gapy1993",
  },
  {
    name: "Bộ trang phục hóa trang",
    category: "Trang phục",
    price: "Liên hệ",
    description:
      "Trang phục dùng trong sự kiện, biểu diễn, chụp ảnh hoặc làm quà tặng.",
    image: "/images/products/trang-phuc-hoa-trang.jpg",
    shopeeUrl: "https://shopee.vn/gapy1993",
  },
  {
    name: "Phụ kiện trang trí mô hình",
    category: "Mô hình",
    price: "Liên hệ",
    description:
      "Phụ kiện nhỏ gọn giúp hoàn thiện mô hình và không gian trưng bày.",
    image: "/images/products/phu-kien-mo-hinh.jpg",
    shopeeUrl: "https://shopee.vn/gapy1993",
  },
  {
    name: "Combo quà tặng độc đáo",
    category: "Quà tặng",
    price: "Liên hệ",
    description:
      "Combo được đóng gói cẩn thận, phù hợp làm quà cho bạn bè và người thân.",
    image: "/images/products/combo-qua-tang.jpg",
    shopeeUrl: "https://shopee.vn/gapy1993",
  },
];

export default function Products() {
  return (
    <FadeIn>
      <section
        id="products"
        className="bg-gray-50/70 py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-6">
          {/* Tiêu đề */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-orange-500">
                Sản phẩm nổi bật
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                Những sản phẩm được yêu thích
              </h2>

              <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
                Khám phá đồ hóa trang, phụ kiện và vật phẩm sưu tầm
                độc đáo tại Gà Chăm Chỉ.
              </p>
            </div>

            <a
              href="https://shopee.vn/gapy1993"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white px-6 py-3 text-sm font-semibold text-orange-600 transition hover:-translate-y-0.5 hover:border-orange-400 hover:bg-orange-50"
            >
              Xem tất cả sản phẩm
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Danh sách sản phẩm */}
          <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.name}
                className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Ảnh */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-orange-600 shadow-sm backdrop-blur">
                    {product.category}
                  </div>
                </div>

                {/* Nội dung */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {product.name}
                  </h3>

                  <p className="mt-3 min-h-[52px] text-sm leading-6 text-gray-600">
                    {product.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-5">
                    <span className="text-sm text-gray-500">
                      Giá sản phẩm
                    </span>

                    <span className="font-bold text-orange-600">
                      {product.price}
                    </span>
                  </div>

                  {/* Nút mua */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <a
                      href="https://zalo.me/0964032893"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Đặt ${product.name} qua Zalo`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-3 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Đặt qua Zalo
                    </a>

                    <a
                      href={product.shopeeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Xem ${product.name} trên Shopee`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-3 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Shopee
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </FadeIn>
  );
}