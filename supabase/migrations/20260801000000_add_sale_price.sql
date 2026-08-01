alter table public.products
  add column if not exists sale_price numeric;

alter table public.product_variants
  add column if not exists sale_price numeric;
