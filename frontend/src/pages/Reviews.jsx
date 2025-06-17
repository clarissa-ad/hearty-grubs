import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Star } from "lucide-react";
import AddReview from "../components/AddReviews"; // <-- import AddReviews

export default function Reviews() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [showAddReview, setShowAddReview] = useState(false); // <-- state for AddReview

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.meals && data.meals.length > 0) setRecipe(data.meals[0]);
      });
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load recipes");
        return res.json();
      })
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;

  const avgRating = reviews.length
    ? (
        reviews.reduce((sum, r) => sum + r.rating, 0) /
        reviews.length
      ).toFixed(1)
    : "N/A";

  // Handler for adding a review
  const handleAddReview = ({ rating, comment }) => {
    setReviews((prev) => [
      ...prev,
      { user: "Vivicooks", rating, rev: comment }, // match your review object structure
    ]);
    setShowAddReview(false);
  };

  return (
    <div className="font-[Overpass]">
      {/* Back Link */}
      {recipe && (
        <Link to={`/recipe/${id}`}>
          <span className="flex justify-start text-xl font-bold pb-5">&lt;&lt; Back</span>
        </Link>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold border border-transparent border-b-black border-5">
          {reviews.length} Reviews
          <span className="text-3xl mx-5">•</span>
          <span className="text-4xl align-middle">{avgRating}</span>{" "}
          <Star
            className="inline-block text-6xl text-[#FFD84F] align-middle"
            fill="currentColor"
          />
        </h1>
        <button
          className="text-2xl font-bold"
          onClick={() => setShowAddReview((v) => !v)}
          aria-label="Add Review"
        >
          ＋
        </button>
      </div>

      {/* AddReview appears above reviews when plus is pressed */}
      {showAddReview && (
        <div className="mb-8">
          <AddReview
            username="Vivicooks"
            onSubmit={handleAddReview}
          />
        </div>
      )}

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review, idx) => (
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
            <p className="text-l text-left">{review.rev}</p>
          </div>
        ))}
      </div>
    </div>
  );
}