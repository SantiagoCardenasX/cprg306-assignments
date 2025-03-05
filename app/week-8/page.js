"use client";

import ItemList from "./item_list";
import NewItem from "./new-item";
import ItemsData from "./items.json";
import { useState } from "react";

export default function Page() {
  const [items, setItems] = useState([...ItemsData]);

  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen mx-auto max-w-6xl">
      <div className="flex flex-col items-center gap-2 w-full">
        <h1 className="text-3xl font-bold m-3">Shopping List</h1>
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} />
      </div>
    </main>
  );
}