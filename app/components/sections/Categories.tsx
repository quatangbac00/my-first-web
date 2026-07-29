"use client";

import FadeIn from "@/app/components/ui/FadeIn";

const categories = [
  {
    title: "Nón & Mũ bảo hộ",
    desc: "Trang bị bảo vệ đầu",
    position: "0% 0%",
    category: "Nón & Mũ bảo hộ",
  },
  {
    title: "Áo & Vest Tactical",
    desc: "Vest và trang bị chiến thuật",
    position: "50% 0%",
    category: "Áo & Vest Tactical",
  },
  {
    title: "Găng tay",
    desc: "Găng tay bảo hộ",
    position: "100% 0%",
    category: "Găng tay",
  },
  {
    title: "Đèn pin",
    desc: "Đèn và thiết bị chiếu sáng",
    position: "0% 33.333%",
    category: "Đèn pin",
  },
  {
    title: "Balo & Túi",
    desc: "Balo và túi phụ kiện",
    position: "50% 33.333%",
    category: "Balo & Túi",
  },
  {
    title: "Mô hình",
    desc: "Figure và đồ sưu tầm",
    position: "100% 33.333%",
    category: "Mô hình",
  },
  {
    title: "Quà tặng",
    desc: "Quà tặng và gift set",
    position: "0% 66.666%",
    category: "Quà tặng",
  },
  {
    title: "Patch & Huy hiệu",
    desc: "Patch và phụ kiện trang trí",
    position: "50% 66.666%",
    category: "Patch & Huy hiệu",
  },
  {
    title: "Đồ linh tinh",
    desc: "Sản phẩm độc lạ khác",
    position: "100% 66.666%",
    category: "Đồ linh tinh",
  },
];

export default function Categories() {
  return (
    <FadeIn>
      <section
        id="categories"
        className="bg-[#fffdf8] py-12 sm:py-14"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-center gap-3">
            <span className="text-xl text-[#65963f]">
              🌿
            </span>

            <h2 className="text-center text-3xl font-black tracking-tight text-[#4a3827]">
              Danh mục nổi bật
            </h2>

            <span className="text-xl text-[#65963f]">
              🌿
            </span>
          </div>

          <p className="mt-3 text-center text-sm text-[#7a7162] sm:text-base">
            Khám phá các nhóm sản phẩm nổi bật tại Gà
            Chăm Chỉ
          </p>

          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9">
            {categories.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent(
                      "store-category-filter",
                      {
                        detail: item.category,
                      }
                    )
                  );

                  document
                    .getElementById("products")
                    ?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                }}
                className="group overflow-hidden rounded-2xl border border-[#eadfc8] bg-white p-3 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#95bd76] hover:shadow-[0_14px_35px_rgba(74,105,42,0.15)]"
              >
                <div
                  aria-hidden="true"
                  className="aspect-square w-full rounded-xl bg-[#fff9ed] bg-no-repeat transition duration-300 group-hover:scale-[1.03]"
                  style={{
                    backgroundImage:
                      "url('/images/category-icons-game.png')",
                    backgroundSize: "300% 400%",
                    backgroundPosition: item.position,
                  }}
                />

                <h3 className="mt-3 min-h-10 text-sm font-extrabold leading-5 text-[#3f392f]">
                  {item.title}
                </h3>

                <p className="mt-1 min-h-8 text-xs leading-4 text-[#8a8173]">
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