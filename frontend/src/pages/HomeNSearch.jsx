import React, { useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import Logo from "../assets/Logo.svg";
import { Link } from "react-router-dom";

export const HomeNSearch = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState(""); // "" means default/category view
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const favoriteIds = JSON.parse(localStorage.getItem("favorites") || "[]");

    const fetchDefaultMeals = async () => {
      try {
        const [chickenData, beefData] = await Promise.all([
          fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken").then((res) => res.json()),
          fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef").then((res) => res.json()),
        ]);

        const chickenMeals = (chickenData.meals || [])
          .slice(0, 6)
          .map((meal) => ({ ...meal, strCategory: "Chicken" }));
        const beefMeals = (beefData.meals || [])
          .slice(0, 6)
          .map((meal) => ({ ...meal, strCategory: "Beef" }));

        const allMeals = [...chickenMeals, ...beefMeals].map((meal) => ({
          ...meal,
          favorite: favoriteIds.includes(meal.idMeal),
        }));

        setRecipes(allMeals);
      } catch (err) {
        console.error("Failed to load meals", err);
      }
    };

    const fetchSearchMeals = async () => {
      try {
        const [nameRes, ingRes] = await Promise.all([
          fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchTerm)}`),
          fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(searchTerm)}`),
        ]);

        const nameData = await nameRes.json();
        const ingData = await ingRes.json();

        const nameMeals = nameData.meals || [];

        let ingredientMeals = [];

        if (ingData.meals && ingData.meals.length > 0) {
          const detailedMeals = await Promise.all(
            ingData.meals.map((meal) =>
              fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`).then((res) => res.json())
            )
          );
          ingredientMeals = detailedMeals.map((d) => d.meals[0]);
        }

        const combined = [...nameMeals, ...ingredientMeals];
        const uniqueMealsMap = new Map();
        combined.forEach((meal) => {
          if (!uniqueMealsMap.has(meal.idMeal)) {
            uniqueMealsMap.set(meal.idMeal, meal);
          }
        });

        const finalMeals = Array.from(uniqueMealsMap.values()).map((meal) => ({
          ...meal,
          favorite: favoriteIds.includes(meal.idMeal),
        }));

        setRecipes(finalMeals);
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

        await delay;
        const finalMeals = Array.from(uniqueMeals.values()).map((meal) => ({
          ...meal,
          favorite: favoriteIds.includes(meal.idMeal),
        }));

        setRecipes(finalMeals);
      } catch (err) {
        console.error("Failed to load meals", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchFavoriteMeals = async () => {
      try {
        const results = await Promise.all(
          favoriteIds.map((id) =>
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((res) => res.json())
          )
        );

        const meals = results
          .map((r) => r.meals && r.meals[0])
          .filter(Boolean)
          .map((meal) => ({ ...meal, favorite: true }));

        setRecipes(meals);
      } catch (err) {
        console.error("Failed to load favorite meals", err);
      }
    };

    if (view === "popular") {
      fetchRandomMeals();
    } else if (view === "favorites") {
      fetchFavoriteMeals();
    } else if (searchTerm.trim() === "") {
      fetchDefaultMeals();
    } else {
      fetchSearchMeals();
    }
  }, [searchTerm, view]);

  const displayedRecipes = recipes;

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
      </div>
    );
  }

  return (
    <>
      <div className="flex space-x-8" style={{ position: "absolute", top: 105, right: 50 }}>
        <Link to="/register" className="hover:underline font-semibold">
          Register
        </Link>
        <Link to="/login" className="hover:underline font-semibold">
          Log in
        </Link>
      </div>

      <div className="w-full max-w-6xl mx-auto mt-10 mb-4 flex justify-center">
        <Link to="/" onClick={() => setView("")}>
          <img src={Logo} alt="Food" className="w-2/3 mx-auto mt-10 cursor-pointer" />
        </Link>
      </div>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <div className="flex justify-center space-x-10 mt-6 text-md font-medium">
        <button
          onClick={() => setView("popular")}
          disabled={loading}
          className={`hover:underline ${view === "popular" ? "font-bold" : ""} ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Most Popular
        </button>
        <button
          onClick={() => setView("favorites")}
          disabled={loading}
          className={`hover:underline ${view === "favorites" ? "font-bold" : ""} ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
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
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
