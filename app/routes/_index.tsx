import {useState} from 'react';
import type { MetaFunction } from "@remix-run/node";

import { parseCsv, header, comparing } from '~/utils/csv';
import { Mappling } from '~/types';


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [type, setType] = useState<',' | '\t'>(',')
  const [head, setHead] = useState([])
  const [body, setBody] = useState([])
  const [head2, setHead2] = useState([])
  const [body2, setBody2] = useState([])
  const [mappling, setMappling] = useState<Mappling[]>([])
  const [f, setF] = useState([])

  const handleChangeFile = (num) => {
    return async (e) => {
      const data = await e.target.files[0].text()
      const csvArray = parseCsv(data, type)
      if (num === 1) {
        setHead([ ...csvArray[0] ])
        setBody([...csvArray])
      } else {
        setHead2([ ...csvArray[0] ])
        setBody2([...csvArray])
      }
    }
  }

  const handleChangeType = (e) => {
    setType(e.target.value)
  }

  const selectMappling = (index, num) => {
    return (e) => {
      setMappling(mappling.map((v,i) => {
        if (i == index) {
          if (num == 1) {
            v.first = e.target.value
          } else {
            v.second = e.target.value
          }
        }
        return v
      }))
    }
  }

  const compare = (_e) => {
    const res = comparing(mappling, body,body2)
    setF([...res])
  }

  console.log({body, body2})
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1 className="text-xl bg-green-300">Welcome to Remix</h1>
      <div className="my-10">
        <div className="flex justify-around">
          <div>
            <label>
              CSV
              <input type="radio" name='type' value={','} onChange={handleChangeType} />
            </label>
          </div>
          <div>
            <label>
              tsv
              <input type="radio" name='type' value={'\t'}  onChange={handleChangeType} />
            </label>
          </div>
        </div>
        <div className="flex justify-around">
          <div>
            <input type="file" name="csv" onChange={handleChangeFile(1)} />
          </div>
          <div>
            <input type="file" name="csv2" onChange={handleChangeFile(2)} />
          </div>
        </div>
        <div>
          <h2>## columns</h2>
          <div className='flex justify-around'>
            <div className='justify-start'>
              {head.map((key, i) => {
                return <span key={key} className='mx-2'>{i}, {key}</span>
              })}
            </div>
            <div>
              {head2.map((key, i) => {
                return <span key={key} className='mx-2'>{i}, {key}</span>
              })}
            </div>
          </div>
        </div>
        <div>
          <h2>## mapping</h2>
          {mappling.map((obj: Mappling, i) => {
            return (
              <div key={i}>
                <div className='flex justify-around'>
                  <select className='border border-blue-300' name="one" id="" onChange={selectMappling(i, 1)} defaultValue={obj.first || 0}>
                    {head.map((k,i) => {
                      return <option value={i} key={k}>{k}</option>
                    })}
                  </select>
                  <select className='border border-red-300' name="sec" id="" onChange={selectMappling(i, 2)} defaultValue={obj.second || 0}>
                    {head2.map((k,i) => {
                      return <option value={i} key={k}>{k}</option>
                    })}
                  </select>
                  <button className='bg-blue-400 absolute right-0' onClick={(e) => {
                    mappling.splice(i, 1)
                    setMappling([...mappling])
                  }}>-delete</button>
                </div>
              </div>
            )
          })}
          <button className='bg-red-400 shadow-xl' onClick={(e) => setMappling([...mappling, {first: '0', second: '0'}])}>+ form</button>
        </div>
        <div>
          <h2>## compare</h2>
          <div className='flex justify-center'>
            <button className='bg-green-400 p-2' onClick={compare}>Compere</button>
            {JSON.stringify(f)}
          </div>
        </div>
      </div>
    </div>
  );
}
