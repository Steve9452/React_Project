import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import userService from "../../services/user.services.js"

import React,{ useState, useEffect } from "react";

import Post from '../../Components/Post/Post'




export default function Admin() {
  const navigate = useNavigate();

  const { logout , token} = useUserContext();

  const [posts, setPosts] = useState([])

  const [page, setPage] = useState(0)

  useEffect(() => {

    const getPosts =  async (currentPage) => {
      const data = await userService.getAll(token,10,currentPage);
      setPosts(data.data);
    }

    getPosts(page);

  }, [page])


  //Funct

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  //Render
  

  //Prototipes 
  const nextPage = () => {
    setPage(1);
  }

  const consol = () => {
    console.log(posts)
    posts.forEach((p) => {
      console.log(p.title)
    })
  }

  // const renderPosts = filterPost.map( (post) => {
  //   <Post userName = {post.userName} title = {post.title} img = {post.img} like = {post.likes} description = {post.description}></Post>
  // });

  return (
      <div>
        <nav>
          <ol>
            <li><button onClick = {logoutHandler}>LogOut</button></li>
          </ol>
        </nav>
        
        <button onClick = {nextPage}>Test</button>
        <button onClick = {consol}>Console.log</button>
        <ul>
            {
            posts.map((p) => {
              return(<Post userName={p.user.username} title = {p.title} img={p.image} description = {p.description} likes = {p.likes.lenght}/>)
            })
            }
        </ul>
      </div>
  );
}