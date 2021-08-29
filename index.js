const mongoose = require('mongoose');
const app = require('./app');
const port = 4000;

mongoose.connect('mongodb://localhost:27017/api_rest')
    .then( () => {
        console.log("Conexion exitosa")
        
        app.listen(port, () => {
            console.log('Servidor listo')
        })
    })
    .catch( err => console.log(err) )