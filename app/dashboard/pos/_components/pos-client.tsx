"use client";

import { useState, useMemo } from "react";
import { ProductSearch } from "./product-search";
import { ProductList } from "./product-list";
import { ShoppingCart } from "./shopping-cart";
import { CheckoutDialog } from "./checkout-dialog";

interface Product {
  id: number;
  name: string;
  sku: string;
  barcode?: string;
  categoryId: number;
  supplierId: number;
  brand?: string;
  description?: string;
  unit: string;
  costPrice: number;
  sellingPrice: number;
  discountPrice?: number;
  initialStock: number;
  lowStockThreshold: number;
  weight?: number;
  dimensions?: string;
  isPerishable: boolean;
  isActive: boolean;
  trackInventory: boolean;
  requiresRefrigeration: boolean;
  isOrganic: boolean;
}

interface Category {
  id: number;
  name: string;
  description: string;
  itemCount: number;
  lowStockItems: number;
  totalValue: number;
  color: string;
}

interface Supplier {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
}

interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

interface POSClientProps {
  products: Product[];
  categories: Category[];
  suppliers: Supplier[];
}

export function POSClient({ products, categories, suppliers }: POSClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!product.isActive || product.initialStock <= 0) return false;

      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.barcode && product.barcode.includes(searchTerm));

      const matchesCategory =
        selectedCategory === "all" ||
        product.categoryId.toString() === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                subtotal:
                  (item.quantity + quantity) *
                  (product.discountPrice || product.sellingPrice),
              }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            product,
            quantity,
            subtotal:
              quantity * (product.discountPrice || product.sellingPrice),
          },
        ];
      }
    });
  };

  const updateCartItem = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity,
              subtotal:
                quantity *
                (item.product.discountPrice || item.product.sellingPrice),
            }
          : item
      )
    );
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
    const tax = subtotal * 0.13;
    const total = subtotal + tax;

    return { subtotal, tax, total };
  }, [cart]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <ProductSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />

        <ProductList
          products={filteredProducts}
          onAddToCart={addToCart}
          categories={categories}
        />
      </div>

      <div>
        <ShoppingCart
          cart={cart}
          totals={cartTotals}
          onUpdateQuantity={updateCartItem}
          onRemoveItem={removeFromCart}
          onClearCart={clearCart}
          onCheckout={() => setIsCheckoutOpen(true)}
        />
      </div>

      <CheckoutDialog
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        totals={cartTotals}
        onCheckoutComplete={clearCart}
      />
    </div>
  );
}
