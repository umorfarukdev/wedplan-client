"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Heart,
  Menu,
  X,
  ArrowRight,
  Home,
  BriefcaseBusiness,
  Store,
  Package,
  Info,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProfileDropdown from "./ProfileDropdown";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Browse Services", href: "/browse-services", icon: BriefcaseBusiness },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-2.5"
        >
          <div className="flex size-10 items-center justify-center rounded-xl bg-rose-500 shadow-sm">
            <Heart className="size-6 fill-white text-white" />
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight">
              Wed<span className="text-rose-500">Plan</span>
            </span>
            <span className="-mt-1 text-[10px] tracking-wider text-muted-foreground">
              PLAN YOUR PERFECT DAY
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-rose-50 hover:text-rose-600"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <ProfileDropdown closeMenu={closeMenu} />
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Open navigation menu"
                />
              }
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </SheetTrigger>

            <SheetContent side="right" className="w-[320px] p-0 sm:w-[380px]">
              <div className="flex h-full flex-col">
                {/* Mobile Header */}
                <div className="border-b p-5">
                  <SheetTitle>
                    <Link
                      href="/"
                      onClick={closeMenu}
                      className="flex items-center gap-2.5"
                    >
                      <div className="flex size-9 items-center justify-center rounded-lg bg-rose-500">
                        <Heart className="size-5 fill-white text-white" />
                      </div>

                      <span className="text-xl font-bold">
                        Wed<span className="text-rose-500">Plan</span>
                      </span>
                    </Link>
                  </SheetTitle>
                </div>

                {/* Mobile Links */}
                <div className="flex-1 space-y-2 p-5">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Navigation
                  </p>

                  {navLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={closeMenu}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Icon className="size-5" />
                        {link.name}
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile Actions */}
                <div className="space-y-3 border-t p-5">
                  <ProfileDropdown closeMenu={closeMenu} />

                  <p className="pt-2 text-center text-xs text-muted-foreground">
                    Make your special day unforgettable.
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
