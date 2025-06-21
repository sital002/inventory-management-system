import { Eye, Download, MoreHorizontal, CheckCircle, Clock, Package, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface CustomerOrder {
  id: string
  date: string
  customerName: string
  customerEmail: string
  items: Array<{ name: string; quantity: number; price: number }>
  totalAmount: number
  status: string
  paymentMethod: string
  orderType: string
}

interface CustomerOrderTableProps {
  orders: CustomerOrder[]
}

const statusConfig = {
  completed: { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
  preparing: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: Clock },
  ready: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Package },
  cancelled: { color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
}

export function CustomerOrderTable({ orders }: CustomerOrderTableProps) {
  const getStatusBadge = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config.icon
    return (
      <Badge className={`${config.color} border`}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <Card className="bg-white border-green-200">
      <CardHeader>
        <CardTitle className="text-green-900">Customer Orders</CardTitle>
        <CardDescription className="text-green-700">Track and manage customer purchases</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-green-200">
              <TableHead className="text-green-800">Order ID</TableHead>
              <TableHead className="text-green-800">Date</TableHead>
              <TableHead className="text-green-800">Customer</TableHead>
              <TableHead className="text-green-800">Items</TableHead>
              <TableHead className="text-green-800">Total</TableHead>
              <TableHead className="text-green-800">Status</TableHead>
              <TableHead className="text-green-800">Payment</TableHead>
              <TableHead className="text-green-800">Type</TableHead>
              <TableHead className="text-green-800">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="border-green-100 hover:bg-green-50/50">
                <TableCell className="font-medium text-green-900">{order.id}</TableCell>
                <TableCell className="text-green-700">{order.date}</TableCell>
                <TableCell className="text-green-700">
                  <div>
                    <div className="font-medium">{order.customerName}</div>
                    <div className="text-sm text-green-600">{order.customerEmail}</div>
                  </div>
                </TableCell>
                <TableCell className="text-green-700">
                  <div className="text-sm">
                    {order.items.slice(0, 2).map((item, index) => (
                      <div key={index}>
                        {item.quantity}x {item.name}
                      </div>
                    ))}
                    {order.items.length > 2 && <div className="text-green-600">+{order.items.length - 2} more</div>}
                  </div>
                </TableCell>
                <TableCell className="text-green-700 font-medium">${order.totalAmount.toFixed(2)}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-green-700 capitalize">{order.paymentMethod.replace("-", " ")}</TableCell>
                <TableCell className="text-green-700 capitalize">{order.orderType}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-green-700 hover:bg-green-100">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Print Receipt
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Package className="h-4 w-4 mr-2" />
                        Update Status
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {orders.length === 0 && (
          <div className="text-center py-8">
            <p className="text-green-600">No orders found matching your criteria.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
