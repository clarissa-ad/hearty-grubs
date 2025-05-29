import React from "react";
import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes }) {
    if (!recipes.length) {
        return <p className="text-center text-gray-500">No recipes found.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
        </div>
    );
    }
