const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    status: {
        type: String,
        require: true
    }
}, 
{
    collection: 'EstadoUsuario'
});

module.exports = model('status', CategoriaSchema);