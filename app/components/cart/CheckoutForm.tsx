"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Copy, Facebook, Phone, X } from "lucide-react";
import { useCart } from "./CartProvider";

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ZALO_URL = "https://zalo.me/0964032893";
const FACEBOOK_URL = "https://web.facebook.com/MilitaryShopCosPlay";
const PHONE_NUMBER = "0964032893";

export default function CheckoutForm({
  isOpen,
  onClose,
}: CheckoutFormProps) {
  const { items, cartCount, cartTotal } = useCart();

  const [orderMessage, setOrderMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [showContactButtons, setShowContactButtons] = useState(false);

  function buildOrderMessage(form: HTMLFormElement) {
    const formData = new FormData(form);

    const customerName = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const address = String(formData.get("address") || "").trim();
    const note = String(formData.get("note") || "").trim();

    const productLines = items
      .map(
        (item, index) =>
          `${index + 1}. ${item.name}
Số lượng: ${item.quantity}
Thành tiền: ${(item.price * item.quantity).toLocaleString("vi-VN")}đ`
      )
      .join("\n\n");

    return `Xin chào Gà Chăm Chỉ,

Tôi muốn hỏi mua các sản phẩm sau:

${productLines}

Tổng dự kiến: ${cartTotal.toLocaleString("vi-VN")}đ

Thông tin khách hàng:
Họ tên: ${customerName}
Số điện thoại: ${phone}
Địa chỉ: ${address}
Ghi chú: ${note || "Không có"}

Nhờ shop kiểm tra và tư vấn giúp tôi.`;
  }

  async function copyMessage(message: string) {
    try {
      await navigator.clipboard.writeText(message);
      setNotice("Đã sao chép nội dung. Hãy dán vào cuộc trò chuyện với shop.");
    } catch {
      setNotice(
        "Không thể tự sao chép. Hãy bôi đen nội dung bên dưới và sao chép thủ công."
      );
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (items.length === 0) {
      setNotice("Giỏ hàng đang trống.");
      return;
    }

    const message = buildOrderMessage(event.currentTarget);

    setOrderMessage(message);
    setShowContactButtons(true);

    await copyMessage(message);
  }

  async function openContact(url: string) {
    if (orderMessage) {
      await copyMessage(orderMessage);
    }

    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handleClose() {
    setOrderMessage("");
    setNotice("");
    setShowContactButtons(false);
    onClose();
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-8">
      <div className="relative max-h-full w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
          aria-label="Đóng"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="pr-10">
          <p className="text-sm font-semibold text-orange-600">
            Liên hệ đặt hàng
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            Gửi nhu cầu mua hàng cho shop
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Giỏ hàng hiện có {cartCount} sản phẩm. Sau khi điền thông tin,
            website sẽ tạo sẵn nội dung để bạn gửi qua Zalo hoặc Facebook.
          </p>
        </div>

        {!showContactButtons ? (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="checkout-name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Họ và tên
              </label>

              <input
                id="checkout-name"
                name="name"
                type="text"
                required
                placeholder="Nhập họ và tên"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              />
            </div>

            <div>
              <label
                htmlFor="checkout-phone"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Số điện thoại
              </label>

              <input
                id="checkout-phone"
                name="phone"
                type="tel"
                required
                placeholder="Nhập số điện thoại"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              />
            </div>

            <div>
              <label
                htmlFor="checkout-address"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Địa chỉ nhận hàng
              </label>

              <textarea
                id="checkout-address"
                name="address"
                rows={3}
                required
                placeholder="Nhập địa chỉ nhận hàng"
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              />
            </div>

            <div>
              <label
                htmlFor="checkout-note"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Ghi chú
              </label>

              <textarea
                id="checkout-note"
                name="note"
                rows={3}
                placeholder="Màu sắc, mẫu mã hoặc yêu cầu cần tư vấn"
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              />
            </div>

            <div className="rounded-2xl bg-orange-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tổng dự kiến</span>

                <span className="text-xl font-bold text-orange-600">
                  {cartTotal.toLocaleString("vi-VN")}đ
                </span>
              </div>
            </div>

            {notice && (
              <p className="rounded-xl bg-blue-50 p-3 text-sm text-blue-700">
                {notice}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-orange-500 py-3.5 font-semibold text-white transition hover:bg-orange-600"
            >
              Tạo nội dung liên hệ
            </button>
          </form>
        ) : (
          <div className="mt-8">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="h-6 w-6" />
              <p className="font-semibold">Đã tạo nội dung liên hệ</p>
            </div>

            <textarea
              value={orderMessage}
              readOnly
              rows={13}
              className="mt-4 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-800"
            />

            {notice && (
              <p className="mt-3 rounded-xl bg-blue-50 p-3 text-sm text-blue-700">
                {notice}
              </p>
            )}

            <button
              type="button"
              onClick={() => copyMessage(orderMessage)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <Copy className="h-5 w-5" />
              Sao chép lại nội dung
            </button>

            <button
              type="button"
              onClick={() => openContact(ZALO_URL)}
              className="mt-3 w-full rounded-xl bg-blue-500 py-3.5 font-semibold text-white transition hover:bg-blue-600"
            >
              Mở Zalo và gửi cho shop
            </button>

            <button
              type="button"
              onClick={() => openContact(FACEBOOK_URL)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 py-3.5 font-semibold text-white transition hover:bg-blue-800"
            >
              <Facebook className="h-5 w-5" />
              Mở Facebook của shop
            </button>

            <a
              href={`tel:${PHONE_NUMBER}`}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 font-semibold text-white transition hover:bg-green-700"
            >
              <Phone className="h-5 w-5" />
              Gọi 0964 032 893
            </a>

            <p className="mt-4 text-center text-sm text-gray-500">
              Nội dung đã được sao chép. Khi Zalo hoặc Facebook mở ra, khách chỉ
              cần dán nội dung và bấm gửi.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}