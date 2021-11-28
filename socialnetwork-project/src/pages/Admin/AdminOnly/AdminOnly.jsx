

const AdminOnly = ({posts}) => {

    return(
        <>
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