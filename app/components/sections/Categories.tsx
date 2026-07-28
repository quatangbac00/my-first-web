import FadeIn from "@/app/components/ui/FadeIn";
const categories = [
  {
    icon: "🖼️",
    title: "Poster",
    desc: "Tranh truyền động lực",
  },
  {
    icon: "🏷️",
    title: "Sticker",
    desc: "Sticker dễ thương",
  },
  {
    icon: "📒",
    title: "Sổ tay",
    desc: "Sổ ghi chép sáng tạo",
  },
  {
    icon: "🎁",
    title: "Quà tặng",
    desc: "Đồ lưu niệm ý nghĩa",
  },
  {
    icon: "🧸",
    title: "Phụ kiện",
    desc: "Móc khóa, huy hiệu...",
  },
];

export default function Categories() {
  return (
    <FadeIn>
      <section id="categories" className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Danh mục sản phẩm
          </h2>

          <p className="mt-3 text-center text-gray-500">
            Khám phá những sản phẩm truyền cảm hứng của Gà Chăm Chỉ
          </p>

          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {categories.map((item) => (
              <button
                key={item.title}
                type="button"
                className="rounded-2xl border border-gray-200 bg-white p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg"
              >
                <div className="mb-4 text-5xl" aria-hidden="true">
                  {item.icon}
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {item.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </FadeIn>
  );
}