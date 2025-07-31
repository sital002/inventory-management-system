"use client";

import type React from "react";

import { useState } from "react";
import { Plus, Save, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { colorOptions } from "@/utils/color-options";
import { updateCategory } from "@/actions/category";
import { useRouter } from "next/navigation";

const initialFormData = {
  name: "",
  description: "",
  color: "Green",
};

type Category = {
  _id: string;
  name: string;
  description: string;
  itemCount: number;
  lowStockItems: number;
  totalValue: number;
  color: string;
};

type UpdateCategoryDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  category: Category;
};

export function UpdateCategoryDialog({
  open,
  setOpen,
  category,
}: UpdateCategoryDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: category.name,
    description: category.description,
    color: category.color,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Category name is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setError("");
    try {
      const result = await updateCategory(
        {
          color: formData.color as any,
          name: formData.name,
          description: formData.description,
        },
        category._id
      );
      console.log(result);
      if (!result.success) {
        setError(result.error || "Failed to update category");
        return;
      }
      setOpen(false);
      // setFormData(initialFormData);
      // router.push("/dashboard/categories/" + category._id);
      router.refresh();
    } catch (err) {
      console.error("Error update category:", err);
      setError("Failed to update category. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!isSubmitting) {
      setOpen(newOpen);
      if (!newOpen) {
        setFormData({
          name: "",
          description: "",
          color: "bg-green-50 border-green-200",
        });
        setError("");
      }
    }
  };
  console.log(formData.color);
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-green-900">Update Category</DialogTitle>
          <DialogDescription className="text-green-700">
            Update inventory category for your supermarket
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-green-800 font-medium">
              Category Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="e.g., Fresh Produce, Dairy & Eggs"
              className="border-green-200 focus:border-green-400 focus:ring-green-400"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-green-800 font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Brief description of what items belong in this category"
              className="border-green-200 focus:border-green-400 focus:ring-green-400 min-h-[80px]"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="color" className="text-green-800 font-medium">
              Color Theme
            </Label>
            <Select
              value={formData.color}
              onValueChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  color: value,
                }));
              }}
            >
              <SelectTrigger className="border-green-200 focus:border-green-400 focus:ring-green-400 w-full">
                <SelectValue placeholder="Select a color theme" />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((option) => (
                  <SelectItem key={option.value} value={option.label}>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded ${option.preview} border`}
                      ></div>
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.name && (
            <div className="space-y-2">
              <Label className="text-green-800 font-medium">Preview</Label>
              <Card
                className={`${
                  colorOptions.find((option) => option.label === formData.color)
                    ?.value
                } border-2`}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-green-900 text-lg">
                    {formData.name}
                  </CardTitle>
                  <CardDescription className="text-green-700">
                    {formData.description || "No description provided"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-700">Items:</span>
                      <span className="font-medium text-green-900">0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-700">Value:</span>
                      <span className="font-medium text-green-900">$0.00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white flex-1"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Update Category
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
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
