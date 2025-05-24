const mongoose = require('mongoose');
const CountrySchema = new mongoose.Schema({

    countryName: {
        type: String,
        required: true,

    },
    countryCode: {
        type: Object,
        

    },
    flag: {
        type: object,
       
    }
    

});

module.exports = mongoose.model('Countries', CountrySchema);