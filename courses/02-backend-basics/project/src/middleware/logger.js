function logger(res,req,next){
  const timestamp = new Date().toISOString()
  const method = req.method
  const path = req.originalUrl

  if(process.env.NODE_ENV !=='test'){
    process.stdout.write(`[${timestamp}] ${method} ${path}\n`)
  }

  next();
}

module.exports={logger}