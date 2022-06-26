import React from "react";
import PropTypes from "prop-types";
import Shelf from "./Shelf";


const ShelfList = ({ books, changeShelf }) => {
    console.log(typeof(changeShelf));
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <Shelf books={books.filter((book) => book.shelf==="currentlyReading")} title="Currently Reading" changeShelf={changeShelf} />
                <Shelf books={books.filter((book) => book.shelf==="wantToRead")} title="Want to Read" changeShelf={changeShelf} />
                <Shelf books={books.filter((book) => book.shelf==="read")} title="Read" changeShelf={changeShelf} />
            </div>
        </div>
    );
}

ShelfList.propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
}

export default ShelfList;
