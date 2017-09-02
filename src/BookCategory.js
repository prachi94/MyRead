/**
 * Created By Prachi Agrawal- 2017-09-02
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import Book from "./Book";

class BookCategory extends Component {

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map((book) => (
                            <li key={book.id} className="contact-list-item">
                                <Book
                                    book={book}
                                    changeBookCategory={this.props.changeBookCategory}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}
BookCategory.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    changeBookCategory: PropTypes.func.isRequired
};
export default BookCategory;
