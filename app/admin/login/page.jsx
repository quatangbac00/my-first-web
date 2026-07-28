"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    setMessage("Đang đăng nhập...");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`Lỗi: ${error.message}`);
      return;
    }

    router.push("/admin");
  }

  return (
    <main
      style={{
        padding: "40px",
        maxWidth: "500px",
        margin: "40px auto",
        background: "white",
        color: "#222",
        borderRadius: "12px",
      }}
    >
      <h1>Đăng nhập quản trị</h1>

      <form onSubmit={handleLogin}>
        <div style={{ marginTop: "16px" }}>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginTop: "6px",
              background: "white",
              color: "#222",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          />
        </div>

        <div style={{ marginTop: "16px" }}>
          <label>Mật khẩu</label>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginTop: "6px",
              background: "white",
              color: "#222",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            marginTop: "20px",
            padding: "10px 18px",
            background: "#ff6b00",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Đăng nhập
        </button>

        {message && <p style={{ marginTop: "16px" }}>{message}</p>}
      </form>
    </main>
  );
}