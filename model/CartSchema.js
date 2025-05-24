const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,

    },
    productID : {
        type: Object,
        
    },
    qty : {
        type: Number,
        
    },
    created_date: {
        type: date,    

    }
});

module.exports = mongoose.model('Cart', CartSchema);