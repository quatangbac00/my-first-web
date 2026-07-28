import {
  Phone,
  ShoppingBag,
} from "lucide-react";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-7 sm:right-6">
      {/* Gọi điện */}
      <a
        href="tel:0964032893"
        aria-label="Gọi điện cho Gà Chăm Chỉ"
        className="group flex items-center justify-end"
      >
        <span className="mr-3 hidden rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-lg group-hover:block sm:group-hover:block">
          Gọi 0964 032 893
        </span>

        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition duration-200 hover:-translate-y-1 hover:bg-green-600 sm:h-14 sm:w-14">
          <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
        </span>
      </a>

      {/* Zalo */}
      <a
        href="https://zalo.me/0964032893"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Liên hệ Gà Chăm Chỉ qua Zalo"
        className="group flex items-center justify-end"
      >
        <span className="mr-3 hidden rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-lg group-hover:block sm:group-hover:block">
          Nhắn qua Zalo
        </span>

        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition duration-200 hover:-translate-y-1 hover:bg-blue-600 sm:h-14 sm:w-14">
          <span className="text-sm font-extrabold sm:text-base">
            Zalo
          </span>
        </span>
      </a>

      {/* Facebook */}
      <a
        href="https://web.facebook.com/MilitaryShopCosPlay"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook Gà Chăm Chỉ"
        className="group flex items-center justify-end"
      >
        <span className="mr-3 hidden rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-lg group-hover:block sm:group-hover:block">
          Facebook
        </span>

        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-700 text-white shadow-lg transition duration-200 hover:-translate-y-1 hover:bg-blue-800 sm:h-14 sm:w-14">
          <span className="text-2xl font-bold leading-none">
            f
          </span>
        </span>
      </a>

      {/* Shopee */}
      <a
        href="https://shopee.vn/gapy1993"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Gian hàng Shopee Gà Chăm Chỉ"
        className="group flex items-center justify-end"
      >
        <span className="mr-3 hidden rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-lg group-hover:block sm:group-hover:block">
          Mua trên Shopee
        </span>

        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg transition duration-200 hover:-translate-y-1 hover:bg-orange-600 sm:h-14 sm:w-14">
          <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />
        </span>
      </a>
    </div>
  );
}