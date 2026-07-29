"use client";

import Image from "next/image";
import {
  Headphones,
  Menu,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingCart,
  Truck,
  X,
} from "lucide-react";
import {
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

import { cn } from "@/lib/utils";
import { useCart } from "@/app/components/cart/CartProvider";
import CartDrawer from "@/app/components/cart/CartDrawer";

const SECTION_IDS = [
  "hero",
  "categories",
  "products",
  "about",
  "contact",
] as const;

const NAV_ITEMS = [
  {
    label: "Trang chủ",
    href: "#hero",
    activeId: "hero",
  },
  {
    label: "Danh mục",
    href: "#categories",
    activeId: "categories",
  },
  {
    label: "Sản phẩm",
    href: "#products",
    activeId: "products",
  },
  {
    label: "Cosplay",
    href: "#products",
    activeId: "",
  },
  {
    label: "Phụ kiện",
    href: "#products",
    activeId: "",
  },
  {
    label: "Đồ sưu tầm",
    href: "#products",
    activeId: "",
  },
  {
    label: "Giới thiệu",
    href: "#about",
    activeId: "about",
  },
  {
    label: "Liên hệ",
    href: "#contact",
    activeId: "contact",
  },
] as const;

export default function Header() {
  const { cartCount } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);
  const [activeSection, setActiveSection] =
    useState("hero");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 10);

      let currentSection = "hero";

      for (const id of SECTION_IDS) {
        const element = document.getElementById(id);

        if (!element) {
          continue;
        }

        const rect = element.getBoundingClientRect();

        if (rect.top <= 190) {
          currentSection = id;
        }
      }

      setActiveSection(currentSection);
    }

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

  const scrollToSection = useCallback(
    (href: string) => {
      const id = href.replace("#", "");
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      setIsMobileMenuOpen(false);
    },
    []
  );

  function handleSearch(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const query = searchQuery.trim();

    window.dispatchEvent(
      new CustomEvent("store-search", {
        detail: query,
      })
    );

    scrollToSection("#products");
  }

  return (
    <>
      <header
        className={cn(
          "sticky inset-x-0 top-0 z-50 border-b border-[#eadfca] bg-white/95 backdrop-blur-xl transition-shadow duration-300",
          isScrolled &&
            "shadow-[0_8px_30px_rgba(76,57,18,0.10)]"
        )}
      >
        {/* Thanh cam kết trên cùng */}
        <div className="hidden border-b border-[#eee4cf] bg-[#fff9eb] sm:block">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 px-5 py-2 text-[11px] font-medium text-[#5d5648] lg:grid-cols-4 lg:px-6 lg:text-xs">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#f07824]" />

              <span>Hàng chính hãng 100%</span>
            </div>

            <div className="flex items-center justify-center gap-2">
              <RotateCcw className="h-4 w-4 text-[#f07824]" />

              <span>Đổi trả dễ dàng trong 7 ngày</span>
            </div>

            <div className="flex items-center justify-center gap-2">
              <Truck className="h-4 w-4 text-[#f07824]" />

              <span>Giao hàng toàn quốc</span>
            </div>

            <div className="flex items-center justify-center gap-2">
              <Headphones className="h-4 w-4 text-[#f07824]" />

              <span>Tư vấn nhanh 24/7</span>
            </div>
          </div>
        </div>

        {/* Logo, tìm kiếm và giỏ hàng */}
        <div className="bg-white">
          <div className="mx-auto flex min-h-[82px] max-w-7xl items-center gap-4 px-4 sm:px-6">
            <a
              href="#hero"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("#hero");
              }}
              className="flex shrink-0 items-center gap-3"
            >
              <Image
                src="/images/logo.jpg"
                alt="Logo Gà Chăm Chỉ"
                width={62}
                height={62}
                priority
                className="h-[58px] w-[58px] rounded-full border-2 border-[#efd89d] object-cover shadow-sm"
              />

              <div>
                <p className="text-lg font-black tracking-tight text-[#326d24] sm:text-[22px]">
                  Gà Chăm Chỉ
                </p>

                <p className="hidden text-xs text-[#756e62] sm:block">
                  Đồ chơi · Cosplay · Collectibles
                </p>
              </div>
            </a>

            <form
              onSubmit={handleSearch}
              className="mx-auto hidden w-full max-w-[560px] items-center overflow-hidden rounded-xl border border-[#ddcfb1] bg-white shadow-sm md:flex"
            >
              <input
                type="search"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Bạn cần tìm gì hôm nay?"
                className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm text-[#39352d] outline-none placeholder:text-[#a79e8c]"
              />

              <button
                type="submit"
                className="flex h-12 min-w-14 items-center justify-center bg-[#4c9229] px-5 text-white transition hover:bg-[#39761c]"
                aria-label="Tìm kiếm sản phẩm"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>

            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative flex min-h-11 items-center gap-2 rounded-xl border border-[#9fc982] bg-[#fbfff8] px-4 text-sm font-bold text-[#326d24] transition hover:bg-[#edf8e6]"
              >
                <ShoppingCart className="h-5 w-5" />

                <span className="hidden sm:inline">
                  Giỏ hàng
                </span>

                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#e63a25] px-1.5 text-xs font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() =>
                  setIsMobileMenuOpen(true)
                }
                className="rounded-xl border border-[#e2d8c2] bg-white p-2.5 transition hover:bg-[#fff8e9] md:hidden"
                aria-label="Mở menu"
              >
                <Menu className="h-6 w-6 text-[#326d24]" />
              </button>
            </div>
          </div>

          {/* Tìm kiếm trên điện thoại */}
          <form
            onSubmit={handleSearch}
            className="mx-4 mb-3 flex overflow-hidden rounded-xl border border-[#ddcfb1] bg-white shadow-sm md:hidden"
          >
            <input
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Tìm sản phẩm..."
              className="min-w-0 flex-1 px-4 py-3 text-sm outline-none"
            />

            <button
              type="submit"
              className="bg-[#4c9229] px-4 text-white"
              aria-label="Tìm kiếm"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>
        </div>

        {/* Menu chính */}
        <div className="hidden border-t border-[#eee4cf] bg-[#fffdf8] md:block">
          <nav className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-5 lg:px-6">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.activeId !== "" &&
                activeSection === item.activeId;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() =>
                    scrollToSection(item.href)
                  }
                  className={cn(
                    "my-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold transition",
                    isActive
                      ? "bg-[#4c9229] text-white shadow-sm"
                      : "text-[#3f3a32] hover:bg-[#f3f8ed] hover:text-[#326d24]"
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Menu điện thoại */}
      <div
        className={cn(
          "fixed inset-0 z-[70] flex flex-col bg-[#fffdf7] transition-transform duration-300 md:hidden",
          isMobileMenuOpen
            ? "translate-x-0"
            : "translate-x-full"
        )}
      >
        <div className="flex min-h-[76px] items-center justify-between border-b border-[#eee2c5] px-5">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.jpg"
              alt="Logo Gà Chăm Chỉ"
              width={50}
              height={50}
              className="h-12 w-12 rounded-full border border-[#ead7a5] object-cover"
            />

            <div>
              <p className="font-black text-[#326d24]">
                Gà Chăm Chỉ
              </p>

              <p className="text-xs text-[#756d5e]">
                Đồ chơi · Cosplay · Quà tặng
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setIsMobileMenuOpen(false)
            }
            className="rounded-xl border border-[#e5dcc8] bg-white p-2.5"
            aria-label="Đóng menu"
          >
            <X className="h-6 w-6 text-[#453f35]" />
          </button>
        </div>

        <nav className="flex flex-col px-5 pt-5">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.activeId !== "" &&
              activeSection === item.activeId;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() =>
                  scrollToSection(item.href)
                }
                className={cn(
                  "border-b border-[#eee5d1] py-4 text-left text-lg font-semibold transition",
                  isActive
                    ? "text-[#4c9229]"
                    : "text-[#554f44]"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto px-5 pb-7">
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsCartOpen(true);
            }}
            className="relative flex w-full items-center justify-center gap-2 rounded-xl bg-[#4c9229] py-3.5 font-bold text-white"
          >
            <ShoppingCart className="h-5 w-5" />

            Giỏ hàng

            {cartCount > 0 && (
              <span className="absolute right-4 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#e63a25] px-1.5 text-xs font-bold text-white">
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