const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = false
    if (success) resolve('Task completed!')
    else reject('Something went wrong')
  }, 1000)
})

myPromise
  .then((result) => console.log(result)) // "Task completed!"
  .catch((error) => console.error(error)) // if rejected
  .finally(() => console.log('Done'))

// const mongoose = require('mongoose')
// const config = require('./utils/config')
// const User = require('./models/user')

// ;(async function () {
//   try {
//     await mongoose.connect(config.MONGODB_URI)

//     const users = await User.find({})
//     console.log(users)
//   } catch (err) {
//     console.error(err)
//   } finally {
//     await mongoose.connection.close()
//   }
// })()
