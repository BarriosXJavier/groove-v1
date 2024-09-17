import { notFound } from "next/navigation";
import Image from "next/image";


interface Listing {
  title: string;
  price: number;
  imageUrl: string;
  location: string;
  description: string;
  tags: string[];
}


async function getListing(listingId: string): Promise<Listing | null> {
  try {
    const res = await fetch(`/api/singleListing/${listingId}`);

    if (!res.ok) {
      return null; 
    }

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch listing:", error);
    return null;
  }
}
interface ListingPageProps {
  params: {
    listingId: string;
  };
}

const ListingPage: React.FC<ListingPageProps> = async ({ params }) => {
  const { listingId } = params;
  const listing = await getListing(listingId);

  if (!listing) {
    return notFound();
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{listing.title}</h1>
      <Image
        src={listing.imageUrl}
        alt={listing.title}
        width={500}
        height={400}
        className="w-full h-64 object-cover"
        priority
      />
      <p className="mt-4 text-lg text-gray-600">Price: Ksh {listing.price}</p>
      <p className="mt-4 text-gray-600">Location: {listing.location}</p>
      <p className="mt-4 text-gray-800">{listing.description}</p>
      <div className="mt-4">
        <strong>Tags:</strong>
        <ul className="list-disc pl-5">
          {listing.tags.map((tag, index) => (
            <li key={index} className="text-gray-600">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListingPage;
