import { useState } from 'react'
import blogService from '../../services/blogs'
import Togglable from '../Togglable'
import './blog.css'

const Blog = ({ blog, loggedInUser, handleDelete }) => {
  const [likes, setLikes] = useState(blog.likes)
  const authorisedUser =
    blog.user.username === loggedInUser.username

  const incrementLikes = async () => {
    const newLikes = likes + 1
    setLikes((prev) => prev + 1)
    await blogService.updateBlog({
      ...blog,
      likes: newLikes,
    })
  }

  return (
    <div className="blog-component">
      <p>
        {blog.title} - {blog.author}
      </p>
      <Togglable showBtnLabel="view" hideBtnLabel="hide">
        <div>
          <p>{blog.url}</p>
          <div>
            <p>likes {likes}</p>
            <button onClick={incrementLikes}>like</button>
          </div>
          <p>{blog.user.name}</p>
          {authorisedUser && (
            <button onClick={handleDelete}>
              delete blog
            </button>
          )}
        </div>
      </Togglable>
    </div>
  )
}

export default Blog
