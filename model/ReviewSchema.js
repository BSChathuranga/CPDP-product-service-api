const mongoose = require('mongoose');
const ReviewSchema = new mongoose.Schema({

    orderID: {
        type: String,
       
    },
    message: {
        type: String,
        
    },
    createDate: {
        type: Date,
        
    },
    
    userId: {
        type: Number,

    },
    
    displayName: {
        type: String,

    },
    
    productId: {
        type: Object,
    },
    
    ratings: {
        type: String,
    }
    
    
    


});

module.exports = mongoose.model('Category', ReSchema);