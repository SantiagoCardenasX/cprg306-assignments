"use client";

import { useState } from "react";

export default function NewItem({}) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    if (quantity >= 20) {
      setQuantity(20);
      alert("You have reached the maximum quantity of 20.");
    } else {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity <= 1) {
      setQuantity(1);
      alert("You have reached the minimum quantity of 1.");
    } else {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={decrement}
        className={` w-5 h-10 rounded-l-lg ${
          quantity <= 1
            ? "bg-gray-400"
            : "bg-blue-500 hover:bg-blue-800 active:bg-gray-800"
        }`}
        disabled={quantity <= 1}
      >
        -
      </button>
      <input
        type="text"
        disabled
        value={quantity}
        className="text-center block w-24 px-4 h-10"
      />
      <button
        onClick={increment}
        className={`w-5 h-10 rounded-r-lg ${
          quantity >= 20
            ? "bg-gray-400" // Gray out and disable cursor when quantity >= 20
            : "bg-blue-500 hover:bg-blue-800 active:bg-gray-800" // Normal state when quantity < 20
        }`}
        disabled={quantity >= 20} // Disable the button when quantity >= 20
      >
        +
      </button>
    </div>
  );
}
