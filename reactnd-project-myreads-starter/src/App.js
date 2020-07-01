import React from 'react';
import * as BooksAPI from './BooksAPI';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import  HomePage  from './pages/home';
import  SearchPage from './pages/search';

class BooksApp extends React.Component {
  state = {
    shelves: {
      currentlyReading : [],
      wantToRead : [],
      read : [],
    },
    searched : [],
  }


  searchBook = ( value ) => {
    console.log('searchBook', value)
  };

  handleModify = (book, value)=>{
    BooksAPI.update( book, value).then(
        res => {
          debugger;
          let removedShelf = this.state.shelves[book.shelf];
          let removeIndx = removedShelf.indexOf(book);
          removedShelf.splice(removeIndx, 1);
          this.setState ({
            shelves :{
              ...this.state.shelves,
              [book.shelf] : [...removedShelf],
              [value] : [...this.state.shelves[value], book]
            }
           })
        }
    )
        console.log('ModifyShelf',book ,value )
  }

  componentDidMount(){
   const booksResponse = BooksAPI.getAll();
   booksResponse.then(res=> {
    let _shelves = {currentlyReading : [], wantToRead : [], read : []};
     res.forEach( book=> {
        _shelves[book.shelf].push(book)
      }
    );
    this.setState ({
      shelves :{
        ..._shelves
      }
     })
   });
  }


  render() {
    return (
      <Router>
      <div className="app">
            <Switch>
              <Route path="/search">
                <SearchPage search={this.searchBook}/>
              </Route>
              <Route path="/">
                <HomePage 
                shelves = {this.state.shelves}
                modify ={this.handleModify}
                />
              </Route>
            </Switch>
            <div className="open-search">
              <Link to='search'>
                <button>Add a book</button>
              </Link>
            </div>
            </div>
        </Router>
    )
  }
}

export default BooksApp
