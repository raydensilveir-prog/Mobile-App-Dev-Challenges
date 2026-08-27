const express = require('express')

const router = express.Router()

let notes=[]
let nextId=1

router.get('/',(req,res)=>{
  res.status(200).json(notes)
})

router.get('/:id',(req,res)=>{
  const id =Number(req.params.id)

  if(!Number.isInteger(id)){
    res.status(404).json({error:'Not found'})
    return
  }

  const note=notes.find((item)=> item.id === id)

  if(!note){
    res.status(404).json({error:'Not found'})
    return
  }
  res.status(200).json(note)
})

router.post('/',(req,res)=>{
  const{title,content}=req.body||{}

  if(typeof title !== 'string' || title.trim()===''||typeof content!=='string'||content.trim()===''){
    res.status(400).json({error:'Title and content required'})
  return
  }
  const note={id:nextId,title:title.trim(),content:content.trim()
  }
  nextId+=1
  notes.push(note)
})

router.delete('./id',(req,res)=>{
  const id=Number(req.params.id)

  if(!Number.isInteger(id)){
    res.status(404).json({error:'Not found'
    })
    return
  }
  const index=notes.findIndex((item)=>item.id===id)

  if(index===-1){
    res.status(404).json({error:'Not found'})
  return
  }

  notes.splice(index,1)
  res.status(200).json({
    message:'Note deleted'
  })
})


module.exports=router