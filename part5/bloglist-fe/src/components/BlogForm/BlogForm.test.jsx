import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByLabelText('title')
  const urlInput = screen.getByLabelText('url')
  const authorInput = screen.getByLabelText('author')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'testing title input...')
  await user.type(urlInput, 'testing url input...')
  await user.type(authorInput, 'testing author input...')
  await user.click(sendButton)

//   console.log(createBlog.mock.calls)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(
    'testing title input...'
  )
  expect(createBlog.mock.calls[0][0].url).toBe(
    'testing url input...'
  )
  expect(createBlog.mock.calls[0][0].author).toBe(
    'testing author input...'
  )
})
