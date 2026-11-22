// import {
//   BriefcaseBusiness,
//   CalendarDays,
//   ClipboardList,
//   CreditCard,
//   LayoutDashboard,
//   PlusCircle,
//   Settings,
//   Users,
// } from "lucide-react";

// import { ROLE_LABEL, normalizeRole } from "@/lib/roles";

// const NAV = {
//   admin: [
//     { title: "Overview", href: "/dashboard/admin", icon: LayoutDashboard, exact: true },
//     { title: "Manage Users", href: "/dashboard/admin/users", icon: Users },
//     { title: "Manage Services", href: "/dashboard/admin/services", icon: BriefcaseBusiness },
//     { title: "Transactions", href: "/dashboard/admin/transactions", icon: CreditCard },
//     { title: "Profile Settings", href: "/dashboard/admin/profile", icon: Settings },
//   ],
//   vendor: [
//     { title: "Overview", href: "/dashboard/vendor", icon: LayoutDashboard, exact: true },
//     { title: "My Services", href: "/dashboard/vendor/services", icon: BriefcaseBusiness },
//     { title: "Add Service", href: "/dashboard/vendor/services/add", icon: PlusCircle },
//     { title: "Booking Requests", href: "/dashboard/vendor/bookings", icon: ClipboardList },
//     { title: "Subscription", href: "/dashboard/vendor/subscription", icon: CreditCard },
//     { title: "Profile Settings", href: "/dashboard/vendor/profile", icon: Settings },
//   ],
//   customer: [
//     { title: "Overview", href: "/dashboard/customer", icon: LayoutDashboard, exact: true },
//     { title: "My Bookings", href: "/dashboard/customer/bookings", icon: CalendarDays },
//     { title: "Profile Settings", href: "/dashboard/customer/profile", icon: Settings },
//   ],
// };

// export function getNavForRole(role) {
//   return NAV[normalizeRole(role)] || NAV.customer;
// }

// export { ROLE_LABEL };
