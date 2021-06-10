import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import CartComp from './cartcomponent'

export default function Cart(props){
    const [finalinfo,setfinalinfo]=useState([])
    const [add,setadd]=useState([])

    useEffect(function effect(){
        async function getArray(){
            const res = await Axios.get('http://localhost:5000/user/userHistory')
            await setfinalinfo(res.data)

            const address = await Axios.get('http://localhost:5000/user/getAddress')
            await setadd(address.data)
        }
        getArray()
    },[])

    const checkAddress=()=>{
            window.location=`/`
        }
    return(
        <div>

            <h1 className="container">User Shopping History</h1>

            {finalinfo.length!==0&&finalinfo.map
              (x => x.items.map(
              data=>
              <CartComp key={data.productId} qty={data.quantity} id={data.productId} orderDate = {x.orderDate}/>))}
            <div className="container">
            {finalinfo.length===0&&<h4>You haven't placed any orders yet!</h4>}
            {finalinfo.length!==0&&<Link to={`/checkout`}>< button onClick={()=>checkAddress()} className="btn btn-primary">Home</button></Link>}
            <br/>
            <br/>
            <Link to="/wishlist"><button className="btn btn-primary">Wishlist</button></Link>
            </div>
        </div>
    )
}