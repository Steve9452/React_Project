import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import userService from '../../services/user.services.js';

import React, { useState, useEffect } from 'react';

import Post from './Post/Post';
import { PagControl } from './PagControls/PagControls';
import * as FontAwesome from 'react-icons/fa';

export default function Admin() {
  const navigate = useNavigate();

  const { logout, token } = useUserContext();

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getPosts = async (currentPage) => {
      const data = await userService.getAll(token, 10, currentPage);
      setPosts(data.data);
    };

    getPosts(page);
  }, [page, token]);

  //Funct

  const logoutHandler = () => {
    logout();
    navigate('/login');
  };

  const setCurrentPage = {
    prev: () => {
      setPage(page - 1);
    },
    next: () => {
      setPage(page + 1);
    },
  };

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
          <li>
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
          <li>
            {/* <button
              onClick={''}
              className="text-white bg-blue-500 rounded-full font-semibold w-1/2 h-12 lg:h-auto p-3 hover:bg-blue-900"
            >
              Post
            </button> */}
          </li>
        </ol>
      </nav>
      <ul className="w-3/4 h-full overflow-y-scroll">
        <div className="flex px-5 py-3 border-b border-lighter items-center">
          <h1 className="text-xl font-bold"> Actualidad </h1>
          <icon className="text-2xl ml-5 text-left">
            <FontAwesome.FaNewspaper />
          </icon>
        </div>

        <div className="px-5 py-3 border-b-8 border-lighter flex">
          <form className="w-full px-4 relative">
            <textarea
              placeholder="Post Here"
              className="w-full focus:outline-none mt-3"
            />
            <div className="flex items-center">
              {/* <icon className="text-lg text-blue mx-6"></icon> */}
            </div>
            <button className="h-10 px-4 text-white font-semibold bg-blue-500 hover:bg-blue-900 focus:outline-note rounded absolute bottom-0 right-0">
              Post
            </button>
          </form>
        </div>
        {posts.map((p) => {
          return (
            <div className="w-full p-4 border-b-4 hover:bg-lighter flex">
              <Post
                title={p.title}
                userName={p.user.username}
                img={p.image}
                description={p.description}
                likes={p.likes}
                comments={p.comments}
                key={p._id}
              />
            </div>
          );
        })}
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
