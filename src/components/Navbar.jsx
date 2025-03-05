"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Using react-icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // ✅ Add missing state for mobile menu
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          MyApp
        </Link>

        {/* Menu Button (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none">
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        {/* Nav Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } absolute md:static top-16 left-0 w-full md:w-auto bg-gray-900 md:flex md:space-x-3 text-center`}>
          <Link
            href="/"
            className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent">
            Home
          </Link>
          <Link
            href="/products"
            className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent">
            Products
          </Link>
          <Link
            href="/contact"
            className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent">
            Contact
          </Link>

          {/* Authentication Links */}
          {session?.user ? (
            <Link
              href="/user/profile"
              className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent">
              <Image
                src={session.user?.image}
                alt="User Profile"
                width={32}
                height={32}
                className="rounded-full"
              />
            </Link>
          ) : (
            <Link
              href="/user/auth/signin"
              className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
