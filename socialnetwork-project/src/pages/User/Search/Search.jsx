import { useState } from "react";

const Search = ({ onSearch = () => {} }) => {
  const [name, setName] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSearch(name);
  }
  
  return (
      <form onSubmit={onSubmitHandler}>
        <input
          type="text" value={name} onChange={(e) => { setName(e.target.value) }}
          className="rounded-full w-full p-2 bg-lighter ml-10 bg-gray-200 border-gray-200"
          placeholder="Buscar Favorito"
        />
        <button type="submit" className="flex self-center m-auto py-2 px-4 hover:bg-pink-100 rounded-full mr-auto my-5 bg-blue-300">
          Buscar
        </button>
      </form>
  );
}

export default Search;