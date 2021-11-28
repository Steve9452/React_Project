export const PagControl = ({ nextPage, prevPage, firstpage }) => {
  return (
    <div className="flex space-x-80 justify-center">
      {!firstpage && (
        <button
          type="button"
          onClick={prevPage}
          className="text-white bg-blue-500 rounded font-semibold p-3 hover:bg-blue-900 fixed bottom-10 left-10"
        >
          {'<<'} Prev
        </button>
      )}
      <button
        type="button"
        onClick={nextPage}
        className="text-white bg-blue-500 rounded font-semibold p-3 hover:bg-blue-900 fixed bottom-10 right-10"
      >
        Next {'>>'}{' '}
      </button>
    </div>
  );
};

// className="text-white bg-blue-500 rounded-full font-semibold w-full p-3 hover:bg-blue-900"
