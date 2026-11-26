import {
    LayoutDashboard,
    Users,
    ClipboardList,
    CreditCard,
    ShoppingBag,
    PlusCircle,
    CalendarDays,
    Crown,
    User,
} from "lucide-react";


export const dashboardLinks = {


    admin: [

        {
            title: "Overview",
            href: "/dashboard/admin/overview",
            icon: LayoutDashboard,
        },

        {
            title: "Manage Users",
            href: "/dashboard/admin/manage-users",
            icon: Users,
        },

        {
            title: "Manage Services",
            href: "/dashboard/admin/manage-services",
            icon: ClipboardList,
        },

        {
            title: "Transactions",
            href: "/dashboard/admin/transactions",
            icon: CreditCard,
        },

        {
            title: "Profile Settings",
            href: "/dashboard/admin/settings/profile",
            icon: User,
        },

    ],



    vendor: [

        {
            title: "Overview",
            href: "/dashboard/vendor/overview/overview",
            icon: LayoutDashboard,
        },

        {
            title: "My Services",
            href: "/dashboard/vendor/overview/my-services",
            icon: ShoppingBag,
        },

        {
            title: "Add Service",
            href: "/dashboard/vendor/overview/add-service",
            icon: PlusCircle,
        },

        {
            title: "Booking Requests",
            href: "/dashboard/vendor/overview/booking-request",
            icon: CalendarDays,
        },

        {
            title: "Subscription",
            href: "/dashboard/vendor/overview/subscription",
            icon: Crown,
        },

        {
            title: "Profile Settings",
            href: "/dashboard/vendor/overview/settings/profile",
            icon: User,
        },

    ],




    customer: [

        {
            title: "Overview",
            href: "/dashboard/customer/overview",
            icon: LayoutDashboard,
        },

        {
            title: "My Bookings",
            href: "/dashboard/customer/my-bookings",
            icon: CalendarDays,
        },

        {
            title: "Profile Settings",
            href: "/dashboard/customer/settings/profile",
            icon: User,
        },

    ],

};