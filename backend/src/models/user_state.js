const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    estado: {
        type: Schema.Types.ObjectId,
        require: true
    }
}, 
{
    collection: 'status'
});

export default model('user_state', CategoriaSchema);