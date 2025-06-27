"use client";

import {
  Minus,
  Plus,
  Trash2,
  ShoppingCartIcon as CartIcon,
  CreditCard,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

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

interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

interface CartTotals {
  subtotal: number;
  tax: number;
  total: number;
}

interface ShoppingCartProps {
  cart: CartItem[];
  totals: CartTotals;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

export function ShoppingCart({
  cart,
  totals,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
}: ShoppingCartProps) {
  if (cart.length === 0) {
    return (
      <Card className="bg-white border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900 flex items-center">
            <CartIcon className="h-5 w-5 mr-2" />
            Shopping Cart
          </CardTitle>
        </CardHeader>
        <CardContent className="py-12 text-center">
          <CartIcon className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-green-900 mb-2">
            Cart is Empty
          </h3>
          <p className="text-green-600">Add products to start a sale.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border-green-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-green-900 flex items-center">
            <CartIcon className="h-5 w-5 mr-2" />
            Shopping Cart ({cart.length})
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={onClearCart}
            className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
          >
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center gap-3 p-3 border border-green-100 rounded-lg"
            >
              <div className="flex-1">
                <h4 className="font-medium text-green-900 text-sm">
                  {item.product.name}
                </h4>
                <p className="text-xs text-green-600">
                  $
                  {(
                    item.product.discountPrice || item.product.sellingPrice
                  ).toFixed(2)}{" "}
                  / {item.product.unit}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    onUpdateQuantity(item.product.id, item.quantity - 1)
                  }
                  className="h-8 w-8 p-0"
                >
                  <Minus className="h-3 w-3" />
                </Button>

                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    onUpdateQuantity(
                      item.product.id,
                      Number.parseInt(e.target.value) || 0
                    )
                  }
                  className="w-16 h-8 text-center text-sm"
                  min="0"
                  max={item.product.initialStock}
                />

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    onUpdateQuantity(item.product.id, item.quantity + 1)
                  }
                  disabled={item.quantity >= item.product.initialStock}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRemoveItem(item.product.id)}
                  className="h-8 w-8 p-0 text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>

              <div className="text-right min-w-[60px]">
                <p className="font-medium text-green-900">
                  ${item.subtotal.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-green-700">Subtotal:</span>
            <span className="text-green-900">
              ${totals.subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-green-700">Tax (10%):</span>
            <span className="text-green-900">${totals.tax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span className="text-green-900">Total:</span>
            <span className="text-green-900">${totals.total.toFixed(2)}</span>
          </div>
        </div>

        <Button
          onClick={onCheckout}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          size="lg"
        >
          <CreditCard className="h-4 w-4 mr-2" />
          Proceed to Checkout
        </Button>
      </CardContent>
    </Card>
  );
}
