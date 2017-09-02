/**
 * Created By Prachi Agrawal- 2017-09-02
 */

import React from "react";
import {Link, Route} from "react-router-dom";

import * as BooksAPI from "./BooksAPI";
import BookCategory from "./BookCategory";
import BookSearch from "./BookSearch";
import "./App.css";


class BooksApp extends React.Component {

    constructor() {
        super()
        this.state = {
            allBooks: [],
            searchBooksList: [],
            isLoading: true
        };
    }


    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({allBooks: books, isLoading: false});
        });
    }

    changeBookCategory = (book, newBookCategory) => {
        BooksAPI.update(book, newBookCategory).then(() => {
            book.shelf = newBookCategory;
            this.setState(state => ({
                allBooks: state.allBooks.filter(currentBook => currentBook.id !== book.id).concat([book])
            }));
        });
    };


    getCurrentCategoryBooks(categoryName) {
        return this.state.allBooks.filter((book) => book.shelf === categoryName)
    }

    getBookContent() {
        if (this.state.isLoading) {
            return ( (<div className="loader"></div>))
        } else {
            return ( <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <BookCategory
                                    title="Currently Reading"
                                    changeBookCategory={this.changeBookCategory}
                                    books={this.getCurrentCategoryBooks("currentlyReading")}
                                />
                                <BookCategory
                                    title="Want to Read"
                                    changeBookCategory={this.changeBookCategory}
                                    books={this.getCurrentCategoryBooks("wantToRead")}
                                />
                                <BookCategory
                                    title="Read"
                                    changeBookCategory={this.changeBookCategory}
                                    books={this.getCurrentCategoryBooks("read")}/>
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search">Add a book</Link>
                        </div>
                    </div>
                )}/>
            )
        }

    }

    render() {
        return (
            <div className="app">
                {this.getBookContent()}
                <Route path="/search" render={({history}) => (
                    <BookSearch
                        books={this.state.allBooks}
                        changeBookCategory={this.changeBookCategory}
                    />
                )}/>
            </div>
        )
    }
}

export default BooksApp
