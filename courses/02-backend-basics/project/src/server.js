import http from 'http'
import { add, subtract, multiply, divide } from './math.js';
import { readFile, writeFile } from './fs-utils.js';
import { error } from 'console'
import { url } from 'inspector'
import { resolve } from 'dns'
import { createRequire } from 'module'


const PORT=Number(process.env.PORT)||3000;
const DATA_FILE='./data.json';
// const app = require('./src/app')
// app.listen(3000,()=>{
//   console.log('server is running')
// })
function sendJ(res,status,data){
  res.writeHead(status,{'content-type':'application/json'
});
res.end(JSON.stringify(data));
}

function sendT(res,status,message){
  res.writeHead(status,{
    'content-type':'text/plain',
  });
  res.end(message);
}
function parseJBody(req){
  return new Promise((resolve, reject)=>{
    let body='';

    req.on('data',(chunk)=>{
      body += chunk.toString();

      if (body.length > 1024*1024){
        reject( Error('Request body too large'));
        req.destroy();
      }
    });
    req.on('end',()=>{
      if(!body.trim()){
        resolve({});
        return;
      }

      try{
        resolve(JSON.parse(body));
      }
      catch(error){
        reject( Error('Invalid Json: ${error.message}'));
      }
    });
    req.on('error',reject);
  });
}

function getMathOp(operation,a,b){
  switch(operation){
    case 'add':return add(a,b);

    case 'subtract':return subtract(a,b);

    case 'multiply':return multiply(a,b);

    case 'divide':return divide(a,b);
    
    default:throw  Error('Unsupported input');
  }
}

async function handleMath(req,res,url) {
  const operation = url.searchParams.get('operation') || url.searchParams.get('op');

  const aValue = url.searchParams.get('a');
  const bValue = url.searchParams.get('b');

  if(!operation || aValue==null||bValue==null||!Number.isFinite(a)||!Number.isFinite(b)){
    sendJ(res,400,{
      error: 'Provide Operation,a and b'
    });
    return;
  }
  try{
    const result=getMathOp(operation,a,b);

    sendJ(res,200, {
      operation,a,b,result
    });
  }
  catch(error){
    sendJ(res,400,{
      error:error.message
    });
  }
}

async function handleMathP(req,res) {
  try{
    const body = await parseJBody(req);

    const operation=body.operation||body.op;
    const a=body.a;
    const b=body.b;

    if(!operation || typeof a !== 'number' || typeof b !== 'number'){
      sendJ(res,400,{
        error:'operation, a and b are required'
      });
      return
    }

    const result=getMathOp(operation,a,b)

    sendJ(res,200,{
      operation,a,b,result
    });
  }
  catch(error){
    sendJ(res,400,{
      error:error.message
    });
  }
}

async function handleFilesG(res) {
  try{
    const data=await readFile(DATA_FILE);
    
    sendJ(res,200,{
      data
    })
  }
  catch(error){
    if(error.code ==='ENOENT'){
      sendJ(res,200,{
        data:''
      })
      return
    }
    sendJ(res,500,{
      error:'Unable to read file'
    })
  }
}

async function handleFilesP(req,res) {
  try{
    const body=await parseJBody(req)

    if(body.data===undefined||body.data===null){
      sendJ(res,400,{
        error:'data not present'
      })
      return
    }
    const data =typeof body.data==='string' ?body.data:JSON.stringify(body.data,null,2)

    await writeFile(DATA_FILE,data)

    sendJ(res,201,{
      message:'File Written Successfully'
    })
  }
  catch(error){
    sendJ(res,400,{
      error:error.message
    })
  }
}

const server =http.createServer(async(req,res)=>{
  try{
    const url= URL(req.url,`http://${req.headers.host || 'localhost'}`
    )
    if(req.method==='GET'&&url.pathname==='/'){
      sendJ(res,200,{
        message:'Node server is running successfully'
      })
      return
    }
    if(req.method==='GET'&& url.pathname==='/math'){
      await handleMath(req,res,url)
      return
    }
    if(req.method==='POST'&& url.pathname==='/math'){
      await handleMathP(req,res)
      return
    }
    if(req.method==='GET'&&url.pathname==='/files'){
      await handleFilesG(res)
      return
    }
    if(req.method==='POST'&&url.pathname==='/files'){
      await handleFilesP(req,res)
      return
    }

    sendJ(res,404,{
      error:'Not found'
    })
  }
  catch(error){
    if(!res.headersSent){
      sendJ(res,500,{
        error:'Server Error(internal)'
      })
    }
  }
})

function startServer(port=PORT){
  return new Promise((resolve, reject)=>{
    if(server.listening){
      resolve(server)
      return
    }
    server.once('error',reject)

    server.listen(port, ()=>{
      server.removeListener('error',reject)
      resolve(server)
    })
  })
}

function stopServer(){
  return new Promise((resolve,reject)=>{
    if(!server.listening){
      resolve()
      return
    }

    server.close((error)=>{
      if(error){
        reject(error)
        return
      }
      resolve()
    })
  })
}

startServer().catch(() => {
  process.exitCode = 1;
});

export{
  server,startServer,stopServer,PORT
}