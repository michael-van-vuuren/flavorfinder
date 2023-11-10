function SearchBar({ placeholder,  data}) {

    return (
        <div className="search">
	    <div className="searchInput">
	    <input type="text" placeholder={placeholder} />
	</div>
	    <div className="dataResult">

	    </div>
        </div>
    );
}

export default SearchBar
