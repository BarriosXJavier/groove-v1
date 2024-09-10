import Image from "next/image";
import Link from "next/link";


const CategoriesSection = () => {
    
return (
<section className="w-full py-12">
  <div className="container grid gap-6 md:gap-8 px-4 md:px-6">
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
      <h1 className="text-2xl font-bold tracking-tight">
        Browse our furniture categories
      </h1>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 xl:gap-8 items-start">
      <div className="relative group grid [grid-template-areas:stack] overflow-hidden rounded-lg">
        <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
          <span className="sr-only">View</span>
        </Link>
        <Image
          src="/placeholder.svg"
          alt="Cover image"
          width={300}
          height={400}
          className="[grid-area:stack] object-cover w-full aspect-[3/4]"
        />
        <div className="flex-1 [grid-area:stack] bg-black/70 group-hover:opacity-90 transition-opacity text-white p-10 justify-end flex flex-col gap-2">
          <h3 className="font-semibold text-lg tracking-tight text-center">
            Living Room
          </h3>
        </div>
      </div>
      <div className="relative group grid [grid-template-areas:stack] overflow-hidden rounded-lg">
        <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
          <span className="sr-only">View</span>
        </Link>
        <Image
          src="/placeholder.svg"
          alt="Cover image"
          width={300}
          height={400}
          className="[grid-area:stack] object-cover w-full aspect-[3/4]"
        />
        <div className="flex-1 [grid-area:stack] bg-black/70 group-hover:opacity-90 transition-opacity text-white p-10 justify-end flex flex-col gap-2">
          <h3 className="font-semibold text-lg tracking-tight text-center">
            Bedroom
          </h3>
        </div>
      </div>
      <div className="relative group grid [grid-template-areas:stack] overflow-hidden rounded-lg">
        <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
          <span className="sr-only">View</span>
        </Link>
        <Image
          src="/placeholder.svg"
          alt="Cover image"
          width={300}
          height={400}
          className="[grid-area:stack] object-cover w-full aspect-[3/4]"
        />
        <div className="flex-1 [grid-area:stack] bg-black/70 group-hover:opacity-90 transition-opacity text-white p-10 justify-end flex flex-col gap-2">
          <h3 className="font-semibold text-lg tracking-tight text-center">
            Dining Room
          </h3>
        </div>
      </div>
      <div className="relative group grid [grid-template-areas:stack] overflow-hidden rounded-lg">
        <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
          <span className="sr-only">View</span>
        </Link>
        <Image
          src="/placeholder.svg"
          alt="Cover image"
          width={300}
          height={400}
          className="[grid-area:stack] object-cover w-full aspect-[3/4]"
        />
        <div className="flex-1 [grid-area:stack] bg-black/70 group-hover:opacity-90 transition-opacity text-white p-10 justify-end flex flex-col gap-2">
          <h3 className="font-semibold text-lg tracking-tight text-center">
            Office
          </h3>
        </div>
      </div>
    </div>
  </div>
</section>
)}

export default CategoriesSection