"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2 } from "lucide-react";

export function Footer() {
  const pathname = usePathname();

  const links = [
    { href: "/demo", label: "Live Demo" },
    { href: "/developers", label: "Developer Docs" },
    { href: "/research", label: "How we found this idea" },
  ];

  return (
    <footer className="border-t border-white/10 bg-surface-900">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-brand-400" />
            <span className="font-display text-lg font-semibold text-white">RentLens</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition hover:text-brand-400 ${
                  pathname === link.href ? "text-brand-400" : "text-slate-400"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-xs text-slate-500">
            Mock demo · Idea Miner pipeline · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
