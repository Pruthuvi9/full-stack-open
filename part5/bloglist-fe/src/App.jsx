import { useState, useEffect } from 'react'
import Blog from './components/Blog/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      let sortedBlogs = blogs.sort(
        (blog1, blog2) => blog2.likes - blog1.likes
      )
      setBlogs(sortedBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedInUser =
      window.localStorage.getItem('loggedUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem(
        'loggedUser',
        JSON.stringify(user)
      )

      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error('error', error)
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleAddBlog = async (blogObject) => {
    try {
      await blogService.create(blogObject)
      const updatedBlogs = await blogService.getAll()
      const sortedBlogs = await updatedBlogs.sort(
        (blog1, blog2) => blog2.likes - blog1.likes
      )
      setBlogs(sortedBlogs)
      setErrorMessage(`new blog - ${blogObject.title}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (error) {
      console.error('error', error)
      setErrorMessage('something went wrong, try again')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDeleteBlog = async (id) => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this blog post?'
    )

    if (confirmation) {
      try {
        await blogService.deleteBlog(id)
        setBlogs(blogs.filter((blog) => blog.id !== id))
        setErrorMessage('blog deleted')
      } catch (error) {
        console.error('error', error)
        setErrorMessage('something went wrong, try again')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <h2>log in to application</h2>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => {
                setUsername(target.value)
              }}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => {
                setPassword(target.value)
              }}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    )
  }

  const blogList = () => {
    return (
      <>
        {blogs.map((blog) => (
          <Blog
            loggedInUser={user}
            key={blog.id}
            blog={blog}
            handleDelete={() => handleDeleteBlog(blog.id)}
          />
        ))}
      </>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <h2>create new</h2>
        <BlogForm createBlog={handleAddBlog} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      {!user && loginForm()}
      {user && (
        <div>
          {
            <div>
              <p>{user.name} logged in</p>
              <button
                onClick={() => {
                  window.localStorage.removeItem(
                    'loggedUser'
                  )
                  setUser(null)
                }}
              >
                logout
              </button>
            </div>
          }
          <Togglable
            showBtnLabel="create new blog"
            hideBtnLabel="cancel"
          >
            {blogForm()}
          </Togglable>
          {blogList()}
        </div>
      )}
    </div>
  )
}

export default App
