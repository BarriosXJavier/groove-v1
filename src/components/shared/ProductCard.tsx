"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BookmarkIcon } from "lucide-react";
import Link from "next/link"; // Import Next.js Link

interface ProductCardProps {
  title: string;
  price: number;
  imageUrl: string;
  location: string;
  listingId: string;
  userId?: string; // Clerk user ID
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price = 0,
  imageUrl,
  location,
  listingId,
  userId,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      try {
        const res = await fetch(
          `/api/bookmarks?userId=${userId}&listingId=${listingId}`
        );
        const data = await res.json();
        setIsBookmarked(data.isBookmarked);
      } catch (error) {
        console.error("Error fetching bookmark status", error);
      }
    };

    fetchBookmarkStatus();
  }, [userId, listingId]);

  const handleBookmark = async () => {
    try {
      if (isBookmarked) {
        await fetch("/api/bookmarks", {
          method: "DELETE",
          body: JSON.stringify({ userId, listingId }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        setIsBookmarked(false);
      } else {
        await fetch("/api/bookmarks", {
          method: "POST",
          body: JSON.stringify({ userId, listingId }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error("Error updating bookmark", error);
    }
  };

  return (
    <Link href={`/listing/${listingId}`} target="_blank">
      <Card className="w-full max-w-sm bg-background shadow-lg rounded-lg overflow-hidden cursor-pointer">
        <div className="relative">
          <Image
            src={imageUrl}
            alt={title}
            width={500}
            height={400}
            className="w-full h-64 object-cover"
            style={{ aspectRatio: "500/400", objectFit: "cover" }}
          />
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-4 right-4 ${
              isBookmarked ? "text-primary" : "text-gray-500"
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleBookmark();
            }}
          >
            <BookmarkIcon
              className={`w-6 h-6 ${isBookmarked ? "fill-primary" : ""}`}
            />
            <span className="sr-only">Bookmark</span>
          </Button>
        </div>
        <div className="p-4">
          <h3 className="text-sm mb-2">{title}</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Ksh&nbsp;{price.toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">{location}</p>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
