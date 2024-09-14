import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BookmarkIcon } from "lucide-react";

interface ProductCardProps {
  title: string;
  price?: number; // Mark as optional
  imageUrl: string;
  location: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price = 0,
  imageUrl,
  location,
}) => {
  return (
    <Card className="w-full max-w-sm bg-background shadow-lg rounded-lg overflow-hidden">
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
          className="absolute top-4 right-4 text-primary"
        >
          <BookmarkIcon className="w-6 h-6" />
          <span className="sr-only">Bookmark</span>
        </Button>
      </div>
      <div className="p-4">
        <h3 className="text-xl mb-2">{title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl text-primary">${price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">{location}</p>
      </div>
    </Card>
  );
};

export default ProductCard;
