import Link from "next/link";

import Footer from "@/app/components/layout/footer";

type PolicySection = {
  title: string;
  paragraphs: string[];
};

type PolicyPageProps = {
  title: string;
  introduction: string;
  sections: PolicySection[];
};

export default function PolicyPage({
  title,
  introduction,
  sections,
}: PolicyPageProps) {
  return (
    <>
      <main className="bg-[#fffaf0] px-4 py-10 sm:px-6 sm:py-14">
        <article className="mx-auto max-w-4xl rounded-3xl border border-[#eadfc8] bg-white p-6 shadow-sm sm:p-10">
          <Link
            href="/"
            className="text-sm font-bold text-[#4f8f24] transition hover:text-[#e6532f]"
          >
            ← Quay lại trang chủ
          </Link>

          <h1 className="mt-6 text-3xl font-black tracking-tight text-[#3f392f] sm:text-4xl">
            {title}
          </h1>

          <p className="mt-4 leading-7 text-[#716653]">
            {introduction}
          </p>

          <div className="mt-8 space-y-7">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-black text-[#4d812c]">
                  {section.title}
                </h2>

                <div className="mt-3 space-y-3 leading-7 text-[#5f594d]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-9 rounded-2xl bg-[#f2faec] p-4 text-sm leading-6 text-[#496338]">
            Có thể nhắn tin bất cứ lúc nào – phản hồi trong khung giờ
            08:00–17:30. Zalo hỗ trợ: 0964 032 893.
          </p>
        </article>
      </main>

      <Footer />
    </>
  );
}
