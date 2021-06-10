import React from 'react'
import Carous from './carousel'

export default function Feedback(){

    function handleSubmit(e){
        e.preventDefault()
        alert('Thank you for your feedback. We really appreciate it. We promise to make it a better experience for you next time you use JAS!')
        window.location = '/'
    }
    return(
        <div className="center">
            <title></title>
            <br/>
            <h2>Feedback</h2>
            <br/>
            <Carous/>
            <br/>
            <form onSubmit={handleSubmit}>
            <label>Do you have any suggestions to improve our website?</label>
            <br/>
            <br/>
            <input required className="textfield"></input>
            <br/>
            <br/>
            <label>Please leave your feedback below:</label>
            <br/>
            <br/>
            <input required className="textfield"></input>
            <br/>
            <br/>
            <h5 className="container">Please rest assured that Just A Second really values your feedback and we make sure that all your feedback is taken into account.</h5>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}