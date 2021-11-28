import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

import queryServices from "../../services/query.services.js"

import React,{ useState, useEffect } from "react";

import Post from './Post/Post'
import { PagControl } from "./PagControls/PagControls";



export default function Admin() {
  const navigate = useNavigate();

  const {logout , token} = useUserContext();

  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(0)

  const [update, setUpdate] = useState(true)

  useEffect(() => {

    const getPosts =  async (currentPage) => {
      const data = await queryServices.getAll(token,10,currentPage);
      setPosts(data.data);
    }

    getPosts(page);

  }, [page,token, update])


  //Funct

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  const setCurrentPage = {
    prev: () => {setPage(page - 1 )},
    next: () => {setPage(page + 1)}
  }

  const setLike = (_id) => {
    console.log("Like: " + _id )
    queryServices.like(token,_id);
    setUpdate(!update);
}

  // const renderPosts = filterPost.map( (post) => {
  //   <Post userName = {post.userName} title = {post.title} img = {post.img} like = {post.likes} description = {post.description}></Post>
  // });

  return (
      <div>
        <nav>
          <ol>
            <li><button onClick={() => {console.log(posts)}}>ConsoleTest</button></li>
            <li><button onClick = {logoutHandler}>LogOut</button></li>
          </ol>
        </nav>
        <ul>
            {
              posts.map((p) => { 
                return (
                  <Post 
                    _id={p._id}
                    userName={p.user.username} 
                    title = {p.title} 
                    img={p.image} 
                    description = {p.description} 
                    likes = {p.likes} 
                    comments = {p.comments}
                    key={p._id}
                    setLike = {setLike}
                  />
                )               
              })
            }
        </ul>
        <PagControl nextPage={setCurrentPage.next} prevPage={setCurrentPage.prev} firstpage={page === 0 ? true : false}/>
      </div>
  );
}