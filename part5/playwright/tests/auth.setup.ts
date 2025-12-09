import { test as setup } from '@playwright/test'

const authFile = 'playwright/.auth/user.json'

setup('authenticate', async ({ request }) => {
  // Send authentication request. Replace with your own.
  await request.post('/api/login/', {
    form: {
      user: 'pruthuvi',
      password: 'pruthuvi123',
    },
  })
  await request.storageState({ path: authFile })
})
