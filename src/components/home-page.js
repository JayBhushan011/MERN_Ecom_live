import React, { Component } from 'react'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import Carousel from "./carousel"
import GameComp from './scomponent'
import Axios from 'axios'

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state={finalbookinfo:[],finalgameinfo:[]}
  }
  componentDidMount(){
    Axios.get('http://localhost:5000/product/getGames').then(res=>this.setState({finalgameinfo:res.data}))
    Axios.get('http://localhost:5000/product/getBooks').then(res=>this.setState({finalbookinfo:res.data}))
  }
  render() {
    return (
      <div>
        <Carousel/>
        <h2 className="center">About Us</h2>
        <p className="width">jas.in is operated by Just A Second ecommerce Private Limited. A technology company based out of New Delhi and has offices in Kolkata, Mumbai, Bangalore and Chennai. Our mission is to give people the most convenient, easy and secure shopping experience on the web for buying books and games. jas.in has been noted as India's fastest growing retailer and currently has a catalogue of over 1 million books and one hundred thousand games. jas.in is a team of experienced professionals from diverse backgrounds working together to full-fill 3 main objectives, namely, lowe prices, vast catalogue selection and safe payment and delivery system. jas.in has 50,000 happy customers and the number is growing.</p>
        <h4 className="container">Games</h4>
        {this.state.finalbookinfo.length===0&&<h1>Loading ...</h1>}
        {this.state.finalgameinfo.length!==0&& this.state.finalgameinfo.map(game=><GameComp key={game.id} title={game.title} brand={game.brand} age={game.age} genre={game.genre} simgurl={game.simgurl} limgurl={game.limgurl} id={game.id} price={game.price}/>)}
        <h4 className="container">Books</h4>
        {this.state.finalgameinfo.length===0&&<h1>Loading ...</h1>}
        {this.state.finalbookinfo.length!==0&& this.state.finalbookinfo.map(book=><GameComp key={book.id} title={book.title} brand={book.brand} simgurl={book.simgurl} limgurl={book.limgurl} id={book.id} price={book.price}/>)}
      </div>
      
    )
  }
}