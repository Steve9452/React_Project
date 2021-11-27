
const Post = ({userName,title,img,likes,description}) => {

    // const {userName, title, img, likes, description} = post; 

    return(
        <li>
            <section>
                <h2>{userName}</h2>
            </section>
                
            <div>
                <h3>{title}</h3>

                <img src={img}/>
                
                <div> 
                    <section>
                        <button>Like</button>
                        <p>{ likes }</p>
                        <button>Ver comentarios</button>
                        <button>Ocultar Post</button>
                    </section>
                    <p>{description}</p>
                </div>
            </div>
        </li>
    )
}

export default Post;