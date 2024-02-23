import { Mappling } from "~/types"

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

export const comparing = (headerMapping: Mappling[], body1, body2) => {
  const failes = []
  const body1Head = body1.shift(0, 1)
  const body2Head = body2.shift(0, 1)
  body1.forEach((row, i) => {
    headerMapping.forEach(mapping => {
      const {first, second} = mapping

      const fData = row[Number(first)]
      const sData = body2[i][Number(second)]
      if (fData !== sData) {
        failes.push(`${fData}, ${sData}: ${body1Head[Number(first)]}, ${body2Head[Number(second)]}`)
      }
    });
  });

  return failes;
}
