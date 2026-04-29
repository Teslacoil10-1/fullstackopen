const mongoose = require('mongoose')
const config = require('../config/config')


mongoose.set('strictQuery', false)

mongoose.connect(config.MONGOURL,{family : 4}).then(
    ()=> console.log("connected to db"))
    .catch(err =>{
        console.error(err)
    })


const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})


module.exports = mongoose.model('Blog', blogSchema) 

