const assert = require('node:assert')
const {
  test,
  after,
  beforeEach,
  describe,
  before,
} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

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

describe('a user cannot be added', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('a username without at least 3 character', async () => {
    const newUser = {
      username: 'te',
      name: 'User 1',
      password: 'test123',
    }

    await api.post('/api/users/').send(newUser).expect(400)
  })

  test('a password without at least 3 character', async () => {
    const newUser = {
      username: 'test_user',
      name: 'User 1',
      password: 'te',
    }

    await api.post('/api/users/').send(newUser).expect(400)
  })
})

test('a duplicate user cannot be added', async () => {
  const user1 = {
    username: 'testUser',
    name: 'User 1',
    password: 'test123',
  }

  await api.post('/api/users/').send(user1).expect(201)

  const duplicateUser = {
    username: 'testUser',
    name: 'User 2',
    password: 'test456',
  }

  await api
    .post('/api/users/')
    .send(duplicateUser)
    .expect(400)
})

describe('when a user is logged in', async () => {
  await User.deleteMany({})

  let token = null

  before(async () => {
    const newUser = {
      username: 'root',
      name: 'Test Test',
      password: 'root123',
    }

    await api.post('/api/users/').send(newUser)
    // await User.insertOne(newUser)

    const res = await api.post('/api/login/').send({
      username: newUser.username,
      password: newUser.password,
    })

    token = res.body.token
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
      .auth(token, { type: 'bearer' })
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

  test.only('when the likes property is missing, the value defaults to 0', async () => {
    const newBlog = {
      title: 'test blog 3',
      author: 'test author 3',
      url: 'test url 3',
    }

    const res = await api
      .post('/api/blogs')
      .auth(token, { type: 'bearer' })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    console.log('res', res.body)

    assert.strictEqual(res.body.likes, 0)
  })

  describe('a 400 status code is returned', () => {
    test('if the title is missing', async () => {
      const newBlog = {
        author: 'test author 3',
        url: 'test url 3',
        likes: 600,
      }

      await api
        .post('/api/blogs')
        .auth(token, { type: 'bearer' })
        .send(newBlog)
        .expect(400)
    })

    test('if the url is missing', async () => {
      const newBlog = {
        title: 'test title 3',
        author: 'test author 3',
        likes: 600,
      }

      await api
        .post('/api/blogs')
        .auth(token, { type: 'bearer' })
        .send(newBlog)
        .expect(400)
    })
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

test('a blog post can be updated', async () => {
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
