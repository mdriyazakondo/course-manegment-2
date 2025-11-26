"use client";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineAddBusiness } from "react-icons/md";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "All Course", href: "/allCourse" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-[1500px] mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="https://www.masterclassmanagement.com/Master_Class_Management_Logo_Small.png"
            alt="course management"
            width={32}
            height={32}
          />
          <span className="text-xl font-semibold text-blue-600 mt-2">LMS</span>
        </Link>

        {/* Desktop Menu */}
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

        {/* Desktop Auth */}
        <SignedOut>
          <div className="hidden md:flex items-center gap-4">
            <SignInButton mode="modal">
              <button className="px-4 py-2 gradient-btn  rounded-md  transition">
                Login
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-4 py-2 border   rounded-md gradient-btn  transition">
                Register
              </button>
            </SignUpButton>
          </div>
        </SignedOut>

        {/* Desktop UserButton */}
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                rootBox: "ml-3",
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                label="Add Course"
                labelIcon={<MdOutlineAddBusiness />}
                href="/addCourse"
              />
              <UserButton.Link
                label="Manage Product"
                labelIcon={<AiOutlineProduct />}
                href="/myPost"
              />
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </button>
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

          {/* Mobile Auth Buttons */}
          <SignedOut>
            <SignInButton>
              <button
                className="w-full px-4 py-2 rounded-md text-white font-medium 
                bg-blue-600 hover:bg-blue-700 transition"
              >
                Login
              </button>
            </SignInButton>
            <SignUpButton>
              <button
                className="w-full mt-2 px-4 py-2 rounded-md text-white font-medium 
                bg-purple-600 hover:bg-purple-700 transition"
              >
                Register
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <div className="mt-3">
              <UserButton />
            </div>
          </SignedIn>
        </ul>
      )}
    </nav>
  );
}
