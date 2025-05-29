import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function RecipePage() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    fetch("/hearty-grubs/recipes.json") // fetch from public folder root
        .then((res) => {
        if (!res.ok) throw new Error("Failed to load recipes");
        return res.json();
        })
        .then((data) => {
        const found = data.find((r) => r.id.toString() === id);
        setRecipe(found);
        setLoading(false);
        })
        .catch((err) => {
        setError(err.message);
        setLoading(false);
        });
    }, [id]);

    if (loading) return <p>Loading recipe...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!recipe) return <p>Recipe not found</p>;

    const averageRating = recipe.reviews.length
    ? (
        recipe.reviews.reduce((sum, r) => sum + r.rating, 0) /
        recipe.reviews.length
        ).toFixed(1)
    : "N/A";

    return (
        <div>
        <Link to="/">
            <span className="flex justify-start text-xl font-bold pb-5">&lt;&lt; Back</span>
        </Link>

        <div className="flex flex-col md:flex-row gap-6">
            <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full md:w-100 h-full object-cover rounded-lg shadow self-stretch"
            />
            <div className="flex-1">
                <div>
                    <h1 className="text-2xl font-[1000]">
                        {recipe.title}
                    </h1>
                    {/* TO ADD: Favourite Icon */}
                </div>

                <div className="text-xl font-bold flex items-center justify-center text-center gap-20 mb-2">
                    <span>
                        {recipe.cooktime} Mins
                    </span>
                    <span>
                        {recipe.portions} Servings
                        {/* <img src="../assets/icons/Portions.svg"
                        alt="portions icon"> 
                        <img>*/}
                    </span>
                    <span>
                        {averageRating} ★
                        {/* TO ADD: STARS ICON */}
                    </span>
                </div>

                <p className="text-left text-l mb-4">
                    {recipe.description}
                </p>

                {/* Reviews */}
                <div className="mt-6">
                    <div className="flex items-end justify-between mb-2">
                        <h2 className="text-xl font-bold">
                            Reviews ({recipe.reviews.length})
                        </h2>
                        <Link to={`/recipe/${recipe.id}/reviews`} className="text-[12px] hover:underline">
                            See more
                        </Link>
                    </div>
                
                    <div className="flex flex-col md:flex-row gap-4">
                    {recipe.reviews.slice(0, 2).map((review, idx) => (
                        <div key={idx} className="bg-[#E85F5C] text-white rounded-lg p-4 flex-1 shadow">
                        <div className="flex justify-between items-center gap-2 mb-1">
                            <span className="font-bold">{review.user}</span>
                            <span className="font-semibold text-s">
                            {review.rating} ★
                            </span>
                        </div>
                        <p className="text-sm text-left">{review.comment}</p>
                        </div>
                    ))}
                    </div>
                </div>

            </div>
        </div>

        {/* Ingredients & Directions */}
        <div className="flex flex-col md:flex-row gap-8 mt-8 font-[Overpass] items-start">
            {/* Ingredients */}
            <div className="w-full md:w-100 border-4 border-[#A2D883] rounded-lg p-4 text-left">
                <h3 className="text-3xl font-bold mb-2">Ingredients</h3>
                <ul className="text-gray-800 text-base list-disc list-inside text-left">
                {recipe.ingredients.map((item, idx) => (
                    <li key={idx}>{item}</li>
                ))}
                </ul>
            </div>

            {/* Directions */}
            <div className="md:w-2/3">
            <h3 className="text-3xl font-bold mb-2 text-left">Directions</h3>
            <ol className="list-inside text-base text-left">
                {recipe.directions.map((step, idx) => (
                <li key={idx} className="mb-2">
                    <span className="font-semibold text-xl">Step {idx + 1}: </span> 
                    {step}
                </li>
                ))}
            </ol>
            </div>
        </div>

        </div>
    );
}