export type StorefrontCategory = {
  label: string;
  description: string;
  image: string;
  values: string[];
};

export const storefrontCategories: StorefrontCategory[] = [
  {
    label: "Phụ kiện hóa trang",
    description: "Phụ kiện và vật phẩm nổi bật",
    image: "/images/categories/unique-items.jpg",
    values: [
      "Đồ hóa trang & Sự kiện",
      "Phụ kiện hóa trang",
      "Đồ linh tinh",
      "Chưa phân loại",
    ],
  },
  {
    label: "Mũ, mặt nạ và phụ kiện đầu",
    description: "Nón, mũ và phụ kiện đầu",
    image: "/images/categories/head-accessories.jpg",
    values: ["Nón & Mũ bảo hộ", "Phụ kiện đầu", "Mũ & Mặt nạ"],
  },
  {
    label: "Áo, giáp và trang phục",
    description: "Áo, vest, giáp và trang phục",
    image: "/images/categories/body-accessories.jpg",
    values: [
      "Áo & Vest Tactical",
      "Phụ kiện thân",
      "Áo, giáp và trang phục",
    ],
  },
  {
    label: "Đạo cụ và phụ kiện cầm tay",
    description: "Găng tay, đèn và đạo cụ",
    image: "/images/categories/hand-accessories.jpg",
    values: [
      "Găng tay",
      "Đèn pin",
      "Phụ kiện cầm tay",
      "Phụ kiện trang bị",
      "Dụng cụ tập luyện & Đồ độc lạ",
    ],
  },
  {
    label: "Mô hình, patch và đồ sưu tầm",
    description: "Mô hình, patch và vật phẩm sưu tầm",
    image: "/images/categories/collectibles.jpg",
    values: [
      "Mô hình",
      "Patch & Huy hiệu",
      "Đồ sưu tầm",
      "Item sở thích",
      "Đồ sưu tầm & Độc lạ",
    ],
  },
  {
    label: "Quà tặng độc đáo",
    description: "Những món quà khác biệt",
    image: "/images/categories/gifts.jpg",
    values: [
      "Quà tặng",
      "Quà tặng độc đáo",
      "Pháp khí & Vật phẩm hộ thân",
      "Balo & Túi",
    ],
  },
];

export function getStorefrontCategory(label: string) {
  return storefrontCategories.find(
    (category) => category.label === label
  );
}

export function matchesStorefrontCategory(
  productCategory: string,
  selectedLabel: string
): boolean {
  if (!selectedLabel) {
    return true;
  }

  const category = getStorefrontCategory(selectedLabel);

  return category
    ? category.values.includes(productCategory)
    : productCategory === selectedLabel;
}
