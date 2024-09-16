"use client"

// import  CategoriesSection  from "@/components/shared/CategoriesSection"
import  SearchInput  from "@/components/shared/SearchInput";
import AllListings from "./all-listings/page";
import Hero2 from "@/components/shared/Hero2";
export default function Home() {
  return (
    <main>
      {/* <CarouselHero /> */}
      <Hero2 />
      <SearchInput />
      {/* <CategoriesSection /> */}
      <div className="bg-slate-50/[0.2]">
        <AllListings />
      </div>
    </main>
  )
}