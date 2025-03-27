"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaRegStar } from "react-icons/fa";

const orders = [
  {
    id: 1,
    img: "/product1.jpg",
    title: "Wireless Headphones",
    description: "High-quality sound with noise cancellation.",
    status: "Delivered on Mar 8",
    statusType: "delivered",
    rating: 0,
  },
  {
    id: 2,
    img: "/product2.jpg",
    title: "Smartwatch",
    description: "Track your fitness and receive notifications.",
    status: "Canceled on Mar 4",
    statusType: "canceled",
    rating: 0,
  },
  {
    id: 3,
    img: "/product1.jpg",
    title: "Wireless Headphones",
    description: "High-quality sound with noise cancellation.",
    status: "Delivery expected by Mar 12",
    statusType: "pending",
    rating: 0,
  },
];

export default function MyOrders() {
  const [ratings, setRatings] = useState({});

  const handleRating = (orderId, star) => {
    setRatings((prev) => ({ ...prev, [orderId]: star }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center bg-gray-50 p-6"
    >
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>
      <div className="w-full max-w-3xl">
        {orders.map((order) => (
          <motion.div
            key={order.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-md rounded-xl p-4 mb-4 flex items-center"
          >
            <Image
              src={order.img}
              alt={order.title}
              width={80}
              height={80}
              className="rounded-lg"
            />
            <div className="ml-4 flex-grow">
              <h2 className="text-sm font-semibold">{order.title}</h2>
              <p className="mt-2 text-sm font-medium">{order.status}</p>

              {order.statusType === "delivered" && (
                <div className="mt-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRating(order.id, star)}
                        className="text-yellow-500 text-xl"
                      >
                        {ratings[order.id] >= star ? <FaStar /> : <FaRegStar />}
                      </button>
                    ))}
                  </div>
                  <Link
                    href={`/write-review/${order.id}`}
                    className="text-blue-600 text-sm font-semibold mt-2 block"
                  >
                    Write a Review
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
