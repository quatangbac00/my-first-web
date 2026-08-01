export type PriceValue = number | string | null | undefined;

export type PriceSource = {
  price: PriceValue;
  sale_price?: PriceValue;
  is_active?: boolean | null;
};

export type ProductPriceRange = {
  minPrice: number;
  maxPrice: number;
};

type ProductPriceSource = PriceSource & {
  variants?: PriceSource[];
};

function toPositivePrice(value: PriceValue): number | null {
  const price = Number(value);

  return Number.isFinite(price) && price > 0 ? price : null;
}

export function getVariantEffectivePrice(
  variant: PriceSource
): number | null {
  const regularPrice = toPositivePrice(variant.price);
  const salePrice = toPositivePrice(variant.sale_price);

  if (
    regularPrice !== null &&
    salePrice !== null &&
    salePrice < regularPrice
  ) {
    return salePrice;
  }

  return regularPrice;
}

export function getProductPriceRange(
  product: ProductPriceSource,
  variants: PriceSource[] = product.variants || []
): ProductPriceRange | null {
  const variantPrices = variants
    .filter((variant) => variant.is_active !== false)
    .map(getVariantEffectivePrice)
    .filter((price): price is number => price !== null);

  const prices =
    variantPrices.length > 0
      ? variantPrices
      : [getVariantEffectivePrice(product)].filter(
          (price): price is number => price !== null
        );

  if (prices.length === 0) {
    return null;
  }

  return {
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
  };
}

export function formatPrice(value: number): string {
  return `${new Intl.NumberFormat("vi-VN").format(value)}đ`;
}

export function formatPriceRange(
  minPrice: number,
  maxPrice: number
): string {
  if (minPrice === maxPrice) {
    return formatPrice(minPrice);
  }

  return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
}
