import React, { Component } from 'react'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import BookComp from './scomponent'
import BookData from './bookdata'

export default class Books extends Component {
  constructor(props){
    super(props)
    this.onChangebook=this.onChangebook.bind(this)
    this.state={searchbook:''}
}
  onChangebook(e){
    this.setState({searchbook:e.target.value})
    }
  render() {
    const {searchbook} = this.state
    const filteredBooks=BookData.filter(book=>{return book.title.toLocaleLowerCase().indexOf(searchbook.toLocaleLowerCase())!==-1 || book.brand.toLocaleLowerCase().indexOf(searchbook.toLocaleLowerCase())!==-1})

    return (
      <div>
        <br/>
        <br/>
        <div className="form-group">
                <input onChange={this.onChangebook} value={this.state.searchbook} className="container form-control" type="search" placeholder="Search books and brand"/>
                {filteredBooks.map(book=><BookComp key={book.id} title={book.title} brand={book.brand} age={book.age} genre={book.genre} simgurl={book.simgurl} limgurl={book.limgurl} price={book.price} id={book.id}/>)}
        </div>
      </div>
    )
  }
}