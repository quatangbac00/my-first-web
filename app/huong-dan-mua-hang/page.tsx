import type { Metadata } from "next";

import PolicyPage from "@/app/components/ui/PolicyPage";

export const metadata: Metadata = {
  title: "Hướng dẫn mua hàng",
  description: "Các bước đặt hàng tại Gà Chăm Chỉ.",
};

export default function ShoppingGuidePage() {
  return (
    <PolicyPage
      title="Hướng dẫn mua hàng"
      introduction="Bạn có thể chọn sản phẩm trực tiếp trên website và gửi thông tin đặt hàng theo các bước dưới đây."
      sections={[
        {
          title: "1. Chọn sản phẩm",
          paragraphs: [
            "Mở trang chi tiết sản phẩm, chọn đúng biến thể nếu sản phẩm có nhiều mẫu hoặc mức giá, sau đó thêm vào giỏ hàng.",
          ],
        },
        {
          title: "2. Kiểm tra giỏ hàng",
          paragraphs: [
            "Kiểm tra tên sản phẩm, biến thể, số lượng và giá trước khi tiếp tục đặt hàng.",
          ],
        },
        {
          title: "3. Gửi đơn hàng",
          paragraphs: [
            "Điền chính xác họ tên, số điện thoại, địa chỉ nhận hàng và ghi chú cần thiết. Cửa hàng sẽ liên hệ để xác nhận trước khi gửi.",
          ],
        },
      ]}
    />
  );
}
