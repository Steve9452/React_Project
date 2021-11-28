import Post from '../Post/Post'
import { PagControl } from '../PagControls/PagControls';

import queryServices from '../../../services/query.services'
import { useState, useEffect } from 'react';

const AdminOnly = ({token, likeHandler, patchFav}) => {

  const [page, setPage] = useState(0);

  const [posts, setPosts] = useState([])

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("")

  const [name, setName] = useState('');

  const setCurrentPage = {
    prev: () => {setPage(page - 1 )},
    next: () => {setPage(page + 1)}
  }

  useEffect(() => {
    
    const getOwnPost = async (currentPage) => {
      const data = await queryServices.getOwned(token, 10, currentPage);
      setPosts(data.data);
    };

    getOwnPost(page);
  }, [])

  const onSubmitHandler = (e) => {
    e.preventDefault()
    try {
      queryServices.CreatePost(token,title, description, img)
    } catch (error) {
      alert("Eror: No es posible realizar dicha acción")
    }
  };

  const handleOnChange = (e, save) => {
    save(e.target.value);
  };

    return(
        <>
        <div className="px-5 py-3 border-b-8 border-lighter flex">
              <form onSubmit={onSubmitHandler} className="w-full px-4 relative">
                  <input  type="text" name="title" value={title} placeholder="Titulo de post" className="w-full focus:outline-none mt-3" onChange={(e) => {handleOnChange(e, setTitle)}} />
                  <textarea
                    placeholder="Post Here"
                    name="description"
                    className="w-full focus:outline-none mt-3"
                    onChange={(e) => {handleOnChange(e, setDescription)}}
                  />
                  <input type="text" name="img" value={img} placeholder="URL imagen" className="w-full focus:outline-none mt-3" onChange={(e) => {handleOnChange(e, setImg)}}/>
                  <div className="flex items-center">
                    {/* <icon className="text-lg text-blu e mx-6"></icon> */}
                  </div>
                  <button className="h-10 px-4 text-white font-semibold bg-blue-500 hover:bg-blue-900 focus:outline-note rounded absolute bottom-0 right-0">
                    Post
                  </button>
              </form>
            </div>
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
        <PagControl
        nextPage={setCurrentPage.next}
        prevPage={setCurrentPage.prev}
        firstpage={page === 0 ? true : false}
      />
      </>
    );
}

export default AdminOnly;