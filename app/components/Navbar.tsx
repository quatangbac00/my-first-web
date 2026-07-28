import Image from "next/image";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={55}
            height={55}
            priority
          />
        </a>

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#hero" className="hover:text-gray-500">
            Trang chủ
          </a>

          <a href="#about" className="hover:text-gray-500">
            Giới thiệu
          </a>

          <a href="#services" className="hover:text-gray-500">
            Dịch vụ
          </a>

          <a href="#products" className="hover:text-gray-500">
            Sản phẩm
          </a>

          <a href="#team" className="hover:text-gray-500">
            Đội ngũ
          </a>

          <a href="#contact" className="hover:text-gray-500">
            Liên hệ
          </a>
        </nav>
      </div>
    </header>
  );
}