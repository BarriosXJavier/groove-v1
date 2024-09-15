"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { LayoutGridIcon, CheckIcon, PencilIcon, TrashIcon } from "lucide-react";

const DashboardPage = () => {
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
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800 md:flex-row">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden p-4 bg-white shadow-sm">
        <Button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          size="sm"
          variant="ghost"
          className="text-gray-600 hover:text-gray-800"
        >
          <MenuIcon className="w-5 h-5" />
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-white shadow-md w-full md:w-64 p-6 ${
          sidebarOpen ? "block" : "hidden"
        } md:block transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-center gap-4 mb-8">
          <Avatar className="w-12 h-12 border-2 border-blue-500">
            <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500">Furniture dealer</p>
          </div>
        </div>
        <nav className="space-y-2">
          <Link
            href="#"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors duration-200"
            prefetch={false}
          >
            <LayoutGridIcon className="w-5 h-5" />
            All Listings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 bg-gray-50">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <h1 className="text-xl text-gray-700 mb-4 md:mb-0">
            Furniture Listings
          </h1>
          <Link href="/dashboard/createListingForm">
            <Button
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <PlusCircleIcon className="w-4 h-4 mr-2" />
              Add New Listing
            </Button>
          </Link>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
              <CardFooter className="flex justify-end gap-2 p-4 bg-gray-50">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-gray-600 hover:text-blue-600"
                >
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-600 text-white"
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

export default DashboardPage;