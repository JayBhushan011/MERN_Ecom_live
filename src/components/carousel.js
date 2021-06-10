import React, { Component } from 'react'
import { Carousel } from 'react-responsive-carousel'//https://codesandbox.io/s/lp602ljjj7?file=/src/Carousel.js:155-2128

export default class Carous extends Component{
    render(){
        return(
    <Carousel infiniteLoop useKeyboardArrows autoPlay>
        <div>
            <img alt="img" src="https://static-ssl.businessinsider.com/image/5dc5be5f7eece5482f5519c3-1326/screen%20shot%202019-11-08%20at%2021237%20pm.jp2"/>
        </div>
        <div>
            <img alt="img" src="https://i.guim.co.uk/img/media/a622e9f4dba509e28d2e38bb7269dfa13acdea77/0_0_2560_1536/master/2560.jpg?width=700&quality=85&auto=format&fit=max&s=abffcb239e10f90b91d0173136e89ca4"/>
        </div>
        <div>
            <img alt="img" src="https://miro.medium.com/max/3840/1*LBCnp66WqU0TYQlq7tIrBw.png"/>
        </div>
        <div>
            <img alt="img" src="https://www.bloglet.com/wp-content/uploads/ngg_featured/the-worlds-most-popular-books.jpg"/>
        </div>
    </Carousel>)
}
}