import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
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
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url,
    }

    try {
      await blogService.create(newBlog)
      setBlogs(blogs.concat(newBlog))
      setErrorMessage(`new blog - ${newBlog.title}`)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
      setTitle('')
      setUrl('')
      setAuthor('')
    } catch (error) {
      setErrorMessage('something went wrong, try again')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const handleChange = (event, handler) => {
    handler(event.target.value)
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
          <Blog key={blog.id} blog={blog} />
        ))}
      </>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <form onSubmit={handleAddBlog}>
          <div>
            <label htmlFor="">
              title
              <input
                type="text"
                value={title}
                onChange={(e) => handleChange(e, setTitle)}
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="">
              url
              <input
                type="text"
                value={url}
                onChange={(e) => handleChange(e, setUrl)}
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="">
              author
              <input
                type="text"
                value={author}
                onChange={(e) => handleChange(e, setAuthor)}
              />
            </label>
          </div>
          <button type="submit">create</button>
        </form>
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
          {blogForm()}
          {blogList()}
        </div>
      )}
    </div>
  )
}

export default App
