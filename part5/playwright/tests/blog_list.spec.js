const {
  test,
  expect,
  beforeEach,
  describe,
} = require('@playwright/test')
const Blog = require('../../bloglist-be/models/blog')
const User = require('../../bloglist-be/models/user')
const blogService = require('../../bloglist-fe/src/services/blogs')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')

    await request.post('/api/users', {
      data: {
        name: 'Pruthuvi Fernando',
        username: 'pruthuvi',
        password: 'pruthuvi123',
      },
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(
      page.getByText('log in to application')
    ).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({
      page,
    }) => {
      await loginWith(page, 'pruthuvi', 'pruthuvi123')

      await expect(
        page.getByText('Pruthuvi Fernando logged in')
      ).toBeVisible()
    })

    test('fails with wrong credentials', async ({
      page,
    }) => {
      await loginWith(page, 'pruthuvi', 'wrong')
      // await page.getByLabel('username').fill('pruthuvi')
      // await page.getByLabel('password').fill('wrong')
      // await page
      //   .getByRole('button', { name: 'login' })
      //   .click()

      await expect(
        page.getByText('wrong credentials')
      ).toBeVisible()
      await expect(
        page.getByText('Pruthuvi Fernando logged in')
      ).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'pruthuvi', 'pruthuvi123')
      // await page.getByLabel('username').fill('pruthuvi')
      // await page.getByLabel('password').fill('pruthuvi123')
      // await page
      //   .getByRole('button', { name: 'login' })
      //   .click()
      await expect(
        page.getByText('Pruthuvi Fernando logged in')
      ).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(
        page,
        'a new test title...',
        'a new test url...',
        'a new test author...'
      )
      // await page
      //   .getByRole('button', {
      //     name: 'create new blog',
      //   })
      //   .click()
      // await page
      //   .getByLabel('title')
      //   .fill('a new test title...')
      // await page.getByLabel('url').fill('a new test url...')
      // await page
      //   .getByLabel('author')
      //   .fill('a new test author...')
      // await page
      //   .getByRole('button', { name: 'create' })
      //   .click()

      await page
        .getByText(
          'a new test title... - a new test author...'
        )
        .waitFor()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(
        page,
        'a new test title...',
        'a new test url...',
        'a new test author...'
      )
      await page
        .getByText(
          'a new test title... - a new test author...'
        )
        .waitFor()
      await page
        .getByRole('button', { name: 'view' })
        .click()

      const likesCount = await page
        .locator('.likes-count')
        .textContent()
      // console.log(likesCount)

      await page
        .getByRole('button', { name: 'like' })
        .click()

      await expect(page.locator('.likes-count')).toHaveText(
        (Number(likesCount) + 1).toString()
      )
    })

    test('a blog can be deleted', async ({ page }) => {
      await createBlog(
        page,
        'a new test title...',
        'a new test url...',
        'a new test author...'
      )
      await page
        .getByText(
          'a new test title... - a new test author...'
        )
        .waitFor()
      await page
        .getByRole('button', { name: 'view' })
        .click()

      page.on('dialog', async (dialog) => {
        // console.log(dialog.message())
        await dialog.accept()
        // await dialog.dismiss()
      })

      await page
        .getByRole('button', { name: 'delete blog' })
        .click()

      await expect(
        page.getByText('blog deleted')
      ).toBeVisible()
      await expect(
        page.getByText(
          'a new test title... - a new test author...'
        )
      ).not.toBeVisible()
    })

    test('the delete button is only visible to the user who created the blog', async ({
      page,
      request,
    }) => {
      await createBlog(
        page,
        'a new test title...',
        'a new test url...',
        'a new test author...'
      )

      await page
        .getByText(
          'a new test title... - a new test author...'
        )
        .waitFor()

      await page
        .getByRole('button', { name: 'view' })
        .click()

      await expect(
        page.getByRole('button', {
          name: 'delete blog',
        })
      ).toBeVisible()

      await request.post('/api/users', {
        data: {
          name: 'Vimukthi Fernando',
          username: 'vimukthi',
          password: 'vimukthi123',
        },
      })

      await page
        .getByRole('button', { name: 'logout' })
        .click()

      await loginWith(page, 'vimukthi', 'vimukthi123')
      await expect(
        page.getByText('Vimukthi Fernando logged in')
      ).toBeVisible()

      await page
        .getByRole('button', { name: 'view' })
        .click()

      await expect(
        page.getByRole('button', {
          name: 'delete blog',
        })
      ).not.toBeVisible()
    })

    test('blog are arranged in descending order of likes', async ({
      page,
      request,
    }) => {
      // let blogObject = {
      //   title: 'blog with 100 likes',
      //   author: 'author 100',
      //   url: 'url 100',
      //   likes: 100,
      // }

      // await blogService.default.create(blogObject)
      await request.post('/api/testing/addMany')

      await page.reload()

      const blogComponents = await page
        .locator('.blog-component')
        .all()

      // console.log(blogComponents)
      const blogLikesList = await page.locator(
        '.likes-count'
      )

      console.log(blogLikesList)

      const expectedBlogLikesList = [
        '500',
        '400',
        '300',
        '200',
        '100',
      ]

      await expect(blogLikesList).toHaveText(
        expectedBlogLikesList
      )
    })
  })
})
