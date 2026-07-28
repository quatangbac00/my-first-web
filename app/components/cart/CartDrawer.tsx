"use client";

import Image from "next/image";
import { useState } from "react";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { useCart } from "./CartProvider";
import CheckoutForm from "./CheckoutForm";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
}: CartDrawerProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const {
    items,
    cartCount,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const openCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
    onClose();
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[70] bg-black/40 transition-opacity ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-5 w-5 text-orange-500" />

            <div>
              <h2 className="font-bold text-gray-900">Giỏ hàng</h2>

              <p className="text-sm text-gray-500">
                {cartCount} sản phẩm
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
            aria-label="Đóng giỏ hàng"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-50">
              <ShoppingCart className="h-9 w-9 text-orange-500" />
            </div>

            <h3 className="mt-5 text-lg font-bold text-gray-900">
              Giỏ hàng đang trống
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Hãy thêm sản phẩm bạn yêu thích vào giỏ hàng.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Tiếp tục mua hàng
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-gray-200 p-3"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={88}
                    height={88}
                    className="h-22 w-22 rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="line-clamp-2 font-semibold text-gray-900">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-sm font-bold text-orange-600">
                          {item.price.toLocaleString("vi-VN")}đ
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                        aria-label={`Xóa ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          className="p-2 transition hover:bg-gray-100"
                          aria-label={`Giảm số lượng ${item.name}`}
                        >
                          <Minus className="h-4 w-4" />
                        </button>

                        <span className="min-w-9 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          className="p-2 transition hover:bg-gray-100"
                          aria-label={`Tăng số lượng ${item.name}`}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="font-bold text-gray-900">
                        {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tổng cộng</span>

                <span className="text-xl font-bold text-orange-600">
                  {cartTotal.toLocaleString("vi-VN")}đ
                </span>
              </div>

              <button
                type="button"
                onClick={openCheckout}
                className="mt-5 w-full rounded-xl bg-orange-500 py-3.5 font-semibold text-white transition hover:bg-orange-600"
              >
                Thanh toán
              </button>

              <button
                type="button"
                onClick={clearCart}
                className="mt-3 w-full rounded-xl border border-gray-200 py-3 font-semibold text-gray-600 transition hover:bg-gray-50"
              >
                Xóa toàn bộ giỏ hàng
              </button>
            </div>
          </>
        )}
      </aside>

      <CheckoutForm
        isOpen={isCheckoutOpen}
        onClose={closeCheckout}
      />
    </>
  );
}