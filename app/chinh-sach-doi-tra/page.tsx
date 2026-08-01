import type { Metadata } from "next";

import PolicyPage from "@/app/components/ui/PolicyPage";

export const metadata: Metadata = {
  title: "Chính sách đổi trả",
  description: "Điều kiện và quy trình hỗ trợ đổi trả tại Gà Chăm Chỉ.",
};

export default function ReturnPolicyPage() {
  return (
    <PolicyPage
      title="Chính sách đổi trả"
      introduction="Cửa hàng hỗ trợ kiểm tra các trường hợp giao sai sản phẩm, thiếu hàng hoặc sản phẩm bị lỗi do quá trình vận chuyển."
      sections={[
        {
          title: "Điều kiện hỗ trợ",
          paragraphs: [
            "Sản phẩm cần còn nguyên tình trạng khi nhận, chưa qua sử dụng và có hình ảnh hoặc video thể hiện vấn đề cần hỗ trợ.",
          ],
        },
        {
          title: "Thời hạn thông báo",
          paragraphs: [
            "Vui lòng liên hệ trong vòng 7 ngày kể từ khi nhận hàng để cửa hàng kiểm tra và hướng dẫn phương án phù hợp.",
          ],
        },
        {
          title: "Quy trình xử lý",
          paragraphs: [
            "Gửi mã đơn hàng cùng hình ảnh hoặc video qua Zalo. Cửa hàng sẽ xác minh, thống nhất phương án đổi, bổ sung hoặc hoàn tiền tùy trường hợp.",
          ],
        },
      ]}
    />
  );
}
