"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { PencilIcon, TrashIcon } from "lucide-react";

// Define the structure of a listing
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
  const [listings, setListings] = useState<Listing[]>([]); // Type the state

  useEffect(() => {
    if (user) {
      fetch(`/api/listing`)
        .then((response) => response.json())
        .then((data) => setListings(data.data)); // Ensure proper typing here
    }
  }, [user]);

 const handleDelete = async (id: string) => {
   try {
     const response = await fetch(`/api/listing/${id}`, {
       method: "DELETE",
       headers: {
         "Content-Type": "application/json",
       },
     });

     if (!response.ok) {
       const errorText = await response.text(); // Get error details
       throw new Error(`Failed to delete listing: ${errorText}`);
     }

     const result = await response.json();

     if (result.success) {
       setListings((prevListings) =>
         prevListings.filter((listing) => listing._id !== id)
       );
     } else {
       console.error(result.error);
     }
   } catch (error) {
     console.error("Error deleting listing", error);
   }
 };


  return (
    <div className="flex min-h-screen bg-muted">
      <aside className="bg-background border-r w-64 p-6">
        <div className="flex items-center gap-4 mb-8">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={user?.imageUrl || "/placeholder-user.jpg"} // Clerk user's imageUrl
              alt={user?.firstName || "User"}
            />
            <AvatarFallback>
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-sm text-muted-foreground">Furniture Seller</p>
          </div>
        </div>
        {/* Sidebar navigation */}
        <nav className="space-y-2">{/* Sidebar Links */}</nav>
      </aside>
      <main className="flex-1 p-8">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Furniture Listings</h1>

          <Button>
            <Link href="../dashboard/createListingForm">Create Listing</Link>
          </Button>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <Card key={listing._id}>
              <Image
                src={listing.images?.[0] || "/placeholder.svg"} // Use the first image or a placeholder
                alt={listing.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
                style={{ aspectRatio: "300/200", objectFit: "cover" }}
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">{listing.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {listing.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold">${listing.price}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 p-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => console.log("Edit Listing")}
                >
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(listing._id)}
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
