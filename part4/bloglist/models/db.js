const mongoose = require('mongoose')
const config = require('../config/config')


mongoose.set('strictQuery', false)

mongoose.connect(config.MONGOURL,{family : 4}).then(
    ()=> console.log("connected to db"))
    .catch(err =>{
        console.error(err)
    })


const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema) 

