"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { PencilIcon, TrashIcon } from "lucide-react";

interface Listing {
  _id: string;
  title: string;
  price: number;
  description: string;
  location: string;
  tags: string[];
  images: string[];
}

export default function DashboardPage() {
  const { user } = useUser();
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    if (user) {
      fetch(`/api/listing`)
        .then((response) => response.json())
        .then((data) => setListings(data.data));
    }
  }, [user]);

  const handleDelete = async (delete_id: string) => {
    try {
      const response = await fetch(`/api/listing/${delete_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete listing: ${errorText}`);
      }

      const result = await response.json();

      if (result.success) {
        setListings((prevListings) =>
          prevListings.filter((listing) => listing._id !== delete_id)
        );
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error deleting listing", error);
    }
  };


  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-muted">
      {/* Sidebar */}
      <aside className="bg-background border-b lg:border-r lg:w-64 w-full p-6 lg:fixed lg:h-screen">
        <div className="flex items-center gap-4 mb-2">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={user?.imageUrl || "/placeholder-user.jpg"}
              alt={user?.firstName || "User"}
            />
            <AvatarFallback>
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h3 className="text-sm font-medium">
            {user?.firstName} {user?.lastName}
          </h3>
        </div>
        <div className="text-sm">
          <p>
            <span>account created: </span>
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "Not available"}
          </p>
        </div>
        {/* Sidebar navigation */}
        <nav className="space-y-2">{/* Sidebar Links */}</nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-64 p-8 w-full">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-medium">My Listings</h1>
          <Button className="bg-slate-900 text-gray-200 rounded-xl hover:bg-slate-600 active:bg-stone-600">
            <Link href="/dashboard/createListingForm">Create Listing</Link>
          </Button>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <Card key={listing._id} className="">
              <div className="w-full h-48 relative">
                <Image
                  src={listing.images?.[0] || "/placeholder.svg"}
                  alt={listing.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-medium">{listing.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {listing.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-base font-medium">
                    Ksh{listing.price}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between gap-2 p-2">
                {/* edit listing*/}
                <Link
                  href={`/dashboard/editListingForm/${listing._id}`}
                  // target="_blank"
                >
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-stone-900 hover:bg-stone-600 active:bg-stone-300 p-4 text-white hover:text-white text-base rounded-lg"
                  >
                    <PencilIcon className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(listing._id)}
                  className="bg-red-900 hover:bg-red-600 active:bg-red-300 p-4 text-white text-base rounded-sm"
                >
                  <TrashIcon className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
