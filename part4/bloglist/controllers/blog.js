const blogRouter = require("express").Router();
const Blog = require("../models/db");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// helper function for removing the text before the jwt token (the bearer thing)
const getTokenFrom = (request) => {
    const authorization = request.get("authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
        return authorization.replace("Bearer ", "");
    }
    return null;
};

blogRouter.get("/", async (req, res) => {
    try {
        const blogs = await Blog
            .find({}).populate("blogs");
        response.json(blogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: `error ${err}` });
    }
});

blogRouter.post("/", async (req, res) => {
    try {
        const body = req.body;

        const token = getTokenFrom(req);

        const decodedToken = jwt.verify(token, process.env.SECRET);

        if (!decodedToken.id) {
            return res.status(401).json({ error: "token invalid" });
        }

        const user = await User.findById(decodedToken.id);

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: user.id,
        });

        const savedBlog = await blog.save();
        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();

        res.status(201).json(savedBlog);
    } catch (err) {
        console.error(err);
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "invalid token" });
        }
        res.status(400).json({ error: err.message });
    }
});
blogRouter.put("/:id", async (req, res) => {
    try {
        const updatedItem = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
                overwrite: true,
            },
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "item not found" });
        }
        res.status(200).json(updatedItem);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
});

module.exports = blogRouter;
