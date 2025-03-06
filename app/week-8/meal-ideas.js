"use client";

import { useState, useEffect } from "react";

export default function MealIdeas({ ingredient }) {
  const [mealIdeas, setMealIdeas] = useState([]);

  async function fetchMealIdeas(ingredient) {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      const data = await response.json();
      setMealIdeas(data.meals || []);
    } catch (error) {
      console.error("Failed to fetch meal ideas:", error);
      setMealIdeas([]); // Optionally show an empty list or an error message
    }
  }

  useEffect(() => {
    async function loadMealIdeas() {
      await fetchMealIdeas(ingredient);
    }

    loadMealIdeas();
  }, [ingredient]);

  return (
    <div className="p-2 w-full mb-2 mt-1">
      <p className="text-lg font-bold mb-3">Meal Ideas: (Click to see ingredients)</p>
      <ul className=" list-inside mt-6">
        {mealIdeas.map((meal) => (
          <li key={meal.idMeal} className="mb-3 bg-[#444444] p-3 rounded-lg hover:bg-orange-800 cursor-pointer">
            {meal.strMeal}
          </li>
        ))}
      </ul>
    </div>
  );
}