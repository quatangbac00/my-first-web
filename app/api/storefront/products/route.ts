import { getActiveProducts } from "@/lib/storefront-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getActiveProducts();
    return Response.json(data, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Failed to load storefront products", error);
    return Response.json(
      { error: "Không thể tải sản phẩm. Vui lòng thử lại." },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
}
