import Image from "next/image";
import {
  ArrowUpRight,
  MapPin,
  MessageCircle,
  Phone,
  ShoppingBag,
} from "lucide-react";

import FadeIn from "@/app/components/ui/FadeIn";

const contactItems = [
  {
    title: "Chat Zalo",
    description: "Tư vấn nhanh và hỗ trợ đặt hàng",
    href: "https://zalo.me/0964032893",
    buttonText: "Chat ngay",
    type: "zalo",
  },
  {
    title: "Facebook",
    description: "Xem sản phẩm mới và tin tức cửa hàng",
    href: "https://web.facebook.com/MilitaryShopCosPlay",
    buttonText: "Truy cập",
    type: "facebook",
  },
  {
    title: "Shopee",
    description: "Tham khảo thêm sản phẩm của cửa hàng",
    href: "https://shopee.vn/gapy1993",
    buttonText: "Mở Shopee",
    type: "shopee",
  },
  {
    title: "TikTok",
    description: "Theo dõi video và nội dung mới",
    href: "https://www.tiktok.com/@momo_laclac",
    buttonText: "Xem TikTok",
    type: "tiktok",
  },
  {
    title: "Hotline",
    description: "Tư vấn trực tiếp mỗi ngày",
    href: "tel:0964032893",
    buttonText: "Gọi ngay",
    type: "phone",
  },
] as const;

export default function Contact() {
  return (
    <FadeIn>
      <section
        id="contact"
        className="border-t border-[#eadcae] bg-[#fff9e9] py-12 sm:py-14"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="text-xl" aria-hidden="true">
                🌿
              </span>

              <h2 className="text-3xl font-black uppercase tracking-tight text-[#493827]">
                Liên hệ & Hỗ trợ
              </h2>

              <span className="text-xl" aria-hidden="true">
                🌿
              </span>
            </div>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#756b5c] sm:text-base">
              Kết nối với Gà Chăm Chỉ để được tư vấn sản phẩm, hỗ trợ đặt
              hàng và giải đáp thông tin nhanh chóng.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.35fr_0.85fr]">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {contactItems.map((item) => (
                <article
                  key={item.title}
                  className="flex min-h-[145px] flex-col rounded-2xl border border-[#eadbb4] bg-white/80 p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#9bc27e] hover:shadow-[0_14px_32px_rgba(86,105,51,0.12)]"
                >
                  <div className="flex items-center gap-3">
                    {item.type === "zalo" && (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#287be5] text-sm font-black text-white">
                        Zalo
                      </div>
                    )}

                    {item.type === "facebook" && (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
                        <Image
                          src="/images/footer/facebook.svg"
                          alt="Facebook"
                          width={48}
                          height={48}
                          className="h-12 w-12 object-contain"
                        />
                      </div>
                    )}

                    {item.type === "shopee" && (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ee4d2d] text-white">
                        <ShoppingBag className="h-6 w-6" />
                      </div>
                    )}

                    {item.type === "tiktok" && (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#111111]">
                        <Image
                          src="/images/footer/tiktok.svg"
                          alt="TikTok"
                          width={48}
                          height={48}
                          className="h-12 w-12 object-contain"
                        />
                      </div>
                    )}

                    {item.type === "phone" && (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e94d38] text-white">
                        <Phone className="h-6 w-6" />
                      </div>
                    )}

                    <div className="min-w-0">
                      <h3 className="text-lg font-black text-[#372f27]">
                        {item.title}
                      </h3>

                      {item.type === "phone" && (
                        <p className="mt-0.5 font-black text-[#df3e2b]">
                          0964 032 893
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-5 text-[#796f60]">
                    {item.description}
                  </p>

                  <a
                    href={item.href}
                    target={
                      item.type === "phone" ? undefined : "_blank"
                    }
                    rel={
                      item.type === "phone"
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="mt-auto inline-flex w-fit items-center gap-1.5 pt-3 text-sm font-extrabold text-[#4c842c] transition hover:text-[#e6532f]"
                  >
                    {item.type === "zalo" && (
                      <MessageCircle className="h-4 w-4" />
                    )}

                    {item.type === "phone" && (
                      <Phone className="h-4 w-4" />
                    )}

                    {item.buttonText}

                    {item.type !== "phone" &&
                      item.type !== "zalo" && (
                        <ArrowUpRight className="h-4 w-4" />
                      )}
                  </a>
                </article>
              ))}
            </div>

            <article className="overflow-hidden rounded-2xl border border-[#eadbb4] bg-white p-3 shadow-sm">
              <div className="flex items-center justify-between gap-3 px-2 pb-3">
                <div>
                  <h3 className="text-lg font-black text-[#3d342a]">
                    Vị trí cửa hàng
                  </h3>

                  <p className="mt-1 text-sm text-[#766d5e]">
                    Việt Hùng, Đông Anh, Hà Nội
                  </p>
                </div>

                <MapPin className="h-7 w-7 shrink-0 text-[#e6532f]" />
              </div>

              <div className="overflow-hidden rounded-xl border border-[#eee3cb] bg-[#f2efe7]">
                <iframe
                  title="Bản đồ cửa hàng Gà Chăm Chỉ"
                  src="https://www.google.com/maps?q=21.149706417414105,105.85919485117849&z=17&output=embed"
                  width="100%"
                  height="310"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block w-full"
                />
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=21.149706417414105,105.85919485117849"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 px-2 text-sm font-extrabold text-[#d96325] transition hover:text-[#4c842c]"
              >
                <MapPin className="h-4 w-4" />
                Mở bản đồ lớn
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </article>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}