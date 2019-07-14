const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const controller = require('./MinasController')

const servidor = express()
servidor.use(cors())
servidor.use(bodyParser.json())

servidor.get('/minas', async (request, response) => {
  controller.getAll()
    .then(minas => response.send(minas))
})

servidor.get('/minas/:id', (request, response) => {
  const id = request.params.id
  controller.getById(id)
    .then(mina => {
      if(!mina){ // comida === null || comida === undefined
        response.sendStatus(404) // comida nao encontrada
      } else {
        response.send(mina)
      }
    })
    .catch(error => {
      if(error.name === "CastError"){
        response.sendStatus(400) // bad request - tem algum parametro errado
      } else {
        response.sendStatus(500) // deu ruim, e nao sabemos oq foi
      }
    })
})

servidor.post('/minas', (request, response) => {
  controller.add(request.body)
  .then(mina => {
    const _id = mina._id
    response.send(_id)
  })
  .catch(error =>{
    if(error.name === "ValidationError"){
      response.sendStatus(400) // bad request
    } else {
      response.sendStatus(500)
    }
  })
})

servidor.delete("/minas/:id", (request,response) => {
  controller.remove(request.params.id)

   .then(mina => {
     if (mina === null || mina ===undefined){
       response.send(404)
     }else{
       response.send(204)
     }
  })
  .catch(error =>{
    if(error.name === "ValidationError"){
      response.sendStatus(400) // bad request
    } else {
      response.sendStatus(500)
    }
})
})


servidor.patch('/minas/:id', (request, response) => {
  const id = request.params.id
  controller.update(id, request.body)
    .then(mina => {
      if(!mina) { response.sendStatus(404) } // nao encontrei a mina
      else { response.send(mina) } // o status default 200
    })
    .catch(error => {
      if(error.name === "MongoError" || error.name === "CastError"){
        response.sendStatus(400) // bad request
      } else {
        response.sendStatus(500)
      }
    })
})

servidor.delete('/minas/:id', async (request, response) => {
  controller.remove(request.params.id)
    .then(mina => response.sendStatus(204))
})

servidor.listen(3000)
console.log("servidorzinho rodando na porta 3000")