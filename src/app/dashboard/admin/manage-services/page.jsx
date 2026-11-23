"use client";

import Image from "next/image";
import {
  ClipboardList,
  Search,
  MapPin,
  CalendarDays,
  CheckCircle,
  XCircle,
  Clock,
  Ban,
  Trash2,
  Eye,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const services = [
  {
    _id: "1",
    serviceName: "Premium Wedding Photography",
    vendorId: "vendor_001",
    category: "Photography",
    price: 25000,
    location: "Dhaka, Bangladesh",
    images: ["https://images.unsplash.com/photo-1519741497674-611481863552"],
    status: "pending",
    createdAt: "2026-11-20T10:00:00.000Z",
  },
  {
    _id: "2",
    serviceName: "Luxury Wedding Decoration",
    vendorId: "vendor_002",
    category: "Decoration",
    price: 45000,
    location: "Gazipur, Bangladesh",
    images: ["https://images.unsplash.com/photo-1519225421980-888cb6b7a4d6"],
    status: "approved",
    createdAt: "2026-11-19T08:30:00.000Z",
  },
  {
    _id: "3",
    serviceName: "Wedding Catering Service",
    vendorId: "vendor_003",
    category: "Catering",
    price: 35000,
    location: "Uttara, Dhaka",
    images: ["https://images.unsplash.com/photo-1555244162-803834f70033"],
    status: "rejected",
    createdAt: "2026-11-18T12:00:00.000Z",
  },
  {
    _id: "4",
    serviceName: "Bridal Makeup Artist",
    vendorId: "vendor_004",
    category: "Makeup",
    price: 15000,
    location: "Mirpur, Dhaka",
    images: ["https://images.unsplash.com/photo-1487412947147-5cebf100ffc2"],
    status: "inactive",
    createdAt: "2026-11-17T09:00:00.000Z",
  },
];

const stats = [
  {
    title: "Total Services",
    value: "04",
    icon: ClipboardList,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Approved Services",
    value: "01",
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    title: "Pending Services",
    value: "01",
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    title: "Rejected Services",
    value: "01",
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-50",
  },
];

const getStatusBadge = (status) => {
  const styles = {
    approved: "bg-green-100 text-green-700 hover:bg-green-100",
    pending: "bg-amber-100 text-amber-700 hover:bg-amber-100",
    rejected: "bg-red-100 text-red-700 hover:bg-red-100",
    inactive: "bg-gray-100 text-gray-700 hover:bg-gray-100",
  };

  return (
    <Badge className={styles[status] || "bg-gray-100 text-gray-700"}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default function ManageServices() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Manage Services
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Review, approve, reject and manage all vendor services.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title}>
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <h2 className="mt-2 text-3xl font-bold">{stat.value}</h2>
                </div>

                <div className={`rounded-xl p-3 ${stat.bg}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Services Table */}
      <Card>
        <div className="flex flex-col gap-3 border-b p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">All Submitted Services</h2>
            <p className="text-sm text-muted-foreground">
              Manage and review vendor service submissions.
            </p>
          </div>

          <Badge variant="secondary">{services.length} Services</Badge>
        </div>

        <CardContent className="space-y-5 p-5">
          {/* Search and Filters */}
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search service or vendor..."
                className="pl-9"
                disabled
              />
            </div>

            <select
              defaultValue="all"
              disabled
              className="h-10 rounded-md border bg-background px-3 text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="inactive">Inactive</option>
            </select>

            <select
              defaultValue="all"
              disabled
              className="h-10 rounded-md border bg-background px-3 text-sm"
            >
              <option value="all">All Categories</option>
              <option value="Photography">Photography</option>
              <option value="Decoration">Decoration</option>
              <option value="Catering">Catering</option>
              <option value="Makeup">Makeup</option>
            </select>
          </div>

          {/* Responsive Table */}
          <div className="w-full overflow-x-auto rounded-md border">
            <Table className="min-w-[1100px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {services.map((service) => (
                  <TableRow key={service._id}>
                    {/* Service */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-muted">
                          <Image
                            src={service.images[0]}
                            alt={service.serviceName}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>

                        <div className="max-w-[190px]">
                          <p className="truncate font-medium">
                            {service.serviceName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ID: {service._id}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Vendor */}
                    <TableCell className="whitespace-nowrap">
                      {service.vendorId}
                    </TableCell>

                    {/* Category */}
                    <TableCell>{service.category}</TableCell>

                    {/* Price */}
                    <TableCell className="whitespace-nowrap font-medium">
                      ৳{service.price.toLocaleString("en-BD")}
                    </TableCell>

                    {/* Location */}
                    <TableCell>
                      <div className="flex items-center gap-1 whitespace-nowrap text-sm">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        {service.location}
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell>{getStatusBadge(service.status)}</TableCell>

                    {/* Date */}
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {new Date(service.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          title="View Service"
                          disabled
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        {service.status === "pending" && (
                          <>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-green-600 hover:bg-green-50 hover:text-green-700"
                              title="Approve"
                              disabled
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>

                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-red-600 hover:bg-red-50 hover:text-red-700"
                              title="Reject"
                              disabled
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}

                        {service.status === "approved" && (
                          <Button
                            size="icon"
                            variant="ghost"
                            title="Deactivate"
                            disabled
                          >
                            <Ban className="h-4 w-4" />
                          </Button>
                        )}

                        {service.status === "inactive" && (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-green-600"
                            title="Activate"
                            disabled
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}

                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-red-600 hover:bg-red-50 hover:text-red-700"
                          title="Delete"
                          disabled
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              Showing {services.length} of {services.length} services
            </p>
            <p>Dummy data preview</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
