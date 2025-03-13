"use client";

import { useState, useEffect } from "react";

export default function MealIdeas({ ingredient }) {
  const [mealIdeas, setMealIdeas] = useState([]);
  const [mealIngredients, setMealIngredients] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  // Fetch meal ideas based on the ingredient
  async function fetchMealIdeas(ingredient) {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      const data = await response.json();
      setMealIdeas(data.meals || []);
      setMealIngredients([]); // Reset meal ingredients when fetching new meal ideas
      setSelectedMeal(null); // Reset selected meal
    } catch (error) {
      console.error("Failed to fetch meal ideas:", error);
      setMealIdeas([]); // Optionally show an empty list or an error message
      setMealIngredients([]); // Reset meal ingredients on error
      setSelectedMeal(null); // Reset selected meal on error
    }
  }

  // Fetch ingredients for a specific meal
  async function fetchMealIngredients(mealId) {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      const data = await response.json();

      const meal = data.meals[0];
      const ingredients = [];

      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient) {
          ingredients.push(`${measure} ${ingredient}`);
        }
      }
      setMealIngredients(ingredients);
    } catch (error) {
      console.error("Failed to fetch meal ingredients:", error);
      setMealIngredients([]);
    }
  }

  // Load meal ideas when the ingredient changes
  useEffect(() => {
    if (ingredient) {
      fetchMealIdeas(ingredient);
    }
  }, [ingredient]);

  // Fetch ingredients when a meal is selected
  useEffect(() => {
    if (selectedMeal) {
      setMealIngredients([]); // Clear previous ingredients immediately
      fetchMealIngredients(selectedMeal);
    }
  }, [selectedMeal]);

  return (
    <div className="p-2 w-full mb-2 mt-1">
      <p className="text-lg font-bold mb-3">
        Meal Ideas: (Click to see ingredients)
      </p>
      <ul className="list-inside mt-6">
        {mealIdeas.map((meal) => (
          <li
            key={meal.idMeal}
            className="mb-3 bg-[#444444] p-3 rounded-lg hover:bg-orange-800 cursor-pointer font-bold"
            onClick={() => setSelectedMeal(meal.idMeal)}
          >
            {meal.strMeal}
            {selectedMeal === meal.idMeal && mealIngredients.length > 0 && (
              <>
              <p className="font-normal mt-2">Ingredients:</p>
              <ul className="list-disc list-inside mt-2 font-normal text-sm">
                {mealIngredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}