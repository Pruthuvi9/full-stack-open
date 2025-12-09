const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

// const getTokenFrom = (request) => {
//   const authorization = request.get('authorization')
//   if (
//     authorization &&
//     authorization.startsWith('Bearer ')
//   ) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

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

blogsRouter.post(
  '/',
  middleware.userExtractor,
  async (request, response) => {
    const body = request.body

    if (!body.title || !body.url) {
      return response.status(400).end()
    }

    // const decodedToken = jwt.verify(
    //   // getTokenFrom(request),
    //   request.token,
    //   process.env.SECRET
    // )

    // if (!decodedToken.id) {
    //   return response
    //     .status(401)
    //     .json({ error: 'token invalid' })
    // }

    // const user = await User.findById(decodedToken.id)
    const user = await User.findById(request.user)
    // const users = await User.find({})

    // const selectedUser =
    //   users[Math.floor(Math.random() * users.length)]
    if (user) {
      const blog = new Blog({
        title: body.title,
        url: body.url,
        author: body.author,
        likes: body.likes,
        // user: selectedUser._id,
        user: user._id,
      })

      const savedBlog = await blog.save()
      // selectedUser.blogs = selectedUser.blogs.concat(
      //   savedBlog._id
      // )
      // await selectedUser.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()

      return response.status(201).json(savedBlog)
    }

    return response
      .status(404)
      .json({ error: 'user not found' })
  }
)

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const blogId = request.params.id

    const blog = await Blog.findById(blogId)

    if (!blog) {
      return response
        .status(404)
        .json({ error: 'blog not found' })
    }

    // const decodedToken = jwt.verify(
    //   request.token,
    //   process.env.SECRET
    // )

    // if (!decodedToken.id) {
    //   return response
    //     .status(401)
    //     .json({ error: 'token invalid' })
    // }

    // const user = await User.findById(decodedToken.id)
    const user = await User.findById(request.user)

    if (user._id.toString() !== blog.user.toString()) {
      return response
        .status(401)
        .json({ error: 'unauthorised user' })
    } else {
      await Blog.findByIdAndDelete(blogId)
      user.blogs = user.blogs.filter(
        (blog) => blog.id !== blogId
      )
      await user.save()

      return response.status(204).end()
    }
  }
)

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
  // if (user != undefined) blog.user = user

  const updatedBlog = await blog.save()
  response.json(updatedBlog)
})

module.exports = blogsRouter
