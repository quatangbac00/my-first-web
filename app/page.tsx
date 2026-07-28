import Hero from "@/app/components/sections/hero";
import Categories from "@/app/components/sections/Categories";
import FeaturedProducts from "@/app/components/sections/FeaturedProducts";
import About from "@/app/components/sections/about";
import Contact from "@/app/components/sections/contact";
import Footer from "@/app/components/layout/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <About />
      <Contact />
      <Footer />
    </>
  );
}