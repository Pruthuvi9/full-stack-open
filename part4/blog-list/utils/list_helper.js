const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length < 1
    ? 0
    : blogs.reduce((acc, curr) => acc + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
  let favBlog = {}

  if (blogs.length > 0) {
    for (i = 0; i < blogs.length; i++) {
      if (Object.hasOwn(favBlog, 'likes')) {
        if (blogs[i].likes > favBlog.likes) {
          favBlog = { ...blogs[i] }
        }
      } else {
        favBlog = { ...blogs[i] }
      }
    }
  }

  return favBlog
}

const mostBlogs = (blogs) => {
  const counts = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1
    return acc
  }, {})

  let maxAuthor = null
  let maxCount = 0

  for (const [author, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxAuthor = author
      maxCount = count
    }
  }

  return { author: maxAuthor, blogs: maxCount }
}

const mostLikes = (blogs) => {
  const counts = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes
    return acc
  }, {})

  let maxAuthor = null
  let maxLikes = 0

  for (const [author, likes] of Object.entries(counts)) {
    if (likes > maxLikes) {
      maxAuthor = author
      maxLikes = likes
    }
  }

  return { author: maxAuthor, likes: maxLikes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
