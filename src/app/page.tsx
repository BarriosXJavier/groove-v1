"use client"

import CarouselHero from "@/components/shared/Hero";
import  CategoriesSection  from "@/components/shared/CategoriesSection"
import  SearchInput  from "@/components/shared/SearchInput";
import  ProductsSection  from "@/components/shared/ProductsSection";
import AllListings from "./all-listings/page";
export default function Home() {
  return (
    <main>
      <CarouselHero />
      <SearchInput />
      <CategoriesSection />
      <ProductsSection />
      <div className="bg-slate-300">
        <AllListings />
      </div>
    </main>
  )
}