const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
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

after(async () => {
  await mongoose.connection.close()
})
