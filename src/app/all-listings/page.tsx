"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

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
        const response = await fetch("/api/listings");
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {listings.map((listing) => (
        <div key={listing._id} className="border p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">{listing.title}</h2>
          <p className="text-gray-600">Price: ${listing.price.toFixed(2)}</p>
          <p className="text-gray-600">Location: {listing.location}</p>
          <p className="text-gray-800 mt-2">{listing.description}</p>
          {listing.images.length > 0 && (
            <div className="mt-2">
              <Image
                src={listing.images[0]}
                alt={listing.title}
                width={300}
                height={200}
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
