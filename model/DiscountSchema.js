const mongoose = require('mongoose');
const DiscountSchema = new mongoose.Schema({

    discountName: {
        type: String,
        required: true,

    },
    percentsge: {
        type: Number,
        
        
    },
    startDate: {
        type: Date,
       
    },
    
    endDate : {
        type: Date,
    },
    lastUpdate: {
        type: Date,
    }
        
});

module.exports = mongoose.model('Discount', DiscountSchema);