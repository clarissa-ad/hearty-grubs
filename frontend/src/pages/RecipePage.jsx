import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function RecipePage() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({user: "", rating: "", rev: ""});
    const [reviewLoading, setReviewLoading] = useState(false);

    useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => {
            if (!res.ok) throw new Error("Failed to load recipes");
            return res.json();
        })
        .then((data) => {
            if (data.meals && data.meals.length > 0) {
                setRecipe(data.meals[0]);
            } else {
                setRecipe(null);
            }
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    }, [id]);

    useEffect(() => {
        fetch("http://localhost:5000/reviews")
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(() => setReviews([]));
    }, []);

    if (loading) return <p>Loading recipe...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!recipe) return <p>Recipe not found</p>;

    // INI NUNGGU REVIEW YAH (jangan dihapus ok gusy)
    const averageRating = reviews.length
    ? (
        reviews.reduce((sum, r) => sum + r.rating, 0) /
        reviews.length
        ).toFixed(1)
    : "N/A";

    // Extract ingredients and measures
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push(`${ingredient} - ${measure}`);
        }
    }

    const directions = recipe.strInstructions
        ? recipe.strInstructions.split('.').filter(Boolean)
        : [];

    const handleReviewChange = e => {
        setNewReview({ ...newReview, [e.target.name]: e.target.value });
    };

    const handleReviewSubmit = e => {
        e.preventDefault();
        setReviewLoading(true);
        fetch("http://localhost:5000/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user: newReview.user,
                rating: parseInt(newReview.rating),
                rev: newReview.rev
            })
        })
            .then(res => res.json())
            .then(() => {
                setReviews([...reviews, { ...newReview, rating: parseInt(newReview.rating) }]);
                setNewReview({ user: "", rating: "", rev: "" });
                setReviewLoading(false);
            });
    };

    return (
        <div>
        <Link to="/">
            <span className="flex justify-start text-xl font-bold pb-5">&lt;&lt; Back</span>
        </Link>

        <div className="flex flex-col md:flex-row gap-6">
            <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full md:w-100 h-full object-cover rounded-lg shadow self-stretch"
            />
            <div className="flex-1">
                <div>
                    <h1 className="text-2xl font-[1000]">{recipe.strMeal}</h1>
                    {/* TO ADD: Favourite Icon */}
                </div>

                {/* Reviews */}
                <div className="mt-6">
                    <div className="flex items-end justify-between mb-2">
                        <h2 className="text-xl font-bold">
                            Reviews ({reviews.length})
                        </h2>
                        <Link to={`/recipe/${id}/reviews`} className="text-[12px] hover:underline">
                            See more
                        </Link>
                    </div>
                
                    <div className="flex flex-col md:flex-row gap-4">
                    {reviews.slice(0, 2).map((reviews, idx) => (
                        <div key={idx} className="bg-[#E85F5C] text-white rounded-lg p-4 flex-1 shadow">
                        <div className="flex justify-between items-center gap-2 mb-1">
                            <span className="font-bold">{reviews.user}</span>
                            <span className="font-semibold text-s">
                            {reviews.rating} ★
                            </span>
                        </div>
                        <p className="text-sm text-left">{reviews.rev}</p>
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
                {ingredients.map((item, idx) => (
                    <li key={idx}>{item}</li>
                ))}
                </ul>
            </div>

            {/* Directions */}
            <div className="md:w-2/3">
            <h3 className="text-3xl font-bold mb-2 text-left">Directions</h3>
            <ol className="list-inside text-base text-left">
                {directions.map((step, idx) => (
                <li key={idx} className="mb-2">
                    {/* <span className="font-semibold text-xl">Step {idx + 1}: </span>  */}
                    {step.trim()}
                </li>
                ))}
            </ol>
            </div>
        </div>

        </div>
    );
}