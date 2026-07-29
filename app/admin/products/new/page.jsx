"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabase";

const PRODUCT_CATEGORIES = [
  "Nón & Mũ bảo hộ",
  "Áo & Vest Tactical",
  "Găng tay",
  "Đèn pin",
  "Balo & Túi",
  "Mô hình",
  "Quà tặng",
  "Patch & Huy hiệu",
];

export default function NewProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("0");
  const [imageFile, setImageFile] = useState(null);

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/admin/login");
        return;
      }

      setCheckingAuth(false);
    }

    checkLogin();
  }, [router]);

  async function uploadImage() {
    if (!imageFile) {
      return "";
    }

    const fileExtension = imageFile.name.split(".").pop();

    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${fileExtension}`;

    const filePath = `public/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, imageFile);

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!category) {
      setMessage("Vui lòng chọn danh mục sản phẩm.");
      return;
    }

    if (!imageFile) {
      setMessage("Vui lòng chọn ảnh sản phẩm.");
      return;
    }

    setSaving(true);
    setMessage("Đang tải ảnh và lưu sản phẩm...");

    try {
      const imageUrl = await uploadImage();

      const { error } = await supabase.from("products").insert({
        name,
        category,
        price: Number(price),
        description,
        stock: Number(stock),
        image_url: imageUrl,
        is_active: true,
      });

      if (error) {
        throw new Error(error.message);
      }

      setMessage("Đã thêm sản phẩm thành công.");

      setTimeout(() => {
        router.push("/admin");
      }, 800);
    } catch (error) {
      setMessage(
        `Lỗi: ${
          error instanceof Error
            ? error.message
            : "Không thể lưu sản phẩm"
        }`
      );
    } finally {
      setSaving(false);
    }
  }

  if (checkingAuth) {
    return (
      <main style={{ padding: "40px", color: "white" }}>
        <p>Đang kiểm tra đăng nhập...</p>
      </main>
    );
  }

  return (
    <main
      style={{
        padding: "40px",
        maxWidth: "600px",
        margin: "40px auto",
        background: "white",
        color: "#222",
        borderRadius: "12px",
      }}
    >
      <h1>Thêm sản phẩm</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: "16px" }}>
          <label>Tên sản phẩm</label>

          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ marginTop: "16px" }}>
          <label>Danh mục sản phẩm</label>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
            style={inputStyle}
          >
            <option value="">-- Chọn danh mục --</option>

            {PRODUCT_CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: "16px" }}>
          <label>Giá</label>

          <input
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
            min="0"
            style={inputStyle}
          />
        </div>

        <div style={{ marginTop: "16px" }}>
          <label>Số lượng tồn</label>

          <input
            type="number"
            value={stock}
            onChange={(event) => setStock(event.target.value)}
            min="0"
            style={inputStyle}
          />
        </div>

        <div style={{ marginTop: "16px" }}>
          <label>Ảnh sản phẩm</label>

          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              setImageFile(event.target.files?.[0] || null);
            }}
            required
            style={{
              display: "block",
              width: "100%",
              marginTop: "6px",
            }}
          />
        </div>

        <div style={{ marginTop: "16px" }}>
          <label>Mô tả</label>

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={5}
            style={inputStyle}
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          style={{
            marginTop: "20px",
            padding: "10px 18px",
            background: saving ? "#999" : "#4f8f24",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: saving ? "not-allowed" : "pointer",
            fontWeight: "700",
          }}
        >
          {saving ? "Đang lưu..." : "Lưu sản phẩm"}
        </button>

        {message && (
          <p
            style={{
              marginTop: "16px",
              fontWeight: "600",
            }}
          >
            {message}
          </p>
        )}
      </form>
    </main>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  marginTop: "6px",
  background: "white",
  color: "#222",
  border: "1px solid #ccc",
  borderRadius: "6px",
};