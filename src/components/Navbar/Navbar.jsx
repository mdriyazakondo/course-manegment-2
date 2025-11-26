"use client";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "All Course", href: "/allCourse" },
    { label: "Add Course", href: "/addCourse" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-[1500px] mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="https://www.masterclassmanagement.com/Master_Class_Management_Logo_Small.png"
            alt="course management"
            width={32}
            height={32}
          />
          <span className="text-xl font-semibold text-blue-600 mt-2">LMS</span>
        </Link>

        {/* Menu (Desktop) */}
        <ul className="hidden md:flex gap-6 text-lg font-medium">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`transition-all ${
                  pathname === item.href
                    ? "text-blue-600 font-semibold"
                    : "hover:text-blue-600"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </button>
        {/* Auth Buttons */}
        <div className="hidden md:flex gap-4">
          <Link
            href="/login"
            className="px-4 py-2 rounded-md text-white font-medium 
             bg-linear-to-r from-blue-500 to-purple-600
             transition duration-300 ease-in-out 
             hover:opacity-90 hover:-translate-y"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 rounded-md text-white font-medium 
             bg-linear-to-r from-blue-500 to-purple-600
             transition duration-300 ease-in-out 
             hover:opacity-90 hover:-translate-y"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden bg-white w-full px-4 pb-4 flex flex-col gap-4 text-lg font-medium shadow-md">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block py-2 transition-all ${
                  pathname === item.href
                    ? "text-blue-600 font-semibold"
                    : "hover:text-blue-600"
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
