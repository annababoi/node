const { Schema, model, Types } = require('mongoose');

const carSchema = new Schema({
    model: {type:String, required:true, default:'BMW'},
    price: {type: Number, required: true},
    year: {type: Number,required: true, default: 2000},
    user: { type: Types.ObjectId, ref: 'User' }
}, {
    timestamps:true
});

module.exports = model('Car', carSchema);