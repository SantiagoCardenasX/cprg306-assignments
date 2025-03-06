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
    <div>
      <h2>Meal Ideas</h2>
      <ul>
        {mealIdeas.map((meal) => (
          <li key={meal.idMeal}>{meal.strMeal}</li>
        ))}
      </ul>
    </div>
  );
}
