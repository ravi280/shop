let mongodb=require('mongodb')
let mongoconnect=mongodb.MongoClient


let _db;

let mongo=(callback)=>{
  mongoconnect.connect
  ('mongodb+srv://ravi:9505844574@cluster0-fw1rl.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true })
  .then((client)=>{
    console.log('connected')
    _db=client.db('fighters')
    callback()
  })
  .catch(err=>{
    console.log(err)
    throw err
  })
  
}


let getdb=()=>{
  if(_db){
    return _db
  }

}




module.exports={
  mongo:mongo,
  getdb:getdb
}