const { response } = require('express');
var express = require('express');
const Express = require('express');
const app = new Express();
app.use(Express.static(__dirname+'/public'));
var router = express.Router();
var productHelpers=require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
    console.log(products);
    res.render('admin/view-products',{admin:true,products});

  })
  
 });

router.get('/add-products',function(req,res){
  res.render('admin/add-products')
  
})
router.post('/add-products',(req,res)=>{
  console.log(req.body);
  console.log(req.files.Image);

  productHelpers.addProduct(req.body,(id)=>{
    let image=req.files.Image
    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render("admin/add-products")
      }else
        console.log(err);

    })
    
  })
})
router.get('/delete-product/:id',(req,res)=>{
  let proId=req.params.id
  console.log(proId)
  productHelpers.deleteProduct(proId).then((response)=>{
    res.redirect('/admin/')
  })

})
router.get('/edit-product/:id',async(req,res)=>{
  let product=await productHelpers.getProductDetails(req.params.id)
  console.log(product);
  res.render('admin/edit-product',{product})
})
router.post('/edit-product/:id',(req,res)=>{
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
    if(req.files.Image){
      let image=req.files.Image
      image.mv('./public/product-images/'+req.params.id+'.jpg')

    }
  })

})
router.get('/users', function(req, res, next) {
  productHelpers.getAllUsers().then((users)=>{
    res.render('admin/view-users',{admin:true,users});

  })
  
 });

 router.get('/orders', function(req, res, next) {
  productHelpers.getAllOrders().then((orders)=>{
    res.render('admin/all-orders',{admin:true,orders});

  })
  
 });

module.exports = router;
