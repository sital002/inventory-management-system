"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RefreshCw, Receipt, Eye } from "lucide-react";
import { SalesTransaction } from "./sales-client";

interface SalesTableProps {
  transactions: SalesTransaction[];
  onRefund: (transaction: SalesTransaction) => void;
}

const statusColors = {
  completed: "bg-green-100 text-green-800 border-green-200",
  refunded: "bg-red-100 text-red-800 border-red-200",
};

const paymentMethodColors = {
  cash: "bg-green-100 text-green-800",
  card: "bg-blue-100 text-blue-800",
  mobile: "bg-purple-100 text-purple-800",
};

export function SalesTable({ transactions, onRefund }: SalesTableProps) {
  if (transactions.length === 0) {
    return (
      <Card className="border-green-200">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-green-600 mb-4">
            <Receipt className="h-12 w-12" />
          </div>
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            No Sales Found
          </h3>
          <p className="text-green-600 text-center">
            No sales transactions match your current search criteria.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-green-200">
      <CardHeader className="bg-green-50 border-b border-green-200">
        <CardTitle className="text-green-900">Sales Transactions</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-green-200">
                <TableHead className="text-green-900">Transaction ID</TableHead>
                <TableHead className="text-green-900">Date & Time</TableHead>
                <TableHead className="text-green-900">Items</TableHead>
                <TableHead className="text-green-900">Total</TableHead>
                <TableHead className="text-green-900">Payment</TableHead>
                <TableHead className="text-green-900">Status</TableHead>
                <TableHead className="text-green-900">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow
                  key={transaction._id.toString()}
                  className="border-green-100"
                >
                  <TableCell className="font-medium text-green-900">
                    <div>
                      {/* <div>{transaction._id.toString()}</div> */}
                      <div className="text-sm text-green-600">
                        {transaction._id.toString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-green-900">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-green-600">
                        {new Date(transaction.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {transaction.products.slice(0, 2).map((item, index) => (
                        <div key={index} className="text-sm">
                          <span className="font-medium">{item.quantity}</span>
                          <span className="text-green-600">
                            {" "}
                            {item.product.unit}{" "}
                          </span>
                          <span>{item.product.name}</span>
                        </div>
                      ))}
                      {transaction.products.length > 2 && (
                        <div className="text-sm text-green-600">
                          +{transaction.products.length - 2} more items
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-semibold text-green-900">
                        ${transaction.totalAmount.toFixed(2)}
                      </div>
                      <div className="text-sm text-green-600">
                        {(transaction.totalAmount * 0.13).toFixed(2)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        paymentMethodColors[
                          transaction.paymentMethod as keyof typeof paymentMethodColors
                        ]
                      }
                    >
                      {transaction.paymentMethod.charAt(0).toUpperCase() +
                        transaction.paymentMethod.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[transaction.status]}>
                      {transaction.status.charAt(0).toUpperCase() +
                        transaction.status.slice(1)}
                    </Badge>
                    {transaction.status === "returned" &&
                      transaction.refundReason && (
                        <div className="text-xs text-red-600 mt-1">
                          {transaction.refundReason}
                        </div>
                      )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {transaction.status === "completed" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onRefund(transaction)}
                          className="border-red-200 text-red-700 hover:bg-red-50"
                        >
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Refund
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
