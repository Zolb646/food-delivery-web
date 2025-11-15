"use client";
import { useState } from "react";
import { Header } from "./_features/header";
import { AllCategorySection } from "./_features/allCategorySection";
import { Footer } from "./_features/footer";
import { CategoryScroller } from "./_features/categoryScoller";

export default function Home() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="h-full flex w-full flex-col bg-[#404040]">
      <div className="flex flex-col w-full pb-4 pt-20">
        <Header cart={cart} setCart={setCart} />
        <img src={`/hero-image.png`} className="w-full aspect-1440/570" />
      </div>
      <CategoryScroller
        onCategorySelect={(cat) => {
          setSelectedCategory(cat);

          const section = document.getElementById(`category-${cat._id}`);
          if (section) {
            const y =
              section.getBoundingClientRect().top + window.scrollY - 190;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }}
        selectedCategory={selectedCategory}
      />
      <AllCategorySection setCart={setCart} cart={cart} />
      <Footer />
    </div>
  );
}
