"use client";

import { useState, useMemo, useEffect } from "react";
import { ProductSearch } from "./product-search";
import { ProductList } from "./product-list";
import { ShoppingCart } from "./shopping-cart";
import { CheckoutDialog } from "./checkout-dialog";
import { ProductResponse } from "../page";
import { ICategory } from "@/models/category";
import { getPaginatedProducts } from "@/actions/product";

interface CartItem {
  product: ProductResponse;
  quantity: number;
  subtotal: number;
}

interface POSClientProps {
  initialProducts: ProductResponse[];
  categories: ICategory[];
}

export function POSClient({ initialProducts, categories }: POSClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<ProductResponse[]>(initialProducts);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const addToCart = (product: ProductResponse, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product._id.toString() === product._id.toString()
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.product._id.toString() === product._id.toString()
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

  useEffect(() => {
    async function getProducts() {
      const products = await getPaginatedProducts(1, 10, {
        searchTerm: searchTerm.trim().toLowerCase(),
        category: selectedCategory === "all" ? undefined : selectedCategory,
      });
      if (!products.success) {
        return setProducts([]);
      }
      setProducts(products.data.products);
    }
    getProducts();
  }, [selectedCategory]);

  const updateCartItem = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product._id.toString() === productId.toString()
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

  const removeFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => item.product._id.toString() !== productId.toString()
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleSearch = async (term: string) => {
    const result = await getPaginatedProducts(1, 10, {
      searchTerm: term,
      category: selectedCategory === "all" ? undefined : selectedCategory,
    });
    if (!result.success) {
      setProducts([]);
      return;
    }
    setProducts(result.data.products);
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
          handleSearch={handleSearch}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />

        <ProductList
          products={products}
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
