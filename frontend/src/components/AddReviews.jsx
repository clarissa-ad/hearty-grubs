import React, { useState } from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function AddReview({ username = "Vivicooks", onSubmit }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !comment.trim()) {
        alert("Please provide a rating and a review.");
        return;
    }
    if (onSubmit) {
        onSubmit({ rating, comment });
    }
    setRating(0);
    setComment("");
    alert("Review posted!");
    };

    return (
    <div className="w-full md:max-w-5xl mx-auto mt-10 font-[Overpass]">
        <h1 className="text-m font-bold mb-4">Review as {username}</h1>
        <form onSubmit={handleSubmit}>
        <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
            <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                className="focus:outline-none"
            >
                <Star
                fill={star <= (hover || rating) ? "#E85F5C" : "none"}
                stroke="#E85F5C"
                className="w-8 h-8"
                />
            </button>
            ))}
        </div>
        <textarea
            className="w-full border-2 border-[#E85F5C] rounded-xl p-4 mb-4 text-base resize-none focus:outline-none"
            rows={5}
            placeholder="Write your Review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex justify-center">
            <button
            type="submit"
            className="bg-[#E85F5C] text-white px-8 py-2 rounded-md font-bold text-lg hover:bg-red-600 transition-colors"
            >
            Post
            </button>
        </div>
        </form>
    </div>
    );
}