const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length < 1 ? 0 : blogs.reduce((acc, curr) => acc + curr.likes, 0)
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
