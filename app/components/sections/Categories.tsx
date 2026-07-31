"use client";

import FadeIn from "@/app/components/ui/FadeIn";

const categories = [
  {
    title: "Phụ kiện đầu",
    desc: "Nón & mũ bảo hộ",
    image: "/images/categories/head-accessories.jpg",
    value: "Nón & Mũ bảo hộ",
  },
  {
    title: "Phụ kiện thân",
    desc: "Áo, vest & giáp",
    image: "/images/categories/body-accessories.jpg",
    value: "Áo & Vest Tactical",
  },
  {
    title: "Phụ kiện cầm tay",
    desc: "Găng tay & dụng cụ",
    image: "/images/categories/hand-accessories.jpg",
    value: "Găng tay",
  },
  {
    title: "Phụ kiện trang bị",
    desc: "Đèn & thiết bị",
    image: "/images/categories/equipment-accessories.jpg",
    value: "Đèn pin",
  },
  {
    title: "Mô hình",
    desc: "Figure & mô hình",
    image: "/images/categories/models.jpg",
    value: "Mô hình",
  },
  {
    title: "Quà tặng",
    desc: "Quà & gift set",
    image: "/images/categories/gifts.jpg",
    value: "Quà tặng",
  },
  {
    title: "Trang bị khác",
    desc: "Balo & túi",
    image: "/images/categories/other-equipment.jpg",
    value: "Balo & Túi",
  },
  {
    title: "Đồ linh tinh",
    desc: "Sản phẩm khác",
    image: "/images/categories/miscellaneous.jpg",
    value: "Đồ linh tinh",
  },
  {
    title: "Item sở thích",
    desc: "Patch & huy hiệu",
    image: "/images/categories/hobby-items.jpg",
    value: "Patch & Huy hiệu",
  },
  {
    title: "Đồ độc lạ",
    desc: "Món đặc biệt",
    image: "/images/categories/unique-items.jpg",
    value: "Chưa phân loại",
  },
  {
    title: "Đồ sưu tầm",
    desc: "Vật phẩm tuyển chọn",
    image: "/images/categories/collectibles.jpg",
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

          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-12 lg:gap-4">
            {categories.map((item, index) => (
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
                className={`group rounded-2xl border border-[#eadfc8] bg-white p-3 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#95bd76] hover:shadow-[0_14px_35px_rgba(74,105,42,0.15)] lg:col-span-2 lg:p-4 ${index === 6 ? "lg:col-start-2" : ""}`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#fff9ed]">
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-contain object-center transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                <h3 className="mt-3 text-sm font-extrabold leading-5 text-[#3f392f] sm:text-base">
                  {item.title}
                </h3>

                <p className="mt-1 text-xs leading-4 text-[#8a8173] sm:text-sm">
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
