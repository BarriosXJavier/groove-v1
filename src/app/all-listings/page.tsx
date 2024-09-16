"use client";

import React, { useEffect, useState } from "react";
// import Image from "next/image";
import ProductCard from "@/components/shared/ProductCard";

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
    return <div>Loading...</div>;
  }

  if (listings.length === 0) {
    return <div>No listings available</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
      {listings.map((listing) => (
        <ProductCard
          key={listing._id}
          title={listing.title}
          price={listing.price}
          imageUrl={listing.images[0] || "/placeholder.svg"} // Handle empty images
          location={listing.location}
        />
      ))}
    </div>
  );
}
