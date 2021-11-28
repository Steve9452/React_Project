import { useState, useEffect } from "react";
import { useUserContext } from "../../../context/UserContext";
import queryServices from '../../../services/query.services';

const Post = ({_id,userName,title,img,likes,description, comments, likeHandler, patchFav}) => {


    const [toggleComments, settoggleComments] = useState(false);
    
    // const [likes, setLikes] = useState(0);
    // const {userName, title, img, likes, description} = post; 
    const notFoundImg = "https://1080motion.com/wp-content/uploads/2018/06/NoImageFound.jpg.png";


    
    return(
        <li>
            <section>
                <h2>{userName}</h2>
            </section>
                
            <div>
                <h3>{title}</h3>

                <img src={img ?? notFoundImg}/>
                
                <div> 
                    <section>
                        <p>{ likes.length }</p>
                        <button 
                            onClick={ () => {likeHandler(_id)}
                                }>Like</button>
                        <button onClick={patchFav(_id)}>Favorito</button>
                        <button onClick={() => settoggleComments(!toggleComments)}>Ver comentarios</button>
                        {
                            toggleComments && (comments.map((com) => {return <li key={Date.now()}><p>{com.user.username}</p><p>{com.description}</p></li>}))                                
                        }
                        <button>Ocultar Post</button>
                    </section>
                    <p>{description}</p>
                </div>
            </div>
        </li>
    )
}

export default Post;