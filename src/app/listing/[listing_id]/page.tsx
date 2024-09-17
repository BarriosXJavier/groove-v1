import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Listing {
  title: string;
  price: number;
  images: string[]; // Array of image URLs
  location: string;
  description: string;
  tags: string[];
}

async function getListing(listingId: string): Promise<Listing | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/singleListing/${listingId}`, {
      cache: "no-store", // Prevent caching for fresh data on each request
    });
    if (!res.ok) {
      console.error("API request failed with status:", res.status);
      return null;
    }
    const response = await res.json();
    return response.data as Listing;
  } catch (error) {
    console.error("Failed to fetch listing:", error);
    return null;
  }
}

interface ListingPageProps {
  params: {
    listing_id: string;
  };
}

const ListingPage = async ({ params }: ListingPageProps) => {
  const { listing_id } = params;
  const listing = await getListing(listing_id);

  if (!listing) {
    return notFound();
  }

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4 text-center">{listing.title}</h1>
      {listing.images.length > 0 ? (
        <div className="w-full max-w-xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {listing.images.map((image, index) => (
                <CarouselItem key={index} className="w-full">
                  <div className="aspect-w-4 aspect-h-3 relative">
                    <Image
                      src={image}
                      alt={`${listing.title} image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover rounded-lg"
                      priority={index === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 rounded-full" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 rounded-full" />
          </Carousel>
        </div>
      ) : (
        <div className="w-full max-w-xl mx-auto aspect-w-4 aspect-h-3 flex items-center justify-center bg-gray-200 rounded-lg">
          <p className="text-gray-600">No images available</p>
        </div>
      )}
      <div className="mt-6 text-center">
        <p className="text-lg text-gray-600">Price: Ksh {listing.price}</p>
        <p className="mt-2 text-gray-600">Location: {listing.location}</p>
        <p className="mt-4 text-gray-800">{listing.description}</p>
        <div className="mt-4">
          <strong>Tags:</strong>
          <ul className="list-none p-0 mt-2 flex flex-wrap justify-center gap-2">
            {listing.tags.map((tag, index) => (
              <li
                key={index}
                className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
