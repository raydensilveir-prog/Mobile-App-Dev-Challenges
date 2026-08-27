import { type } from 'os'
import { buffer } from 'stream/consumers'

import fs from 'fs'

async function readFile(filePath,encoding='utf8') {
  if(typeof filePath !== 'string' || filePath.trim()===''){
    throw new TypeError('A valid file name should be entered')
  }
  return fs.readFile(filePath,encoding)
}

async function writeFile(filePath,data,encoding='utf8') {
  if(typeof filePath !== 'string' || filePath.trim()===''){
    throw new TypeError('A valid file name should be entered')
  }
  if(typeof data !== 'string' && !Buffer.isBuffer(data)){
    throw new TypeError('Data must be string or buffer')
  }
  await fs.writeFile(filePath,data,encoding)
}

async function readJSON(filePath) {
  const data=await readFile(filePath)

  try{
    return JSON.parse(data)
  }
  catch(error){
    throw new Error(`Invalid JSON:${error.message}`)
  }
}

async function writeJSON(filePath,data) {
  const json = JSON.stringify(data,null,2)
  await writeFile(filePath,json)
}

export{
  readFile,
  writeFile,
  readJSON,
  writeJSON
}