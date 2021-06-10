import React, { useEffect, useState } from 'react'
import Axios from 'axios'

export default function Net(props){
    const [cart,setcart] = useState([])
    function handleClick(e){
        e.preventDefault()
        alert('You will shortly be taken to the payment gateway. Please wait')
        alert('Your payment has been successful. We truly appreciate your trust with Just A Second. Your order id is ORDIN93784995')
        Axios.post('http://localhost:5000/user/emptyCart')
        //window.location='/'
    }
    useEffect(function effect(){
        async function wait(){
            const res = await Axios.get('http://localhost:5000/user/userCart')
            await setcart(res.data)
            await console.log(cart)
            await cart.map(item=>Axios.post('http://localhost:5000/user/orderHistory',{"productId":item.productId}))
            }
            wait()
    },[])
    return(
        <div className="container">
            <br/>
            <br/>
            <h3>Net Banking Details</h3>
            <br/>
            <form onSubmit={handleClick}>
                <label>Name of the bank *</label>
                <input required type="text" maxLength="35" className="form-control" placeholder="Hong Kong and Shanghai Banking Corporation"/>
                <label>IFSC Code *</label>
                <input required type="text" maxLength="11" className="form-control" placeholder="HSBC1111111"/>
                <label>Account Number *</label>
                <input required type="number" maxLength="16" className="form-control" placeholder="1111 1111 1111 1111"/>
                <br/>
                <br/>
                <button type="submit" className="btn btn-primary">Pay</button>
            </form>
        </div>
    )
} 