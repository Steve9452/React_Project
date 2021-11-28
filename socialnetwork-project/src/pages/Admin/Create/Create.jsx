import { useState } from "react";

const Create = ({ onCreate = () => {} }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onCreate(title, description, image);
  }
  
  return (
    <form onSubmit={onSubmitHandler}>
      <input className="border-2 border-blue-400" type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} />
      <input className="border-2 border-blue-400" type="text" value={description} onChange={(e) => { setDescription(e.target.value) }} />
      <input className="border-2 border-blue-400" type="text" value={image} onChange={(e) => { setImage(e.target.value) }} />
      <button className="border-blue-400 border-2" type="submit"> Post </button>
    </form>
  );
}

export default Create;