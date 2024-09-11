
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BookmarkIcon } from "lucide-react";

const ProductCard = () => {
  return (
    <Card className="w-full max-w-sm bg-background shadow-lg rounded-lg overflow-hidden">
      <div className="relative">
        <Image
          src="/placeholder.svg"
          alt="Product Image"
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
        <h3 className="text-xl mb-2">Cozy Knit Sweater</h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl text-primary">$49.99</span>
        </div>
      </div>
    </Card>
  );
}

export default ProductCard;