import React from 'react'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Link } from 'react-router-dom'
import './scomponent.css' 
export default function Comp(props){
    return(
        <div>
            <div className="./scomponent.css"></div>
            <div className="container arrange">
              <Link to={`/product/${props.id}`}>
                <button className="button">
                <img src={props.simgurl} alt={props.title} height="200px" width="200px"/>
                <br/>
                <h5>{props.title}</h5>
                <h6>{props.brand}</h6>
                <h6>{props.age}</h6>
                <h6>{props.genre}</h6>
                <h5>$ {props.price}</h5>
                </button>
                </Link>
            </div>
        </div>
    )
    }