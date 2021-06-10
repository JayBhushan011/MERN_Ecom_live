import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/navbar"
import HomePage from "./components/home-page"
import Games from "./components/games"
import Books from "./components/books"
import Product from "./components/product"
import Cart from "./components/cart"
import Profile from "./components/profile"
import Checkout from "./components/checkout"
import Credit from "./components/credit"
import Debit from "./components/debit"
import Net from "./components/net"
import EditProfile from "./components/editprofile"
import Wishlist from './components/wishlist'
import CNCS from './components/cncs'
import Feedback from './components/feedback'
import History from './components/history'
function App() {
 return (
   <Router>
    <NavBar/>
    <Route path="/" exact component={HomePage}/>
    <Route path="/games" exact component={Games}/>
    <Route path="/books" exact component={Books}/>
    <Route path="/product/:id" component={Product}/>
    <Route path="/cart" exact component={Cart}/>
    <Route path="/wishlist" component={Wishlist}/>
    <Route path="/profile" exact component={Profile}/>
    <Route path="/checkout" component={Checkout}/>
    <Route path="/credit" component={Credit}/>
    <Route path="/debit" component={Debit}/>
    <Route path="/net" component={Net}/>
    <Route path="/editprofile" exact component={EditProfile}/>
    <Route path="/cncs" exact component={CNCS}/>
    <Route path="/feedback" exact component={Feedback}/>
    <Route path="/history" exact component={History}/>
   </Router>
 );
}

export default App;
