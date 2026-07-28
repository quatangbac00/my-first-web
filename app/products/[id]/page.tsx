"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";
import { useCart } from "../../components/cart/CartProvider";

type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  description: string;
  stock: number;
  is_active: boolean;
};

type ProductImage = {
  id: number;
  product_id: number;
  image_url: string;
  sort_order: number;
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);

  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [extraImages, setExtraImages] = useState<ProductImage[]>([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadProduct() {
      if (!Number.isInteger(productId)) {
        setMessage("Mã sản phẩm không hợp lệ.");
        setLoading(false);
        return;
      }

      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .eq("is_active", true)
        .single();

      if (productError || !productData) {
        setMessage("Không tìm thấy sản phẩm.");
        setLoading(false);
        return;
      }

      const { data: imageData } = await supabase
        .from("product_images")
        .select("*")
        .eq("product_id", productId)
        .order("sort_order", { ascending: true })
        .order("id", { ascending: true });

      setProduct(productData);
      setSelectedImage(productData.image_url || "");
      setExtraImages(imageData || []);
      setLoading(false);
    }

    loadProduct();
  }, [productId]);

  function handleAddToCart() {
    if (!product || product.stock <= 0) {
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image_url,
      description: product.description || "",
      category: "Sản phẩm",
    } as any);
  }

  function formatPrice(price: number) {
    return new Intl.NumberFormat("vi-VN").format(price);
  }

  if (loading) {
    return (
      <main style={pageStyle}>
        <p style={{ color: "white", textAlign: "center" }}>
          Đang tải sản phẩm...
        </p>
      </main>
    );
  }

  if (!product) {
    return (
      <main style={pageStyle}>
        <div style={errorBoxStyle}>
          <h1>Không tìm thấy sản phẩm</h1>

          <p style={{ marginTop: "10px" }}>{message}</p>

          <Link href="/" style={backLinkStyle}>
            ← Quay lại trang chủ
          </Link>
        </div>
      </main>
    );
  }

  const allImages = [
    {
      id: `main-${product.id}`,
      image_url: product.image_url,
    },
    ...extraImages,
  ].filter((image) => image.image_url);

  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <Link href="/" style={topBackLinkStyle}>
          ← Quay lại trang chủ
        </Link>

        <div style={productLayoutStyle}>
          <section>
            <div style={mainImageBoxStyle}>
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product.name}
                  style={mainImageStyle}
                />
              ) : (
                <div style={noImageStyle}>Chưa có ảnh</div>
              )}
            </div>

            {allImages.length > 1 && (
              <div style={thumbnailListStyle}>
                {allImages.map((image) => {
                  const isSelected = selectedImage === image.image_url;

                  return (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() => setSelectedImage(image.image_url)}
                      aria-label="Xem ảnh sản phẩm"
                      style={{
                        ...thumbnailButtonStyle,
                        border: isSelected
                          ? "3px solid #f97316"
                          : "1px solid #d1d5db",
                      }}
                    >
                      <img
                        src={image.image_url}
                        alt="Ảnh sản phẩm"
                        style={thumbnailImageStyle}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          <section style={informationStyle}>
            <h1 style={titleStyle}>{product.name}</h1>

            <p style={priceStyle}>
              {formatPrice(Number(product.price))}₫
            </p>

            <p
              style={{
                ...stockStyle,
                color: product.stock > 0 ? "#15803d" : "#dc2626",
              }}
            >
              {product.stock > 0
                ? `Còn ${product.stock} sản phẩm`
                : "Tạm hết hàng"}
            </p>

            {product.description && (
              <div style={descriptionBoxStyle}>
                <h2 style={descriptionTitleStyle}>Mô tả sản phẩm</h2>

                <p style={descriptionStyle}>{product.description}</p>
              </div>
            )}

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              style={{
                ...addButtonStyle,
                background: product.stock > 0 ? "#f97316" : "#9ca3af",
                cursor: product.stock > 0 ? "pointer" : "not-allowed",
              }}
            >
              {product.stock > 0
                ? "🛒 Thêm vào giỏ hàng"
                : "Sản phẩm đã hết hàng"}
            </button>

            <div style={contactBoxStyle}>
              <p style={{ fontWeight: "700" }}>
                Cần tư vấn thêm về sản phẩm?
              </p>

              <div style={contactButtonsStyle}>
                <a
                  href="https://zalo.me/0964032893"
                  target="_blank"
                  rel="noreferrer"
                  style={zaloButtonStyle}
                >
                  Liên hệ Zalo
                </a>

                <a
                  href="https://web.facebook.com/MilitaryShopCosPlay"
                  target="_blank"
                  rel="noreferrer"
                  style={facebookButtonStyle}
                >
                  Facebook
                </a>

                <a href="tel:0964032893" style={phoneButtonStyle}>
                  📞 0964032893
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  padding: "40px 16px",
  background: "#111827",
};

const containerStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "1100px",
  margin: "0 auto",
};

const topBackLinkStyle: React.CSSProperties = {
  display: "inline-block",
  marginBottom: "20px",
  color: "white",
  textDecoration: "none",
  fontWeight: "600",
};

const productLayoutStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "40px",
  padding: "28px",
  background: "white",
  borderRadius: "16px",
};

const mainImageBoxStyle: React.CSSProperties = {
  width: "100%",
  aspectRatio: "1 / 1",
  overflow: "hidden",
  background: "#f3f4f6",
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
};

const mainImageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "block",
  objectFit: "contain",
};

const noImageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#6b7280",
};

const thumbnailListStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  marginTop: "14px",
};

const thumbnailButtonStyle: React.CSSProperties = {
  width: "78px",
  height: "78px",
  padding: "3px",
  overflow: "hidden",
  background: "white",
  borderRadius: "9px",
  cursor: "pointer",
};

const thumbnailImageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "block",
  objectFit: "cover",
  borderRadius: "5px",
};

const informationStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  color: "#111827",
  fontSize: "32px",
  lineHeight: "1.25",
};

const priceStyle: React.CSSProperties = {
  marginTop: "18px",
  color: "#dc2626",
  fontSize: "30px",
  fontWeight: "800",
};

const stockStyle: React.CSSProperties = {
  marginTop: "10px",
  fontSize: "16px",
  fontWeight: "700",
};

const descriptionBoxStyle: React.CSSProperties = {
  marginTop: "26px",
  paddingTop: "20px",
  borderTop: "1px solid #e5e7eb",
};

const descriptionTitleStyle: React.CSSProperties = {
  margin: 0,
  color: "#111827",
  fontSize: "20px",
};

const descriptionStyle: React.CSSProperties = {
  marginTop: "10px",
  color: "#4b5563",
  lineHeight: "1.7",
  whiteSpace: "pre-line",
};

const addButtonStyle: React.CSSProperties = {
  width: "100%",
  marginTop: "28px",
  padding: "14px 20px",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontSize: "17px",
  fontWeight: "800",
};

const contactBoxStyle: React.CSSProperties = {
  marginTop: "22px",
  padding: "16px",
  color: "#1f2937",
  background: "#f3f4f6",
  borderRadius: "10px",
};

const contactButtonsStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  marginTop: "12px",
};

const zaloButtonStyle: React.CSSProperties = {
  padding: "10px 14px",
  color: "white",
  background: "#0284c7",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "700",
};

const facebookButtonStyle: React.CSSProperties = {
  padding: "10px 14px",
  color: "white",
  background: "#2563eb",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "700",
};

const phoneButtonStyle: React.CSSProperties = {
  padding: "10px 14px",
  color: "white",
  background: "#16a34a",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "700",
};

const errorBoxStyle: React.CSSProperties = {
  maxWidth: "600px",
  margin: "60px auto",
  padding: "30px",
  color: "#222",
  background: "white",
  borderRadius: "14px",
  textAlign: "center",
};

const backLinkStyle: React.CSSProperties = {
  display: "inline-block",
  marginTop: "20px",
  color: "#2563eb",
  fontWeight: "700",
  textDecoration: "none",
};