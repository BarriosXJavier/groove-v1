import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Category {
  _id: string;
  imageUrl: string[];
}

const CategoriesSection: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-medium text-center md:text-left">
            Browse through categories
          </h1>
        </div>

        {/* Categories Grid */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category._id}
                className="relative group overflow-hidden rounded-lg shadow-lg"
              >
                <Link
                  href={`/categories/${category._id}`}
                  className="absolute inset-0 z-10"
                  prefetch={false}
                >
                  <span className="sr-only">View {category._id}</span>
                </Link>
                <Image
                  src={category.imageUrl[0] || "/placeholder.svg"}
                  alt={category._id}
                  width={300}
                  height={400}
                  className="object-cover w-full h-full aspect-[3/4]"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors flex items-center justify-center">
                  <h3 className="text-lg md:text-xl font-semibold text-white">
                    {category._id}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No categories found.</p>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
