let getdb=require('../util/database').getdb
let mongodb=require('mongodb')
class Users{
  constructor(name,email,cart,_id){
this.name=name
this.email=email;
this.cart=cart,
this._id=_id
}
save(){
let db=getdb()
return db.collection('users').insertOne(this)
}
 postCarts(product){
let db=getdb()



let itemIndex=this.cart.items.findIndex((p)=>{
   console.log(typeof(p.productId),"product")
   console.log(typeof(product._id),"pitems") 
  return p.productId.toString()===product._id.toString()
})

console.log(itemIndex)
//let Updatedcart={items:[{productId:product._id,quantity:1}]}
//db.collection('users').updateOne({_id:mongodb.ObjectId(this._id)},{$set:{cart:Updatedcart}})

let cart3=[...this.cart.items]
let newQuantity=1;
if(itemIndex >= 0){
  console.log('old updated')
     newQuantity   =this.cart.items[itemIndex].quantity+1;
cart3[itemIndex].quantity=newQuantity;
}else{
  console.log('new')
  cart3.push({productId:new mongodb.ObjectID(product._id),quantity:newQuantity})
}


let Updatedcart={
  items:cart3
}


 db.collection('users').updateOne({_id:mongodb.ObjectId(this._id)},{$set:{cart:Updatedcart}})
 

}




  










getCarts(){
  let db=getdb()
let prodId=this.cart.items.map(i=>{
  return i.productId
})
 return  db.collection('products').find({_id:{$in:prodId}}).toArray().then(products=>{
    return products.map((p)=>{
         return {...p,quantity:this.cart.items.find((item)=>{
           return     item.productId.toString()===p._id.toString()
         }
         ).quantity
        
        }
     })
       
   
  })
}
postOrders(){
  let db=getdb()
   return this.getCarts().then((products)=>{
 let order={
   items:products,
   user:{
    _id:mongodb.ObjectID(this._id),
    name:this.name,
    email:this.email
   }
  
 }
 return db.collection('order').insertOne(order).then((result)=>{
  this.cart={items:[]}
return db.collection('users').updateOne({_id:mongodb.ObjectID(this._id)},{$set:{cart:{items:[]}}})  


    })
      })
  
    }  

    getOrders(){
      let db=getdb()
     return db.collection('orders').find({'user._id':mongodb.ObjectID(this._id)}).toArray().then(re=>{
       
       return re;
     })
    }



static findById(prodId){
let db=getdb()
let ObjectId=mongodb.ObjectID(prodId)
return db.collection('users').find({_id:ObjectId}).next()
}
deleteCartItem(prodId){
  let updatedcart=this.cart.items.filter((i)=>{
   return  i.productId.toString()!==prodId.toString()
  })
  let db=getdb()
return db.collection('users').updateOne({_id:mongodb.ObjectId(this._id)},{$set:{cart:{items:updatedcart}}});

}

}
module.exports=Users