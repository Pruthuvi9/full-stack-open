import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../../services/blogs'

describe('<Blog />', () => {
  const blog = {
    title: 'this is the blog title',
    author: 'this is the blog author',
    url: 'this is the url',
    user: {
      id: 'testId',
      user: 'some name',
      username: 'some username',
    },
    likes: 100,
  }

  const loggedInUser = {
    username: 'another username',
  }

  test('renders title and author, but not url or likes', () => {
    render(<Blog blog={blog} loggedInUser={loggedInUser} />)

    const titleAnAuthor = screen.getByText(
      'this is the blog title - this is the blog author'
    )

    const url = screen.getByText('this is the url')

    const likes = screen.getByText('likes 100')

    expect(titleAnAuthor).toBeVisible()
    expect(url).not.toBeVisible()
    expect(likes).not.toBeVisible()
  })

  test('url and likes can be seen after clicking the view button', async () => {
    render(<Blog blog={blog} loggedInUser={loggedInUser} />)

    const url = screen.getByText('this is the url')

    const likes = screen.getByText('likes 100')

    const viewBtn = screen.getByText('view')

    expect(url).not.toBeVisible()
    expect(likes).not.toBeVisible()

    const user = userEvent.setup()
    await user.click(viewBtn)

    expect(url).toBeVisible()
    expect(likes).toBeVisible()
  })

  test('clicking like twice triggers handler twice', async () => {
    const user = userEvent.setup()

    vi.mock('../../services/blogs')

    blogService.updateBlog.mockResolvedValue({})

    render(
      <Blog
        blog={blog}
        loggedInUser={loggedInUser}
        handleDelete={() => {}}
      />
    )

    const viewBtn = screen.getByText('view')

    await user.click(viewBtn)

    const likeButton = screen.getByRole('button', {
      name: 'like',
    })

    await user.click(likeButton)
    await user.click(likeButton)

    expect(blogService.updateBlog).toHaveBeenCalledTimes(2)
  })
})
