import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [submitDisabled, setSubmitDisabled] =
    useState(false)

  const handleAddBlog = async (event) => {
    event.preventDefault()
    setSubmitDisabled(true)

    const newBlog = {
      title,
      author,
      url,
    }

    await createBlog(newBlog)

    setTitle('')
    setUrl('')
    setAuthor('')

    setSubmitDisabled(false)
  }

  const handleChange = (event, handler) => {
    handler(event.target.value)
  }

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
        <button type="submit" disabled={submitDisabled}>
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
