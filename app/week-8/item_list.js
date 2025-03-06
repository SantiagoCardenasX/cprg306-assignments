"use client";

import Item from "./item";
import { useState, useEffect } from "react";

export default function ItemList({ items, onItemSelect }) {
  const [groupBy, setGroupBy] = useState("name");
  const [sortedItems, setSortedItems] = useState([...items]);
  const [groupedItems, setGroupedItems] = useState({});

  const groupedCategory = (array, key) => {
    return array.reduce((acc, obj) => {
      const keyValue = obj[key];
      if (!acc[keyValue]) {
        acc[keyValue] = [];
      }
      acc[keyValue].push(obj);
      return acc;
    }, {});
  };

  useEffect(() => {
    if (groupBy === "name") {
      setSortedItems(
        [...items].sort((a, b) => String(a.name).localeCompare(String(b.name)))
      );
      setGroupedItems({});
    } else if (groupBy === "category") {
      setSortedItems(
        [...items].sort((a, b) => String(a.category).localeCompare(String(b.category)))
      );
      setGroupedItems({});
    } else if (groupBy === "groupedCategory") {
      const arrayGroupedByCategory = groupedCategory(items, "category");
      // Sort items within each category
      Object.keys(arrayGroupedByCategory).forEach((category) => {
        arrayGroupedByCategory[category].sort((a, b) =>
          String(a.name).localeCompare(String(b.name))
        );
      });
      setGroupedItems(arrayGroupedByCategory);
      setSortedItems([]);
    }
  }, [groupBy, items]);

  return (
    <main>
      <div className="flex items-center gap-3 justify-start">
        <p className="text-lg font-bold m-3">Group by:</p>
        <button
          className={`px-3 py-1 rounded-md ${groupBy === "name" ? "bg-orange-600" : "bg-orange-800 hover:bg-orange-700"}`}
          onClick={() => setGroupBy("name")}
        >
          Name
        </button>
        <button
          className={`px-3 py-1 rounded-md ${groupBy === "category" ? "bg-orange-600" : "bg-orange-800 hover:bg-orange-700"}`}
          onClick={() => setGroupBy("category")}
        >
          Category
        </button>
        <button
          className={`px-3 py-1 rounded-md ${groupBy === "groupedCategory" ? "bg-orange-600" : "bg-orange-800 hover:bg-orange-700"}`}
          onClick={() => setGroupBy("groupedCategory")}
        >
          Grouped Category
        </button>
      </div>
      <ul>
        {groupBy === "groupedCategory"
          ? Object.entries(groupedItems)
              .sort(([a], [b]) => String(a).localeCompare(String(b))) // Sort categories
              .map(([category, items], index) => (
                <li key={index}>
                  <h2 className="text-xl font-bold m-3 capitalize">{category}</h2>
                  <ul>
                    {items.map((item, subIndex) => (
                      <Item
                        key={subIndex}
                        name={item.name}
                        quantity={item.quantity}
                        category={item.category}
                        onSelect={() => onItemSelect(item.name)} // Trigger parent onItemSelect
                      />
                    ))}
                  </ul>
                </li>
              ))
          : sortedItems.map((item, index) => (
              <Item
                key={index}
                name={item.name}
                quantity={item.quantity}
                category={item.category}
                onSelect={() => onItemSelect(item.name)} // Trigger parent onItemSelect
              />
            ))}
      </ul>
    </main>
  );
}