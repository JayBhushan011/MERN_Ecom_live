import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import './cartcomponent.css'
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './img_416864.ico'

export default function CartComp(props){
    const [finalinfo,setfinalinfo]=useState([])

    async function getArray(id){
        if(finalinfo.length===0){
        const res = await Axios.post('http://localhost:5000/product/getProduct',{"id":id})
        await setfinalinfo(res.data)
        }
}

function removeFromWishlist(id){
    Axios.post('http://localhost:5000/user/removeFromWishlist',{productId:id})
    window.location='/wishlist'
}

function wishlistToCart(id){
    Axios.post('http://localhost:5000/user/wishlistToCart',{productId:id})
    window.location='/wishlist'
}

getArray(props.id)
    return(
    <div>
        <div className="./cartcomponent.css"></div>
            <br/>
            <br/>
                    <div className="row">
                        <Link to={`/product/${props.id}`}><div className="small"><img className="width" height="100px" width="100px" src={finalinfo.simgurl} alt={finalinfo.title}/></div></Link>
                        <div className="min-30"><h5 className="width-1">{finalinfo.title}</h5></div>
                        <div className="min-9"><button onClick={()=>removeFromWishlist(props.id)} className="btn btn-secondary"><img  width="20px" src={logo} alt="R"></img></button></div>
                        <div className="min-9"><button onClick={()=>wishlistToCart(props.id)} className="btn btn-primary">Move to Cart</button></div>
                    </div>
    </div>
    )
}