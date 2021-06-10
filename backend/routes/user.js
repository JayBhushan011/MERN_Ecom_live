const router = require('express').Router();
let User = require('../models/user.model');
let Product = require('../models/product.model');

var user;
var existingCartItem = 0;
var existingCartItemTwo = 0;

var totalPrice = 0;

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].productId === obj) {
            return true;
        }
    }

    return false;
}

function containsObjectAndRemove(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].productId === obj) {
            existingCartItemTwo = i;
            return true;
        }
    }

    return false;
}

function containsObjectAndChanges(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].productId === obj) {
          existingCartItem = i;
            return true;
        }
    }

    return false;
}

async function givePriceOfProductAndCalculateTotal(id, quantity){
  Product.findOne({
    id:id
  }, await function(err, object){
    totalPrice = ( totalPrice + (object.price)*quantity )
    console.log(totalPrice);
  });
};

async function calculateTotalAmount(list){
  let i;
  var product;
  var quantity;

  for (i = 0; i<list.length; i++){
    product = parseInt( list[i].productId );
    quantity = parseInt(list[i].quantity);

    await givePriceOfProductAndCalculateTotal(product, quantity);

  }
  var totalAmount = totalPrice;
  console.log( "total" + totalAmount);
}

router.route('/getTotalAmount').get((req, res) => {
  console.log(" total hey" + totalPrice);
  User.findOne({
    googleId : user
  }, async function(err, object){
    await calculateTotalAmount(object.cart)
    console.log(" total hey" + totalPrice);
    res.send(object.cart)
    });

  });


router.route('/').get((req, res) => {
  User.findOne( {googleId : user} )
    .then((user) => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const googleId = req.body.googleId;
  const fName = req.body.fName;
  const email = req.body.email;
  const imgUrl = req.body.imgUrl;
  user = googleId;
  User.findOne({
    googleId: googleId
  }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {

      const newUser = new User({
        googleId,
        email,
        fName,
        imgUrl
      });
      newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    }
  });
  console.log(user);
});

router.route('/addAddress').post( (req,res) =>{
  var userGoogleId = user;
  var add1 = req.body.add1;
  var add2 = req.body.add2;
  var city = req.body.city;
  var state = req.body.state;
  var zcode = req.body.zcode;
  var mobile = req.body.mobile;
  var address = {add1: add1, add2: add2, city: city, state: state, zcode: zcode, mobile: mobile};

  User.findOne({
    googleId : userGoogleId
  }, async function(err, object){
    object.address = address;
    await object.save()
    .then(() => res.json('Address Added'))
    .catch(err => res.status(400).json('Error: ' + err));
    });
});

router.route('/getAddress').get( (req,res) =>{
  var userGoogleId = user;
  if (user === " " || typeof user == 'undefined'){
    //res.send("User is logged out");
  }
  else{
    //res.send("User is logged in");

  User.findOne({
    googleId : userGoogleId
  },function(err, object){
    res.send(object.address);
  });
}
});


router.route('/logout').get( (req,res) => {
  user = " ";
  console.log("user is" + user + "log out" );

});

router.route('/checkLogIn').get( (req,res) => {
  console.log("user is logged out " + user);
  if (user === " " || typeof user == 'undefined'){
    res.send("User is logged out");
  }
  else{
    res.send("User is logged in");
  }
})

router.route('/addToCart').post( (req,res) => {
  var userGoogleId = user;
  var productId = req.body.productId;
  var quantity = req.body.quantity;
  var newCartItem = {productId : productId, quantity: quantity};
  User.findOne({
    googleId : userGoogleId
  }, async function(err, object){
    if (containsObjectAndChanges(productId,object.cart)){
      quantity = parseInt(quantity)
      let oldQuantity = parseInt(object.cart[existingCartItem].quantity)
      let newQuantity = quantity + oldQuantity;
      console.log(quantity,oldQuantity, newQuantity);
      object.cart[existingCartItem].quantity = newQuantity.toString() ;
      object.save()
      .then(() => res.json('Already Existing Item, quantity increased' + object.cart[existingCartItem]))
      .catch(err => res.status(400).json('Error: ' + err));
      existingCartItem = 0;
    }
    else{
      object.cart.push(newCartItem);
      console.log(object);
      await object.save()
      .then(() => res.json('Added to cart!'))
      .catch(err => res.status(400).json('Error: ' + err));
    }


  });

    });

router.route('/removeFromCart').post( (req,res) => {
  var userGoogleId = user;
  var productId = req.body.productId;

  User.findOne({
    googleId : userGoogleId
  }, async function(err, object){
    if (containsObjectAndRemove(productId,object.cart)){
      console.log(existingCartItemTwo);
      object.cart.splice(existingCartItemTwo,1);
      object.save()
      .then(() => res.json("Removed from Cart"))
      .catch(err => res.status(400).json('Error: ' + err));
      existingCartItemTwo = 0;
    }
    else{
      res.send("Product not in cart");
    }


  });
});

router.route('/emptyCart').post( (req,res) => {
  var userGoogleId = user;
  var oldOrder;
  var oldCart;
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + '/' + mm + '/' + yyyy;

  User.findOne({
    googleId : userGoogleId
  }, async function(err, object){
      oldCart = object.cart;
      oldOrder = {orderDate: today, items: oldCart};
      //object.recentHistory = (object.recentHistory).concat(oldCart);
      object.recentHistory.push(oldOrder);
      //object.cart = [];
      console.log(object)
      object.save()
      .then(() => res.json("Cart emptied" + object))
      .catch(err => res.status(400).json('Error: ' + err));
  });
});

router.route("/userHistory").get( (req,res) => {
  var userGoogleId = user;

  if (user === " " || typeof user == 'undefined'){
    res.send("User is logged out. Please log in.");
  }
  else{
    User.findOne({
      googleId : userGoogleId
    }, function(err, object){
      res.send(object.recentHistory)
      });
  }
});

router.route('/cartToWishlist').post( (req,res) => {
  var userGoogleId = user;
  var productId = req.body.productId;

  User.findOne({
    googleId : userGoogleId
  }, async function(err, object){
    if (containsObjectAndRemove(productId,object.cart)){
      console.log(existingCartItemTwo);

      if (containsObject(productId,object.wishlist)){
        console.log("Already in wishlist");
      }
      else{object.wishlist.push({productId : productId});}
      object.cart.splice(existingCartItemTwo,1);
      object.save()
      .then(() => res.json("Removed from Cart and Moved to Wishlist"))
      .catch(err => res.status(400).json('Error: ' + err));
      existingCartItemTwo = 0;
    }
    else{
      res.send("Product not in cart");
    }


  });
});

router.route('/wishlistToCart').post( (req,res) => {
  var userGoogleId = user;
  var productId = req.body.productId;

  User.findOne({
    googleId : userGoogleId
  }, async function(err, object){
    if (containsObjectAndRemove(productId,object.wishlist)){
      console.log(existingCartItemTwo);

      if (containsObject(productId,object.cart)){
        console.log("Already in cart");
      }
      else{object.cart.push({productId : productId, quantity: "1"});}
      object.wishlist.splice(existingCartItemTwo,1);
      object.save()
      .then(() => res.json("Removed from Wishlist and Moved to Cart"))
      .catch(err => res.status(400).json('Error: ' + err));
      existingCartItemTwo = 0;
    }
    else{
      res.send("Product not in Wishlist");
    }


  });
});

router.route('/removeFromWishlist').post( (req,res) => {
  var userGoogleId = user;
  var productId = req.body.productId;

  User.findOne({
    googleId : userGoogleId
  }, async function(err, object){
    if (containsObjectAndRemove(productId,object.wishlist)){
      console.log(existingCartItemTwo);
      object.wishlist.splice(existingCartItemTwo,1);
      object.save()
      .then(() => res.json("Removed from Wishlist"))
      .catch(err => res.status(400).json('Error: ' + err));
      existingCartItemTwo = 0;
    }
    else{
      res.send("Product not in cart");
    }


  });
});


router.route("/userCart").get( (req,res) => {
  var userGoogleId = user;

  if (user === " " || typeof user == 'undefined'){
    res.send("User is logged out. Please log in.");
  }
  else{
    User.findOne({
      googleId : userGoogleId
    }, function(err, object){
      res.send(object.cart)
      });
  }
});

router.route('/addToWishlist').post( (req,res) =>{
  var userGoogleId = user;
  var productId = req.body.productId;
  var newWishListItem = {productId : productId};
  User.findOne({
    googleId : userGoogleId
  }, async function(err, object){
    if (containsObject(productId,object.wishlist)){
      res.send("Already in wishlist");
    }
    else{
    object.wishlist.push(newWishListItem);
    await object.save()
    .then(() => res.json('Added to WishList'))
    .catch(err => res.status(400).json('Error: ' + err));
    }});
});

router.route("/userWishList").get( (req,res) => {
  var userGoogleId = user;

  User.findOne({
    googleId : userGoogleId
  }, function(err, object){
    res.send(object.wishlist)
    });
});

module.exports = router;
