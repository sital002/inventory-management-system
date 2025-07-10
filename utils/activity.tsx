import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  RotateCcw,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  Package,
} from "lucide-react";

export const getActivityBadge = (type: string) => {
  switch (type) {
    case "sale":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Sale
        </Badge>
      );
    case "refund":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          Refund
        </Badge>
      );
    case "stock_in":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          Stock In
        </Badge>
      );
    case "stock_out":
      return (
        <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
          Stock Out
        </Badge>
      );
    case "price_change":
      return (
        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
          Price Change
        </Badge>
      );
    case "low_stock":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Low Stock
        </Badge>
      );
    default:
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
          Activity
        </Badge>
      );
  }
};
export const getActivityIcon = (type: string) => {
  switch (type) {
    case "sale":
      return <ShoppingCart className="h-4 w-4" />;
    case "refund":
      return <RotateCcw className="h-4 w-4" />;
    case "stock_in":
      return <TrendingUp className="h-4 w-4" />;
    case "stock_out":
      return <TrendingDown className="h-4 w-4" />;
    case "price_change":
      return <DollarSign className="h-4 w-4" />;
    case "low_stock":
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
};
