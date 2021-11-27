import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import userService from "../../services/user.services.js"

import React,{ useState, useEffect } from "react";

import Post from './Post/Post'
import { PagControl } from "./PagControls/PagControls";
import Search from "./Search/Search";



export default function Admin() {
  const navigate = useNavigate();

  const {logout , token} = useUserContext();

  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(0)
  const [favorites, setFavorites] = useState([])
  const [allposts, setAllPosts] = useState([])
  const [favoriteposts, setFavoritePosts] = useState([])
  const [searchedpost, setSearchedPost] = useState(undefined)

  useEffect(() => {

    const getPosts =  async (currentPage) => {
      const data = await userService.getAll(token,10,currentPage);
      setPosts(data.data);
    }

    getPosts(page);

  }, [page,token])

  useEffect(() => {

    const getPosts =  async () => {
      const data = await userService.getAll(token,100,0);
      setAllPosts(data.data);
    }

    getPosts();

  }, [token])
  //Funct

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  const setCurrentPage = {
    prev: () => {setPage(page - 1 )},
    next: () => {setPage(page + 1)}
  }

  const favHandler = async () => {
    const favoritesfetch = await userService.getAllFavorites(token);
    setFavorites(favoritesfetch);

    const newFavoritePosts = [];
    for(let i=0; i<favorites.length; i++) {
      let filtered = allposts.filter(dat => dat._id === favorites[i])
      newFavoritePosts.push(filtered);
    }
    setFavoritePosts(newFavoritePosts);
  }

  const OnSearchHandler = async (name) => {
    let getId = undefined;
    for(let i=0; i<allposts.length; i++) {
      if(allposts[i].title === name){
        getId = allposts[i]._id
      }
    }
    const Post = await userService.getOne(token, getId);
    setSearchedPost(Post);

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
            <li><button onClick={() => {console.log(favorites)}}>ConsoleFavTest</button></li>
          </ol>
        </nav>

        <li><button onClick={favHandler}>Mostrar Favoritos</button>
        </li>
        <ul>
        {
              favoriteposts.map((p) => { 
                return (
                  <Post 
                    userName={p.user.username} 
                    title = {p.title} 
                    img={p.image} 
                    description = {p.description} 
                    likes = {p.likes} 
                    comments = {p.comments}
                    key={p._id}
                    
                  />
                )               
              })
            }
        </ul>

        <li>
        <Search onSearch={OnSearchHandler} />
        </li>
        <ul>
            {
              searchedpost &&
                  <Post 
                    userName={searchedpost.user.username} 
                    title = {searchedpost.title} 
                    img={searchedpost.image} 
                    description = {searchedpost.description} 
                    likes = {searchedpost.likes} 
                    comments = {searchedpost.comments}
                    key={searchedpost._id}
                    
                  />
                               
              }
        </ul>

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
                    
                  />
                )               
              })
            }
        </ul>
        <PagControl nextPage={setCurrentPage.next} prevPage={setCurrentPage.prev} firstpage={page === 0 ? true : false}/>
      </div>
  );
}