"use client";

import { useState } from "react";
import {
  CreditCard,
  DollarSign,
  Smartphone,
  Receipt,
  CheckCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { ProductResponse } from "../page";
import { createOrder } from "@/actions/order";
import { useRouter } from "next/navigation";

interface CartItem {
  product: ProductResponse;
  quantity: number;
  subtotal: number;
}

interface CartTotals {
  subtotal: number;
  tax: number;
  total: number;
}

interface CheckoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  totals: CartTotals;
  onCheckoutComplete: () => void;
}

type PaymentMethod = "cash" | "card" | "online";

export function CheckoutDialog({
  isOpen,
  onClose,
  cart,
  totals,
  onCheckoutComplete,
}: CheckoutDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [cashReceived, setCashReceived] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const cashAmount = Number.parseFloat(cashReceived) || 0;
  const changeAmount = cashAmount - totals.total;
  const router = useRouter();
  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);
    const cartItems = cart.map((item) => {
      return {
        productId: item.product._id.toString(),
        quantity: item.quantity,
        subtotal: item.subtotal,
      };
    });
    const result = await createOrder({
      products: cartItems,
      paymentMethod: paymentMethod,
      totalAmount: totals.total,
    });
    if (!result.success) {
      setError(result.error);
      setIsProcessing(false);
      return;
    }

    console.log(result);
    setTransactionId(result.data._id.toString());
    setCashReceived("");
    setPaymentMethod("card");
    setError(null);
    setIsProcessing(false);
    setIsComplete(true);
    router.refresh();
  };

  const handleClose = () => {
    if (isComplete) {
      onCheckoutComplete();
    }
    onClose();
    setIsComplete(false);
    setIsProcessing(false);
    setCashReceived("");
    setPaymentMethod("card");
    setTransactionId("");
  };

  const canProcessPayment = () => {
    if (paymentMethod === "cash") {
      return cashAmount >= totals.total;
    }
    return true;
  };

  if (isComplete) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-900 mb-2">
              Payment Successful!
            </h2>
            <p className="text-green-700 mb-4">
              Transaction completed successfully
            </p>

            <Card className="bg-green-50 border-green-200 mb-4">
              <CardContent className="p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Transaction ID:</span>
                    <span className="font-mono">{transactionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-bold">
                      ${totals.total.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span className="capitalize">{paymentMethod}</span>
                  </div>
                  {paymentMethod === "cash" && changeAmount > 0 && (
                    <div className="flex justify-between text-green-700 font-bold">
                      <span>Change:</span>
                      <span>${changeAmount.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleClose}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Receipt className="h-4 w-4 mr-2" />
              Print Receipt & Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-green-900">Checkout</DialogTitle>
          <DialogDescription className="text-green-700">
            Complete the sale and process payment
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-green-900 mb-3">Order Summary</h3>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {cart.map((item) => (
                    <div
                      key={item.product._id.toString()}
                      className="flex justify-between text-sm"
                    >
                      <span className="flex-1">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        ${item.subtotal.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator className="my-3" />

                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT:</span>
                    <span>${totals.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-green-900">
                    <span>Total:</span>
                    <span>${totals.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="font-semibold text-green-900 mb-3">
              Payment Method
            </h3>

            <div className="space-y-3 mb-4">
              <Button
                variant={paymentMethod === "card" ? "black" : "outline"}
                onClick={() => setPaymentMethod("card")}
                className="w-full justify-start"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Credit/Debit Card
              </Button>

              <Button
                variant={paymentMethod === "cash" ? "black" : "outline"}
                onClick={() => setPaymentMethod("cash")}
                className="w-full justify-start"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Cash
              </Button>

              <Button
                variant={paymentMethod === "online" ? "black" : "outline"}
                onClick={() => setPaymentMethod("online")}
                className="w-full justify-start"
              >
                <Smartphone className="h-4 w-4 mr-2" />
                Mobile Payment
              </Button>
            </div>

            {paymentMethod === "cash" && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="cashReceived" className="text-green-800">
                    Cash Received
                  </Label>
                  <Input
                    id="cashReceived"
                    type="number"
                    step="0.01"
                    value={cashReceived}
                    onChange={(e) => setCashReceived(e.target.value)}
                    placeholder="0.00"
                    className="border-green-200 focus:border-green-400 focus:ring-green-400 mt-3"
                  />
                </div>

                {cashAmount > 0 && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span>Cash Received:</span>
                      <span>${cashAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Due:</span>
                      <span>${totals.total.toFixed(2)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold">
                      <span>Change:</span>
                      <span
                        className={
                          changeAmount >= 0 ? "text-green-700" : "text-red-700"
                        }
                      >
                        ${changeAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  Card payment will be processed securely
                </p>
              </div>
            )}

            {paymentMethod === "online" && (
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-sm text-purple-700">
                  Customer will scan QR code or tap to pay
                </p>
              </div>
            )}
            <p className="mt-3 text-destructive">{error}</p>
          </div>
        </div>
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isProcessing}
            className="flex-1 bg-transparent"
          >
            Cancel
          </Button>

          <Button
            onClick={handlePayment}
            disabled={!canProcessPayment() || isProcessing}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Process Payment
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
