let monogodb=require('mongodb')

let getdb=require('../util/database').getdb

class Product{
  
  constructor(title,price,description,imageUrl,_id,user_id){
   this.title=title;
   this.price=price;
   this.description=description;
   this.imageUrl=imageUrl
  this._id=_id;
  this.user_id=user_id;
  
  }
 
 
  save(){
    let db=getdb()
   if(this._id){
     return db.collection('products').updateOne({_id:monogodb.ObjectId(this._id)},{$set:this})
   }else{
    return db.collection('products').insertOne(this)
   }

    
  }
 static fetchAll(){
    let db=getdb()
    return  db.collection('products').find().toArray().then(products=>{
      console.log(typeof (products[0]._id))
       return products
    })
    .catch(err=>console.log(err))
  }

static findById(prodId){
let db=getdb()
return db.collection('products').find({_id:new monogodb.ObjectID(prodId)}).next().then((product)=>{
  console.log(product)
  return product
})
.catch(err=>console.log(err))
}
static delete(prodId){
let db=getdb()
let ObjectID=new monogodb.ObjectId(prodId)
return db.collection('products').deleteOne({_id:ObjectID})  
}

  
}
module.exports=Product