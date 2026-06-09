const { test, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app') 
const Blog = require('../models/db') 

const api = supertest(app)

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  }
]

describe('Blog API Endpoints', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })

  describe('GET /api/blogs', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, initialBlogs.length)
    })
  })

  describe('POST /api/blogs', () => {
    test('a valid blog can be added', async () => {
      const newBlog = {
        title: 'Async/await simplifies making async calls',
        author: 'Test Author',
        url: 'https://testurl.com',
        likes: 2
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      const titles = response.body.map(r => r.title)

      assert.strictEqual(response.body.length, initialBlogs.length + 1)
      assert(titles.includes('Async/await simplifies making async calls'))
    })

    test('if likes property is missing, it defaults to 0', async () => {
      const newBlogWithoutLikes = {
        title: 'Blog without likes',
        author: 'No Likes Author',
        url: 'https://nolikes.com'
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlogWithoutLikes)
        .expect(201)

      assert.strictEqual(response.body.likes, 0)
    })
  })

  describe('PUT /api/blogs/:id', () => {
    test('successfully updates an existing blog', async () => {
      const blogsAtStart = await api.get('/api/blogs')
      const blogToUpdate = blogsAtStart.body[0]

      const updatedData = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 10
      }

      const response = await api
        .put(`/api/blogs/${blogToUpdate._id}`) 
        .send(updatedData)
        .expect(200)

      assert.strictEqual(response.body.likes, blogToUpdate.likes + 10)
    })

    test('returns 404 if updating a non-existent blog', async () => {
      const validNonExistingId = '5a3d5da59070081a82a3445x'.replace('x', 'a') 
      
      const updatedData = {
        title: 'Does not exist',
        author: 'Ghost',
        url: 'https://ghost.com',
        likes: 1
      }

      await api
        .put(`/api/blogs/${validNonExistingId}`)
        .send(updatedData)
        .expect(404)
    })
  })
})