const blogRouter = require('express').Router()
const Blog = require('../models/db')

blogRouter.get('/',(req, res)=>{
    Blog
        .find({})
        .then((blogs)=>{
            res.json(blogs)
        })
})

blogRouter.post('/',(req,res)=>{
    const body = req.body


    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    })



    blog
        .save()
        .then((result)=>{
            res.status(201).json(result)
        })
        .catch(err=>{
            console.error(err)
            res.json(err)
        })
})

module.exports = blogRouter