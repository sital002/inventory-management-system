"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SalesTransaction } from "./sales-client";

interface RefundDialogProps {
  error: string;
  transaction: SalesTransaction | null;
  isOpen: boolean;
  onClose: () => void;
  onRefund: (transactionId: string, reason: string) => Promise<void>;
}

const refundReasons = [
  "Customer changed mind",
  "Product defective",
  "Wrong item purchased",
  "Expired product",
  "Pricing error",
  "Customer dissatisfied",
  "Other",
];

export function RefundDialog({
  transaction,
  error,
  isOpen,
  onClose,
  onRefund,
}: RefundDialogProps) {
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  if (!transaction) return null;

  const handleSubmit = () => {
    const finalReason = reason === "Other" ? customReason : reason;
    if (finalReason.trim()) {
      onRefund(transaction._id.toString(), finalReason);
      setReason("");
      setCustomReason("");
    }
  };

  const handleClose = () => {
    setReason("");
    setCustomReason("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-green-900">Process Refund</DialogTitle>
          <DialogDescription>
            Process refund for transaction {transaction._id.toString()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {error && <p className="text-destructive">Error: {error}</p>}

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-900 mb-3">
              Transaction Details
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-green-600">Receipt:</span>
                <div className="font-medium text-green-900">
                  {transaction._id.toString()}
                </div>
              </div>
              <div>
                <span className="text-green-600">Total Amount:</span>
                <div className="font-semibold text-green-900">
                  ${transaction.totalAmount.toFixed(2)}
                </div>
              </div>
              <div>
                <span className="text-green-600">Payment Method:</span>
                <div className="font-medium text-green-900 capitalize">
                  {transaction.paymentMethod}
                </div>
              </div>
            </div>
          </div>

          <div>
            <Label className="text-green-900 font-medium">
              Items to Refund
            </Label>
            <div className="mt-2 space-y-2">
              {transaction.products.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 bg-gray-50 rounded"
                >
                  <span className="text-green-900">
                    {item.quantity} {item.product.unit} {item.product.name}
                  </span>
                  <span className="font-medium text-green-900">
                    ${(item.quantity * item.product.sellingPrice).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="reason" className="text-green-900 font-medium">
              Refund Reason
            </Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger className="border-green-200 focus:border-green-500">
                <SelectValue placeholder="Select refund reason" />
              </SelectTrigger>
              <SelectContent>
                {refundReasons.map((reasonOption) => (
                  <SelectItem key={reasonOption} value={reasonOption}>
                    {reasonOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {reason === "Other" && (
            <div className="space-y-3">
              <Label
                htmlFor="customReason"
                className="text-green-900 font-medium"
              >
                Custom Reason
              </Label>
              <Textarea
                id="customReason"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Please specify the refund reason..."
                className="border-green-200 focus:border-green-500 focus:ring-green-500"
                rows={3}
              />
            </div>
          )}

          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="flex justify-between items-center">
              <span className="text-red-900 font-medium">
                Total Refund Amount:
              </span>
              <span className="text-2xl font-bold text-red-900">
                ${transaction.totalAmount.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-red-700 mt-1">
              This amount will be refunded to the customer's original payment
              method.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-red-600 hover:bg-red-700 text-white"
            disabled={!reason || (reason === "Other" && !customReason.trim())}
          >
            Process Refund
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
