"use client";

import { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { deleteProduct } from "@/actions/product";
import { useRouter } from "next/navigation";

interface DeleteProductDialogProps {
  product: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteProductDialog({
  product,
  open,
  onOpenChange,
}: DeleteProductDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const handleDelete = async () => {
    setIsDeleting(true);
    setError("");

    try {
      onOpenChange(false);
      const result = await deleteProduct(product._id.toString());
      console.log(result);
      if (!result.success) {
        console.log(result.error);
      }
      router.push("/dashboard/products");
      router.refresh();
    } catch (err) {
      setError("Failed to delete product. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-red-900 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Delete Product
          </DialogTitle>
          <DialogDescription className="text-gray-700">
            This action cannot be undone. This will permanently delete the
            product.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-900">
                Are you sure you want to delete this product?
              </h4>
              <p className="text-sm text-red-700 mt-1">
                <strong>"{product?.name}"</strong> will be permanently removed
                from your inventory.
              </p>
              {product?.stock > 0 && (
                <p className="text-sm text-red-700 mt-2">
                  <strong>Warning:</strong> This product has {product.stock}{" "}
                  units in stock.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
            className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            {isDeleting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Product
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
