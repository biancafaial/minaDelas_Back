const { connect } = require('./MinasRepository')
const minasModel = require('./MinasSchema')

connect() // para conectar no mongoDB

const getAll = async () => {
  return minasModel.find((error, minas) => {
    return minas
  })
}

const getById = (id) => {
  return minasModel.findById(id) 
}


const add = async (mina) => {
  const novaMina = new minasModel(mina)
  return novaMina.save()
}


const remove = (id) => {
  return minasModel.findByIdAndDelete(id)
}

const update = (id, mina) => {
  return minasModel.findByIdAndUpdate(
    id,
    { $set: mina },
    { new: true }, // RETORNAR A MINA JA ATUALIZADA NO CALLBACK
  )
}

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update
}