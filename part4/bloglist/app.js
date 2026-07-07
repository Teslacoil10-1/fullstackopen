const express = require('express')
const blogRouter = require('./controllers/blog')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const app = express()


app.use(express.json())
app.use('/api/blogs', blogRouter)
app.user('/api/login', loginRouter)
app.use('/api/users', usersRouter)

module.exports = app