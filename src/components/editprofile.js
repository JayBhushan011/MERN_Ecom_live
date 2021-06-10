import React, { Component } from 'react'
import Axios from 'axios'

export default class EditProfile extends Component{
    constructor(props){
        super(props)
        this.state={address:[],profile:[],editadd1:'',editadd2:'',editcity:'',editstate:'',editmobile:'',editzcode:''}
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleSubmit(e){
        e.preventDefault()
        const editaddress = {add1:this.state.editadd1,add2:this.state.editadd2,city:this.state.editcity,state:this.state.editstate,zcode:this.state.editzcode,mobile:this.state.editmobile}
        Axios.post('http://localhost:5000/user/addAddress',editaddress)
        alert('Your delivery address has been updated')
        window.location="/"
    }
    componentDidMount(){
        Axios.get('http://localhost:5000/user/getAddress')
        .then(res=>{
            this.setState({address:res.data})
        })

        Axios.get('http://localhost:5000/user')
        .then(res=>this.setState({profile:res.data}))
    }
    render(){
        return(
            <div className="container">
                <div className="./profile.css"></div>
                <br/>
                <br/>
                <img className="img" src={this.state.profile.imgUrl} alt={this.state.profile.fName} height="70px"/>
                <br/>
                <h4 className="center">Welcome, {this.state.profile.fName}</h4>
                <br/>
                <h3 className="center">Edit your delivery address</h3>
                <br/>
                <form onSubmit={this.handleSubmit}>
                <label>Address *</label>
                <input type="text" value={this.state.editadd1} placeholder={this.state.address.add1} required className="form-control" onChange={(e)=>{this.setState({editadd1:e.target.value})}}></input>
                <label>Address 2 *</label>
                <input type="text" required value={this.state.editadd2} placeholder={this.state.address.add2} className="form-control" onChange={(e)=>{this.setState({editadd2:e.target.value})}}></input>
    <div className="form-row">
      <div class="form-group col-md-6">
      <label for="inputState">State *</label>
      <select required id="inputState" class="form-control"  value={this.state.editstate} onChange={(e)=>{this.setState({editstate:e.target.value})}}>
        <option selected value="Andhra Pradesh">Andhra Pradesh</option>
<option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
<option value="Arunachal Pradesh">Arunachal Pradesh</option>
<option value="Assam">Assam</option>
<option value="Bihar">Bihar</option>
<option value="Chandigarh">Chandigarh</option>
<option value="Chhattisgarh">Chhattisgarh</option>
<option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
<option value="Daman and Diu">Daman and Diu</option>
<option value="Delhi">Delhi</option>
<option value="Lakshadweep">Lakshadweep</option>
<option value="Puducherry">Puducherry</option>
<option value="Goa">Goa</option>
<option value="Gujarat">Gujarat</option>
<option value="Haryana">Haryana</option>
<option value="Himachal Pradesh">Himachal Pradesh</option>
<option value="Jammu and Kashmir">Jammu and Kashmir</option>
<option value="Jharkhand">Jharkhand</option>
<option value="Karnataka">Karnataka</option>
<option value="Kerala">Kerala</option>
<option value="Madhya Pradesh">Madhya Pradesh</option>
<option value="Maharashtra">Maharashtra</option>
<option value="Manipur">Manipur</option>
<option value="Meghalaya">Meghalaya</option>
<option value="Mizoram">Mizoram</option>
<option value="Nagaland">Nagaland</option>
<option value="Odisha">Odisha</option>
<option value="Punjab">Punjab</option>
<option value="Rajasthan">Rajasthan</option>
<option value="Sikkim">Sikkim</option>
<option value="Tamil Nadu">Tamil Nadu</option>
<option value="Telangana">Telangana</option>
<option value="Tripura">Tripura</option>
<option value="Uttar Pradesh">Uttar Pradesh</option>
<option value="Uttarakhand">Uttarakhand</option>
<option value="West Bengal">West Bengal</option>
      </select>
    </div>
    <div className="form-group col-md-6">
                <label>City *</label>
                <input type="text" required value={this.state.editcity} placeholder={this.state.address.city} className="form-control" onChange={(e)=>{this.setState({editcity:e.target.value})}}></input>
                </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                <label>Zip Code *</label>
                <input type="text" required value={this.state.editzcode} placeholder={this.state.address.zcode} className="form-control" onChange={(e)=>{this.setState({editzcode:e.target.value})}}></input>
                </div>
                <div className="form-group col-md-6">
                <label>Mobile Number *</label>
                <input type="text" required value={this.state.editmobile} placeholder={this.state.address.mobile} className="form-control" onChange={(e)=>{this.setState({editmobile:e.target.value})}}></input>
                </div>
                </div>
                <br/>
                <button type="submit" className="btn btn-primary" >Edit</button>
                <br/>
                </form>
            </div>
        )
    }
}