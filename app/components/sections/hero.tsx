import Image from "next/image";
import {
  CheckCircle2,
  Headphones,
  PackageCheck,
  Truck,
} from "lucide-react";

import FadeIn from "@/app/components/ui/FadeIn";

const benefits = [
  {
    icon: PackageCheck,
    title: "Hàng chọn lọc",
    description: "Kiểm tra kỹ trước khi bán",
  },
  {
    icon: Truck,
    title: "Giao toàn quốc",
    description: "Đóng gói cẩn thận",
  },
  {
    icon: Headphones,
    title: "Hỗ trợ tận tâm",
    description: "Tư vấn nhanh qua Zalo",
  },
];

export default function Hero() {
  return (
    <FadeIn>
      <section
        id="hero"
        className="bg-[#fffaf0] px-3 pb-9 pt-3 sm:px-6 lg:pb-14 lg:pt-5"
      >
        <div className="mx-auto max-w-7xl">
          {/* Giao diện điện thoại và máy tính bảng */}
          <div className="overflow-hidden rounded-[24px] border border-[#eadfbd] bg-[#fff9e9] shadow-[0_18px_45px_rgba(98,72,24,0.12)] lg:hidden">
            <div className="px-5 pb-6 pt-7 sm:px-8">
              <div className="inline-flex items-center rounded-full border border-lime-200 bg-white px-3.5 py-2 text-xs font-bold text-lime-700 shadow-sm">
                🌱 Mỗi ngày một chút nỗ lực
              </div>

              <h1 className="mt-5 text-3xl font-black leading-[1.08] tracking-tight text-[#2f2a20] sm:text-4xl">
                Khám phá niềm vui
                <span className="mt-2 block text-[#e53920]">
                  từ những nỗ lực mỗi ngày
                </span>
              </h1>

              <p className="mt-5 text-sm leading-6 text-[#5f594d] sm:text-base">
                Gà Chăm Chỉ mang đến những món đồ độc đáo, phụ kiện, đồ
                sưu tầm và quà tặng được chọn lọc để đồng hành cùng bạn
                mỗi ngày.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a
                  href="#products"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#4f8f24] px-5 py-3 font-bold text-white shadow-md transition active:scale-[0.98]"
                >
                  Khám phá ngay
                  <span className="ml-2">→</span>
                </a>

                <a
                  href="#categories"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#decfa8] bg-white px-5 py-3 font-bold text-[#493f2d] transition active:scale-[0.98]"
                >
                  Xem danh mục
                </a>
              </div>

              <div className="mt-6 grid gap-2">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;

                  return (
                    <div
                      key={benefit.title}
                      className="flex min-h-[70px] items-center gap-3 rounded-xl border border-[#eadfc8] bg-white px-4 py-3 shadow-sm"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#edf7e6] text-[#4f8f24]">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-sm font-extrabold text-[#365f1f]">
                          {benefit.title}
                        </p>

                        <p className="mt-0.5 text-xs text-[#777064]">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative aspect-[4/3] w-full border-t border-[#eadfbd] bg-[#fff5d6] sm:aspect-[16/9]">
              <Image
                src="/images/hero-banner-v2.jpg"
                alt="Gà Chăm Chỉ trên hành trình khám phá sản phẩm"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[72%_center]"
              />
            </div>
          </div>

          {/* Giao diện máy tính */}
          <div className="relative hidden min-h-[590px] overflow-hidden rounded-[28px] border border-[#eadfbd] shadow-[0_24px_70px_rgba(98,72,24,0.14)] lg:block">
            <Image
              src="/images/hero-banner-v2.jpg"
              alt="Gà Chăm Chỉ trên hành trình khám phá sản phẩm"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#fff9e9]/95 via-[#fff9e9]/72 to-transparent" />

            <div className="relative z-10 flex min-h-[590px] items-center px-14 py-14">
              <div className="max-w-[580px]">
                <div className="inline-flex items-center rounded-full border border-lime-200 bg-white/85 px-4 py-2 text-sm font-bold text-lime-700 shadow-sm backdrop-blur">
                  🌱 Mỗi ngày một chút nỗ lực
                </div>

                <h1 className="mt-6 text-[56px] font-black leading-[1.08] tracking-tight text-[#2f2a20]">
                  Khám phá niềm vui
                  <span className="mt-2 block text-[#e53920]">
                    từ những nỗ lực mỗi ngày
                  </span>
                </h1>

                <p className="mt-6 max-w-[520px] text-lg leading-7 text-[#5f594d]">
                  Gà Chăm Chỉ mang đến những món đồ độc đáo, phụ kiện,
                  đồ sưu tầm và quà tặng được chọn lọc để đồng hành cùng
                  bạn trên hành trình mỗi ngày.
                </p>

                <div className="mt-8 flex gap-3">
                  <a
                    href="#products"
                    className="inline-flex items-center justify-center rounded-xl bg-[#4f8f24] px-7 py-3.5 font-bold text-white shadow-lg shadow-lime-900/15 transition hover:-translate-y-0.5 hover:bg-[#3f771b]"
                  >
                    Khám phá ngay
                    <span className="ml-2">→</span>
                  </a>

                  <a
                    href="#categories"
                    className="inline-flex items-center justify-center rounded-xl border border-[#decfa8] bg-white/90 px-7 py-3.5 font-bold text-[#493f2d] transition hover:-translate-y-0.5 hover:border-lime-500 hover:text-lime-700"
                  >
                    Xem danh mục
                  </a>
                </div>

                <div className="mt-8 grid max-w-[620px] grid-cols-3 gap-3">
                  {benefits.map((benefit) => {
                    const Icon = benefit.icon;

                    return (
                      <div
                        key={benefit.title}
                        className="rounded-2xl border border-white bg-white/85 px-4 py-3 shadow-sm backdrop-blur"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#4f8f24]" />

                          <p className="font-bold text-[#365f1f]">
                            {benefit.title}
                          </p>
                        </div>

                        <p className="mt-1 text-xs text-[#777064]">
                          {benefit.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}