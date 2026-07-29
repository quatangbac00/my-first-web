import Image from "next/image";
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";

const paymentMethods = [
  {
    name: "Visa",
    src: "/images/footer/visa.svg",
    width: 72,
  },
  {
    name: "Mastercard",
    src: "/images/footer/mastercard.svg",
    width: 72,
  },
  {
    name: "MoMo",
    src: "/images/footer/momo.svg",
    width: 72,
  },
  {
    name: "ZaloPay",
    src: "/images/footer/zalopay.svg",
    width: 84,
  },
  {
    name: "COD",
    src: "/images/footer/cod.svg",
    width: 84,
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#e7d39b] bg-gradient-to-b from-[#fff4cf] to-[#ffebba] text-[#4b4031]">
      {/* Họa tiết nền */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-14 bottom-0 text-[150px] opacity-[0.07]"
      >
        🌿
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-14 bottom-0 scale-x-[-1] text-[150px] opacity-[0.07]"
      >
        🌿
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_1.25fr]">
          {/* Thương hiệu */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.jpg"
                alt="Logo Gà Chăm Chỉ"
                width={68}
                height={68}
                className="h-16 w-16 rounded-full border-2 border-[#e8c767] object-cover shadow-sm"
              />

              <div>
                <h3 className="text-2xl font-black text-[#4d812c]">
                  Gà Chăm Chỉ
                </h3>

                <p className="mt-1 text-xs font-semibold text-[#766a56]">
                  Đồ chơi · Cosplay · Quà tặng
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-[#716653]">
              Chuyên cung cấp đồ hóa trang, phụ kiện, vật phẩm sưu tầm và
              những món quà độc đáo. Uy tín, chất lượng và tận tâm.
            </p>

            {/* Các kênh thật của cửa hàng */}
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="https://web.facebook.com/MilitaryShopCosPlay"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#dfcd9f] bg-white/85 px-3 text-xs font-bold text-[#4d4437] shadow-sm transition hover:-translate-y-1 hover:border-[#6b9e4d]"
              >
                <Image
                  src="/images/footer/facebook.svg"
                  alt=""
                  width={26}
                  height={26}
                  className="h-6 w-6"
                />
                Facebook
              </a>

              <a
                href="https://zalo.me/0964032893"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#dfcd9f] bg-white/85 px-3 text-xs font-bold text-[#4d4437] shadow-sm transition hover:-translate-y-1 hover:border-[#6b9e4d]"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1677ff] text-[8px] font-black text-white">
                  Zalo
                </span>
                Zalo
              </a>

              <a
                href="https://shopee.vn/gapy1993"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#dfcd9f] bg-white/85 px-3 text-xs font-bold text-[#4d4437] shadow-sm transition hover:-translate-y-1 hover:border-[#6b9e4d]"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#ee4d2d] text-white">
                  <ShoppingBag className="h-4 w-4" />
                </span>
                Shopee
              </a>

              <a
                href="https://www.tiktok.com/@momo_laclac"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#dfcd9f] bg-white/85 px-3 text-xs font-bold text-[#4d4437] shadow-sm transition hover:-translate-y-1 hover:border-[#6b9e4d]"
              >
                <Image
                  src="/images/footer/tiktok.svg"
                  alt=""
                  width={26}
                  height={26}
                  className="h-6 w-6 rounded-md"
                />
                TikTok
              </a>
            </div>
          </div>

          {/* Về chúng tôi */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-wide text-[#493827]">
              Về chúng tôi
            </h4>

            <nav className="mt-5 flex flex-col gap-3 text-sm text-[#716653]">
              <a
                href="#about"
                className="transition hover:text-[#4f8f24]"
              >
                Giới thiệu cửa hàng
              </a>

              <a
                href="#categories"
                className="transition hover:text-[#4f8f24]"
              >
                Danh mục sản phẩm
              </a>

              <a
                href="#products"
                className="transition hover:text-[#4f8f24]"
              >
                Sản phẩm nổi bật
              </a>

              <a
                href="#contact"
                className="transition hover:text-[#4f8f24]"
              >
                Kênh liên hệ
              </a>
            </nav>
          </div>

          {/* Hỗ trợ khách hàng */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-wide text-[#493827]">
              Hỗ trợ khách hàng
            </h4>

            <div className="mt-5 flex flex-col gap-3 text-sm text-[#716653]">
              <span>Hướng dẫn mua hàng</span>
              <span>Chính sách vận chuyển</span>
              <span>Chính sách đổi trả</span>
              <span>Hình thức thanh toán</span>
              <span>Câu hỏi thường gặp</span>
            </div>
          </div>

          {/* Thông tin liên hệ */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-wide text-[#493827]">
              Thông tin liên hệ
            </h4>

            <div className="mt-5 space-y-4 text-sm text-[#716653]">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#e27625]" />

                <p>
                  Xã Việt Hùng, Huyện Đông Anh,
                  <br />
                  TP. Hà Nội
                </p>
              </div>

              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 shrink-0 text-[#e27625]" />

                <a
                  href="https://zalo.me/0964032893"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-extrabold transition hover:text-[#4f8f24]"
                >
                  Zalo: 0964 032 893
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#e27625]" />

                <a
                  href="mailto:nguyendinhvinh2893@gmail.com"
                  className="break-all transition hover:text-[#4f8f24]"
                >
                  nguyendinhvinh2893@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#e27625]" />

                <p>
                  08:00 – 17:30
                  <span className="block text-xs text-[#8a7c65]">
                    Tất cả các ngày trong tuần
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Thanh cuối và phương thức thanh toán */}
        <div className="mt-10 grid gap-6 border-t border-[#dcc583] pt-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h4 className="text-sm font-black uppercase tracking-wide text-[#493827]">
              Hỗ trợ thanh toán
            </h4>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {paymentMethods.map((method) => (
                <div
                  key={method.name}
                  className="flex h-11 items-center justify-center overflow-hidden rounded-lg border border-[#dac68f] bg-white px-2 shadow-sm"
                >
                  <Image
                    src={method.src}
                    alt={method.name}
                    width={method.width}
                    height={38}
                    className="h-8 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-[#81725a] lg:text-right">
            © 2026 Gà Chăm Chỉ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}