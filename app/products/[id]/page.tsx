import type { Metadata } from "next";
import { supabase } from "../../../lib/supabase";
import { siteUrl } from "../../../lib/site-url";
import ProductDetailClient from "./ProductDetailClient";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string | null;
  description: string | null;
  stock: number;
  is_active: boolean;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price);
}

async function getProduct(id: string): Promise<Product | null> {
  const productId = Number(id);

  if (!Number.isInteger(productId)) {
    return null;
  }

  const { data, error } = await supabase
    .from("products")
    .select(
      "id, name, price, image_url, description, stock, is_active"
    )
    .eq("id", productId)
    .eq("is_active", true)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
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

  const priceText = `${formatPrice(Number(product.price))}₫`;

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
