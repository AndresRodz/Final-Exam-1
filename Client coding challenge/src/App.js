import React from 'react';
import './App.css';
import Book from './Book';
import BookForm from './BookForm';

class App extends React.Component{

  constructor( props ){
    super( props );
    this.state = {
      /*
        Your code goes here
      */
      bookName: "",
      apiUrl: "https://www.googleapis.com/books/v1/volumes?q=",
      errorMessage = "",
      books = [{}]
    }
  }

  /* 
    Your code goes here
  */

  fetchBooks = (event) => {
    event.preventDefault();

    this.setState({bookName: event.currentTarget.bookName.value});

    const url = `${this.state.apiUrl}${this.state.bookName}`;

    const settings = {
      method: 'GET'
    }

    fetch(url, settings)
      .then(response => {

        for(let i = 0; i < response.items.length; i++) {

          const bookUrl = `https://www.googleapis.com/books/v1/volumes/volumeId${response.items[i].id}`;

          const bookSettings = {
            method: 'GET'
          }

          fetch(bookUrl, bookSettings)
            .then(bookResponse => {
              this.state(books.push(bookResponse));
            })
            .catch(err => {
              this.setState({errorMessage: err});
            })
        }
      })
      .catch(err => {
        this.setState({errorMessage: err});
      })
  }

  render(){
    return(
      <div>
        {/* 
          Your code goes here
        */}
        <div>
          {this.state.form = () => {return (< BookForm/>)}}
        </div>
        <div>
          {this.state.books.map((book, index) => {
            return (<Book name = {book.title}
                          authors = {book.authors}
                          thumbnail = {book.thumbnail}
                          snippet = {book.snippet}/>)
          })}
        </div>
      </div>
    )
  }

}

export default App;
