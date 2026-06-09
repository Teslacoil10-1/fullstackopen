const blogRouter = require('express').Router()
const Blog = require('../models/db')

blogRouter.get('/', async (req, res)=>{
    try{
        const blogs = await Blog.find({})
        res.json(blogs)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: `internal server error ${err.message}`})
    }

})

blogRouter.post('/', async (req,res)=>{
    try{
    const body = req.body


    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    })


    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)

    } catch (err) {
        console.error(err)
            res.status(400).json({error: err.message})
    }
})

blogRouter.put('/:id', async (req, res) =>{
    try{
        const updatedItem = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true,
                runValidators:true,
                overwrite:true
            }
        )

        if (!updatedItem){
            return res.status(404).json({message : "item not found"})
        }
        res.status(200).json(updatedItem)
    } catch(err){
        console.error(err)
        res.status(400).json({error: err.message})
    }
})

module.exports = blogRouter