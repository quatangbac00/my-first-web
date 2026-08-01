import type { Metadata } from "next";

import PolicyPage from "@/app/components/ui/PolicyPage";

export const metadata: Metadata = {
  title: "Hình thức thanh toán",
  description: "Các hình thức thanh toán được Gà Chăm Chỉ hỗ trợ.",
};

export default function PaymentMethodsPage() {
  return (
    <PolicyPage
      title="Hình thức thanh toán"
      introduction="Cửa hàng hiện chủ yếu chốt đơn qua tin nhắn hoặc Zalo. Hình thức thanh toán áp dụng cho từng đơn sẽ được xác nhận rõ ràng trước khi gửi hàng."
      sections={[
        {
          title: "Thanh toán khi nhận hàng",
          paragraphs: [
            "Đơn hàng đủ điều kiện có thể thanh toán cho đơn vị vận chuyển khi nhận hàng (COD).",
          ],
        },
        {
          title: "Chuyển khoản",
          paragraphs: [
            "Nếu chọn chuyển khoản, cửa hàng sẽ gửi thông tin thanh toán trong quá trình xác nhận đơn. Chỉ chuyển khoản theo thông tin được gửi trực tiếp qua kênh liên hệ chính thức của Gà Chăm Chỉ.",
          ],
        },
        {
          title: "Lưu ý an toàn",
          paragraphs: [
            "Vui lòng ghi đúng nội dung được hướng dẫn và giữ lại xác nhận giao dịch cho đến khi đơn hàng hoàn tất.",
          ],
        },
      ]}
    />
  );
}
