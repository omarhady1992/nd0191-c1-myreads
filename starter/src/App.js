import "./App.css";
import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import ShelfList from "./components/ShelfList";
import Book from "./components/Book";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");




  //Get Books from API
  useEffect(() => {
    BooksAPI.getAll().then(books => {
      setBooks(books);
    });
  }, []);
  
  //Function to update the shelf category of the book
  const changeShelf = (book, whereto)=> {
    const editedBooks = books.map((b) => {
      if (b.id === book.id) {
        b.shelf = whereto;
      }
      return b;
    }
    );
    setBooks(editedBooks);
    BooksAPI.update(book, whereto);
    
  }

  //Function to search for books
  useEffect(() => {
    let isActive = true;
    if (query) {
      BooksAPI.search(query).then(results => {
        if (results.error){ //if there is an error in the query, show empty results
          setSearchResults([]);
        }else{
        if (isActive) { //if the search is still active, update the search results
          setSearchResults(results);
        }
      }});
    }
    return () => {
      isActive = false; //if the search is no longer active, set the search results to empty
    }
  }, [query]);


  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div> 
          <ShelfList books={books} changeShelf={changeShelf.bind(this)} />
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
