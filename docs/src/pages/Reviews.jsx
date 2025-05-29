import React from "react";
import { Link, useParams } from "react-router-dom";
import recipes from "../assets/recipes.json";
import { Star } from "lucide-react"; 

export default function Reviews() {
    const { id } = useParams();
    const recipe = recipes.find((r) => r.id === parseInt(id));

    if (!recipe) return <p>Recipe not found</p>;

    const avgRating = (
        recipe.reviews.reduce((sum, r) => sum + r.rating, 0) /
        recipe.reviews.length
    ).toFixed(1);

    return (
        <div className="font-[Overpass]">
        {/* Back Link */}
        <Link to={`/recipe/${recipe.id}`}>
            <span className="flex justify-start text-xl font-bold pb-5">&lt;&lt; Back</span>
        </Link>

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold border border-transparent border-b-black border-5">
                {recipe.reviews.length} Reviews
                <span className="text-3xl mx-5">•</span> 
                <span className="text-4xl align-middle">{avgRating}</span>{" "}
                <Star className="inline-block text-6xl text-[#FFD84F] align-middle" fill="currentColor" />
            </h1>
            <button className="text-2xl font-bold">＋</button> 
            {/* Placeholder for icon because images wont load*/}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recipe.reviews.map((review, idx) => (
                <div 
                key={idx} 
                className="bg-[#E85F5C] text-white p-5 rounded-[25px] shadow-lg"
                >
                {/* Header with username and stars */}
                <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-2xl">{review.user}</span>
                    <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star
                        key={i}
                        fill={i < review.rating ? "#FFD84F" : "none"}
                        stroke="#FFD84F"
                        className="w-5 h-5"
                        />
                    ))}
                    </div>
                </div>

                {/* Comment text */}
                <p className="text-l text-left">{review.comment}</p>
                </div>
            ))}
        </div>
        </div>
    );
}
