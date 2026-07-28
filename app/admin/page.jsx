"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function AdminPage() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [deletingId, setDeletingId] = useState(null);

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
      await loadProducts();
    }

    checkLogin();
  }, [router]);

  async function loadProducts() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setProducts(data || []);
    }

    setLoading(false);
  }

  async function toggleProductStatus(product) {
    setMessage("Đang cập nhật...");

    const { error } = await supabase
      .from("products")
      .update({
        is_active: !product.is_active,
      })
      .eq("id", product.id);

    if (error) {
      setMessage(`Lỗi: ${error.message}`);
      return;
    }

    setMessage(
      product.is_active
        ? "Đã ẩn sản phẩm."
        : "Đã hiển thị lại sản phẩm."
    );

    await loadProducts();
  }

  async function deleteProduct(product) {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa sản phẩm "${product.name}" không?\n\nThao tác này không thể hoàn tác.`
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(product.id);
    setMessage("Đang xóa sản phẩm...");

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", product.id);

    if (error) {
      setMessage(`Lỗi: ${error.message}`);
      setDeletingId(null);
      return;
    }

    setMessage("Đã xóa sản phẩm.");
    setDeletingId(null);
    await loadProducts();
  }

  async function handleLogout() {
    setMessage("Đang đăng xuất...");

    const { error } = await supabase.auth.signOut();

    if (error) {
      setMessage(`Lỗi: ${error.message}`);
      return;
    }

    router.replace("/admin/login");
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
        maxWidth: "1000px",
        margin: "30px auto",
        background: "white",
        color: "#222",
        borderRadius: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <h1>Trang quản trị sản phẩm</h1>

        <button
          type="button"
          onClick={handleLogout}
          style={{
            padding: "9px 14px",
            background: "#374151",
            color: "white",
            border: "none",
            borderRadius: "7px",
            cursor: "pointer",
          }}
        >
          Đăng xuất
        </button>
      </div>

      <a
        href="/admin/products/new"
        style={{
          display: "inline-block",
          marginTop: "16px",
          padding: "10px 16px",
          background: "#ff6b00",
          color: "white",
          textDecoration: "none",
          borderRadius: "8px",
        }}
      >
        + Thêm sản phẩm
      </a>

      {message && <p style={{ marginTop: "16px" }}>{message}</p>}

      {loading && <p>Đang tải sản phẩm...</p>}

      {error && <p style={{ color: "red" }}>Lỗi: {error}</p>}

      {!loading && !error && products.length === 0 && (
        <p>Chưa có sản phẩm.</p>
      )}

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ddd",
            padding: "16px",
            marginTop: "16px",
            borderRadius: "8px",
            opacity: product.is_active ? 1 : 0.55,
          }}
        >
          <h2>{product.name}</h2>

          <p>
            Giá: {Number(product.price).toLocaleString("vi-VN")} đ
          </p>

          <p>Tồn kho: {product.stock}</p>
          <p>{product.description}</p>

          <p>
            Trạng thái:{" "}
            <strong>
              {product.is_active ? "Đang hiển thị" : "Đang ẩn"}
            </strong>
          </p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "10px",
            }}
          >
            <a
              href={`/admin/products/${product.id}/edit`}
              style={{
                display: "inline-block",
                padding: "8px 14px",
                background: "#2563eb",
                color: "white",
                textDecoration: "none",
                borderRadius: "6px",
              }}
            >
              Sửa sản phẩm
            </a>

            <button
              type="button"
              onClick={() => toggleProductStatus(product)}
              style={{
                padding: "8px 14px",
                background: product.is_active ? "#d97706" : "#16a34a",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              {product.is_active ? "Ẩn sản phẩm" : "Hiện sản phẩm"}
            </button>

            <button
              type="button"
              onClick={() => deleteProduct(product)}
              disabled={deletingId === product.id}
              style={{
                padding: "8px 14px",
                background:
                  deletingId === product.id ? "#999" : "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor:
                  deletingId === product.id
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {deletingId === product.id
                ? "Đang xóa..."
                : "Xóa sản phẩm"}
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}