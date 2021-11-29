import { useState, useEffect } from 'react';
import { useUserContext } from '../../../context/UserContext';
import queryServices from '../../../services/query.services';
import * as FontAwesome from 'react-icons/fa';

import AdminOnly from "../AdminOnly";
const Post = ({_id,userName,title,img,likes,description, comments, likeHandler, patchFav, toggletActive, active, isModifiedAble, setDisplayModule,setPostToModify, setDisplayNewCommentMod}) => {

  
  // const {userName, title, img, likes, description} = post;
  const [toggleComments, settoggleComments] = useState(false);

  // const [likes, setLikes] = useState(0);
  // const {userName, title, img, likes, description} = post;
  const notFoundImg =
    'https://1080motion.com/wp-content/uploads/2018/06/NoImageFound.jpg.png';
  return (
    <li className="w-full p-4 hover:bg-lighter flex border-b-2">
      <section>
        <h2 className="font-semibold text-dark ml-2">{userName}</h2>
      </section>

      <div>
        <h3 className="font-semibold text-dark ml-2">{title}</h3>

        <div className="flex ">
          <img
            src={img ?? notFoundImg}
            className="w-20 h-20 mr-10 mb-5 mt-10"
          />
          <p className="py-2 mb-10 mt-5">{description}</p>
        </div>

        <div className="flex items-center justify-between w-full">
          <section className="flex items-center text-sm text-dark space-x-20">
            <button
              className="hover:bg-pink-800 hover:text-white rounded py-2 px-2"
              onClick={() => {
                likeHandler(_id);
              }}
            >
              Like
            </button>

            <p className="flex items-center justify-between w-10">
              <FontAwesome.FaHeart />
              {likes.length}
            </p>
            <button
              onClick={() => {
                patchFav(_id);
              }}
            >
              Add Favorite
            </button>
            <div className="flex items-center justify-between">
              <FontAwesome.FaComment className="mr-5" />
              <button onClick={() => settoggleComments(!toggleComments)}>
                Ver comentarios
              </button>            
            </div>
            
            {!isModifiedAble && 
              <div className="flex items-center justify-between">
                <FontAwesome.FaComment className="mr-5" />

                
                <button onClick = {() => {
                  setDisplayNewCommentMod(true)
                  setPostToModify(
                    {
                      _id:_id,
                      title:title,
                      img: img,
                      description : description
                    })
                  }}>
                  Añadir Comentario
                </button>            
              </div>
            }
            

            <div className="flex items-center justify-between">
              {isModifiedAble && <button onClick={() => 
                  {
                    setDisplayModule(true)
                    setPostToModify(
                      {
                        _id:_id,
                        title:title,
                        img: img,
                        description : description
                      })
                    } }>Edit</button>}
            </div>

            

            <button
              onClick={() => toggletActive(_id)}
              className={active ? '' : 'bg-gray-300'}
            >
              Ocultar Post
            </button>
          </section>

          
        </div>
        <div className="flex flex-col bg-gray-200">
          <ol>
            {toggleComments && (
                  
                  comments.map((com) => {
                    return (
                      <li className = "flex flex-row" key={'_' + Math.random().toString(36).substr(2, 9)}>
                        <p>{com.user.username}</p>
                        <p>{com.description}</p>
                      </li>
                    )
                  }))  }
          </ol>
            
          </div>
      </div>
    </li>
  );
};

export default Post;
