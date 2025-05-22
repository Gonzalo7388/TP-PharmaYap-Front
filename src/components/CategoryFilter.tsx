import React from "react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, setSelectedCategory }) => (
  <section className="py-10 px-4 bg-white rounded-2xl mb-6">
    <h2 className="text-2xl font-bold text-[#B73852] mb-4">Explorar por categoría</h2>
    <div className="flex gap-3 flex-wrap mb-6">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          className={`px-4 py-2 rounded-full border transition ${
            selectedCategory === cat
              ? "bg-[#E87085] text-white border-transparent"
              : "bg-gray-100 text-gray-700 hover:bg-[#DC546C] hover:text-white hover:border-[#DC546C]"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  </section>
);

export default CategoryFilter;
