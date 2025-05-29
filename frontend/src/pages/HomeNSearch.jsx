import React, { useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import RecipeList from "../components/RecipeList";
import Logo from "../assets/Logo.svg";

export const HomeNSearch = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/src/assets/recipes.json")
      .then((res) => res.json())
      .then(setRecipes);
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.ingredients.some((ing) =>
      ing.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <>
      <img
        src={Logo}
        alt="Food"
        className="w-2/3 mx-auto mt-10"
      />

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <div className="flex justify-center space-x-10 mt-6 text-md font-medium">
        <a href="#" className="hover:underline">
          Most Popular
        </a>
        <a href="#" className="hover:underline">
          Favorites
        </a>
      </div>

      <div className="px-6 py-10 max-w-6xl mx-auto">
        <h2 className="text-4xl font-black mb-4 text-left">Recipes by Ingredients</h2>
        <RecipeList recipes={filteredRecipes} />
      </div>
    </>
  );
};