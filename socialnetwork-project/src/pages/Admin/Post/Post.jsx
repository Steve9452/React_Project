import { useState, useEffect } from "react";
import { useUserContext } from "../../../context/UserContext";
import queryServices from '../../../services/query.services';

const Post = ({_id,userName,title,img,likes,description, comments, likeHandler, patchFav}) => {

  // const {userName, title, img, likes, description} = post;
  const [toggleComments, settoggleComments] = useState(false);
    
    // const [likes, setLikes] = useState(0);
    // const {userName, title, img, likes, description} = post; 
    const notFoundImg = "https://1080motion.com/wp-content/uploads/2018/06/NoImageFound.jpg.png";
  return (
    <li className="w-full p-4 border-b hover:bg-lighter flex">
      <section>
        <h2 className="font-semibold text-dark ml-2">{userName}</h2>
      </section>

    
      <div>
        <h3 className="font-semibold text-dark ml-2">{title}</h3>

        <img src={img ?? notFoundImg} />

        <p className="py-2 ">{description}</p>

        <div className="flex items-center justify-between w-full">
          <section className="flex items-center text-sm text-dark">
            <button onClick={ () => {likeHandler(_id)}}>Like</button>
            <p>{likes.length}</p>
            <button onClick = { () => {patchFav(_id)}}>Add Favorite</button>
            <button onClick={() => settoggleComments(!toggleComments)}>
              Ver comentarios
            </button>
            {
                toggleComments && (comments.map((com) => {return <li key={Date.now()}><p>{com.user.username}</p><p>{com.description}</p></li>}))                                
            }
            <button>Ocultar Post</button>
          </section>
        </div>
      </div>
    </li>
  );
};

export default Post;
