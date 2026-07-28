"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Menu, MessageCircle, ShoppingCart, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/app/components/cart/CartProvider";
import CartDrawer from "@/app/components/cart/CartDrawer";

const NAV_ITEMS = [
  { label: "Trang chủ", href: "#hero" },
  { label: "Danh mục", href: "#categories" },
  { label: "Sản phẩm", href: "#products" },
  { label: "Giới thiệu", href: "#about" },
  { label: "Liên hệ", href: "#contact" },
] as const;

export default function Header() {
  const { cartCount } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const sectionIds = NAV_ITEMS.map((item) =>
        item.href.replace("#", "")
      );

      let currentSection = sectionIds[0];

      for (const id of sectionIds) {
        const element = document.getElementById(id);

        if (element) {
          const rect = element.getBoundingClientRect();

          if (rect.top <= 120) {
            currentSection = id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      isMobileMenuOpen || isCartOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen, isCartOpen]);

  const scrollToSection = useCallback((href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex h-18 items-center transition-all duration-300",
          isScrolled
            ? "border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-xl"
            : "bg-white/80 backdrop-blur-md"
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
          <a
            href="#hero"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("#hero");
            }}
            className="flex items-center gap-3"
          >
            <Image
              src="/images/logo.jpg"
              alt="Logo Gà Chăm Chỉ"
              width={52}
              height={52}
              priority
              className="rounded-xl object-cover"
            />

            <div>
              <p className="text-lg font-bold text-gray-900">
                Gà Chăm Chỉ
              </p>

              <p className="text-xs text-gray-500">
                Đồ lưu niệm & Quà tặng
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://zalo.me/0964032893"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 lg:inline-flex"
              aria-label="Liên hệ Zalo số 0964 032 893"
            >
              <MessageCircle className="h-4 w-4" />

              <span className="leading-tight">
                <span className="block text-xs font-normal text-blue-500">
                  SĐT / Zalo
                </span>
                0964 032 893
              </span>
            </a>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative hidden items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 active:scale-[0.98] md:inline-flex"
            >
              <ShoppingCart className="h-4 w-4" />
              Giỏ hàng

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="rounded-lg p-2 transition hover:bg-gray-100 md:hidden"
              aria-label="Mở menu"
            >
              <Menu className="h-6 w-6 text-gray-900" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-white transition-transform duration-300 md:hidden",
          isMobileMenuOpen
            ? "translate-x-0"
            : "translate-x-full"
        )}
      >
        <div className="flex h-18 items-center justify-between border-b border-gray-100 px-6">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.jpg"
              alt="Logo Gà Chăm Chỉ"
              width={46}
              height={46}
              className="rounded-xl object-cover"
            />

            <div>
              <p className="font-bold text-gray-900">
                Gà Chăm Chỉ
              </p>

              <p className="text-xs text-gray-500">
                Đồ lưu niệm & Quà tặng
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="rounded-lg p-2 transition hover:bg-gray-100"
            aria-label="Đóng menu"
          >
            <X className="h-6 w-6 text-gray-900" />
          </button>
        </div>

        <nav className="flex flex-col px-6 pt-6">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <button
                key={item.href}
                type="button"
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  "border-b border-gray-100 py-4 text-left text-lg font-medium transition",
                  isActive
                    ? "text-orange-600"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto space-y-3 px-6 pb-8">
          <a
            href="https://zalo.me/0964032893"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 py-3.5 font-semibold text-blue-700 transition hover:bg-blue-100"
          >
            <MessageCircle className="h-5 w-5" />
            Zalo: 0964 032 893
          </a>

          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsCartOpen(true);
            }}
            className="relative flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 font-semibold text-white transition hover:bg-orange-600"
          >
            <ShoppingCart className="h-5 w-5" />
            Giỏ hàng

            {cartCount > 0 && (
              <span className="absolute right-4 flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}