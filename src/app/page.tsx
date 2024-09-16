"use client"

import CarouselHero from "@/components/shared/Hero";
// import  CategoriesSection  from "@/components/shared/CategoriesSection"
import  SearchInput  from "@/components/shared/SearchInput";
import AllListings from "./all-listings/page";
export default function Home() {
  return (
    <main>
      <CarouselHero />
      <SearchInput />
      {/* <CategoriesSection /> */}
      <div className="bg-slate-50/[0.2]">
        <AllListings />
      </div>
    </main>
  )
}