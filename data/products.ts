export interface Product {
  // ID của một dòng trong giỏ hàng.
  // Sản phẩm thường: 12
  // Sản phẩm có biến thể: "12-35"
  id: number | string;

  // ID sản phẩm gốc trong Supabase.
  productId?: number | string;

  // Thông tin biến thể nếu có.
  variantId?: number | string | null;
  variantName?: string;

  name: string;
  price: number;
  minPrice?: number;
  maxPrice?: number;
  hasVariants?: boolean;
  oldPrice?: number;
  image: string;
  category: string;
  featured: boolean;
  isNew: boolean;
  rating: number;
  sold: number;
  badge?: string;
  description: string;

  // Tồn kho tối đa của sản phẩm hoặc biến thể đang chọn.
  maxStock?: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Set 5 món phụ kiện vàng CBC",
    price: 215000,
    image: "/images/products/set-5-mon-phu-kien-vang-cbc.jpg",
    category: "Đồ hóa trang & Sự kiện",
    featured: true,
    isNew: false,
    rating: 4.9,
    sold: 86,
    badge: "Bán chạy",
    description:
      "Set 5 món phụ kiện phong cách Hip Hop màu vàng nổi bật, phù hợp hóa trang, biểu diễn, chụp ảnh, dự tiệc và tham gia sự kiện. Bộ sản phẩm gồm kính mắt, hai dây chuyền, vòng tay và nhẫn; chưa bao gồm nón.",
  },
  {
    id: 2,
    name: "Dây chuyền vàng/bạc giả cỡ lớn",
    price: 55000,
    image: "/images/products/day-chuyen-vang-bac-co-lon.jpg",
    category: "Đồ hóa trang & Sự kiện",
    featured: true,
    isNew: false,
    rating: 4.9,
    sold: 1600,
    badge: "Bán chạy",
    description:
      "Dây chuyền bản lớn phong cách Hip Hop, phù hợp hóa trang, biểu diễn, chụp ảnh, dự tiệc và các sự kiện. Có màu vàng hoặc bạc; giá từ 55.000đ đến 70.000đ tùy chiều dài và mẫu dây.",
  },
  {
    id: 3,
    name: "Dây chuyền vàng/bạc bản lớn cao cấp",
    price: 75000,
    image: "/images/products/day-chuyen-ban-lon-cao-cap.jpg",
    category: "Đồ hóa trang & Sự kiện",
    featured: true,
    isNew: false,
    rating: 4.9,
    sold: 238,
    badge: "Hot",
    description:
      "Dây chuyền bản lớn phong cách sang trọng, nổi bật và cá tính, phù hợp hóa trang, biểu diễn, chụp ảnh và dự tiệc. Có màu vàng hoặc bạc; giá từ 75.000đ đến 100.000đ tùy chiều dài và mẫu dây.",
  },
  {
    id: 4,
    name: "Vòng tay Cuba giả vàng/bạc",
    price: 55000,
    image: "/images/products/vong-tay-cuba-vang-bac.jpg",
    category: "Đồ hóa trang & Sự kiện",
    featured: true,
    isNew: false,
    rating: 4.9,
    sold: 108,
    badge: "Hot",
    description:
      "Vòng tay bản lớn phong cách Hip Hop, thiết kế nổi bật và cá tính. Sản phẩm làm từ nhựa acrylic, có màu vàng hoặc bạc sáng, chiều dài khoảng 19 cm kèm dây nối 6 cm.",
  },
  {
    id: 5,
    name: "Nón sơn vàng/bạc phong cách Rap Việt",
    price: 120000,
    image: "/images/products/non-son-vang-bac-rap-viet.jpg",
    category: "Đồ hóa trang & Sự kiện",
    featured: true,
    isNew: false,
    rating: 4.9,
    sold: 84,
    badge: "Hot",
    description:
      "Nón sơn ánh kim màu vàng hoặc bạc, phong cách Rap Việt nổi bật, phù hợp hóa trang, biểu diễn, chụp ảnh và tham gia sự kiện. Chất liệu polyester, kích thước L, phù hợp vòng đầu khoảng 58–60 cm.",
  },
  {
    id: 6,
    name: "Vòng cổ phù hộ thân Đạo giáo – 4 mẫu",
    price: 170000,
    image: "/images/products/vong-co-phu-ho-than-dao-giao.jpg",
    category: "Pháp khí & Vật phẩm hộ thân",
    featured: true,
    isNew: false,
    rating: 4.9,
    sold: 17,
    badge: "Độc quyền",
    description:
      "Vòng cổ mang họa tiết phù Đạo giáo, phù hợp sử dụng như vật phẩm trang sức, tín ngưỡng và cầu mong bình an, may mắn, tài lộc theo quan niệm dân gian. Có bốn mẫu: Bắc Đẩu Bình An, Thái Tuế Trấn Trạch, Khai Vận Quý Nhân và Tụ Tài Phù.",
  },
  {
    id: 7,
    name: "Sổ tay nhật ký Anime bìa da 800 trang",
    price: 210000,
    image: "/images/products/so-tay-anime-bia-da-800-trang.jpg",
    category: "Đồ sưu tầm & Độc lạ",
    featured: true,
    isNew: false,
    rating: 4.9,
    sold: 25,
    badge: "Hot",
    description:
      "Sổ tay bìa da lấy cảm hứng từ phong cách anime hành động và phép thuật, phù hợp ghi chép, sưu tầm hoặc làm quà tặng. Sổ có khoảng 800 trang, kích thước 27 × 15 × 5 cm, bìa dày và giấy nhám dễ bám mực.",
  },
  {
    id: 8,
    name: "Côn nhị khúc bọc mút dành cho người mới tập",
    price: 70000,
    image: "/images/products/con-nhi-khuc-boc-mut-nguoi-moi.jpg",
    category: "Dụng cụ tập luyện & Đồ độc lạ",
    featured: true,
    isNew: false,
    rating: 4.9,
    sold: 412,
    badge: "Bán chạy",
    description:
      "Côn nhị khúc lõi nhựa bọc mút xốp, phù hợp cho người mới làm quen và luyện tập động tác cơ bản. Hai thân côn nối bằng dây xích kim loại; lớp mút giúp giảm lực va chạm. Màu sắc được giao ngẫu nhiên.",
  },
];
