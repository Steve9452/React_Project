export const PagControl = ({ nextPage, prevPage, firstpage }) => {
  return (
    <div className="flex space-x-80 justify-center">
      {!firstpage && (
        <button
          type="button"
          onClick={prevPage}
          className="bg-yellow-500 hover:bg-yellow-700 text-center py-2 px-4 rounded-full text-xl fixed bottom-10"
          style={{ backgroundColor: '#A4D8F0', color: '6D6D6D' }}
        >
          {'<<'} Prev
        </button>
      )}
      <button
        type="button"
        onClick={nextPage}
        className="bg-yellow-500 hover:bg-yellow-700 text-center py-2 px-4 rounded-full text-xl fixed bottom-10"
        style={{ backgroundColor: '#A4D8F0', color: '6D6D6D' }}
      >
        Next {'>>'}{' '}
      </button>
    </div>
  );
};
