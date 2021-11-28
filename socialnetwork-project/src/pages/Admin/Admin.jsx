import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

import queryServices from "../../services/query.services.js"

import React,{ useState, useEffect } from "react";

import Post from './Post/Post'
import { PagControl } from "./PagControls/PagControls";
import Search from "./Search/Search";

import userSevices from "../../services/user.services"
import * as FontAwesome from 'react-icons/fa';

import { Navigate } from 'react-router';
import AdminOnly from "./AdminOnly/AdminOnly";

export default function Admin() {
  const navigate = useNavigate();

  const { logout, token } = useUserContext();

  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(0)
  const [allposts, setAllPosts] = useState([])
  const [favoriteposts, setFavoritePosts] = useState([])
  const [searchedpost, setSearchedPost] = useState(undefined)

  const [update, setUpdate] = useState(true)

  const [displayAdminOnly, setDisplayAdminOnly] = useState(false);

  useEffect(() => {

    const getPosts =  async (currentPage) => {
      const data = await queryServices.getAll(token,10,currentPage);
      setPosts(data.data);
    };

    getPosts(page);

  }, [page, token, update])

  //Funct

  const logoutHandler = () => {
    logout();
    
  };

  const setCurrentPage = {
    prev: () => {setPage(page - 1 )},
    next: () => {setPage(page + 1)}
  }

  const likeHandler = async (_id) => {
    console.log(_id)
    await queryServices.like(token,_id);
    setUpdate(!update);
}
  const favHandler = async () => {
    const favoritesfetch = await userSevices.getAllFavorites(token);

    const newFavoritePosts = [];
    /*
    console.log(favoritesfetch);
    console.log(allposts.length);
    console.log(favoritesfetch.favorites.length)
    */
    for(let i=0; i<allposts.length; i++) {
      if(favoritesfetch.favorites.includes(allposts[i]._id)){
        newFavoritePosts.push(allposts[i])
      }
    }
    console.log(newFavoritePosts);
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
    <div className="flex container h-screen w-full">
      <nav className="lg:w-1/5 border-r border-lighter lpx-2 g:px-8 py-10 my-0 mx-0">
        <ol>
          <li>
            <button
              onClick={() => {
                console.log(posts);
              }}
              className="flex items-center py-2 px-4 hover:bg-pink-100 rounded-full mr-auto"
            >
              <icon className="text-2xl mr-4 text-left">
                <FontAwesome.FaHome />
              </icon>
              <p className="text-lg font-semibold text-left">Home</p>
            </button>
          </li>
          <li >
            <button
              onClick={logoutHandler}
              className="flex items-center py-2 px-4 hover:bg-pink-100 rounded-full mr-auto my-5"
            >
              <icon className="text-2xl mr-4 text-left">
                <FontAwesome.FaSignOutAlt />
              </icon>
              <p className="text-lg font-semibold text-left">Logout</p>
            </button>
          </li>
          <li><button onClick={() => {console.log(posts)}}>ConsoleTest</button></li>
          <li><button onClick = {getAllFavs}>MostrarFavs</button></li>
          
        </ol>
      </nav>
      <ul className="w-3/4 h-full overflow-y-scroll">
        <div className="flex px-5 py-3 border-b border-lighter items-center">
          <h1 className="text-xl font-bold"> Actualidad </h1>
          <icon className="text-2xl ml-5 text-left">
            <FontAwesome.FaNewspaper />
          </icon>
        </div>
              
        {
          displayAdminOnly && 
          (
            <AdminOnly token={token} likeHandler = {likeHandler} patchFav = {patchFav} />
          )
        }
        {/* {
          !displayAdminOnly && 
          (
            
          )
        } */}
        <ol>
        {posts.map((p) => {
          return (

              <Post className="w-full p-4 border-b hover:bg-lighter flex"
                userName={p.user.username}
                title={p.title}
                userName={p.user.username}
                img={p.image}
                description={p.description}
                likes={p.likes}
                comments={p.comments}
                key={p._id}
                likeHandler = {likeHandler}
                patchFav = {patchFav}
                _id = {p._id}
              />

          );
        })}
        </ol>
        
        
      </ul>
      <div className="w-1/6 h-full border-l border-lighter py-2 my-5">
        <input
          className="rounded-full w-full p-2 bg-lighter ml-10 bg-gray-200 border-gray-200"
          placeholder="Buscar Favorito"
        />
      </div>
      <PagControl
        nextPage={setCurrentPage.next}
        prevPage={setCurrentPage.prev}
        firstpage={page === 0 ? true : false}
      />
    </div>
  );
}
