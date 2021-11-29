import { useState } from 'react';
import * as FontAwesome from 'react-icons/fa';

const Post = ({_id,userName,title,img,likes,description, comments, likeHandler, patchFav, toggletActive, active, isModifiedAble, setDisplayModule,setPostToModify, setDisplayNewCommentMod}) => {

  const [toggleComments, settoggleComments] = useState(false);


  const notFoundImg = 
    'https://1080motion.com/wp-content/uploads/2018/06/NoImageFound.jpg.png';

  return (
    <li className="w-full p-4 hover:bg-lighter flex border-b-2">
      <section>
        <h2 className="font-semibold text-dark ml-2">@{userName}</h2>
      </section>

      <div>
        <h3 className="pl-10 font-semibold text-dark ml-2">{title}</h3>

        <div className="flex ">
          <img
            src={img ?? notFoundImg}
            className="w-40 h-40 mr-40 mb-5 mt-10"
          />
          <p className="pt-10 py-2 mb-10 mt-5">{description}</p>
        </div>

        <div className="flex items-center justify-between w-full">
          <section className="flex items-center text-sm text-dark space-x-20 pb-5">
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
            <button  className="hover:bg-blue-400 bg-white hover:text-white rounded py-2 px-2"
              onClick={() => {
                patchFav(_id);
              }}
            >
              Add Favorite
            </button>
            <div className="flex items-center justify-between">
              <FontAwesome.FaComment className="mr-5" />
              <button className="hover:bg-blue-400 bg-white hover:text-white rounded py-2 px-2" 
                onClick={() => settoggleComments(!toggleComments)}>
                Ver comentarios
              </button>            
            </div>
            
            {!isModifiedAble && 
              <div className="flex items-center justify-between">
                <FontAwesome.FaComment className="mr-5" />

                
                <button className="hover:bg-blue-400 bg-white hover:text-white rounded py-2 px-2"
                 onClick = {() => {
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
              {
              isModifiedAble && 
                (
                  <div className="flex items-center justify-between">
                  <button className="hover:bg-blue-400 bg-white hover:text-white rounded py-2 px-2"
                    onClick={() => {
                      setDisplayModule(true);
                      setPostToModify({
                        _id: _id,
                        title: title,
                        img: img,
                        description: description,
                      });
                    }}
                  >
                    Edit
                  </button>
                  </div>
                )
              }
            
            <button 
              onClick={() => toggletActive(_id)}
              className={active ? "hover:bg-gray-300 bg-white rounded py-2 px-2" : 'hover:bg-gray-300 rounded py-2 px-2 bg-gray-400'}
            >
              Ocultar Post
            </button>
          </section>
        </div>
        
        {
        toggleComments && <hr className="pb-8"/>
        }
        <div className="pt-3 flex flex-col align-items items-start w-48 w-3/5">
        
          <ol className="flex flex-col space-y-5">
          
            {
              toggleComments && 
                (
                  comments.map((com) => {
                    return (
                      <li className = "flex flex-col bg-red" key={'_' + Math.random().toString(36).substr(2, 9)}>
                        <div className="bg-gray-200 px-4 py-2 rounded w-full">
                        <p className="font-bold">{com.user.username}</p>
                        <p>{com.description}</p>
                        </div>
                      </li>
                    )
                  })
                ) 
            }
          </ol>           
          </div>
      </div>
    </li>
  );
};

export default Post;
