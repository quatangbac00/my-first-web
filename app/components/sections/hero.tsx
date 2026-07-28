import Image from "next/image";
import FadeIn from "@/app/components/ui/FadeIn";

export default function Hero() {
  return (
    <FadeIn>
      <section
        id="hero"
        className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-yellow-50 pb-20 pt-32 lg:pb-28 lg:pt-40"
      >
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-yellow-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-8 lg:grid-cols-[0.65fr_1.35fr] xl:grid-cols-[0.6fr_1.4fr]">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-600 shadow-sm">
                ✨ Quà tặng nhỏ, cảm hứng lớn
              </div>

              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-[42px] xl:text-5xl">
                Mang năng lượng tích cực
                <span className="block text-orange-500">
                  vào mỗi ngày của bạn
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 lg:mx-0">
                Khám phá đồ hóa trang, phụ kiện, vật phẩm sưu tầm và những món
                quà độc đáo tại Gà Chăm Chỉ.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <a
                  href="#products"
                  className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600"
                >
                  🛍️ Xem sản phẩm
                </a>

                <a
                  href="#categories"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-7 py-3.5 font-semibold text-gray-800 transition hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-600"
                >
                  Khám phá danh mục
                </a>
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-600 lg:justify-start">
                <span>✓ Sản phẩm độc đáo</span>
                <span>✓ Đóng gói cẩn thận</span>
                <span>✓ Giao hàng toàn quốc</span>
              </div>
            </div>

            <div className="mx-auto w-full max-w-4xl">
              <div className="relative">
                <div className="absolute inset-8 rotate-3 rounded-[40px] bg-orange-200/60" />

                <div className="relative overflow-hidden rounded-[32px] border border-white bg-white p-4 shadow-2xl shadow-orange-900/10">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-white">
                    <Image
                      src="/images/hero-banner.jpg"
                      alt="Sản phẩm nổi bật của Gà Chăm Chỉ"
                      fill
                      priority
                      sizes="(max-width: 1024px) 90vw, 560px"
                     className="object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
                  <p className="text-xs text-gray-500">
                    Khách hàng đánh giá
                  </p>

                  <p className="mt-1 font-bold text-gray-900">
                    ⭐ 4.9 / 5
                  </p>
                </div>

                <div className="rounded-2xl bg-orange-500 px-5 py-4 text-white shadow-sm">
                  <p className="text-xs text-orange-100">
                    Sản phẩm nổi bật
                  </p>

                  <p className="mt-1 font-bold">
                    Nhiều mẫu độc đáo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}