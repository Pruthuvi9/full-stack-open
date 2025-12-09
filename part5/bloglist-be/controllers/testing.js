const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

router.post('/addMany', async (request, response) => {
  const user = await User.findOne()
  await Blog.insertMany([
    {
      title: 'blog with 200 likes',
      author: 'author 200',
      url: 'url 200',
      likes: 200,
      user: user._id,
    },
    {
      title: 'blog with 100 likes',
      author: 'author 100',
      url: 'url 100',
      likes: 100,
      user: user._id,
    },
    {
      title: 'blog with 500 likes',
      author: 'author 500',
      url: 'url 500',
      likes: 500,
      user: user._id,
    },
    {
      title: 'blog with 300 likes',
      author: 'author 300',
      url: 'url 300',
      likes: 300,
      user: user._id,
    },
    {
      title: 'blog with 400 likes',
      author: 'author 400',
      url: 'url 400',
      likes: 400,
      user: user._id,
    },
  ])

  response.status(202).end()
})

module.exports = router
