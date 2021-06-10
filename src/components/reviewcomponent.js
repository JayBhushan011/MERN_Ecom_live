import React from 'react'
import './product.css'

export default function ReviewComp(props){
    return(<div>
        <div className="./product.css"></div>
        <p className="review container"><b>Review: </b>{props.review}</p>
           </div>)
}