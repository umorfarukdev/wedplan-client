import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import {
  ArrowUpRight,
  CalendarHeart,
  Heart,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { Button } from "../ui/button";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Services", href: "/services" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

const serviceLinks = [
  { name: "Photography", href: "/services?category=Photography" },
  { name: "Decoration", href: "/services?category=Decoration" },
  { name: "Catering", href: "/services?category=Catering" },
  { name: "Makeup Artist", href: "/services?category=Makeup" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: FaFacebookF,
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: FaInstagram,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: FaLinkedinIn,
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: FaXTwitter,
  },
];

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex w-fit items-center gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500 text-white">
                <CalendarHeart className="h-6 w-6" />
              </div>

              <span className="text-2xl font-bold tracking-tight">
                Wed<span className="text-rose-500">Plan</span>
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-muted-foreground">
              Make your dream wedding a reality with WedPlan. Discover trusted
              vendors, explore wedding services, and plan every special moment
              in one place.
            </p>

            <div className="flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="inline-flex size-8 items-center justify-center rounded-full border border-input bg-background text-sm transition hover:border-rose-500 hover:bg-rose-50 hover:text-rose-600"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-base font-semibold">Quick Links</h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex w-fit items-center gap-1 text-sm text-muted-foreground transition hover:text-rose-500"
                  >
                    {link.name}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 text-base font-semibold">Our Services</h3>

            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition hover:text-rose-500"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-base font-semibold">Get In Touch</h3>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                <span className="text-sm leading-6 text-muted-foreground">
                  Dhaka, Bangladesh
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-rose-500" />
                <a
                  href="mailto:hello@wedplan.com"
                  className="text-sm text-muted-foreground transition hover:text-rose-500"
                >
                  hello@wedplan.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-rose-500" />
                <a
                  href="tel:+8801700000000"
                  className="text-sm text-muted-foreground transition hover:text-rose-500"
                >
                  +880 1700-000000
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <Separator className="my-10" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} WedPlan. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            Made with
            <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
            for your special day.
          </p>

          <div className="flex items-center gap-5 text-sm">
            <Link
              href="/privacy-policy"
              className="text-muted-foreground transition hover:text-rose-500"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-muted-foreground transition hover:text-rose-500"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
