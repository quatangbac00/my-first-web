import FadeIn from "@/app/components/ui/FadeIn";

export default function Contact() {
  return (
    <FadeIn>
      <section id="contact" className="bg-orange-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-orange-600 shadow-sm">
              Liên hệ với Gà Chăm Chỉ
            </span>

            <h2 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              Bạn cần tư vấn hoặc đặt hàng?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              Liên hệ trực tiếp qua điện thoại, Zalo hoặc để lại thông tin bên
              dưới. Chúng mình sẽ phản hồi trong thời gian sớm nhất.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-3xl bg-gray-950 p-7 text-white shadow-xl sm:p-8">
              <h3 className="text-2xl font-bold">
                Thông tin cửa hàng
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Gà Chăm Chỉ chuyên đồ lưu niệm và quà tặng tại Đông Anh, Hà Nội.
              </p>

              <div className="mt-8 space-y-5">
                <div>
                  <p className="text-sm text-gray-400">
                    Số điện thoại / Zalo
                  </p>

                  <a
                    href="https://zalo.me/0964032893"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-lg font-semibold text-orange-400 transition hover:text-orange-300"
                  >
                    0964 032 893
                  </a>
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Email
                  </p>

                  <a
                    href="mailto:nguyendinhvinh2893@gmail.com"
                    className="mt-1 inline-block break-all font-semibold text-white transition hover:text-orange-400"
                  >
                    nguyendinhvinh2893@gmail.com
                  </a>
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Địa chỉ
                  </p>

                  <p className="mt-1 font-semibold leading-6">
                    Xã Việt Hùng, Huyện Đông Anh, TP. Hà Nội
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Giờ làm việc
                  </p>

                  <p className="mt-1 font-semibold">
                    08:00 – 17:30, tất cả các ngày trong tuần
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <a
                  href="https://web.facebook.com/MilitaryShopCosPlay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold transition hover:bg-blue-700"
                >
                  Facebook
                </a>

                <a
                  href="https://shopee.vn/gapy1993"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-orange-500 px-4 py-3 text-center text-sm font-semibold transition hover:bg-orange-600"
                >
                  Shopee
                </a>

                <a
                  href="https://www.tiktok.com/@momo_laclac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-center text-sm font-semibold transition hover:bg-white/20"
                >
                  TikTok
                </a>
              </div>
            </div>

            <form className="rounded-3xl border border-orange-100 bg-white p-6 shadow-xl shadow-orange-900/5 sm:p-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Họ và tên
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nhập họ và tên"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Số điện thoại
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Nhập số điện thoại"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Chủ đề
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Bạn cần hỗ trợ nội dung gì?"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Nội dung
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Nhập nội dung cần tư vấn..."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                />
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-xl bg-orange-500 px-8 py-3.5 font-semibold text-white transition hover:bg-orange-600 active:scale-[0.99] sm:w-auto"
              >
                Gửi liên hệ
              </button>

              <p className="mt-4 text-sm text-gray-500">
                Form này hiện mới là giao diện demo, chưa tự gửi email.
              </p>
            </form>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}