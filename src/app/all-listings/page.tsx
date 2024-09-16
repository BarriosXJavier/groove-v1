"use client";

import React, { useEffect, useState } from "react";
// import Image from "next/image";
import ProductCard from "@/components/shared/ProductCard";
import { ColorRing } from "react-loader-spinner";

interface Listing {
  _id: string;
  title: string;
  price: number;
  description: string;
  location: string;
  tags: string[];
  images: string[];
}

export default function AllListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("/api/listing");
        if (!response.ok) {
          throw new Error("Failed to fetch listings");
        }
        const data = await response.json();
        setListings(data.data);
      } catch (error) {
        console.error("Error fetching listings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return (
      <div className="flex">
        <div className="m-auto">
          <ColorRing />
        </div>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="flex my-8">
        <div className="mx-auto">
          <p className="text-lg text-center">No listings available right now. Please check back later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
      {listings.map((listing) => (
        <ProductCard
          key={listing._id}
          title={listing.title}
          price={listing.price}
          imageUrl={listing.images[0] || "/placeholder.svg"}
          location={listing.location}
          productId={listing._id}
          userId={""}
        />
      ))}
    </div>
  );
}
