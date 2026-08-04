import { getActiveProduct } from "@/lib/storefront-data";

export const dynamic = "force-dynamic";

type RouteProps = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteProps) {
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isInteger(productId) || productId <= 0) {
    return Response.json(
      { error: "Mã sản phẩm không hợp lệ." },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    const data = await getActiveProduct(productId);
    if (!data) {
      return Response.json(
        { error: "Không tìm thấy sản phẩm." },
        { status: 404, headers: { "Cache-Control": "no-store" } }
      );
    }
    return Response.json(data, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Failed to load storefront product", error);
    return Response.json(
      { error: "Không thể tải sản phẩm. Vui lòng thử lại." },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
}
