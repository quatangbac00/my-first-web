import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShoppingBag,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white text-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          {/* Thông tin cửa hàng */}
          <div>
            <h3 className="text-2xl font-bold text-orange-500">
              Gà Chăm Chỉ
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Đồ hóa trang, phụ kiện, vật phẩm sưu tầm và những món quà độc đáo
              tại Đông Anh, Hà Nội.
            </p>

            <div className="mt-6 space-y-4 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />

                <p>
                  Xã Việt Hùng, Huyện Đông Anh, TP. Hà Nội
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-orange-500" />

                <a
                  href="tel:0964032893"
                  className="font-semibold transition hover:text-orange-500"
                >
                  0964 032 893
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />

                <a
                  href="mailto:nguyendinhvinh2893@gmail.com"
                  className="break-all transition hover:text-orange-500"
                >
                  nguyendinhvinh2893@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />

                <p>
                  08:00 – 17:30
                  <span className="block text-gray-500">
                    Tất cả các ngày trong tuần
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Liên kết nhanh */}
          <div>
            <h4 className="text-lg font-bold">
              Hướng dẫn
            </h4>

            <nav className="mt-5 flex flex-col gap-3 text-sm text-gray-600">
              <a
                href="#products"
                className="transition hover:text-orange-500"
              >
                Tìm sản phẩm
              </a>

              <a
                href="#categories"
                className="transition hover:text-orange-500"
              >
                Danh mục sản phẩm
              </a>

              <a
                href="#about"
                className="transition hover:text-orange-500"
              >
                Giới thiệu cửa hàng
              </a>

              <a
                href="#contact"
                className="transition hover:text-orange-500"
              >
                Hướng dẫn liên hệ
              </a>

              <a
                href="https://zalo.me/0964032893"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-orange-500"
              >
                Đặt hàng qua Zalo
              </a>
            </nav>
          </div>

          {/* Chính sách */}
          <div>
            <h4 className="text-lg font-bold">
              Chính sách
            </h4>

            <div className="mt-5 flex flex-col gap-3 text-sm text-gray-600">
              <p>Chính sách giao hàng</p>
              <p>Chính sách đổi trả</p>
              <p>Chính sách bảo mật</p>
              <p>Hướng dẫn thanh toán</p>
              <p>Kiểm tra và xác nhận đơn hàng</p>
            </div>

            <h4 className="mt-8 text-lg font-bold">
              Kênh mua hàng
            </h4>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://web.facebook.com/MilitaryShopCosPlay"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Gà Chăm Chỉ"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:-translate-y-1 hover:bg-blue-700"
              >
                <span className="text-lg font-bold">f</span>
              </a>

              <a
                href="https://zalo.me/0964032893"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zalo Gà Chăm Chỉ"
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-blue-600"
              >
                <MessageCircle className="h-5 w-5" />
                Zalo
              </a>

              <a
                href="https://shopee.vn/gapy1993"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Shopee Gà Chăm Chỉ"
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-orange-600"
              >
                <ShoppingBag className="h-5 w-5" />
                Shopee
              </a>

              <a
                href="https://www.tiktok.com/@momo_laclac"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Gà Chăm Chỉ"
                className="flex h-11 items-center justify-center rounded-xl bg-black px-4 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-gray-800"
              >
                TikTok
              </a>
            </div>
          </div>

          {/* Bản đồ */}
          <div>
            <h4 className="text-lg font-bold">
              Vị trí cửa hàng
            </h4>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Xem vị trí khu vực Việt Hùng, Đông Anh, Hà Nội trên bản đồ.
            </p>

            <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm">
  <iframe
    title="Bản đồ cửa hàng Gà Chăm Chỉ"
    src="https://www.google.com/maps?q=21.149706417414105,105.85919485117849&z=18&output=embed"
    width="100%"
    height="260"
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="block w-full"
  />
</div>

            <a
  href="https://www.google.com/maps/search/?api=1&query=21.149706417414105,105.85919485117849"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 transition hover:text-orange-700"
>
  <MapPin className="h-4 w-4" />
  Mở bản đồ lớn
</a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-gray-950">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-center text-sm text-gray-400 md:flex-row">
          <p>
            © 2026 Gà Chăm Chỉ. All rights reserved.
          </p>

          <p>
            Đồ hóa trang, phụ kiện & quà tặng tại Đông Anh, Hà Nội
          </p>
        </div>
      </div>
    </footer>
  );
}