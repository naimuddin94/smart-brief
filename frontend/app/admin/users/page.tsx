"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Package,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  AlertTriangle,
  Calendar,
  Clock,
  FileText,
  QrCode,
  Bell,
  Filter,
} from "lucide-react";

const batchInventory = [
  {
    id: 1,
    productName: "Organic Milk",
    batchNumber: "OM-2024-001",
    quantity: 50,
    unitPrice: 4.99,
    expiryDate: "2024-02-15",
    manufacturingDate: "2024-01-15",
    supplier: "Fresh Dairy Co.",
    location: "Cooler A-1",
    alertDays: 7,
    category: "Dairy",
    status: "good",
  },
  {
    id: 2,
    productName: "Vitamin C Tablets",
    batchNumber: "VC-2024-045",
    quantity: 200,
    unitPrice: 12.99,
    expiryDate: "2024-01-25",
    manufacturingDate: "2022-01-25",
    supplier: "PharmaCorp",
    location: "Shelf B-3",
    alertDays: 30,
    category: "Pharmaceuticals",
    status: "expiring",
  },
  {
    id: 3,
    productName: "Fresh Bread",
    batchNumber: "FB-2024-012",
    quantity: 25,
    unitPrice: 2.49,
    expiryDate: "2024-01-20",
    manufacturingDate: "2024-01-18",
    supplier: "Local Bakery",
    location: "Display A-2",
    alertDays: 1,
    category: "Bakery",
    status: "expired",
  },
  {
    id: 4,
    productName: "Canned Tomatoes",
    batchNumber: "CT-2023-089",
    quantity: 100,
    unitPrice: 1.99,
    expiryDate: "2025-12-31",
    manufacturingDate: "2023-12-31",
    supplier: "Food Processors Inc.",
    location: "Warehouse C-5",
    alertDays: 30,
    category: "Canned Goods",
    status: "good",
  },
  {
    id: 5,
    productName: "Antibiotics",
    batchNumber: "AB-2024-023",
    quantity: 75,
    unitPrice: 25.99,
    expiryDate: "2024-01-30",
    manufacturingDate: "2022-01-30",
    supplier: "MediSupply Ltd.",
    location: "Pharmacy Vault",
    alertDays: 60,
    category: "Pharmaceuticals",
    status: "warning",
  },
];

const expiryAlerts = [
  {
    id: 1,
    productName: "Fresh Bread",
    batchNumber: "FB-2024-012",
    expiryDate: "2024-01-20",
    daysLeft: -2,
    quantity: 25,
    alertType: "expired",
    value: 62.25,
  },
  {
    id: 2,
    productName: "Vitamin C Tablets",
    batchNumber: "VC-2024-045",
    expiryDate: "2024-01-25",
    daysLeft: 7,
    quantity: 200,
    alertType: "expiring",
    value: 2598,
  },
  {
    id: 3,
    productName: "Antibiotics",
    batchNumber: "AB-2024-023",
    expiryDate: "2024-01-30",
    daysLeft: 12,
    quantity: 75,
    alertType: "warning",
    value: 1949.25,
  },
];

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [currentDate] = useState(new Date("2024-01-18")); // Simulated current date

  const calculateDaysToExpiry = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const diffTime = expiry - currentDate;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getExpiryStatus = (expiryDate, alertDays) => {
    const daysLeft = calculateDaysToExpiry(expiryDate);
    if (daysLeft < 0) return "expired";
    if (daysLeft <= alertDays) return "expiring";
    if (daysLeft <= alertDays * 2) return "warning";
    return "good";
  };

  const getStatusBadge = (status, daysLeft) => {
    const variants = {
      expired: {
        variant: "destructive",
        text: "Expired",
        class: "bg-red-100 text-red-800",
      },
      expiring: {
        variant: "destructive",
        text: "Expiring Soon",
        class: "bg-orange-100 text-orange-800",
      },
      warning: {
        variant: "secondary",
        text: "Warning",
        class: "bg-yellow-100 text-yellow-800",
      },
      good: {
        variant: "default",
        text: "Good",
        class: "bg-green-100 text-green-800",
      },
    };
    const config = variants[status];
    return (
      <Badge variant={config.variant} className={config.class}>
        {config.text} {daysLeft !== undefined && `(${daysLeft}d)`}
      </Badge>
    );
  };

  const filteredInventory = batchInventory.filter((item) => {
    const matchesSearch =
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.batchNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const status = getExpiryStatus(item.expiryDate, item.alertDays);
    const matchesStatus = selectedStatus === "all" || status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalBatches = batchInventory.length;
  const expiredItems = batchInventory.filter(
    (item) => getExpiryStatus(item.expiryDate, item.alertDays) === "expired"
  ).length;
  const expiringItems = batchInventory.filter(
    (item) => getExpiryStatus(item.expiryDate, item.alertDays) === "expiring"
  ).length;
  const totalValue = batchInventory.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Users Management</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Bell className="mr-2 h-4 w-4" />
            Alerts ({expiryAlerts.length})
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Batch
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Batch</DialogTitle>
                <DialogDescription>
                  Add a new product batch with expiry tracking
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input id="product-name" placeholder="Enter product name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="batch-number">Batch Number</Label>
                    <Input id="batch-number" placeholder="Batch/Lot number" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit-price">Unit Price</Label>
                    <Input id="unit-price" type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alert-days">Alert Days</Label>
                    <Input id="alert-days" type="number" placeholder="7" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="manufacturing-date">
                      Manufacturing Date
                    </Label>
                    <Input id="manufacturing-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiry-date">Expiry Date</Label>
                    <Input id="expiry-date" type="date" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="supplier">Supplier</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fresh-dairy">
                          Fresh Dairy Co.
                        </SelectItem>
                        <SelectItem value="pharmacorp">PharmaCorp</SelectItem>
                        <SelectItem value="local-bakery">
                          Local Bakery
                        </SelectItem>
                        <SelectItem value="food-processors">
                          Food Processors Inc.
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Storage Location</Label>
                    <Input id="location" placeholder="e.g., Cooler A-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dairy">Dairy</SelectItem>
                      <SelectItem value="pharmaceuticals">
                        Pharmaceuticals
                      </SelectItem>
                      <SelectItem value="bakery">Bakery</SelectItem>
                      <SelectItem value="canned-goods">Canned Goods</SelectItem>
                      <SelectItem value="fresh-produce">
                        Fresh Produce
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={() => setShowAddDialog(false)}>Add Batch</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Batches</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBatches}</div>
            <p className="text-xs text-muted-foreground">
              Active inventory batches
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {expiredItems}
            </div>
            <p className="text-xs text-muted-foreground">
              Require immediate action
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {expiringItems}
            </div>
            <p className="text-xs text-muted-foreground">Within alert period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Inventory Value
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Total batch value</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="batches" className="space-y-4">
        <TabsList>
          <TabsTrigger value="batches">All Batches</TabsTrigger>
          <TabsTrigger value="alerts">Expiry Alerts</TabsTrigger>
          <TabsTrigger value="expired">Expired Items</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="batches" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Batch Inventory</CardTitle>
              <CardDescription>
                Track product batches with expiry dates and alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products or batch numbers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Dairy">Dairy</SelectItem>
                    <SelectItem value="Pharmaceuticals">
                      Pharmaceuticals
                    </SelectItem>
                    <SelectItem value="Bakery">Bakery</SelectItem>
                    <SelectItem value="Canned Goods">Canned Goods</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="expiring">Expiring</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Batch Number</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Days Left</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => {
                    const daysLeft = calculateDaysToExpiry(item.expiryDate);
                    const status = getExpiryStatus(
                      item.expiryDate,
                      item.alertDays
                    );
                    return (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {item.productName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {item.category}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {item.batchNumber}
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.expiryDate}</TableCell>
                        <TableCell>
                          <span
                            className={
                              daysLeft < 0
                                ? "text-red-600 font-bold"
                                : daysLeft <= item.alertDays
                                ? "text-orange-600 font-bold"
                                : ""
                            }
                          >
                            {daysLeft < 0
                              ? `${Math.abs(daysLeft)} days ago`
                              : `${daysLeft} days`}
                          </span>
                        </TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell>
                          {getStatusBadge(status, daysLeft)}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Batch
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <QrCode className="mr-2 h-4 w-4" />
                                Generate QR
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Package className="mr-2 h-4 w-4" />
                                Adjust Stock
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {status === "expired" && (
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Mark as Disposed
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-orange-600" />
                Expiry Alerts
              </CardTitle>
              <CardDescription>
                Products requiring immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Batch Number</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Days Left</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Value at Risk</TableHead>
                    <TableHead>Alert Type</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expiryAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell className="font-medium">
                        {alert.productName}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {alert.batchNumber}
                      </TableCell>
                      <TableCell>{alert.expiryDate}</TableCell>
                      <TableCell>
                        <span
                          className={
                            alert.daysLeft < 0
                              ? "text-red-600 font-bold"
                              : "text-orange-600 font-bold"
                          }
                        >
                          {alert.daysLeft < 0
                            ? `${Math.abs(alert.daysLeft)} days ago`
                            : `${alert.daysLeft} days`}
                        </span>
                      </TableCell>
                      <TableCell>{alert.quantity}</TableCell>
                      <TableCell className="font-medium">
                        ${alert.value.toLocaleString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(alert.alertType)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            Discount
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600"
                          >
                            Dispose
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expired" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trash2 className="mr-2 h-5 w-5 text-red-600" />
                Expired Items
              </CardTitle>
              <CardDescription>
                Items that have passed their expiry date
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Batch Number</TableHead>
                    <TableHead>Expired Date</TableHead>
                    <TableHead>Days Overdue</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Loss Value</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batchInventory
                    .filter(
                      (item) =>
                        getExpiryStatus(item.expiryDate, item.alertDays) ===
                        "expired"
                    )
                    .map((item) => {
                      const daysOverdue = Math.abs(
                        calculateDaysToExpiry(item.expiryDate)
                      );
                      const lossValue = item.quantity * item.unitPrice;
                      return (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {item.productName}
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            {item.batchNumber}
                          </TableCell>
                          <TableCell>{item.expiryDate}</TableCell>
                          <TableCell className="text-red-600 font-bold">
                            {daysOverdue} days
                          </TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell className="text-red-600 font-medium">
                            ${lossValue.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="destructive" size="sm">
                                Mark Disposed
                              </Button>
                              <Button variant="outline" size="sm">
                                Return to Supplier
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expiry Reports</CardTitle>
              <CardDescription>
                Generate reports for expiry management and compliance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Expiry Summary Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Critical Alerts Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Monthly Expiry Forecast
                  </Button>
                </div>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="mr-2 h-4 w-4" />
                    Batch Tracking Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Disposal Log
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Filter className="mr-2 h-4 w-4" />
                    Custom Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
