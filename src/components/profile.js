import React,{ Component } from 'react'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import Axios from 'axios'
import './profile.css'

export default class Profile extends Component{
    constructor(props){
        super(props)
        this.onChangeAddress1=this.onChangeAddress1.bind(this)
        this.onChangeAddress2=this.onChangeAddress2.bind(this)
        this.onChangeCity=this.onChangeCity.bind(this)
        this.onChangeState=this.onChangeState.bind(this)
        this.onChangeZCode=this.onChangeZCode.bind(this)
        this.onChangeMobile=this.onChangeMobile.bind(this)

        this.onSubmit=this.onSubmit.bind(this)

        this.state={zcode:0,add1:'',add2:'',city:'',state:null,mobile:0,profile:[],address:[]}

      }
      componentDidMount(){
        Axios.get('http://localhost:5000/user').then(res=>this.setState({profile:res.data}))
      }
    onChangeZCode(e){
      this.setState({zcode:e.target.value})
    }

    onChangeAddress1(e){
      this.setState({add1:e.target.value})
    }

    onChangeAddress2(e){
      this.setState({add2:e.target.value})
    }

    onChangeCity(e){
      this.setState({city:e.target.value})
    }

    onChangeState(e){
      this.setState({state:e.target.value})
    }

    onChangeMobile(e){
      this.setState({mobile:e.target.value})
    }

      async onSubmit(e) {
        e.preventDefault()
        const address={add1:this.state.add1,add2:this.state.add2,city:this.state.city,state:this.state.state,zcode:this.state.zcode,mobile:this.state.mobile}
        Axios.post('http://localhost:5000/user/addAddress',address)
        const res = await Axios.get('http://localhost:5000/user/getAddress')
        await this.setState({address:res.data})
        await alert('Your delivery address has been set. Please note that all the deliveries will be made to this address, unless you edit it. Thank you!')
      }
    render(){
        return(
            <div className="container">
                <div className="./profile.css"></div>
                <br/>
                <br/>
                <h2 className="center">Profile</h2>
                <br/>
                <br/>
                <br/>
                <img className="img" src={this.state.profile.imgUrl} alt={this.state.profile.fName} height="70px"/>
                <br/>
                <h4 className="center">{this.state.profile.fName}</h4>
                <br/>
                <h5>Delivery Address:</h5>
              <br/>
              <form onSubmit={this.onSubmit}>
              <div class="form-group">
    <label for="inputAddress">Address *</label>
    <input required type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"  value={this.state.add1} onChange={this.onChangeAddress1}/>
  </div>
  <div class="form-group">
    <label for="inputAddress2">Address 2 *</label>
    <input required type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"  value={this.state.add2} onChange={this.onChangeAddress2}/>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity">City *</label>
      <input required type="text" class="form-control" id="inputCity"  value={this.state.city} onChange={this.onChangeCity} maxlength="30"/>
    </div>
    <div class="form-group col-md-6">
      <label for="inputState">State *</label>
      <select required id="inputState" class="form-control"  value={this.state.state} onChange={this.onChangeState}>
        <option selected>Choose..</option>
        <option value="Andhra Pradesh">Andhra Pradesh</option>
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
    </div>
    <div className="form-row">
    <div class="form-group col-md-6">
      <label for="inputZip">Zipcode *</label>
      <input required type="number" class="form-control" maxlength="6" min="0" id="inputZip" value={this.state.zcode} onChange={this.onChangeZCode} />
    </div>
    <div class="form-group col-md-6">
      <label for="inputMobile">Mobile Number *</label>
      <input required type="number" className="form-control" id="inputMobile" maxlength="10" min="0" value={this.state.mobile} onChange={this.onChangeMobile} />
    </div>
    </div>
    <br/>
  <button type="submit" value="submit" className="btn btn-primary">Submit</button>
    </form>
    <br/>
    <br/>
            </div>
        )
    }
}
