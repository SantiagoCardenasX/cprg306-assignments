export default function Item({ name, quantity, category }) {
  return (
    <div>
      <li className="bg-[#444444] p-3 m-3">
        <h3 className="text-2xl font-bold">{name}</h3> 
        <p className="text-lg">Buy {quantity}, it is a/an {category} product.</p> 
      </li>
    </div>
  );
}
