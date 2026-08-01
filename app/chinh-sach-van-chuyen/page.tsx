import type { Metadata } from "next";

import PolicyPage from "@/app/components/ui/PolicyPage";

export const metadata: Metadata = {
  title: "Chính sách vận chuyển",
  description: "Thông tin đóng gói và giao hàng của Gà Chăm Chỉ.",
};

export default function ShippingPolicyPage() {
  return (
    <PolicyPage
      title="Chính sách vận chuyển"
      introduction="Gà Chăm Chỉ hỗ trợ giao hàng toàn quốc và đóng gói phù hợp với từng loại sản phẩm."
      sections={[
        {
          title: "Thời gian xử lý",
          paragraphs: [
            "Đơn hàng được kiểm tra và xác nhận trước khi bàn giao cho đơn vị vận chuyển. Thời gian giao thực tế phụ thuộc địa chỉ nhận và tình trạng vận chuyển tại từng thời điểm.",
          ],
        },
        {
          title: "Phí vận chuyển",
          paragraphs: [
            "Phí vận chuyển được thông báo khi xác nhận đơn hàng, căn cứ vào địa chỉ, kích thước và khối lượng kiện hàng.",
          ],
        },
        {
          title: "Kiểm tra khi nhận",
          paragraphs: [
            "Nếu kiện hàng có dấu hiệu móp, rách hoặc sai thông tin, vui lòng chụp lại tình trạng kiện hàng và liên hệ cửa hàng để được hỗ trợ.",
          ],
        },
      ]}
    />
  );
}
