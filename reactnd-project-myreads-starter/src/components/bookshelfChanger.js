import React from 'react';
import * as BooksAPI from '../BooksAPI';
import '../App.css';

class BookshelfChanger extends React.Component {
        constructor(props) {
        super(props);
    }
    //   handleChange = (e)=>{
    //     BooksAPI.update( this.props.book, e.target.value).then(
    //         res => console.log('res',res)
    //     )
    //         console.log('ModifyShelf', e.target.value )
    // }
        render(){
        return (
            <div className="book-shelf-changer">
            <select value={this.props.book.shelf} onChange={(e)=>this.props.modify(this.props.book, e.target.value)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div> 
        )
    }
}

export default BookshelfChanger;