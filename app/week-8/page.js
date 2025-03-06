"use client";

import ItemList from "./item_list";
import NewItem from "./new-item";
import ItemsData from "./items.json";
import MealIdeas from "./meal-ideas";
import { useState } from "react";

export default function Page() {
  // State for the shopping list and selected item
  const [items, setItems] = useState([...ItemsData]);
  const [selectedItemName, setSelectedItemName] = useState(null);

  // Handle adding a new item to the shopping list
  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  // Handle selecting an item from the shopping list
  const handleItemSelect = (name) => {
    // Remove emojis using regex
    const emojiRemoved = name.replace(/[^\w\s,]/g, ""); // Regex to remove emojis
    // Clean the name by removing size info and trimming spaces
    const cleanedName = emojiRemoved.split(",")[0].trim();
    setSelectedItemName(cleanedName); // Set the cleaned item name to selectedItemName
    console.log("Selected Item Name:", cleanedName); // Log the selected item name
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen mx-auto max-w-6xl">
      <h1 className="text-3xl font-bold m-3">Shopping List</h1>
      <div className="flex flex-col items-center gap-2 w-full">
        {/* NewItem component to add items to the list */}
        <NewItem onAddItem={handleAddItem} />
        <div className="flex flex-row justify-center gap-2 w-full">
          {/* Pass the items and handleItemSelect function to ItemList */}
          <div className="flex-1">
            <ItemList items={items} onItemSelect={handleItemSelect} />
          </div>
          {/* MealIdeas component takes the selected item name (ingredient) */}
          <div className="flex-1">
            <MealIdeas ingredient={selectedItemName} />
          </div>
        </div>
      </div>
    </main>
  );
}