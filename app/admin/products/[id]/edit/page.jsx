"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../../../lib/supabase";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = Number(params.id);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("0");

  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [mainImageFile, setMainImageFile] = useState(null);

  const [extraImages, setExtraImages] = useState([]);
  const [extraImageFiles, setExtraImageFiles] = useState([]);

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [message, setMessage] = useState("Đang tải sản phẩm...");
  const [saving, setSaving] = useState(false);
  const [uploadingExtraImages, setUploadingExtraImages] = useState(false);
  const [deletingImageId, setDeletingImageId] = useState(null);

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
        setMessage("Lỗi: Mã sản phẩm không hợp lệ.");
        setCheckingAuth(false);
        return;
      }

      setCheckingAuth(false);

      await Promise.all([loadProduct(), loadExtraImages()]);
    }

    initializePage();
  }, [productId, router]);

  async function loadProduct() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    if (error) {
      setMessage(`Lỗi: ${error.message}`);
      return;
    }

    setName(data.name || "");
    setPrice(String(data.price ?? ""));
    setDescription(data.description || "");
    setStock(String(data.stock ?? 0));
    setCurrentImageUrl(data.image_url || "");
    setMessage("");
  }

  async function loadExtraImages() {
    const { data, error } = await supabase
      .from("product_images")
      .select("*")
      .eq("product_id", productId)
      .order("sort_order", { ascending: true })
      .order("id", { ascending: true });

    if (error) {
      setMessage(`Lỗi tải ảnh phụ: ${error.message}`);
      return;
    }

    setExtraImages(data || []);
  }

  async function uploadFile(file) {
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";

    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${extension}`;

    const filePath = `public/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, file);

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

    setSaving(true);
    setMessage("Đang lưu thay đổi...");

    try {
      let imageUrl = currentImageUrl;

      if (mainImageFile) {
        imageUrl = await uploadFile(mainImageFile);
      }

      const { error } = await supabase
        .from("products")
        .update({
          name,
          price: Number(price),
          description,
          stock: Number(stock),
          image_url: imageUrl,
        })
        .eq("id", productId);

      if (error) {
        throw new Error(error.message);
      }

      setCurrentImageUrl(imageUrl);
      setMainImageFile(null);
      setMessage("Đã cập nhật thông tin sản phẩm.");
    } catch (error) {
      setMessage(
        `Lỗi: ${
          error instanceof Error
            ? error.message
            : "Không thể cập nhật sản phẩm"
        }`
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleUploadExtraImages() {
    if (extraImageFiles.length === 0) {
      setMessage("Vui lòng chọn ít nhất một ảnh phụ.");
      return;
    }

    setUploadingExtraImages(true);
    setMessage("Đang tải các ảnh phụ...");

    try {
      const currentCount = extraImages.length;
      const newRows = [];

      for (let index = 0; index < extraImageFiles.length; index += 1) {
        const imageUrl = await uploadFile(extraImageFiles[index]);

        newRows.push({
          product_id: productId,
          image_url: imageUrl,
          sort_order: currentCount + index,
        });
      }

      const { error } = await supabase
        .from("product_images")
        .insert(newRows);

      if (error) {
        throw new Error(error.message);
      }

      setExtraImageFiles([]);
      setMessage("Đã thêm các ảnh phụ.");
      await loadExtraImages();
    } catch (error) {
      setMessage(
        `Lỗi: ${
          error instanceof Error
            ? error.message
            : "Không thể tải ảnh phụ"
        }`
      );
    } finally {
      setUploadingExtraImages(false);
    }
  }

  async function handleDeleteExtraImage(image) {
    const confirmed = window.confirm(
      "Bạn có chắc muốn xóa ảnh phụ này không?"
    );

    if (!confirmed) {
      return;
    }

    setDeletingImageId(image.id);
    setMessage("Đang xóa ảnh phụ...");

    const { error } = await supabase
      .from("product_images")
      .delete()
      .eq("id", image.id);

    if (error) {
      setMessage(`Lỗi: ${error.message}`);
      setDeletingImageId(null);
      return;
    }

    setMessage("Đã xóa ảnh phụ.");
    setDeletingImageId(null);
    await loadExtraImages();
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
        maxWidth: "800px",
        margin: "40px auto",
        background: "white",
        color: "#222",
        borderRadius: "12px",
      }}
    >
      <h1>Sửa sản phẩm</h1>

      {message && (
        <p
          style={{
            marginTop: "16px",
            padding: "10px",
            background: "#f3f4f6",
            borderRadius: "8px",
          }}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: "20px" }}>
          <label>Tên sản phẩm</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            style={inputStyle}
          />
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

        {currentImageUrl && (
          <div style={{ marginTop: "20px" }}>
            <p style={{ fontWeight: "600" }}>Ảnh chính hiện tại</p>
            <img
              src={currentImageUrl}
              alt={name}
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
                border: "1px solid #ddd",
                marginTop: "8px",
              }}
            />
          </div>
        )}

        <div style={{ marginTop: "18px" }}>
          <p style={{ fontWeight: "600" }}>Đổi ảnh chính</p>

          <label style={blueFileButtonStyle}>
            📷 Chọn ảnh chính mới
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                setMainImageFile(event.target.files?.[0] || null);
              }}
              style={{ display: "none" }}
            />
          </label>

          {mainImageFile && (
            <p style={{ marginTop: "8px", color: "#555" }}>
              Đã chọn: {mainImageFile.name}
            </p>
          )}

          <p style={helpTextStyle}>
            Không chọn ảnh mới thì ảnh chính hiện tại được giữ nguyên.
          </p>
        </div>

        <div style={{ marginTop: "16px" }}>
          <label>Mô tả</label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={6}
            style={inputStyle}
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          style={{
            marginTop: "20px",
            padding: "11px 18px",
            background: saving ? "#999" : "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: saving ? "not-allowed" : "pointer",
            fontWeight: "600",
          }}
        >
          {saving ? "Đang lưu..." : "Lưu thông tin sản phẩm"}
        </button>
      </form>

      <hr
        style={{
          margin: "36px 0",
          border: "none",
          borderTop: "1px solid #ddd",
        }}
      />

      <section>
        <h2>Ảnh phụ của sản phẩm</h2>

        <p style={{ marginTop: "8px", color: "#666" }}>
          Bạn có thể chọn nhiều ảnh cùng lúc.
        </p>

        <label style={orangeFileButtonStyle}>
          🖼️ Chọn nhiều ảnh phụ
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(event) => {
              setExtraImageFiles(
                event.target.files
                  ? Array.from(event.target.files)
                  : []
              );
            }}
            style={{ display: "none" }}
          />
        </label>

        {extraImageFiles.length > 0 && (
          <p
            style={{
              marginTop: "10px",
              padding: "9px 12px",
              background: "#fff7ed",
              color: "#9a3412",
              borderRadius: "8px",
            }}
          >
            Đã chọn {extraImageFiles.length} ảnh phụ.
          </p>
        )}

        <button
          type="button"
          onClick={handleUploadExtraImages}
          disabled={
            uploadingExtraImages || extraImageFiles.length === 0
          }
          style={{
            display: "block",
            marginTop: "14px",
            padding: "11px 18px",
            background:
              uploadingExtraImages || extraImageFiles.length === 0
                ? "#9ca3af"
                : "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor:
              uploadingExtraImages || extraImageFiles.length === 0
                ? "not-allowed"
                : "pointer",
            fontWeight: "600",
          }}
        >
          {uploadingExtraImages
            ? "Đang tải ảnh..."
            : "⬆️ Tải các ảnh phụ lên"}
        </button>

        {extraImages.length === 0 ? (
          <p style={{ marginTop: "20px", color: "#666" }}>
            Sản phẩm chưa có ảnh phụ.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(150px, 1fr))",
              gap: "16px",
              marginTop: "22px",
            }}
          >
            {extraImages.map((image) => (
              <div
                key={image.id}
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  borderRadius: "10px",
                }}
              >
                <img
                  src={image.image_url}
                  alt="Ảnh phụ sản phẩm"
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />

                <button
                  type="button"
                  onClick={() => handleDeleteExtraImage(image)}
                  disabled={deletingImageId === image.id}
                  style={{
                    width: "100%",
                    marginTop: "8px",
                    padding: "8px",
                    background:
                      deletingImageId === image.id
                        ? "#999"
                        : "#dc2626",
                    color: "white",
                    border: "none",
                    borderRadius: "7px",
                    cursor:
                      deletingImageId === image.id
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {deletingImageId === image.id
                    ? "Đang xóa..."
                    : "🗑️ Xóa ảnh"}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <button
        type="button"
        onClick={() => router.push("/admin")}
        style={{
          marginTop: "30px",
          padding: "10px 16px",
          background: "#374151",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        ← Quay lại trang quản trị
      </button>
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

const blueFileButtonStyle = {
  display: "inline-block",
  marginTop: "10px",
  padding: "11px 16px",
  background: "#2563eb",
  color: "white",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

const orangeFileButtonStyle = {
  display: "inline-block",
  marginTop: "14px",
  padding: "12px 18px",
  background: "#f97316",
  color: "white",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "700",
};

const helpTextStyle = {
  marginTop: "8px",
  fontSize: "14px",
  color: "#666",
};