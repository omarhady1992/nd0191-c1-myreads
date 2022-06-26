// Book Component for each individual book
import React from "react";
import PropTypes from "prop-types";


const Book = (props) => {

    const { book, changeShelf } = props;

    const updateShelf = (e) => {
        /* A function to update the shelf category of the book */
        changeShelf(book, e.target.value);
    }

    

    return (
        <div className="book">
            <div className="book-top">
            <div
                className="book-cover"
                style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks? book.imageLinks.thumbnail: "" })`
                }}
                title={book.title} // added to show the title of the book in the tooltip
            />
            <div className="book-shelf-changer">
                <select defaultValue={book.shelf? book.shelf : "none"} onChange= {updateShelf}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
                </select>
            </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
        </div>
    );

}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired
}

export default Book;