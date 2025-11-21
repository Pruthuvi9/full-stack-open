const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (
    authorization &&
    authorization.startsWith('Bearer ')
  ) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

// blogsRouter.get('', (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs)
//   })
// })

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  response.json(blogs)
})

// blogsRouter.post('/', (request, response) => {
//   const blog = new Blog(request.body)

//   blog.save().then((result) => {
//     response.status(201).json(result)
//   })
// })

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(
    getTokenFrom(request),
    process.env.SECRET
  )
  if (!decodedToken.id) {
    return response
      .status(401)
      .json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!body.title || !body.url) {
    return response.status(400).end()
  }

  // const users = await User.find({})

  // const selectedUser =
  //   users[Math.floor(Math.random() * users.length)]

  const blog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes,
    // user: selectedUser._id,
    user: user.id,
  })

  const savedBlog = await blog.save()
  // selectedUser.blogs = selectedUser.blogs.concat(
  //   savedBlog._id
  // )
  // await selectedUser.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  if (title != undefined) blog.title = title
  if (author != undefined) blog.author = author
  if (url != undefined) blog.url = url
  if (likes != undefined) blog.likes = likes

  const updatedBlog = await blog.save()
  response.json(updatedBlog)
})

module.exports = blogsRouter
