"use client"

import CarouselHero from "@/components/shared/Hero";
import  CategoriesSection  from "@/components/shared/CategoriesSection"
import  SearchInput  from "@/components/shared/SearchInput";
export default function Home() {
  return (
    <main>
      <CarouselHero />
      <SearchInput />
      <CategoriesSection />
    </main>
  )
}