import React from "react";
import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes }) {
  if (!recipes.length) {
    return <p className="text-center text-gray-500">No recipes found.</p>;
  }

  // Group recipes by category
  const grouped = recipes.reduce((acc, recipe) => {
    acc[recipe.category] = acc[recipe.category] || [];
    acc[recipe.category].push(recipe);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(grouped).map(([category, recipes]) => (
        <div key={category} className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-left">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transform-gpu">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}