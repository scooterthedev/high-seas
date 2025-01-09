import transcriptData from './transcript.yml'

function transcript(path, context = {}, skipArrays = true, depth = 0) {
  console.log({ path, depth })
  if (depth > 10) {
    console.log('hit recursion depth 10!')
    return
  }
  try {
    const leaf = getDescendantProp(transcriptData, path, skipArrays)
    if (typeof leaf === 'string') {
      return evalInContext('`' + leaf + '`', { ...context, t: transcript })
    }
    if (leaf === undefined) {
      return `transcript.${path}`
    } else {
      return leaf
    }
  } catch (e) {
    console.error(e)
    return path
  }
}

export { transcript }

function evalInContext(js, context) {
  if (process.env.NODE_ENV === 'development') {
    console.log({ js, context })
  }
  return function () {
    return eval(js)
  }.call(context)
}

function getDescendantProp(obj, desc, skipArrays) {
  const arr = desc.split('.')
  if (process.env.NODE_ENV === 'development') {
    console.log({ arr, obj })
  }
  while (arr.length) {
    obj = obj[arr.shift()]
    if (Array.isArray(obj) && skipArrays) {
      obj = obj[Math.floor(Math.random() * obj.length)]
    }
  }
  return obj
}
