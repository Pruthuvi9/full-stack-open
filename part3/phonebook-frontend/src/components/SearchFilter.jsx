const SearchFilter = ({ handleSearch }) => {
  return (
    <div>
      Search for a name:
      <input onChange={handleSearch} />
    </div>
  );
};

export default SearchFilter;
