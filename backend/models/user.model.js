const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const userSchema = new Schema ({
  googleId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  fName: {
    type: String,
    required: true,
  },
  imgUrl: { type: String, default: ' ' },
  address:
    {
    add1: {type: String,
    default: ' '},
    add2: {type: String,
    default: ' '},
    city: {type: String,
    default: ' '},
    state: {type: String,
    default: ' '},
    zcode: {type: String,
    default: ' '},
    mobile: {type: String,
    default: ' '}
  },
  wishlist: [ {
    productId:{type:String, default:' '}
  }
],
  cart: [
    {
    productId: {type: String,
    default: ' '},
    quantity: {type: String,
    default: ' '}
  }
],
recentHistory: [{
  orderDate: {type:String, default: ' '},
  items : [{
productId:{type: String,
  default: ' '},
quantity: {type: String,
  default: ' '}
}]
}]
},
{
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
