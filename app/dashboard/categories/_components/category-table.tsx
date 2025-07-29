import {
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Package,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IProduct } from "@/models/product";
import { ISupplier } from "@/models/supplier";
import Link from "next/link";
import { deleteProduct } from "@/actions/product";
import { useRouter } from "next/navigation";

interface InventoryTableProps {
  items: (IProduct & { supplier: ISupplier })[];
}

export function CategoryTable({ items }: InventoryTableProps) {
  const getStockStatus = (item: IProduct & { supplier: ISupplier }) => {
    if (item.currentStock === 0) {
      return {
        status: "out-of-stock",
        color: "bg-red-100 text-red-800 border-red-200",
        icon: AlertTriangle,
      };
    } else if (item.currentStock <= item.lowStockThreshold) {
      return {
        status: "low-stock",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: Package,
      };
    } else {
      return {
        status: "in-stock",
        color: "bg-green-100 text-green-800 border-green-200",
        icon: CheckCircle,
      };
    }
  };
  const router = useRouter();
  const handleDelete = async (id: string) => {
    const result = await deleteProduct(id);
    console.log(result);
    router.refresh();
  };

  const getStatusBadge = (item: IProduct & { supplier: ISupplier }) => {
    const { status, color, icon: Icon } = getStockStatus(item);
    return (
      <Badge className={`${color} border text-xs`}>
        <Icon className="h-3 w-3 mr-1" />
        <span className="hidden sm:inline">
          {status === "out-of-stock"
            ? "Out of Stock"
            : status === "low-stock"
            ? "Low Stock"
            : "In Stock"}
        </span>
        <span className="sm:hidden">
          {status === "out-of-stock"
            ? "Out"
            : status === "low-stock"
            ? "Low"
            : "OK"}
        </span>
      </Badge>
    );
  };

  return (
    <Card className="bg-white border-green-200">
      <CardHeader>
        <CardTitle className="text-green-900 text-lg sm:text-xl">
          Inventory Items
        </CardTitle>
        <CardDescription className="text-green-700">
          Manage individual items in this category
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="block sm:hidden">
          {items.map((item) => (
            <div
              key={item._id.toString()}
              className="border-b border-green-100 p-4 last:border-b-0"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="font-medium text-green-900 text-sm">
                    {item.name}
                  </h4>
                  <p className="text-xs text-green-600">SKU: {item.sku}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link href={`/dashboard/products/${item._id.toString()}`}>
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/dashboard/products/edit/${item._id.toString()}`}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Item
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDelete(item._id.toString())}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-green-900">
                  ${item.sellingPrice.toFixed(2)}
                </span>
                {getStatusBadge(item)}
              </div>

              <div className="flex justify-between text-xs text-green-600">
                <span>Stock: {item.currentStock}</span>
                <span>Supplier: {item.supplier.name}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden sm:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-green-200">
                <TableHead className="text-green-800">Item Name</TableHead>
                <TableHead className="text-green-800">SKU</TableHead>
                <TableHead className="text-green-800">Price</TableHead>
                <TableHead className="text-green-800">Stock</TableHead>
                <TableHead className="text-green-800">Status</TableHead>
                <TableHead className="text-green-800">Supplier</TableHead>
                <TableHead className="text-green-800">Last Restocked</TableHead>
                <TableHead className="text-green-800">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow
                  key={item._id.toString()}
                  className="border-green-100 hover:bg-green-50/50"
                >
                  <TableCell className="font-medium text-green-900">
                    {item.name}
                  </TableCell>
                  <TableCell className="text-green-700 font-mono text-sm">
                    {item.sku}
                  </TableCell>
                  <TableCell className="text-green-700 font-medium">
                    ${item.sellingPrice.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-green-700">
                    <span className="font-medium">{item.currentStock}</span>
                    <span className="text-xs text-green-600 ml-1">
                      / {item.lowStockThreshold}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(item)}</TableCell>
                  <TableCell className="text-green-700">
                    {item.supplier.name}
                  </TableCell>
                  <TableCell className="text-green-700">
                    {item.lastRestocked
                      ? new Date(item.lastRestocked).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-700 hover:bg-green-100"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link
                          href={`/dashboard/products/${item._id.toString()}`}
                        >
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/dashboard/products/edit/${item._id.toString()}`}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Item
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(item._id.toString())}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Item
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {items.length === 0 && (
          <div className="text-center py-8 px-4">
            <Package className="h-12 w-12 text-green-300 mx-auto mb-4" />
            <p className="text-green-600 text-lg mb-2">No items found</p>
            <p className="text-green-500 text-sm">
              Add some items to this category to get started
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
