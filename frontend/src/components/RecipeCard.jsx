import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favs.includes(recipe.idMeal));
  }, [recipe.idMeal]);

  const toggleFavorite = (e) => {
    e.preventDefault(); // prevent link navigation when clicking the heart

    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updated;

    if (favs.includes(recipe.idMeal)) {
      updated = favs.filter((id) => id !== recipe.idMeal);
    } else {
      updated = [...favs, recipe.idMeal];
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(updated.includes(recipe.idMeal));
  };

  return (
    <Link to={`/recipe/${recipe.idMeal}`}>
      <div className="bg-[#E85F5C] hover:bg-red-700 transition-all duration-300 rounded-lg overflow-hidden shadow-md transform hover:scale-105 cursor-pointer relative">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-32 object-cover"
        />
        <div className="p-2">
          <p className="text-white text-center font-extrabold capitalize mt-1 truncate font-['Overpass'] text-2xl">
            {recipe.strMeal}
          </p>
        </div>

        {/* Heart Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 text-xl z-10"
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>
    </Link>
  );
}
