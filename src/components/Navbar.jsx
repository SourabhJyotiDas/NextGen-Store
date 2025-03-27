"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaUserAstronaut } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          {t("welcome")}
        </Link>

        

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        {/* Nav Links */}
        <div
          className={`fixed inset-0 bg-gray-900 md:static md:flex md:space-x-3 text-center transition-all duration-300 ease-in-out ${
            isOpen ? "translate-x-0 z-50" : "-translate-x-full"
          } md:translate-x-0 md:z-auto`}
        >
          <Link href="/homepage" className="block py-2 px-4 hover:bg-gray-700">
            
            {t("home")}
          </Link>
          <Link href="/dele" className="block py-2 px-4 hover:bg-gray-700">
            Dele
          </Link>
          <Link href="/products" className="block py-2 px-4 hover:bg-gray-700">
          {t("products")}
          </Link>
          <Link href="/contact" className="block py-2 px-4 hover:bg-gray-700">
          {t("contact")}
          </Link>

          {/* Authentication Links */}
          {session?.user ? (
            <Link href="/user/profile" className="block py-2 px-4">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt="User Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <FaUserAstronaut className="text-3xl rounded-full border border-white object-cover shadow-md p-1" />
              )}
            </Link>
          ) : (
            <Link href="/login" className="block py-2 px-4 hover:bg-gray-700">
              Account
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
