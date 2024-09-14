import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
              <img
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
                  <Badge
                    variant={
                      listing.status === "active"
                        ? "secondary"
                        : listing.status === "sold"
                        ? "success"
                        : "outline"
                    }
                  >
                    {listing.status}
                  </Badge>
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

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function LayoutGridIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function PencilIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
