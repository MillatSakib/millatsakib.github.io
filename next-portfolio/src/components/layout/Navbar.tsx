"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { NavLink } from "@/models/portfolioModel";

interface NavbarProps {
  brandName: string;
  logoSrc: string;
  links: NavLink[];
}

export default function Navbar({ brandName, logoSrc, links }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const previousScrollPosition = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      const isScrollingUp = currentPosition < previousScrollPosition.current;

      setIsVisible(isScrollingUp || currentPosition < 80);

      if (!isScrollingUp && currentPosition > 120) {
        setIsMenuOpen(false);
      }

      previousScrollPosition.current = currentPosition;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-400 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="mx-auto mt-3 w-[min(1120px,calc(100%-1rem))] rounded-2xl border border-emerald-300/20 bg-slate-950/90 px-4 py-3 shadow-[0_18px_40px_-24px_rgba(2,6,23,1)] backdrop-blur-md sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <a href="#" className="inline-flex items-center gap-3">
            <Image src={logoSrc} alt={`${brandName} logo`} width={34} height={34} priority />
            <span className="font-display text-lg font-semibold uppercase tracking-[0.2em] text-white">
              {brandName}
            </span>
          </a>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-300/40 bg-emerald-400/12 text-emerald-200 lg:hidden"
          >
            <span className="relative h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform duration-200 ${
                  isMenuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-5 bg-current transition-opacity duration-200 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-5 bg-current transition-transform duration-200 ${
                  isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const baseClassName =
                "rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors";
              const className =
                link.variant === "button"
                  ? `${baseClassName} border border-emerald-400 text-emerald-300 hover:bg-emerald-400 hover:text-slate-950`
                  : `${baseClassName} text-slate-200 hover:text-emerald-300`;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  title={link.title}
                  className={className}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>

        {isMenuOpen ? (
          <div className="mt-4 flex flex-col gap-2 border-t border-slate-800 pt-4 lg:hidden">
            {links.map((link) => {
              const baseClassName =
                "rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors";
              const className =
                link.variant === "button"
                  ? `${baseClassName} border border-emerald-400 text-emerald-300 hover:bg-emerald-400 hover:text-slate-950`
                  : `${baseClassName} text-slate-200 hover:bg-slate-800 hover:text-emerald-300`;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  title={link.title}
                  className={className}
                  onClick={() => setIsMenuOpen(false)}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        ) : null}
      </nav>
    </header>
  );
}
