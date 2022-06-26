import "./App.css";
import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import ShelfList from "./components/BookShelves";
import Book from "./components/Book";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [mapOfIds, setMapOfIds] = useState(new Map());
  const [mergedBooks, setMergedBooks] = useState([]);





  //Get Books from API
  useEffect(() => {
    BooksAPI.getAll().then(books => {
      setBooks(books);
      setMapOfIds(createMapofIds(books));
    }
    );
    }, []);

  //Create a map of book ids
  const createMapofIds = (books) => {
    const map = new Map();
    books.map((book) => map.set(book.id, book));
    return map;
  }

  useEffect(() => {
    const combined = searchResults.map(book => {
      if (mapOfIds.has(book.id)) {
        return mapOfIds.get(book.id);
      } else {
        return book;
      }
    });
    setMergedBooks(combined);
  }, [searchResults, mapOfIds]);

  
  //Function to update the shelf category of the book
  const changeShelf = (book, whereto)=> {
    const editedBooks = books.map((b) => {
      if (b.id === book.id) {
        b.shelf = whereto;
      }
      return b;
    }
    );
    if (mapOfIds.has(book.id)) {

      book.shelf = whereto;
      editedBooks.push(book);
    }

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
      <Router>
      <Routes>
      <Route path = "/search">
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/">
            <button className="close-search">Close</button>
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
          <ol className="books-grid"> 
              {mergedBooks?.map((book) => (
                <Book  book={book} changeShelf={changeShelf} />
              ))}

            </ol>
          </div>
        </div>
        </Route>

        <Route path = "/">
        <div> 
          <ShelfList books={books} changeShelf={changeShelf.bind(this)} />
          <Link to="/search">
          <button className="open-search">Add a book</button>
          </Link>
        </div>
        </Route>
    </Routes>
    </Router>
    </div>
  );
}

export default App;
