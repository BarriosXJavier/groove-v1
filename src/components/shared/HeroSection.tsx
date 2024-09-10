import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="w-full relative overflow-hidden">
      <Image
        src="/placeholder.svg"
        alt="Modern living room"
        className="w-full h-[600px] object-cover object-center"
        width="1200"
        height="600"
        style={{ aspectRatio: "1200/600", objectFit: "cover" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.1)]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6">
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Best quality at the best price
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Discover a curated collection of modern, sustainable furniture
            designed to transform your home.
          </p>
          <Link
            href="#"
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Browse Collection
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;