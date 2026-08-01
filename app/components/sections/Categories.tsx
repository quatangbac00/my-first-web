"use client";

import FadeIn from "@/app/components/ui/FadeIn";
import { storefrontCategories } from "@/lib/storefront-categories";

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

          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {storefrontCategories.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent(
                      "store-category-filter",
                      {
                        detail: item.label,
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
                className="group rounded-2xl border border-[#eadfc8] bg-white p-3 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#95bd76] hover:shadow-[0_14px_35px_rgba(74,105,42,0.15)] lg:p-4"
              >
                <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#fff9ed]">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="h-full w-full object-contain object-center transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                <h3 className="mt-3 text-sm font-extrabold leading-5 text-[#3f392f] sm:text-base">
                  {item.label}
                </h3>

                <p className="mt-1 text-xs leading-4 text-[#8a8173] sm:text-sm">
                  {item.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
