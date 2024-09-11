import Image from "next/image";
import Link from "next/link";

const CategoriesSection = () => {
  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left">
            Browse Our Furniture Categories
          </h1>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Category Card */}
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View Living Room</span>
            </Link>
            <Image
              src="/placeholder.svg"
              alt="Living Room"
              width={300}
              height={400}
              className="object-cover w-full h-full aspect-[3/4]"
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors flex items-center justify-center">
              <h3 className="text-lg md:text-xl font-semibold text-white">
                Living Room
              </h3>
            </div>
          </div>

          {/* Category Card */}
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View Bedroom</span>
            </Link>
            <Image
              src="/placeholder.svg"
              alt="Bedroom"
              width={300}
              height={400}
              className="object-cover w-full h-full aspect-[3/4]"
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors flex items-center justify-center">
              <h3 className="text-lg md:text-xl font-semibold text-white">
                Bedroom
              </h3>
            </div>
          </div>

          {/* Category Card */}
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View Dining Room</span>
            </Link>
            <Image
              src="/placeholder.svg"
              alt="Dining Room"
              width={300}
              height={400}
              className="object-cover w-full h-full aspect-[3/4]"
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors flex items-center justify-center">
              <h3 className="text-lg md:text-xl font-semibold text-white">
                Dining Room
              </h3>
            </div>
          </div>

          {/* Category Card */}
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View Office</span>
            </Link>
            <Image
              src="/placeholder.svg"
              alt="Office"
              width={300}
              height={400}
              className="object-cover w-full h-full aspect-[3/4]"
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors flex items-center justify-center">
              <h3 className="text-lg md:text-xl font-semibold text-white">
                Office
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
