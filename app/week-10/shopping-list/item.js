export default function Item({ name, quantity, category, onSelect }) {
  // Wrap the onClick in an anonymous function to pass the name and other details
  const handleClick = () => {
    onSelect(name); // or any other data you want to pass (like 'quantity', 'category', etc.)
  };

  return (
    <div className="flex justify-start cursor-pointer">
      <li
        onClick={handleClick}
        className="bg-[#444444] p-3 m-3 max-w-[500px] rounded-lg w-full hover:bg-orange-800"
      >
        <h3 className="text-2xl font-bold">{name}</h3>
        <p className="text-lg">
          Buy {quantity}, it is a/an {category} product.
        </p>
      </li>
    </div>
  );
}
