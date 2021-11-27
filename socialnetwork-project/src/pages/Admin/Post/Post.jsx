import { useState } from "react";
import userServices from '../../../services/user.services'
const Post = ({userName,title,img,likes,description, comments}) => {


    const [toggleComments, settoggleComments] = useState(false);


    
    // const {userName, title, img, likes, description} = post; 
    const notFoundImg = "https://1080motion.com/wp-content/uploads/2018/06/NoImageFound.jpg.png"
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
                        <button>Like</button>
                        <p>{ likes.length }</p>
                        <button onClick={() => settoggleComments(!toggleComments)}>Ver comentarios</button>
                        {
                            toggleComments && (comments.map((com) => {return <li><p>{com.description}</p></li>}))
                                
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