"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

interface SalesSearchProps {
  onSearch: (searchTerm: string, statusFilter: string, dateFilter: string) => void
}

export function SalesSearch({ onSearch }: SalesSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const handleSearch = () => {
    onSearch(searchTerm, statusFilter, dateFilter)
  }

  const handleReset = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setDateFilter("all")
    onSearch("", "all", "all")
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-green-200">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 h-4 w-4" />
            <Input
              placeholder="Search by transaction ID, receipt, cashier, or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32 border-green-200">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-32 border-green-200">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>

          <Button variant="outline" onClick={handleReset} className="border-green-200 bg-transparent">
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
