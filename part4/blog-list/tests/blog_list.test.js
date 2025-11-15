const assert = require('node:assert')
const {
  test,
  after,
  beforeEach,
  describe,
} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(
    response.body.length,
    helper.initialBlogs.length
  )
})

test('blog objects contain a property called id, not _id', async () => {
  const response = await api.get('/api/blogs')

  assert(response.body[0].hasOwnProperty('id'))
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'test blog 3',
    author: 'test author 3',
    url: 'test url 3',
    likes: 300,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(
    blogsAtEnd.length,
    helper.initialBlogs.length + 1
  )

  const blogTitles = blogsAtEnd.map((blog) => blog.title)
  assert(blogTitles.includes('test blog 3'))
})

test('when the likes property is missing, the value defaults to 0', async () => {
  const newBlog = {
    title: 'test blog 3',
    author: 'test author 3',
    url: 'test url 3',
  }

  const res = await api.post('/api/blogs').send(newBlog)

  assert.strictEqual(res.body.likes, 0)
})

describe('a 400 status code is returned', () => {
  test('if the title is missing', async () => {
    const newBlog = {
      author: 'test author 3',
      url: 'test url 3',
      likes: 600,
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
  })

  test('if the url is missing', async () => {
    const newBlog = {
      title: 'test title 3',
      author: 'test author 3',
      likes: 600,
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
  })
})

test('a blog post can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(
    blogsAtEnd.length,
    helper.initialBlogs.length - 1
  )
})

test.only('a blog post can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const newLikes = { likes: 2000 }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newLikes)
    .expect(200)

  const updatedBlog = await api.get(
    `/api/blogs/${blogToUpdate.id}`
  )

  assert.strictEqual(updatedBlog.body.likes, 2000)
})

after(async () => {
  await mongoose.connection.close()
})
