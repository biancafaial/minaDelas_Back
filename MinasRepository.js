const mongoose = require("mongoose");
// string de conexão:
// mongodb://dominio:porta/nome_database
// const MONGO_URL = "mongodb://localhost:27017/minasApi";
const MONGO_URL = "mongodb://heroku_j18sdc8d:h1dodm7fi377sk3ho7hvvgjl6c@ds133187.mlab.com:33187/heroku_j18sdc8d"

function connect () {
  mongoose.connect(MONGO_URL,
    { useNewUrlParser: true },
    function (error) {
      if(error) {
        console.error("Deu erro: ", error)
      } else {
        console.log("Conectamos no mongodb!!! o/")
      }
    }
  );
}

module.exports = { connect }

