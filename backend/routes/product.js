const router = require('express').Router();

let Product = require('../models/product.model');

router.route('/').get((req, res) => {
  Product.find()
  .then(products => res.json(products))
  .catch(err => res.status(400).json('Error : ' + err));
});

router.route('/addReview').post((req,res)=>{
  var productId=Number(req.body.id)
  var newreview = {review:req.body.review}

  Product.findOne({id:productId},async function(err,object){
    object.reviews.push(newreview)
    await object.save()
    res.send(object.reviews)
    })
  })

router.route('/getReviews').post((req,res)=>{
  var productId=Number(req.body.id)

  Product.findOne({id:productId},async function(err,object){
    res.send(object.reviews)
  })
})

router.route('/getBooks').get((req, res) => {
  Product.find( {Category : "Books" })
  .then(products => res.json(products))
  .catch(err => res.status(400).json('Error : ' + err));
});

router.route('/getGames').get((req, res) => {
  Product.find( {Category : "Games" })
  .then(products => res.json(products))
  .catch(err => res.status(400).json('Error : ' + err));
});

router.route('/getProduct').post( (req,res) => {
  var productId = Number(req.body.id);

  Product.findOne({id:productId}, function(err, object){
    res.send(object);
  });

  // Product.findById(productId, function(err, object){
  //   console.log(object);
  //   res.send(object);
  //   });

  });

module.exports = router;
