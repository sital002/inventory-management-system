"use client"

import { useState } from "react"
import { CustomerOrderSearch } from "./customer-order-search"
import { CustomerOrderTable } from "./customer-order-table"

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

interface CustomerOrderClientProps {
  orders: CustomerOrder[]
}

export function CustomerOrderClient({ orders }: CustomerOrderClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "total":
        return b.totalAmount - a.totalAmount
      case "customer":
        return a.customerName.localeCompare(b.customerName)
      default:
        return 0
    }
  })

  return (
    <>
      <CustomerOrderSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <CustomerOrderTable orders={sortedOrders} />
    </>
  )
}
