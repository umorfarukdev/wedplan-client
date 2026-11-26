"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  Search,
  CheckCircle,
  XCircle,
  Clock,
  ClipboardList,
  Ban,
  Trash2,
  MapPin,
  Loader2,
} from "lucide-react";

import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getAdminServices,
} from "@/lib/api/admin";
import { useRouter } from "next/navigation";
import { deleteService, toggleServiceActive, updateServiceStatus } from "@/lib/actions/admin";

export default function ManageServicesClient({ initialServices }) {

  const router = useRouter();
  const [services, setServices] = useState(initialServices || []);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("all");

  const [category, setCategory] = useState("all");

  const [loading, setLoading] = useState(false);

  const [actionId, setActionId] = useState(null);

  async function loadServices() {
    try {
      setLoading(true);

      const data = await getAdminServices({
        search,
        status,
        category,
      });

      setServices(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let ignore = false;

    async function fetchServices() {
      try {
        setLoading(true);

        const data = await getAdminServices({
          search,
          status,
          category,
        });

        if (!ignore) {
          setServices(data);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchServices();

    return () => {
      ignore = true;
    };
  }, [search, status, category]);

  async function changeStatus(id, status) {
    try {
      setActionId(id);

      await updateServiceStatus(id, status);

      toast.success("Status updated");

      loadServices();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setActionId(null);
    }
  }

  async function activeToggle(id, value) {
    try {
      setActionId(id);

      await toggleServiceActive(id, value);

      toast.success("Service updated");

      loadServices();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setActionId(null);
    }
  }

  async function removeService(id) {
    if (!confirm("Delete this service?")) return;

    try {
      setActionId(id);

      await deleteService(id);

      toast.success("Deleted successfully");
      router.refresh();

      loadServices();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setActionId(null);
    }
  }

  const stats = [
    {
      title: "Total",
      value: services.length,
      icon: ClipboardList,
    },

    {
      title: "Approved",
      value: services.filter((x) => x.status === "approved").length,
      icon: CheckCircle,
    },

    {
      title: "Pending",
      value: services.filter((x) => x.status === "pending").length,
      icon: Clock,
    },

    {
      title: "Rejected",
      value: services.filter((x) => x.status === "rejected").length,
      icon: XCircle,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Manage Services</h1>

      {/* Statistics */}

      <div
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4
"
      >
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title}>
              <CardContent className="p-5 flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{item.title}</p>

                  <h2 className="text-3xl font-bold">{item.value}</h2>
                </div>

                <Icon />
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardContent className="p-5 space-y-5">
          <div className="flex gap-3 flex-col md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4" />

              <Input
                className="pl-10"
                placeholder="Search service/vendor"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="border rounded-md px-3"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">All</option>

              <option value="pending">Pending</option>

              <option value="approved">Approved</option>

              <option value="rejected">Rejected</option>
            </select>

            <select
              className="border rounded-md px-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Category</option>

              <option>Photography</option>

              <option>Decoration</option>

              <option>Catering</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>

                  <TableHead>Vendor</TableHead>

                  <TableHead>Category</TableHead>

                  <TableHead>Status</TableHead>

                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      <Loader2 className="animate-spin mx-auto" />
                    </TableCell>
                  </TableRow>
                ) : (
                  services.map((service) => (
                    <TableRow key={service._id}>
                      <TableCell>
                        <div className="flex gap-3 items-center">
                          <div className="relative h-12 w-12">
                            <Image
                              src={service.images?.[0]}
                              fill
                              unoptimized
                              alt=""
                            />
                          </div>

                          {service.serviceName}
                        </div>
                      </TableCell>

                      <TableCell>{service.vendorId}</TableCell>

                      <TableCell>{service.category}</TableCell>

                      <TableCell>
                        <Badge>{service.status}</Badge>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          {/* Approve */}
                          {service.status === "pending" && (
                            <Button
                              size="icon"
                              variant="ghost"
                              title="Approve Service"
                              disabled={actionId === service._id}
                              onClick={() =>
                                changeStatus(service._id, "approved")
                              }
                            >
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </Button>
                          )}

                          {/* Reject */}
                          {service.status === "pending" && (
                            <Button
                              size="icon"
                              variant="ghost"
                              title="Reject Service"
                              disabled={actionId === service._id}
                              onClick={() =>
                                changeStatus(service._id, "rejected")
                              }
                            >
                              <XCircle className="h-4 w-4 text-red-600" />
                            </Button>
                          )}

                          {/* Deactivate */}
                          {service.status === "approved" &&
                            service.isActive && (
                              <Button
                                size="icon"
                                variant="ghost"
                                title="Deactivate Service"
                                disabled={actionId === service._id}
                                onClick={() => activeToggle(service._id, false)}
                              >
                                <Ban className="h-4 w-4 text-orange-600" />
                              </Button>
                            )}

                          {/* Activate */}
                          {service.status === "approved" &&
                            !service.isActive && (
                              <Button
                                size="icon"
                                variant="ghost"
                                title="Activate Service"
                                disabled={actionId === service._id}
                                onClick={() => activeToggle(service._id, true)}
                              >
                                <CheckCircle className="h-4 w-4 text-blue-600" />
                              </Button>
                            )}

                          {/* Delete */}
                          <Button
                            size="icon"
                            variant="ghost"
                            title="Delete Service"
                            disabled={actionId === service._id}
                            onClick={() => removeService(service._id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
