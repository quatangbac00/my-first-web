"use client";

import { useEffect, useMemo, useState } from "react";
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

type ProductVariant = {
  id: number;
  product_id: number;
  name: string;
  price: number;
  stock: number;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [shareMessage, setShareMessage] = useState("");

  useEffect(() => {
    async function loadData() {
      if (!Number.isInteger(productId)) {
        setMessage("Mã sản phẩm không hợp lệ.");
        setLoading(false);
        return;
      }

      const [{ data: productData, error: productError }, { data: variantData }] = await Promise.all([
        supabase.from("products").select("*").eq("id", productId).eq("is_active", true).single(),
        supabase.from("product_variants").select("*").eq("product_id", productId).eq("is_active", true).order("sort_order", { ascending: true }).order("id", { ascending: true }),
      ]);

      if (productError || !productData) {
        setMessage("Không tìm thấy sản phẩm.");
        setLoading(false);
        return;
      }

      const activeVariants = (variantData || []) as ProductVariant[];
      setProduct(productData as Product);
      setVariants(activeVariants);
      setSelectedImage(productData.image_url || activeVariants[0]?.image_url || "");
      setLoading(false);
    }

    loadData();
  }, [productId]);

  const currentPrice = selectedVariant ? Number(selectedVariant.price) : Number(product?.price || 0);
  const currentStock = selectedVariant ? Number(selectedVariant.stock) : Number(product?.stock || 0);

  const galleryImages = useMemo(() => {
    if (!product) return [];
    const result: { key: string; url: string; variant: ProductVariant | null; label: string }[] = [];

    if (product.image_url) {
      result.push({ key: `main-${product.id}`, url: product.image_url, variant: null, label: "Ảnh chính" });
    }

    variants.forEach((variant) => {
      if (variant.image_url && !result.some((image) => image.url === variant.image_url)) {
        result.push({ key: `variant-${variant.id}`, url: variant.image_url, variant, label: variant.name });
      }
    });

    return result;
  }, [product, variants]);

  function selectVariant(variant: ProductVariant) {
    setSelectedVariant(variant);
    if (variant.image_url) setSelectedImage(variant.image_url);
  }

  function previewVariant(variant: ProductVariant) {
    if (variant.image_url) setSelectedImage(variant.image_url);
  }

  function selectGalleryImage(image: { url: string; variant: ProductVariant | null }) {
    setSelectedImage(image.url);
    if (image.variant) setSelectedVariant(image.variant);
  }

  function handleAddToCart() {
    if (!product || currentStock <= 0) return;
    if (variants.length > 0 && !selectedVariant) {
      setMessage("Vui lòng chọn một biến thể trước khi thêm vào giỏ.");
      return;
    }

    const itemId = selectedVariant ? `${product.id}-${selectedVariant.id}` : product.id;
    const itemName = selectedVariant ? `${product.name} - ${selectedVariant.name}` : product.name;
    const itemImage = selectedVariant?.image_url || product.image_url;

    addToCart({
  id: itemId,
  productId: product.id,
  variantId: selectedVariant?.id ?? null,
  variantName: selectedVariant?.name,
  name: itemName,
  price: currentPrice,
  image: itemImage,
  description: product.description || "",
  category: "Sản phẩm",
  featured: false,
  isNew: false,
  rating: 0,
  sold: 0,
  maxStock: currentStock,
});

    setMessage(`Đã thêm ${itemName} vào giỏ hàng.`);
  }

  function formatPrice(value: number) {
    return new Intl.NumberFormat("vi-VN").format(value);
  }

  function getProductUrl() {
    return typeof window === "undefined" ? "" : window.location.href;
  }

  function getShareText() {
    if (!product) return "";
    const variantText = selectedVariant ? ` - ${selectedVariant.name}` : "";
    return `${product.name}${variantText} - ${formatPrice(currentPrice)}₫ tại Gà Chăm Chỉ`;
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(getProductUrl());
      setShareMessage("Đã sao chép đường dẫn sản phẩm.");
    } catch {
      setShareMessage("Không thể sao chép tự động.");
    }
    window.setTimeout(() => setShareMessage(""), 3000);
  }

  async function handleNativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: product?.name || "Sản phẩm Gà Chăm Chỉ", text: getShareText(), url: getProductUrl() });
      } catch {}
      return;
    }
    await handleCopyLink();
  }

  function handleFacebookShare() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getProductUrl())}`, "_blank", "noopener,noreferrer");
  }

  async function handleZaloShare() {
    try {
      await navigator.clipboard.writeText(`${getShareText()}\n${getProductUrl()}`);
      setShareMessage("Đã sao chép thông tin để gửi qua Zalo.");
    } catch {
      setShareMessage("Hãy sao chép đường dẫn trên thanh địa chỉ.");
    }
    window.open("https://zalo.me", "_blank", "noopener,noreferrer");
  }

  if (loading) return <main style={pageStyle}><p style={{ color: "white", textAlign: "center" }}>Đang tải sản phẩm...</p></main>;

  if (!product) {
    return <main style={pageStyle}><div style={errorBoxStyle}><h1>Không tìm thấy sản phẩm</h1><p>{message}</p><Link href="/" style={backLinkStyle}>← Quay lại trang chủ</Link></div></main>;
  }

  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <Link href="/" style={topBackLinkStyle}>← Quay lại trang chủ</Link>

        <div style={productLayoutStyle}>
          <section>
            <div style={mainImageBoxStyle}>
              {selectedImage ? <img src={selectedImage} alt={selectedVariant?.name || product.name} style={mainImageStyle} /> : <div style={noImageStyle}>Chưa có ảnh</div>}
            </div>

            {galleryImages.length > 1 && (
              <div style={thumbnailListStyle}>
                {galleryImages.map((image) => {
                  const active = selectedImage === image.url;
                  return (
                    <button key={image.key} type="button" onMouseEnter={() => selectGalleryImage(image)} onClick={() => selectGalleryImage(image)} title={image.label} style={{ ...thumbnailButtonStyle, border: active ? "3px solid #f97316" : "1px solid #d1d5db" }}>
                      <img src={image.url} alt={image.label} style={thumbnailImageStyle} />
                      {image.variant && <span style={thumbnailLabelStyle}>{image.variant.name}</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          <section style={informationStyle}>
            <h1 style={titleStyle}>{product.name}</h1>
            <p style={priceStyle}>{formatPrice(currentPrice)}₫</p>

            {variants.length > 0 && (
              <div style={variantBoxStyle}>
                <p style={variantTitleStyle}>Chọn giá trị sản phẩm</p>
                <div style={variantGridStyle}>
                  {variants.map((variant) => {
                    const active = selectedVariant?.id === variant.id;
                    return (
                      <button key={variant.id} type="button" onMouseEnter={() => previewVariant(variant)} onFocus={() => previewVariant(variant)} onClick={() => selectVariant(variant)} style={{ ...variantButtonStyle, border: active ? "2px solid #f97316" : "1px solid #d1d5db", background: active ? "#fff7ed" : "white" }}>
                        {variant.image_url && <img src={variant.image_url} alt={variant.name} style={variantButtonImageStyle} />}
                        <span style={{ fontWeight: 800 }}>{variant.name}</span>
                        <span style={variantButtonPriceStyle}>{formatPrice(Number(variant.price))}₫</span>
                      </button>
                    );
                  })}
                </div>
                {!selectedVariant && <p style={chooseHintStyle}>Rê chuột để xem ảnh; bấm để chọn biến thể.</p>}
              </div>
            )}

            <p style={{ ...stockStyle, color: currentStock > 0 ? "#15803d" : "#dc2626" }}>
              {currentStock > 0 ? `Còn ${currentStock} sản phẩm` : "Tạm hết hàng"}
            </p>

            {message && <p style={messageStyle}>{message}</p>}

            <button type="button" onClick={handleAddToCart} disabled={currentStock <= 0} style={{ ...addButtonStyle, background: currentStock > 0 ? "#f97316" : "#9ca3af", cursor: currentStock > 0 ? "pointer" : "not-allowed" }}>
              {currentStock > 0 ? "🛒 Thêm vào giỏ hàng" : "Sản phẩm đã hết hàng"}
            </button>

            {product.description && <div style={descriptionBoxStyle}><h2 style={descriptionTitleStyle}>Mô tả sản phẩm</h2><p style={descriptionStyle}>{product.description}</p></div>}

            <div style={shareBoxStyle}>
              <p style={shareTitleStyle}>Chia sẻ sản phẩm</p>
              <div style={shareButtonsStyle}>
                <button type="button" onClick={handleCopyLink} style={copyButtonStyle}>🔗 Sao chép link</button>
                <button type="button" onClick={handleNativeShare} style={shareButtonStyle}>📤 Chia sẻ</button>
                <button type="button" onClick={handleFacebookShare} style={facebookShareButtonStyle}>Facebook</button>
                <button type="button" onClick={handleZaloShare} style={zaloShareButtonStyle}>Zalo</button>
              </div>
              {shareMessage && <p style={shareMessageStyle}>{shareMessage}</p>}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

const pageStyle: React.CSSProperties = { minHeight: "100vh", padding: "40px 16px", background: "#111827" };
const containerStyle: React.CSSProperties = { width: "100%", maxWidth: 1100, margin: "0 auto" };
const topBackLinkStyle: React.CSSProperties = { display: "inline-block", marginBottom: 20, color: "white", textDecoration: "none", fontWeight: 600 };
const productLayoutStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 40, padding: 28, background: "white", borderRadius: 16 };
const mainImageBoxStyle: React.CSSProperties = { width: "100%", aspectRatio: "1 / 1", overflow: "hidden", background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: 14 };
const mainImageStyle: React.CSSProperties = { width: "100%", height: "100%", display: "block", objectFit: "contain" };
const noImageStyle: React.CSSProperties = { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280" };
const thumbnailListStyle: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 };
const thumbnailButtonStyle: React.CSSProperties = { width: 92, minHeight: 112, padding: 3, overflow: "hidden", background: "white", borderRadius: 9, cursor: "pointer" };
const thumbnailImageStyle: React.CSSProperties = { width: "100%", height: 78, display: "block", objectFit: "cover", borderRadius: 5 };
const thumbnailLabelStyle: React.CSSProperties = { display: "block", marginTop: 4, padding: "0 3px", fontSize: 12, lineHeight: 1.2, color: "#374151" };
const informationStyle: React.CSSProperties = { display: "flex", flexDirection: "column" };
const titleStyle: React.CSSProperties = { margin: 0, color: "#111827", fontSize: 32, lineHeight: 1.25 };
const priceStyle: React.CSSProperties = { marginTop: 18, color: "#dc2626", fontSize: 30, fontWeight: 800 };
const variantBoxStyle: React.CSSProperties = { marginTop: 18, padding: 16, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12 };
const variantTitleStyle: React.CSSProperties = { margin: 0, color: "#111827", fontSize: 17, fontWeight: 800 };
const variantGridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 10, marginTop: 12 };
const variantButtonStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "48px 1fr", alignItems: "center", gap: 9, padding: 8, color: "#111827", borderRadius: 9, cursor: "pointer", textAlign: "left" };
const variantButtonImageStyle: React.CSSProperties = { width: 48, height: 48, objectFit: "cover", borderRadius: 7, gridRow: "span 2" };
const variantButtonPriceStyle: React.CSSProperties = { color: "#dc2626", fontSize: 13, fontWeight: 700 };
const chooseHintStyle: React.CSSProperties = { margin: "10px 0 0", color: "#64748b", fontSize: 14 };
const stockStyle: React.CSSProperties = { marginTop: 14, fontSize: 16, fontWeight: 700 };
const messageStyle: React.CSSProperties = { marginTop: 12, padding: "9px 12px", color: "#166534", background: "#dcfce7", borderRadius: 8, fontWeight: 700 };
const addButtonStyle: React.CSSProperties = { width: "100%", marginTop: 20, padding: "14px 20px", color: "white", border: "none", borderRadius: 10, fontSize: 17, fontWeight: 800 };
const descriptionBoxStyle: React.CSSProperties = { marginTop: 26, paddingTop: 20, borderTop: "1px solid #e5e7eb" };
const descriptionTitleStyle: React.CSSProperties = { margin: 0, color: "#111827", fontSize: 20 };
const descriptionStyle: React.CSSProperties = { marginTop: 10, color: "#4b5563", lineHeight: 1.7, whiteSpace: "pre-line" };
const shareBoxStyle: React.CSSProperties = { marginTop: 22, padding: 16, background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 12 };
const shareTitleStyle: React.CSSProperties = { margin: 0, color: "#9a3412", fontSize: 18, fontWeight: 800 };
const shareButtonsStyle: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 };
const baseShareButton: React.CSSProperties = { padding: "10px 14px", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700 };
const copyButtonStyle: React.CSSProperties = { ...baseShareButton, background: "#374151" };
const shareButtonStyle: React.CSSProperties = { ...baseShareButton, background: "#f97316" };
const facebookShareButtonStyle: React.CSSProperties = { ...baseShareButton, background: "#2563eb" };
const zaloShareButtonStyle: React.CSSProperties = { ...baseShareButton, background: "#0284c7" };
const shareMessageStyle: React.CSSProperties = { marginTop: 12, padding: "9px 12px", color: "#166534", background: "#dcfce7", borderRadius: 8, fontSize: 14, fontWeight: 700 };
const errorBoxStyle: React.CSSProperties = { maxWidth: 600, margin: "60px auto", padding: 30, color: "#222", background: "white", borderRadius: 14, textAlign: "center" };
const backLinkStyle: React.CSSProperties = { display: "inline-block", marginTop: 20, color: "#2563eb", fontWeight: 700, textDecoration: "none" };
