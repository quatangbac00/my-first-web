"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../../../lib/supabase";


const PRODUCT_CATEGORIES = [
  "Nón & Mũ bảo hộ",
  "Áo & Vest Tactical",
  "Găng tay",
  "Đèn pin",
  "Balo & Túi",
  "Mô hình",
  "Quà tặng",
  "Patch & Huy hiệu",
  "Đồ linh tinh",
];

function makeDraft() {
  return {
    clientId: `new-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    id: null,
    name: "",
    price: "",
    sale_price: "",
    stock: "0",
    image_url: "",
    imageFile: null,
    previewUrl: "",
    is_active: true,
    isNew: true,
  };
}

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = Number(params.id);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Chưa phân loại");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("0");
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainPreviewUrl, setMainPreviewUrl] = useState("");

  const [variants, setVariants] = useState([]);
  const [deletedVariantIds, setDeletedVariantIds] = useState([]);

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [savingProduct, setSavingProduct] = useState(false);
  const [savingVariants, setSavingVariants] = useState(false);
  const [message, setMessage] = useState("Đang tải sản phẩm...");

  useEffect(() => {
    async function initializePage() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/admin/login");
        return;
      }

      if (!Number.isInteger(productId)) {
        setMessage("Mã sản phẩm không hợp lệ.");
        setCheckingAuth(false);
        return;
      }

      await Promise.all([loadProduct(), loadVariants()]);
      setCheckingAuth(false);
    }

    initializePage();
  }, [productId, router]);

  useEffect(() => {
    return () => {
      if (mainPreviewUrl) URL.revokeObjectURL(mainPreviewUrl);
      variants.forEach((variant) => {
        if (variant.previewUrl) URL.revokeObjectURL(variant.previewUrl);
      });
    };
  }, []);

  async function loadProduct() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    if (error) {
      setMessage(`Lỗi tải sản phẩm: ${error.message}`);
      return;
    }

    setName(data.name || "");
    setCategory(data.category || "Chưa phân loại");
    setPrice(String(data.price ?? ""));
    setSalePrice(String(data.sale_price ?? ""));
    setDescription(data.description || "");
    setStock(String(data.stock ?? 0));
    setCurrentImageUrl(data.image_url || "");
    setMessage("");
  }

  async function loadVariants() {
    const { data, error } = await supabase
      .from("product_variants")
      .select("*")
      .eq("product_id", productId)
      .order("sort_order", { ascending: true })
      .order("id", { ascending: true });

    if (error) {
      setMessage(`Lỗi tải biến thể: ${error.message}`);
      return;
    }

    setVariants(
      (data || []).map((variant) => ({
        ...variant,
        clientId: `db-${variant.id}`,
        price: String(variant.price ?? ""),
        sale_price: String(variant.sale_price ?? ""),
        stock: String(variant.stock ?? 0),
        imageFile: null,
        previewUrl: "",
        isNew: false,
      }))
    );
  }

  async function uploadFile(file) {
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
    const filePath = `public/${fileName}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(filePath, file);

    if (error) throw new Error(error.message);

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  function setMainImage(file) {
    if (mainPreviewUrl) URL.revokeObjectURL(mainPreviewUrl);
    setMainImageFile(file || null);
    setMainPreviewUrl(file ? URL.createObjectURL(file) : "");
  }

  async function handleSaveProduct(event) {
    event.preventDefault();

    const numericPrice = Number(price);
    const numericSalePrice = salePrice === "" ? null : Number(salePrice);
    const numericStock = Number(stock);

    if (!name.trim()) {
      setMessage("Tên sản phẩm không được để trống.");
      return;
    }

    if (!category || category === "Chưa phân loại") {
      setMessage("Vui lòng chọn danh mục sản phẩm.");
      return;
    }

    if (!Number.isFinite(numericPrice) || numericPrice < 0) {
      setMessage("Giá mặc định không hợp lệ.");
      return;
    }

    if (
      numericSalePrice !== null &&
      (!Number.isFinite(numericSalePrice) ||
        numericSalePrice <= 0 ||
        numericSalePrice >= numericPrice)
    ) {
      setMessage("Giá giảm phải lớn hơn 0 và nhỏ hơn giá mặc định.");
      return;
    }

    if (!Number.isInteger(numericStock) || numericStock < 0) {
      setMessage("Tồn kho mặc định không hợp lệ.");
      return;
    }

    setSavingProduct(true);
    setMessage("Đang lưu thông tin sản phẩm...");

    try {
      let imageUrl = currentImageUrl;
      if (mainImageFile) imageUrl = await uploadFile(mainImageFile);

      const { error } = await supabase
        .from("products")
        .update({
          name: name.trim(),
          category,
          price: numericPrice,
          sale_price: numericSalePrice,
          stock: numericStock,
          description,
          image_url: imageUrl,
        })
        .eq("id", productId);

      if (error) throw new Error(error.message);

      setCurrentImageUrl(imageUrl);
      setMainImageFile(null);
      if (mainPreviewUrl) URL.revokeObjectURL(mainPreviewUrl);
      setMainPreviewUrl("");
      setMessage("Đã lưu thông tin sản phẩm.");
    } catch (error) {
      setMessage(`Lỗi: ${error instanceof Error ? error.message : "Không thể lưu sản phẩm"}`);
    } finally {
      setSavingProduct(false);
    }
  }

  function updateVariant(clientId, field, value) {
    setVariants((current) =>
      current.map((variant) =>
        variant.clientId === clientId ? { ...variant, [field]: value } : variant
      )
    );
  }

  function chooseVariantImage(clientId, file) {
    setVariants((current) =>
      current.map((variant) => {
        if (variant.clientId !== clientId) return variant;
        if (variant.previewUrl) URL.revokeObjectURL(variant.previewUrl);
        return {
          ...variant,
          imageFile: file || null,
          previewUrl: file ? URL.createObjectURL(file) : "",
        };
      })
    );
  }

  function addVariantRow() {
    setVariants((current) => [...current, makeDraft()]);
  }

  function removeVariantRow(variant) {
    if (!window.confirm(`Xóa biến thể "${variant.name || "chưa đặt tên"}"?`)) return;

    if (variant.previewUrl) URL.revokeObjectURL(variant.previewUrl);
    if (variant.id) setDeletedVariantIds((current) => [...current, variant.id]);
    setVariants((current) => current.filter((item) => item.clientId !== variant.clientId));
  }

  const hasVariants = variants.length > 0;

  const validationMessage = useMemo(() => {
    for (let index = 0; index < variants.length; index += 1) {
      const variant = variants[index];
      const row = index + 1;
      const numericPrice = Number(variant.price);
      const numericSalePrice =
        variant.sale_price === "" ? null : Number(variant.sale_price);
      const numericStock = Number(variant.stock);

      if (!String(variant.name || "").trim()) return `Dòng ${row}: chưa nhập tên biến thể.`;
      if (variant.price === "" || !Number.isFinite(numericPrice) || numericPrice < 0)
        return `Dòng ${row}: giá không hợp lệ.`;
      if (
        numericSalePrice !== null &&
        (!Number.isFinite(numericSalePrice) ||
          numericSalePrice <= 0 ||
          numericSalePrice >= numericPrice)
      )
        return `Dòng ${row}: giá giảm phải lớn hơn 0 và nhỏ hơn giá.`;
      if (!Number.isInteger(numericStock) || numericStock < 0)
        return `Dòng ${row}: tồn kho không hợp lệ.`;
      if (!variant.image_url && !variant.imageFile)
        return `Dòng ${row}: chưa chọn ảnh biến thể.`;
    }
    return "";
  }, [variants]);

  async function handleSaveAllVariants() {
    if (validationMessage) {
      setMessage(validationMessage);
      return;
    }

    setSavingVariants(true);
    setMessage("Đang lưu tất cả biến thể...");

    try {
      if (deletedVariantIds.length > 0) {
        const { error: deleteError } = await supabase
          .from("product_variants")
          .delete()
          .in("id", deletedVariantIds);
        if (deleteError) throw new Error(deleteError.message);
      }

      for (let index = 0; index < variants.length; index += 1) {
        const variant = variants[index];
        let imageUrl = variant.image_url || null;
        if (variant.imageFile) imageUrl = await uploadFile(variant.imageFile);

        const payload = {
          product_id: productId,
          name: String(variant.name).trim(),
          price: Number(variant.price),
          sale_price:
            variant.sale_price === ""
              ? null
              : Number(variant.sale_price),
          stock: Number(variant.stock),
          image_url: imageUrl,
          sort_order: index,
          is_active: Boolean(variant.is_active),
        };

        if (variant.id) {
          const { error } = await supabase
            .from("product_variants")
            .update(payload)
            .eq("id", variant.id);
          if (error) throw new Error(error.message);
        } else {
          const { error } = await supabase
            .from("product_variants")
            .insert(payload);
          if (error) throw new Error(error.message);
        }
      }

      setDeletedVariantIds([]);
      await loadVariants();
      setMessage("Đã lưu tất cả biến thể.");
    } catch (error) {
      setMessage(`Lỗi lưu biến thể: ${error instanceof Error ? error.message : "Không thể lưu biến thể"}`);
    } finally {
      setSavingVariants(false);
    }
  }

  if (checkingAuth) {
    return <main style={{ padding: 40, color: "white" }}>Đang kiểm tra đăng nhập...</main>;
  }

  return (
    <main style={pageStyle}>
      <h1>Sửa sản phẩm</h1>
      {message && <p style={messageStyle}>{message}</p>}

      <form onSubmit={handleSaveProduct}>
        <Field label="Tên sản phẩm">
          <input value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
        </Field>


        <Field label="Danh mục sản phẩm">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
          >
            <option value="Chưa phân loại">-- Chọn danh mục --</option>
            {PRODUCT_CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>

        <div style={twoColumnStyle}>
          <Field label="Giá mặc định">
            <input type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Giá giảm (nếu có)">
            <input type="number" min="0" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Tồn kho mặc định">
            <input type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} style={inputStyle} />
          </Field>
        </div>

        <Field label="Ảnh chính đại diện">
          <div style={mainImageRowStyle}>
            {(mainPreviewUrl || currentImageUrl) && (
              <img src={mainPreviewUrl || currentImageUrl} alt={name} style={mainImageStyle} />
            )}
            <label style={fileButtonStyle}>
              📷 Chọn ảnh chính
              <input type="file" accept="image/*" onChange={(e) => setMainImage(e.target.files?.[0] || null)} style={{ display: "none" }} />
            </label>
          </div>
          <p style={helpTextStyle}>Ảnh này đại diện cho toàn bộ sản phẩm.</p>
        </Field>

        <Field label="Mô tả">
          <textarea rows={8} value={description} onChange={(e) => setDescription(e.target.value)} style={inputStyle} />
        </Field>

        <button type="submit" disabled={savingProduct} style={primaryButtonStyle}>
          {savingProduct ? "Đang lưu..." : "Lưu thông tin sản phẩm"}
        </button>
      </form>

      <Divider />

      <section>
        <h2>Bảng biến thể</h2>
        <p style={sectionDescriptionStyle}>
          Mỗi dòng là một giá trị bán. Ảnh của dòng đó sẽ đồng thời là ảnh phụ trên trang sản phẩm.
        </p>

        <div style={tableWrapperStyle}>
          <div style={tableHeaderStyle}>
            <div>Ảnh</div>
            <div>Tên biến thể</div>
            <div>Giá</div>
            <div>Giá giảm</div>
            <div>Tồn kho</div>
            <div>Hiển thị</div>
            <div></div>
          </div>

          {hasVariants ? (
            variants.map((variant) => {
              const displayImage = variant.previewUrl || variant.image_url;
              return (
                <div key={variant.clientId} style={tableRowStyle}>
                  <div>
                    <label style={imagePickerStyle} title="Chọn ảnh cho biến thể">
                      {displayImage ? (
                        <img src={displayImage} alt={variant.name || "Biến thể"} style={variantImageStyle} />
                      ) : (
                        <span style={emptyImageStyle}>+ Ảnh</span>
                      )}
                      <input type="file" accept="image/*" onChange={(e) => chooseVariantImage(variant.clientId, e.target.files?.[0] || null)} style={{ display: "none" }} />
                    </label>
                  </div>

                  <input value={variant.name || ""} onChange={(e) => updateVariant(variant.clientId, "name", e.target.value)} placeholder="Ví dụ: 5 món vàng" style={compactInputStyle} />
                  <input type="number" min="0" value={variant.price} onChange={(e) => updateVariant(variant.clientId, "price", e.target.value)} placeholder="215000" style={compactInputStyle} />
                  <input type="number" min="0" value={variant.sale_price} onChange={(e) => updateVariant(variant.clientId, "sale_price", e.target.value)} placeholder="Để trống nếu không giảm" style={compactInputStyle} />
                  <input type="number" min="0" value={variant.stock} onChange={(e) => updateVariant(variant.clientId, "stock", e.target.value)} style={compactInputStyle} />

                  <label style={switchLabelStyle}>
                    <input type="checkbox" checked={Boolean(variant.is_active)} onChange={(e) => updateVariant(variant.clientId, "is_active", e.target.checked)} />
                    {variant.is_active ? "Có" : "Ẩn"}
                  </label>

                  <button type="button" onClick={() => removeVariantRow(variant)} style={deleteButtonStyle}>Xóa</button>
                </div>
              );
            })
          ) : (
            <p style={{ padding: 18, color: "#666" }}>Chưa có biến thể.</p>
          )}
        </div>

        <div style={variantActionsStyle}>
          <button type="button" onClick={addVariantRow} style={addRowButtonStyle}>+ Thêm dòng biến thể</button>
          <button type="button" onClick={handleSaveAllVariants} disabled={savingVariants} style={saveAllButtonStyle}>
            {savingVariants ? "Đang lưu..." : "Lưu tất cả biến thể"}
          </button>
        </div>
      </section>

      <Divider />

      <section style={noticeStyle}>
        <strong>Không cần tải ảnh phụ riêng.</strong>
        <p style={{ margin: "8px 0 0" }}>
          Ngoài ảnh chính, trang sản phẩm sẽ tự dùng ảnh của các biến thể làm danh sách ảnh phụ.
        </p>
      </section>

      <button type="button" onClick={() => router.push("/admin")} style={backButtonStyle}>← Quay lại trang quản trị</button>
    </main>
  );
}

function Field({ label, children }) {
  return <div style={{ marginTop: 16 }}><label style={{ fontWeight: 700 }}>{label}</label>{children}</div>;
}

function Divider() {
  return <hr style={{ margin: "36px 0", border: 0, borderTop: "1px solid #ddd" }} />;
}

const pageStyle = { padding: 32, maxWidth: 1100, margin: "36px auto", background: "white", color: "#222", borderRadius: 14 };
const messageStyle = { marginTop: 16, padding: 12, background: "#f3f4f6", borderRadius: 8 };
const inputStyle = { display: "block", width: "100%", boxSizing: "border-box", padding: 11, marginTop: 7, background: "white", color: "#222", border: "1px solid #cbd5e1", borderRadius: 7 };
const compactInputStyle = { ...inputStyle, marginTop: 0, minWidth: 0 };
const twoColumnStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 };
const mainImageRowStyle = { display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, marginTop: 10 };
const mainImageStyle = { width: 150, height: 150, objectFit: "cover", borderRadius: 10, border: "1px solid #ddd" };
const fileButtonStyle = { display: "inline-block", padding: "11px 16px", background: "#2563eb", color: "white", borderRadius: 8, cursor: "pointer", fontWeight: 700 };
const helpTextStyle = { marginTop: 8, color: "#64748b", fontSize: 14 };
const primaryButtonStyle = { marginTop: 22, padding: "12px 18px", background: "#2563eb", color: "white", border: 0, borderRadius: 8, fontWeight: 700, cursor: "pointer" };
const sectionDescriptionStyle = { marginTop: 8, color: "#64748b", lineHeight: 1.6 };
const tableWrapperStyle = { marginTop: 18, border: "1px solid #dbe2ea", borderRadius: 12, overflowX: "auto" };
const tableHeaderStyle = { display: "grid", gridTemplateColumns: "100px minmax(190px,1.4fr) minmax(130px,1fr) minmax(150px,1fr) minmax(110px,.8fr) 90px 70px", gap: 12, minWidth: 980, padding: 12, background: "#f8fafc", fontWeight: 800, borderBottom: "1px solid #dbe2ea" };
const tableRowStyle = { display: "grid", gridTemplateColumns: "100px minmax(190px,1.4fr) minmax(130px,1fr) minmax(150px,1fr) minmax(110px,.8fr) 90px 70px", gap: 12, alignItems: "center", minWidth: 980, padding: 12, borderBottom: "1px solid #eef2f7" };
const imagePickerStyle = { width: 78, height: 78, display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed #94a3b8", borderRadius: 9, cursor: "pointer", overflow: "hidden", background: "#f8fafc" };
const variantImageStyle = { width: "100%", height: "100%", objectFit: "cover" };
const emptyImageStyle = { color: "#475569", fontWeight: 700, fontSize: 14 };
const switchLabelStyle = { display: "flex", alignItems: "center", gap: 7, fontWeight: 700 };
const deleteButtonStyle = { padding: "9px 10px", border: 0, borderRadius: 7, background: "#dc2626", color: "white", cursor: "pointer", fontWeight: 700 };
const variantActionsStyle = { display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, marginTop: 16 };
const addRowButtonStyle = { padding: "11px 16px", border: "1px solid #f97316", borderRadius: 8, background: "white", color: "#ea580c", cursor: "pointer", fontWeight: 800 };
const saveAllButtonStyle = { padding: "11px 18px", border: 0, borderRadius: 8, background: "#16a34a", color: "white", cursor: "pointer", fontWeight: 800 };
const noticeStyle = { padding: 16, background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, color: "#1e3a8a" };
const backButtonStyle = { marginTop: 28, padding: "10px 16px", background: "#374151", color: "white", border: 0, borderRadius: 8, cursor: "pointer", fontWeight: 700 };
