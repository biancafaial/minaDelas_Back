const mongoose = require("mongoose");
// cada schema equivale collection
const Schema = mongoose.Schema;
const MinasSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  nome: { type: String, required: true },
  telefone:{type: String},
  email: { type: String, required: true },
  cpf: {type: String, required:true},
  categoria: { type: String },
  descricao: { type: String }, // opcional

})

// é a nossa coleção de minas
const minasModel = mongoose.model("minas", MinasSchema);

module.exports = minasModel;
