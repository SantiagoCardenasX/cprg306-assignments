import { FaRegTrashAlt } from "react-icons/fa";

export default function Item({ id, name, quantity, category, onSelect, onDelete }) {
  // Wrap the onClick in an anonymous function to pass the name and other details
  const handleClick = () => {
    onSelect(name); // or any other data you want to pass (like 'quantity', 'category', etc.)
  };

  // Pass the event object to prevent the default event behavior
  const handleDelete = (event) => {
    event.stopPropagation(); // Prevent event bubbling so it doesn't trigger the onSelect
    onDelete(id); // Trigger the onDelete handler passed via props
  };

  return (
    <div className="flex justify-start cursor-pointer">
      <li
        onClick={handleClick} // Trigger item selection onClick
        className="bg-[#444444] p-3 m-3 max-w-[500px] rounded-lg w-full hover:bg-orange-800"
      >
        <h3 className="text-2xl font-bold">{name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-lg">
            Buy {quantity}, it is a/an {category} product.
          </p>
          <FaRegTrashAlt
            onClick={handleDelete} // Pass event to handleDelete
            className="hover:text-red-500"
          />
        </div>
      </li>
    </div>
  );
}
