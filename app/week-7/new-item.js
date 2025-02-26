"use client";

import { useState } from "react";

export default function NewItem({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("Produce");

  const handleSubmit = (event) => {
    event.preventDefault();
    const categoryId = Math.floor(Math.random() * 1000).toString();
    onAddItem({ name, quantity, category, categoryId });
    // Reset the form
    setName("");
    setQuantity(1);
    setCategory("Produce");
  };

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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full bg-slate-600 p-4 md:p-10 rounded-lg shadow-lg"
    >
      <label htmlFor="name" className="text-lg font-bold text-white mb-2">
        Name
      </label>
      <input
        required
        type="text"
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="border border-gray-400 p-2 mb-4 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4 md:gap-0">
        <label
          htmlFor="category"
          className="text-lg font-bold text-white md:mr-4"
        >
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="border border-gray-400 p-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto px-6"
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Bakery">Bakery</option>
          <option value="Meat">Meat</option>
          <option value="Frozen">Frozen Foods</option>
          <option value="Canned Goods">Canned Goods</option>
          <option value="Dry Goods">Dry Goods</option>
          <option value="Beverages">Beverages</option>
          <option value="Snacks">Snacks</option>
          <option value="Household">Household</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4 md:gap-0">
        <label className="text-lg font-bold text-white md:mr-4">Quantity</label>
        <div className="flex justify-center items-center">
          <button
            type="button"
            onClick={decrement}
            className={`w-10 h-10 rounded-l-lg text-white font-bold ${
              quantity <= 1
                ? "bg-gray-400"
                : "bg-blue-500 hover:bg-blue-700 active:bg-blue-800"
            }`}
            disabled={quantity <= 1}
          >
            -
          </button>
          <input
            type="text"
            disabled
            value={quantity}
            className="text-center block w-24 px-4 h-10 border-t border-b border-gray-400 bg-white text-black"
          />
          <button
            type="button"
            onClick={increment}
            className={`w-10 h-10 rounded-r-lg text-white font-bold ${
              quantity >= 20
                ? "bg-gray-400"
                : "bg-blue-500 hover:bg-blue-700 active:bg-blue-800"
            }`}
            disabled={quantity >= 20}
          >
            +
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
}
