"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Product } from "@/data/products";

const CART_STORAGE_KEY = "ga-cham-chi-cart";

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product) => void;
  increaseQuantity: (itemId: number | string) => void;
  decreaseQuantity: (itemId: number | string) => void;
  removeFromCart: (itemId: number | string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(
  undefined
);

interface CartProviderProps {
  children: ReactNode;
}

function getAllowedQuantity(
  currentQuantity: number,
  maxStock?: number
) {
  if (
    typeof maxStock !== "number" ||
    !Number.isFinite(maxStock)
  ) {
    return currentQuantity + 1;
  }

  return Math.min(currentQuantity + 1, Math.max(0, maxStock));
}

export function CartProvider({
  children,
}: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hasLoadedCart, setHasLoadedCart] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);

      if (savedCart) {
        const parsedCart: unknown = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setItems(parsedCart as CartItem[]);
        }
      }
    } catch (error) {
      console.error(
        "Không thể đọc giỏ hàng đã lưu:",
        error
      );
    } finally {
      setHasLoadedCart(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedCart) {
      return;
    }

    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(items)
      );
    } catch (error) {
      console.error(
        "Không thể lưu giỏ hàng:",
        error
      );
    }
  }, [items, hasLoadedCart]);

  const addToCart = (product: Product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) => {
          if (item.id !== product.id) {
            return item;
          }

          return {
            ...item,
            quantity: getAllowedQuantity(
              item.quantity,
              item.maxStock
            ),
          };
        });
      }

      if (
        typeof product.maxStock === "number" &&
        product.maxStock <= 0
      ) {
        return currentItems;
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (
    itemId: number | string
  ) => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== itemId) {
          return item;
        }

        return {
          ...item,
          quantity: getAllowedQuantity(
            item.quantity,
            item.maxStock
          ),
        };
      })
    );
  };

  const decreaseQuantity = (
    itemId: number | string
  ) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === itemId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (
    itemId: number | string
  ) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== itemId
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.quantity,
        0
      ),
    [items]
  );

  const cartTotal = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total +
          Number(item.price) * item.quantity,
        0
      ),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        cartTotal,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart phải được sử dụng bên trong CartProvider"
    );
  }

  return context;
}