import type { Metadata } from "next";
import { supabase } from "../../../lib/supabase";
import { siteUrl } from "../../../lib/site-url";
import ProductDetailClient from "./ProductDetailClient";
import {
  formatPriceRange,
  getProductPriceRange,
  type PriceSource,
} from "../../../lib/pricing";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

type Product = {
  id: number;
  name: string;
  price: number;
  sale_price?: number | null;
  image_url: string | null;
  description: string | null;
  stock: number;
  is_active: boolean;
};

type ProductWithVariants = Product & {
  variants: PriceSource[];
};

async function getProduct(id: string): Promise<ProductWithVariants | null> {
  const productId = Number(id);

  if (!Number.isInteger(productId)) {
    return null;
  }

  const [productResult, variantResult] = await Promise.all([
    supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .eq("is_active", true)
      .single(),
    supabase
      .from("product_variants")
      .select("*")
      .eq("product_id", productId)
      .eq("is_active", true),
  ]);

  if (
    productResult.error ||
    variantResult.error ||
    !productResult.data
  ) {
    return null;
  }

  return {
    ...(productResult.data as Product),
    variants: (variantResult.data || []) as PriceSource[],
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Không tìm thấy sản phẩm",
      description: "Sản phẩm không tồn tại hoặc đã tạm ẩn.",
    };
  }

  const range = getProductPriceRange(product, product.variants);
  const priceText = range
    ? formatPriceRange(range.minPrice, range.maxPrice)
    : "Liên hệ để biết giá";

  const description =
    product.description?.trim().slice(0, 155) ||
    `Xem ${product.name} với giá ${priceText} tại Gà Chăm Chỉ.`;

  const productUrl = `${siteUrl}/products/${product.id}`;

  const images = product.image_url
    ? [
        {
          url: product.image_url,
          width: 1200,
          height: 1200,
          alt: product.name,
        },
      ]
    : [];

  return {
    title: product.name,
    description,

    alternates: {
      canonical: productUrl,
    },

    openGraph: {
      title: `${product.name} - ${priceText}`,
      description,
      url: productUrl,
      siteName: "Gà Chăm Chỉ",
      type: "website",
      locale: "vi_VN",
      images,
    },

    twitter: {
      card: "summary_large_image",
      title: `${product.name} - ${priceText}`,
      description,
      images: product.image_url ? [product.image_url] : [],
    },
  };
}

export default function ProductPage() {
  return <ProductDetailClient />;
}
