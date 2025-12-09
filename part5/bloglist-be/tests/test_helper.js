const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'test blog 1',
    author: 'test author 1',
    url: 'test url 1',
    likes: 100,
  },
  {
    title: 'test blog 2',
    author: 'test author 2',
    url: 'test url 2',
    likes: 200,
  },
]

const nonExistingId = async () => {}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb }
