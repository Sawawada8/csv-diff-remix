export const parseCsv = (data: string, type: ',' | '\t') => {
  return data.split('\n').map((row) => row.split(type))
}

export const header = (head) => {
  console.log(head)
  const obj = {}
  head.map((v, i) => {
    obj[v] = head.indexOf(v)
  })
  return obj
  // return head.recude((acc: {[key: string]: number}, current: string) => {
  //   acc[current] = head.indexOf(current)
  // }, {})
}

export const comparing = (headerMapping, body1, body2) => {

}
