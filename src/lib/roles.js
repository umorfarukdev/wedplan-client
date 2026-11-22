export const ROLE_HOME = {
  admin: "/dashboard/admin",
  vendor: "/dashboard/vendor",
  customer: "/dashboard/customer",
};

export const ROLE_LABEL = {
  admin: "Administrator",
  vendor: "Vendor",
  customer: "Customer",
};

export function normalizeRole(role) {
  const value = String(role || "customer").toLowerCase();

  if (value === "admin") return "admin";
  if (value === "vendor" || value === "vendors") return "vendor";

  return "customer";
}
