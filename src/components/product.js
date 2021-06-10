import React,{ useState,useEffect } from 'react'
import Axios from 'axios'
import './product.css'
import ReviewComp from './reviewcomponent'

export default function Product(props){
    const [finalinfo,setfinalinfo]=useState([])
    const [qty,setqty]=useState(1)
    const [review,setreview]=useState('')
    const [reviews,setreviews]=useState([])

    useEffect(function effect(){
      async function getArray(){
        const res = await Axios.post('http://localhost:5000/product/getReviews',{"id":props.match.params.id})
        await setreviews(res.data)
      }
      getArray()
    },[props.match.params.id])

    function reviewhandler(e){
      let body={ ...review }
      body=e.target.value
      setreview(body)
    }

    function qtyhandle(e){
      let quantity={ ...qty }
      quantity = e.target.value
      setqty(quantity)
    }

    const addReview=(e,review)=>{
      e.preventDefault()
          Axios.post('http://localhost:5000/product/addReview',{"id":props.match.params.id,"review":review})
          alert('Your review has been added!')
          window.location.reload(false)
    }

    const addToWishlist=()=>{
      Axios.get('http://localhost:5000/user/checkLogIn').then(res=>{
        if(res.data==='User is logged out'){
          alert('We need you to sign in to proceed to add to wishlist')
          window.location='/'
        }
        if(res.data==='User is logged in'){
          Axios.post('http://localhost:5000/user/addToWishlist',{"productId":props.match.params.id})
          window.location=`/wishlist`
        }
      })
    }

    const addToCart=(qty)=>{
      Axios.get('http://localhost:5000/user/checkLogIn').then(res=>{
        if(res.data==='User is logged out'){
          alert('We need you to sign in to proceed to add to cart')
          window.location='/'
        }
        else if(res.data==='User is logged in'){
          Axios({
            method: "POST",
            data: {productId : props.match.params.id,quantity:qty},
          url: "http://localhost:5000/user/addToCart"
          })
          window.location='/cart'
        }
      })
    };
    if(finalinfo.length===0){
    Axios.post('http://localhost:5000/product/getProduct',{"id":props.match.params.id})
    .then(res=>setfinalinfo(res.data))
    .catch()
    }
    return(
        <div>
            <br/>
            <div className="./product.css"></div>
            <a href={finalinfo.limgurl}><img className="img" src={finalinfo.limgurl} alt={finalinfo.title} align="left" height="600px" width="650px"/></a>
            <h5>{finalinfo.title}</h5>
            <p className="p">{finalinfo.ranking!==0&&'Ranking: '+finalinfo.ranking}</p>
            <p className="p">{finalinfo.model!==''&&'Model: '+finalinfo.model}</p>
            <p className="p">{finalinfo.genre!==''&&'Genre: '+finalinfo.genre}</p>
            <p className="p">Price: {finalinfo.price}</p>
            <p className="p">Brand: {finalinfo.brand}</p>
            <p className="p">{finalinfo.warranty!==''&&'Warranty: '+finalinfo.warranty}</p>
            <p className="p">{finalinfo.feature1}</p>
            <p className="p">{finalinfo.feature2}</p>
            <p className="p">{finalinfo.feature3}</p>
            <p>Availability: Available</p>
            <form>
            <label>Quantity:&nbsp; &nbsp;</label>
            <input onChange={qtyhandle} type="number" maxLength="2" min="1" max="20" value={qty} required></input>
            <button className="btn btn-primary" onClick={()=>addToCart(qty)} id="shift" >Add to cart</button>
            <br/>
            <br/>
            <button className="btn btn-primary" onClick={()=>addToWishlist()}>Add to wishlist</button>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            </form>
            
            <form className="container" onSubmit={(e)=>addReview(e,review)}>
            <h3>Reviews</h3>
            <input className="review" onChange={reviewhandler} type="text" value={review} required></input>
            <br/>
            <br/>
            <button className="btn btn-primary">Submit Review</button>
            </form>
            {reviews.length===0&&<p className="container">Unfortunately, there are no reviews for this product yet!</p>}
            <br/>
            {reviews.length!==0&&reviews.map(data=><ReviewComp key={data._id} review={data.review}/>)}
        </div>
    )
}