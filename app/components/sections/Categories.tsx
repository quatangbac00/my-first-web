"use client";

import FadeIn from "@/app/components/ui/FadeIn";

const categories = [
  {
    title: "Phụ kiện đầu",
    desc: "Nón & mũ bảo hộ",
    position: "0% 0%",
    value: "Nón & Mũ bảo hộ",
  },
  {
    title: "Phụ kiện thân",
    desc: "Áo, vest & giáp",
    position: "50% 0%",
    value: "Áo & Vest Tactical",
  },
  {
    title: "Phụ kiện cầm tay",
    desc: "Găng tay & dụng cụ",
    position: "100% 0%",
    value: "Găng tay",
  },
  {
    title: "Phụ kiện trang bị",
    desc: "Đèn & thiết bị",
    position: "0% 33.333%",
    value: "Đèn pin",
  },
  {
    title: "Mô hình",
    desc: "Figure & mô hình",
    position: "50% 33.333%",
    value: "Mô hình",
  },
  {
    title: "Quà tặng",
    desc: "Quà & gift set",
    position: "100% 33.333%",
    value: "Quà tặng",
  },
  {
    title: "Trang bị khác",
    desc: "Balo & túi",
    position: "0% 66.666%",
    value: "Balo & Túi",
  },
  {
    title: "Đồ linh tinh",
    desc: "Sản phẩm khác",
    position: "50% 66.666%",
    value: "Đồ linh tinh",
  },
  {
    title: "Item sở thích",
    desc: "Patch & huy hiệu",
    position: "100% 66.666%",
    value: "Patch & Huy hiệu",
  },
  {
    title: "Đồ độc lạ",
    desc: "Món đặc biệt",
    position: "50% 0%",
    value: "Chưa phân loại",
  },
  {
    title: "Đồ sưu tầm",
    desc: "Vật phẩm tuyển chọn",
    position: "100% 33.333%",
    value: "Mô hình",
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

          <div className="mt-9 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 [scrollbar-width:thin] lg:grid lg:grid-cols-11 lg:gap-1.5 lg:overflow-visible lg:pb-0">
            {categories.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent(
                      "store-category-filter",
                      {
                        detail: item.value,
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
                className="group w-36 shrink-0 snap-start rounded-2xl border border-[#eadfc8] bg-white p-2 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#95bd76] hover:shadow-[0_14px_35px_rgba(74,105,42,0.15)] sm:w-40 lg:w-auto lg:min-w-0 lg:rounded-xl lg:p-1.5"
              >
                <div
                  aria-hidden="true"
                  className="h-24 w-full rounded-xl bg-[#fff9ed] bg-no-repeat transition duration-300 group-hover:scale-[1.03] lg:h-11 lg:rounded-lg"
                  style={{
                    backgroundImage:
                      "url('/images/category-icons-game.png')",
                    backgroundSize: "300% 400%",
                    backgroundPosition: item.position,
                  }}
                />

                <h3 className="mt-2 text-sm font-extrabold leading-5 text-[#3f392f] lg:mt-1.5 lg:text-[11px] lg:leading-[0.9rem]">
                  {item.title}
                </h3>

                <p className="mt-1 text-xs leading-4 text-[#8a8173] lg:text-[10px] lg:leading-3">
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
