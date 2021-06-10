import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import './scomponent.css'

export default function HistoryComp(props){
    const [finalinfo,setfinalinfo]=useState([])
    async function getArray(id){
        if(finalinfo.length===0){
            const res = await Axios.post('http://localhost:5000/product/getProduct',{"id":id})
            await setfinalinfo(res.data)
    }
}
    getArray(props.id)
    return(
        <div>
            <div className="./scomponent.css"></div>
            <div className="container arrange">
              <Link to={`/product/${props.id}`}>
                <button className="button">
                <img src={finalinfo.simgurl} alt={finalinfo.title} height="200px" width="200px"/>
                <br/>
                <h5>{finalinfo.title}</h5>
                <h6>{finalinfo.brand}</h6>
                <h6>{finalinfo.age}</h6>
                <h6>{finalinfo.genre}</h6>
                <h5>$ {finalinfo.price}</h5>
                </button>
                </Link>
            </div>
        </div>
    )
}