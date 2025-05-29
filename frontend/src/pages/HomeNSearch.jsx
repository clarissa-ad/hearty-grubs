import React, { useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import Logo from "../assets/Logo.svg";

export const HomeNSearch = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState(""); // "" means default/category view

  useEffect(() => {
    fetch("/hearty-grubs/recipes.json") // changed this path to fetch from public root
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load recipes");
        return res.json();
      })
      .then(setRecipes)
      .catch((err) => console.error(err));
  }, []);

  // Filter recipes by search term on ingredients
  const filteredBySearch = recipes.filter((recipe) =>
    recipe.ingredients.some((ing) =>
      ing.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Get displayed recipes based on selected view
  const getDisplayedRecipes = () => {
    if (view === "popular") {
      return [...filteredBySearch].sort((a, b) => {
        const avgA =
          a.reviews.reduce((sum, r) => sum + r.rating, 0) / a.reviews.length || 0;
        const avgB =
          b.reviews.reduce((sum, r) => sum + r.rating, 0) / b.reviews.length || 0;
        return avgB - avgA;
      });
    }

    if (view === "favorites") {
      return filteredBySearch.filter((r) => r.favorite);
    }

    return filteredBySearch; // default/category view
  };

  const displayedRecipes = getDisplayedRecipes();

  // Group recipes by category only in default view
  const groupedByCategory =
    view === ""
      ? displayedRecipes.reduce((acc, recipe) => {
          const category = recipe.category || "Uncategorized";
          acc[category] = acc[category] || [];
          acc[category].push(recipe);
          return acc;
        }, {})
      : null;

  return (
    <>
      <img src={Logo} alt="Food" className="w-2/3 mx-auto mt-10" />

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <div className="flex justify-center space-x-10 mt-6 text-md font-medium">
        <button
          onClick={() => setView("popular")}
          className={`hover:underline ${view === "popular" ? "font-bold" : ""}`}
        >
          Most Popular
        </button>
        <button
          onClick={() => setView("favorites")}
          className={`hover:underline ${view === "favorites" ? "font-bold" : ""}`}
        >
          Favorites
        </button>
      </div>

      <div className="px-6 py-10 max-w-6xl mx-auto">
        <h2 className="text-4xl font-black mb-4 text-left">
          {view === "popular"
            ? "Most Popular Recipes"
            : view === "favorites"
            ? "Your Favorite Recipes"
            : "Recipes by Category"}
        </h2>

        {view === "" ? (
          Object.keys(groupedByCategory).length === 0 ? (
            <p className="text-center text-gray-500">No recipes found.</p>
          ) : (
            Object.entries(groupedByCategory).map(([category, recipes]) => (
              <div key={category} className="mb-10">
                <h3 className="text-2xl font-bold mb-4 text-left">{category}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              </div>
            ))
          )
        ) : displayedRecipes.length === 0 ? (
          <p className="text-center text-gray-500">No recipes found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
