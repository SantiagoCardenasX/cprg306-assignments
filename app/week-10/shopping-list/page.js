"use client";

import { useUserAuth } from "../_utils/auth-context"; // Import your authentication hook
import ItemList from "./item_list";
import NewItem from "./new-item";
import { getItems, addItem } from "../_services/shopping-list-service"; // Import the service functions
import MealIdeas from "./meal-ideas";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router for redirection

export default function Page() {
  // Authentication check
  const { user } = useUserAuth(); // Assuming the hook provides a user object
  const router = useRouter(); // Initialize router for redirection
  const [isLoading, setIsLoading] = useState(true); // Loading state to handle async check
  
  const loadItems = async () => {
    // Call the getItems function from the shopping-list-service
    const items = await getItems(user.uid);
    setItems(items);
  }
  
  useEffect(() => {
    // If user is not logged in, redirect to landing page
    if (user === null) {
      router.push("/"); // Adjust the landing page URL if necessary
    } else {
      setIsLoading(false); // Once user is authenticated, stop loading
    }
  }, [user, router]);

  useEffect(() => {
    if (user) {
      loadItems(); // Load the items from the database
    }
  }, [user]);

  // State for the shopping list and selected item
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState(null);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state while checking authentication
  }

  // Handle adding a new item to the shopping list
  const handleAddItem = (item) => {
    const newItemId = addItem(user.uid, item); // Add the item to the database
    const newItemWithId = { id: newItemId, ...item }; // Combine the item with the new ID
    setItems([...items, newItemWithId]); // Update the items state with the new item
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
