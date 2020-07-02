const util = {
  serialize(obj, strOne, strTwo) {
    const serializer = new XMLSerializer()
    obj[strOne] = serializer.serializeToString(obj[strTwo])
    return obj
  },

  removeDups(arr, comp) {
    const unique = arr
      .map(e => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => arr[e])
      .map(e => arr[e])

    return unique
  },
}

export default util
