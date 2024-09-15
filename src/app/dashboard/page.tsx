import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { LayoutGridIcon, CheckIcon, PencilIcon, TrashIcon } from "lucide-react";

export default function Component() {
  const user = {
    name: "John Doe",
    avatar: "/placeholder-user.jpg",
  };
  const listings = [
    {
      id: 1,
      image: "/placeholder.svg",
      title: "Rustic Oak Dining Table",
      description: "Handcrafted solid oak dining table with a natural finish.",
      price: 599.99,
      status: "active",
    },
    {
      id: 2,
      image: "/placeholder.svg",
      title: "Mid-Century Modern Sofa",
      description: "Stylish and comfortable sofa with walnut legs.",
      price: 899.99,
      status: "sold",
    },
    {
      id: 3,
      image: "/placeholder.svg",
      title: "Scandinavian Armchair",
      description: "Minimalist and cozy armchair with a beige fabric.",
      price: 399.99,
      status: "draft",
    },
    {
      id: 4,
      image: "/placeholder.svg",
      title: "Industrial Metal Shelving",
      description: "Durable and versatile metal shelving unit.",
      price: 249.99,
      status: "active",
    },
  ];
  return (
    <div className="flex min-h-screen bg-muted">
      <aside className="bg-background border-r w-64 p-6">
        <div className="flex items-center gap-4 mb-8">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">Furniture Seller</p>
          </div>
        </div>
        <nav className="space-y-2">
          <Link
            href="#"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            <LayoutGridIcon className="w-4 h-4" />
            All Listings
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            <CheckIcon className="w-4 h-4" />
            Active Listings
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            <CheckIcon className="w-4 h-4" />
            Sold Listings
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            <PencilIcon className="w-4 h-4" />
            Drafts
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Furniture Listings</h1>
          <Button size="sm">Add New Listing</Button>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <Card key={listing.id}>
              <Image
                src="/placeholder.svg"
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
                <Button size="sm" variant="outline">
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button size="sm" variant="destructive">
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
