import { useUserContext } from "../../context/UserContext";
import userService from "../../services/user.services.js"

import React,{ useState, useEffect } from "react";

import { PagControl } from "./PagControls/PagControls";
import Create from "./Create/Create";
import Post from './Post/Post'


export default function AdminOnly() {
  
    const {token} = useUserContext();
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(0)

    useEffect(() => {

        const getPosts =  async (currentPage) => {
          const data = await userService.getOwned(token,10,currentPage);
          setPosts(data.data);
        }
    
        getPosts(page);
    
      }, [page,token])

      const setCurrentPage = {
        prev: () => {setPage(page - 1)},
        next: () => {setPage(page + 1)}
      }

    const OnCreateHandler = async (title, description, image) => {
        const response = await userService.CreatePost(token, title, description, image);
        console.log(response)
    }

    return(
        <main>
            <div>
                <Create onCreate={OnCreateHandler}/>
            </div>
            <div>
            <h2>Tus Posts</h2>
            <ul>
            {
              posts.map((p) => { 
                return (
                  <Post 
                    userName={p.user.username} 
                    title = {p.title} 
                    img={p.image} 
                    description = {p.description} 
                    likes = {p.likes} 
                    comments = {p.comments}
                    key={p._id}
                    _id={p._id}
                    
                  />
                )               
              })
            }
            </ul>
            </div>
            <PagControl nextPage={setCurrentPage.next} prevPage={setCurrentPage.prev} firstpage={page === 0 ? true : false}/>
        </main>
    );
}
  
