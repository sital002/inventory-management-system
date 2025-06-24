"use client";

import type React from "react";

import { useState } from "react";
import { Package, Plus, Minus, AlertCircle } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AdjustStockDialogProps {
  product: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdjustStockDialog({
  product,
  open,
  onOpenChange,
}: AdjustStockDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    adjustmentType: "add",
    quantity: "",
    reason: "",
    notes: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.quantity || isNaN(Number(formData.quantity))) {
      setError("Please enter a valid quantity");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onOpenChange(false);
        setFormData({
          adjustmentType: "add",
          quantity: "",
          reason: "",
          notes: "",
        });
      }, 1500);
    } catch (err) {
      setError("Failed to adjust stock. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const newStock =
    product?.stock +
    (formData.adjustmentType === "add"
      ? Number(formData.quantity || 0)
      : -Number(formData.quantity || 0));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-green-900 flex items-center gap-2">
            <Package className="h-5 w-5" />
            Adjust Stock
          </DialogTitle>
          <DialogDescription className="text-green-700">
            Add or remove stock for {product?.name}
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-200 bg-green-50">
            <AlertCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Stock adjusted successfully!
            </AlertDescription>
          </Alert>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="text-sm text-blue-800">
            <strong>Current Stock:</strong> {product?.stock} units
          </div>
          {formData.quantity && (
            <div className="text-sm text-blue-800 mt-1">
              <strong>New Stock:</strong> {newStock} units
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="adjustment-type"
                className="text-green-800 font-medium"
              >
                Adjustment Type
              </Label>
              <Select
                value={formData.adjustmentType}
                onValueChange={(value) =>
                  handleInputChange("adjustmentType", value)
                }
              >
                <SelectTrigger className="border-green-200 focus:border-green-400 focus:ring-green-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">
                    <div className="flex items-center gap-2">
                      <Plus className="h-4 w-4 text-green-600" />
                      Add Stock
                    </div>
                  </SelectItem>
                  <SelectItem value="remove">
                    <div className="flex items-center gap-2">
                      <Minus className="h-4 w-4 text-red-600" />
                      Remove Stock
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-green-800 font-medium">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", e.target.value)}
                placeholder="Enter quantity"
                className="border-green-200 focus:border-green-400 focus:ring-green-400"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason" className="text-green-800 font-medium">
              Reason
            </Label>
            <Select
              value={formData.reason}
              onValueChange={(value) => handleInputChange("reason", value)}
            >
              <SelectTrigger className="border-green-200 focus:border-green-400 focus:ring-green-400">
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="restock">Restock from supplier</SelectItem>
                <SelectItem value="sale">Manual sale</SelectItem>
                <SelectItem value="damaged">Damaged goods</SelectItem>
                <SelectItem value="expired">Expired items</SelectItem>
                <SelectItem value="theft">Theft/Loss</SelectItem>
                <SelectItem value="return">Customer return</SelectItem>
                <SelectItem value="correction">Inventory correction</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-green-800 font-medium">
              Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Additional notes about this adjustment"
              className="border-green-200 focus:border-green-400 focus:ring-green-400 min-h-[80px]"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white flex-1"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adjusting...
                </>
              ) : (
                <>
                  <Package className="h-4 w-4 mr-2" />
                  Adjust Stock
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
