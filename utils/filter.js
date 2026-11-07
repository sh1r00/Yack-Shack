const filter = (config) => {
  const y = config.toFilter
  const z = config.color
  const single = config.single
  let filteredArray = []
  for (let x=0; x < y.length;x++) {
    const extractedObjKey = Object.keys(y[x])
    const extractedObj = y[x]
    const newObj = extractedObj[extractedObjKey]
    const newItem = newObj[z]
    if (single === true) {
      return color = newItem
    }
    filteredArray.push(newItem)
  }  
  return filteredArray
}

module.export = filter