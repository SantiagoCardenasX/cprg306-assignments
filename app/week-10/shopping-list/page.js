"use client";
import { useUserAuth } from "../_utils/auth-context";
import ItemList from "./item_list";
import NewItem from "./new-item";
import { getItems, addItem, deleteItem } from "../_services/shopping-list-service";
import MealIdeas from "./meal-ideas";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user, loading: authLoading } = useUserAuth(); // Destructure loading
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadItems = async () => {
    const items = await getItems(user?.uid);
    setItems(items);
  };

  useEffect(() => {
    // Wait for auth initialization to complete
    if (!authLoading) {
      if (!user) {
        router.push("/");
      } else {
        loadItems().finally(() => setIsLoading(false));
      }
    }
  }, [user, authLoading, router]); // Watch authLoading

  // Handle loading states
  if (authLoading || isLoading) {
    return <div>Loading...</div>;
  }

  // Handle adding a new item to the shopping list
  const handleAddItem = async (item) => {
    const newItemId = await addItem(user.uid, item); // Add the item to the database
    const newItemWithId = { id: newItemId, ...item }; // Combine the item with the new ID
    setItems([...items, newItemWithId]); // Update the items state with the new item
  };

  const handleDeleteItem = async (id) => {
    // Call the deleteItem function from the shopping-list-service
    await deleteItem(user.uid, id);
    // Filter out the deleted item from the items state
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems); // Update the items state
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
            <ItemList
              items={items}
              onItemSelect={handleItemSelect}
              onDelete={handleDeleteItem}
            />
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
