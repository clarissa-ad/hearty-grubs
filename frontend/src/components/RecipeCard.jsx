import React from "react";
import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipe/${recipe.idMeal}`}>
        <div className="bg-[#E85F5C] hover:bg-red-700 transition-all duration-300 rounded-lg overflow-hidden shadow-md transform hover:scale-105 cursor-pointer">
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
        </div>
    </Link>
  );
}