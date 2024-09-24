"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/shared/ProductCard";
import { ColorRing } from "react-loader-spinner";

interface Listing {
  _id: string;
  title: string;
  price: number;
  images: string[];
  location: string;
  category: string;
  userId: string;
}

const ServicesPage = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("/api/categories?categories=Services");
        if (!response.ok) {
          throw new Error("Failed to fetch listings");
        }

        const data = await response.json();
        setListings(data.data);
      } catch (error) {
        console.error("Error fetching listings", error);
        setError("Failed to fetch listings. Please try again later.");
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

  if (error) {
    return (
      <div className="flex my-8">
        <div className="mx-auto">
          <p className="text-lg text-center text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="flex my-8">
        <div className="mx-auto">
          <p className="text-lg text-center">
            No listings found for this category right now. Please check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {listings.map((listing) => (
          <ProductCard
            key={listing._id}
            title={listing.title}
            price={listing.price}
            imageUrl={listing.images[0] || "/placeholder.svg"}
            location={listing.location}
            listingId={listing._id}
            userId={listing.userId}
            category={listing.category}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
