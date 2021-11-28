import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

import queryServices from "../../services/query.services.js"

import React,{ useState, useEffect } from "react";

import Post from './Post/Post'
import { PagControl } from "./PagControls/PagControls";
import Search from "./Search/Search";

import userSevices from "../../services/user.services"

export default function Admin() {
  const navigate = useNavigate();

  const {logout , token} = useUserContext();

  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(0)
  const [favorites, setFavorites] = useState([])
  const [allposts, setAllPosts] = useState([])
  const [favoriteposts, setFavoritePosts] = useState([])
  const [searchedpost, setSearchedPost] = useState(undefined)

  const [update, setUpdate] = useState(true)

  useEffect(() => {

    const getPosts =  async (currentPage) => {
      const data = await queryServices.getAll(token,10,currentPage);
      setPosts(data.data);
    }

    getPosts(page);

  }, [page, token, update])

  //Funct

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  const setCurrentPage = {
    prev: () => {setPage(page - 1 )},
    next: () => {setPage(page + 1)}
  }

  const likeHandler = (_id) => {
    queryServices.like(token,_id);
    setUpdate(!update);
}
  const favHandler = async () => {
    const favoritesfetch = await userSevices.getAllFavorites(token);
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
    const Post = await userSevices.getOne(token, getId);
    setSearchedPost(Post);

  }

  const patchFav = (_id) => {
    queryServices.patchFav(token,_id);
    // setUpdate(!update);
  }

  const getAllFavs = (_id) => {
    queryServices.getFavs(token,_id)
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
            <li><button onClick = {getAllFavs}>MostrarFavs</button></li>
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
                    _id={p._id}
                    userName={p.user.username} 
                    title = {p.title} 
                    img={p.image} 
                    description = {p.description} 
                    likes = {p.likes} 
                    comments = {p.comments}
                    key={p._id}
                    likeHandler = {likeHandler}
                    patchFav = {patchFav}
                  />
                )               
              })
            }
        </ul>
        <PagControl nextPage={setCurrentPage.next} prevPage={setCurrentPage.prev} firstpage={page === 0 ? true : false}/>
      </div>
  );
}