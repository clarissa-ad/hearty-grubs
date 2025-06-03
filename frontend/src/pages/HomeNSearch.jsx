import React, { useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import Logo from "../assets/Logo.svg";

export const HomeNSearch = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState(""); // "" means default/category view
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDefaultMeals = async () => {
      try {
        const [chickenData, beefData] = await Promise.all([
          fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken").then((res) => res.json()),
          fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef").then((res) => res.json()),
        ]);

        const chickenMeals = (chickenData.meals || []).slice(0, 6).map(meal => ({ ...meal, strCategory: "Chicken" }));
        const beefMeals = (beefData.meals || []).slice(0, 6).map(meal => ({ ...meal, strCategory: "Beef" }));
        setRecipes([...chickenMeals, ...beefMeals]);
      } catch (err) {
        console.error("Failed to load category meals", err);
      }
    };

    const fetchSearchMeals = async () => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchTerm)}`);
        const data = await res.json();
        setRecipes(data.meals || []);
      } catch (err) {
        console.error("Failed to search meals", err);
      }
    };

    const fetchRandomMeals = async () => {
      try {
        setLoading(true);

        const delay = new Promise((resolve) => setTimeout(resolve, 5000));
        const uniqueMeals = new Map();

        while (uniqueMeals.size < 9) {
          const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
          const data = await res.json();
          const meal = data.meals[0];

          if (!uniqueMeals.has(meal.idMeal)) {
            uniqueMeals.set(meal.idMeal, meal);
          }
        }

        await delay; // ensures consistent UX delay
        setRecipes(Array.from(uniqueMeals.values()));
      } catch (err) {
        console.error("Failed to load random meals", err);
      } finally {
        setLoading(false);
      }
    };

    // Now only set loading for 'popular' view
    if (view === "popular") {
      fetchRandomMeals();
    } else if (searchTerm.trim() === "") {
      fetchDefaultMeals();
    } else {
      fetchSearchMeals();
    }
  }, [searchTerm, view]);

  const filteredBySearch = recipes;

  // Get displayed recipes based on selected view
  const getDisplayedRecipes = () => {
    if (view === "favorites") {
      return recipes.filter((r) => r.favorite);
    }
    return recipes;
  };

  const displayedRecipes = getDisplayedRecipes();

  // Group recipes by category only in default view
  const groupedByCategory =
    view === ""
      ? displayedRecipes.reduce((acc, recipe) => {
          const category = recipe.strCategory || "Uncategorized";
          acc[category] = acc[category] || [];
          acc[category].push(recipe);
          return acc;
        }, {})
      : null;
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <img src={Logo} alt="Loading" className="w-1/3 animate-pulse mb-6" />
        <p className="text-xl text-gray-600">Let him cook...</p>
      </div>
    );
  }

  return (
    <>
      <img src={Logo} alt="Food" className="w-2/3 mx-auto mt-10" />

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <div className="flex justify-center space-x-10 mt-6 text-md font-medium">
        <button
          onClick={() => setView("popular")}
          disabled={loading}
          className={`hover:underline ${view === "popular" ? "font-bold" : ""} ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Most Popular
        </button>
        <button
          onClick={() => setView("favorites")}
          disabled={loading}
          className={`hover:underline ${view === "favorites" ? "font-bold" : ""} ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
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
                    <RecipeCard key={recipe.idMeal} recipe={recipe} />
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
