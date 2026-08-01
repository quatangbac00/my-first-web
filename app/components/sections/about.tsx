import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Headphones,
  RotateCcw,
  Tags,
  Truck,
} from "lucide-react";

import FadeIn from "@/app/components/ui/FadeIn";

const journeySteps = [
  {
    src: "/images/journey/journey-step-1.png",
    alt: "Chú gà mệt mỏi và chưa biết bắt đầu từ đâu",
  },
  {
    src: "/images/journey/journey-step-2.png",
    alt: "Chú gà tìm hiểu và so sánh sản phẩm",
  },
  {
    src: "/images/journey/journey-step-3.png",
    alt: "Chú gà chọn được món đồ phù hợp",
  },
  {
    src: "/images/journey/journey-step-4.png",
    alt: "Chú gà vui vẻ và tự tin sử dụng trang bị",
  },
];

const benefits = [
  {
    icon: BadgeCheck,
    title: "Cam kết chính hãng",
    description: "Sản phẩm được chọn lọc",
  },
  {
    icon: Tags,
    title: "Giá tốt mỗi ngày",
    description: "Mua sắm hợp lý",
  },
  {
    icon: Truck,
    title: "Giao hàng nhanh",
    description: "Ship COD toàn quốc",
  },
  {
    icon: RotateCcw,
    title: "Đổi trả dễ dàng",
    description: "Hỗ trợ trong 7 ngày",
  },
  {
    icon: Headphones,
    title: "Hỗ trợ tận tâm",
    description:
      "Có thể nhắn tin bất cứ lúc nào – phản hồi trong khung giờ 08:00–17:30.",
  },
];

export default function About() {
  return (
    <FadeIn>
      <section
        id="about"
        className="overflow-hidden bg-[#fffaf0] py-14 sm:py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <span
                className="text-2xl text-[#e94b31]"
                aria-hidden="true"
              >
                ♥
              </span>

              <h2 className="text-3xl font-black tracking-tight text-[#4a3827] sm:text-4xl">
                Hành trình của Gà Chăm Chỉ
              </h2>

              <span
                className="text-2xl text-[#e94b31]"
                aria-hidden="true"
              >
                ♥
              </span>
            </div>

            <p className="mt-2 text-sm font-semibold text-[#756a59] sm:text-base">
              Nỗ lực mỗi ngày – Đam mê thăng hoa
            </p>
          </div>

          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {journeySteps.map((step, index) => (
              <div
                key={step.src}
                className="relative min-w-0"
              >
                <div className="relative aspect-[284/241] w-full overflow-hidden rounded-[22px] border border-[#efd9a4] bg-[#fff9e9] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(115,85,29,0.14)]">
                  <Image
                    src={step.src}
                    alt={step.alt}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                    className="object-contain"
                  />
                </div>

                {index < journeySteps.length - 1 && (
                  <div className="absolute -right-6 top-1/2 z-10 hidden -translate-y-1/2 lg:flex">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fffaf0] text-[#e86f1c]">
                      <ArrowRight className="h-8 w-8 stroke-[3]" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[#d9dfa9] bg-[#fbfff3] shadow-sm">
            <div className="grid grid-cols-1 divide-y divide-[#dde5c5] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5">
              {benefits.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex min-w-0 items-center gap-3 px-5 py-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf5df] text-[#4f8f24]">
                      <Icon className="h-6 w-6" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-extrabold text-[#3f4f2d]">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs text-[#777362]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
