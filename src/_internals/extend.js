const extend = (...args) => args.reduce((acc, x) => {
  let key = ''

  for (key in x) {
    acc[key] = x[key]
  }

  return acc
}, {})

export default extend
