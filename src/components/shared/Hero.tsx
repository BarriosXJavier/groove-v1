import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Copy,
  Check,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

type Product = {
  src: string;
  alt: string;
  name: string;
  description: string;
  price: string;
  seller: string;
};

const generateRandomProduct = (index: number): Product => ({
  src: `/api/placeholder/${800 + index}/${600 + index}?text=Product${
    index + 1
  }`,
  alt: `Product ${index + 1}`,
  name: `Product ${index + 1}`,
  description: `This is a detailed description for Product ${
    index + 1
  }. It's a high-quality item with unique features.`,
  price: `$${(Math.random() * 100 + 50).toFixed(2)}`,
  seller: `Seller ${String.fromCharCode(65 + index)}`,
});

const products: Product[] = Array.from({ length: 5 }, (_, i) =>
  generateRandomProduct(i)
);

const CarouselHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const intervalIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalIdRef.current = window.setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const randomIndex = Math.floor(Math.random() * products.length);
          return randomIndex !== prevIndex
            ? randomIndex
            : (randomIndex + 1) % products.length;
        });
      }, 5000);
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    setShowDetails(!isPlaying);
  }, [isPlaying]);

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const copyDetails = () => {
    const product = products[currentIndex];
    const details = `
      Product: ${product.name}
      Description: ${product.description}
      Price: ${product.price}
      Seller: ${product.seller}
    `;
    navigator.clipboard.writeText(details).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-100">
      {products.map((product, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={product.src}
            alt={product.alt}
            className="w-full h-full object-cover"
            width={800}
            height={800}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          />

          {showDetails && index === currentIndex && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 md:p-6">
              <div className="bg-white p-4 md:p-6 rounded-lg max-w-sm md:max-w-md">
                <h2 className="text-lg md:text-2xl font-bold mb-2">
                  {product.name}
                </h2>
                <p className="mb-2">{product.description}</p>
                <p className="font-bold mb-2">Price: {product.price}</p>
                <p className="mb-4">Seller: {product.seller}</p>
                <Button
                  onClick={copyDetails}
                  className="bg-blue-500 text-white px-3 md:px-4 py-2 rounded hover:bg-blue-600 flex items-center"
                >
                  {copied ? (
                    <Check className="mr-2" />
                  ) : (
                    <Copy className="mr-2" />
                  )}
                  {copied ? "Copied!" : "Copy Details"}
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {products.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

      <Button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 hover:bg-white/75 rounded-full p-2 md:p-3"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </Button>

      <Button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 hover:bg-white/75 rounded-full p-2 md:p-3"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </Button>

      <Button
        onClick={togglePlayPause}
        className="absolute bottom-4 right-4 bg-white/50 hover:bg-white/75 rounded-full p-2 md:p-3"
        aria-label={isPlaying ? "Pause and show details" : "Resume slideshow"}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-gray-800" />
        ) : (
          <Play className="w-6 h-6 text-gray-800" />
        )}
      </Button>
    </div>
  );
};

export default CarouselHero;
