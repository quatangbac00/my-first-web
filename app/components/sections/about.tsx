import Image from "next/image";
import FadeIn from "@/app/components/ui/FadeIn";

const features = [
  {
    emoji: "🎁",
    title: "Đồ lưu niệm ý nghĩa",
    description:
      "Mỗi sản phẩm đều mang theo một câu chuyện và một lời động viên dành cho người nhận.",
  },
  {
    emoji: "🎨",
    title: "Thiết kế truyền động lực",
    description:
      "Poster, sticker và các sản phẩm sáng tạo giúp tiếp thêm cảm hứng mỗi ngày.",
  },
  {
    emoji: "🛠️",
    title: "Thủ công tỉ mỉ",
    description:
      "Được chăm chút cẩn thận trong từng chi tiết để tạo nên món quà đáng nhớ.",
  },
  {
    emoji: "🚚",
    title: "Giao hàng toàn quốc",
    description:
      "Đóng gói cẩn thận và giao hàng nhanh chóng trên khắp Việt Nam.",
  },
];

export default function About() {
  return (
    <FadeIn>
      <section
        id="about"
        className="py-24 bg-[#FFFDF8]"
      >
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
                Về Gà Chăm Chỉ
              </span>

              <h2 className="mt-6 text-4xl lg:text-5xl font-bold text-[#2E2E2E] leading-tight">
                Mỗi món quà đều mang theo
                <br />
                một nguồn cảm hứng.
              </h2>

              <p className="mt-6 text-gray-600 leading-8">
                Gà Chăm Chỉ được tạo nên với mong muốn mang đến những món đồ lưu
                niệm không chỉ đẹp mắt mà còn truyền cảm hứng tích cực. Chúng mình
                tin rằng mỗi món quà nhỏ đều có thể trở thành một lời động viên,
                giúp bạn và những người thân yêu có thêm động lực trên hành trình
                chinh phục ước mơ.
              </p>

              <div className="grid sm:grid-cols-2 gap-5 mt-10">
                {features.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-3xl bg-white p-6 shadow-sm border border-yellow-100 hover:shadow-lg transition"
                  >
                    <div className="text-3xl">
                      {item.emoji}
                    </div>

                    <h3 className="mt-4 font-semibold text-lg text-[#2E2E2E]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm text-gray-600 leading-6">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

            </div>

            {/* Right */}
            <div className="relative">
  <Image
                src="/images/about.jpg"
                alt="Gà Chăm Chỉ"
                width={700}
                height={700}
                className="w-full rounded-3xl object-cover shadow-xl"
              />

              <div className="absolute -bottom-6 -left-6 bg-[#F5C242] rounded-2xl px-6 py-5 shadow-lg">
                <p className="text-3xl font-bold text-[#2E2E2E]">100%</p>
                <p className="text-sm text-[#2E2E2E]">
                  Tâm huyết trong
                  <br />
                  từng sản phẩm
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>
    </FadeIn>
  );
}
            