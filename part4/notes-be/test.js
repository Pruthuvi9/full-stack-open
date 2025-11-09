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
