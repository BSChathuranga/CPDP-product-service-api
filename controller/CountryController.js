const CountrySchema = require('../model/CountrySchema');

const createCountry = async (request, response) => { 


try{   
    const {countryName, file, countryCode } = request.body;

    if (!countryName || !file || !countryCode) {
        return response.status(400).json({code:400, message:'Some filelds are missing ....', data:null});
    }
    const country = new CountrySchema({
        // client side must send the file resource
        // you must upload the icon into the S3 bucket and then you can get the response body


        // the client send the ids of all the available countries, and the system must find all the countries for the request

        countryName: countryName,
        flag:{
            hash:'Temp Hash' ,
            resourceUrl:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdogtime.com%2Fdog-breeds%2Fsiberian-husky&psig=AOvVaw3N8nxuyrS11BtBi2pY6n_W&ust=1747811271806000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPiVysO-sY0DFQAAAAAdAAAAABAL' ,
            filename:'Temp File Name',
            directroy:'Temp Directory'
        },  //asskume that you have send the image to the S3   
            countryCode: countryCode
    });

        const saveData = await country.save();
        return response.status(201).json({code:201, message:'Countrye has been saved ....', data:saveData});

    }catch (e) {
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }
        
}
const updateCountry= async (requst, response) => { 
    
try{   

    if (!countryName || !countryCode) {
        return response.status(400).json({code:400, message:'Some filelds are missing ....', data:null});
    }
    const updateData = await CountrySchema.findOneAndUpdate({'_id':requst.params.id },{
        $set: {
            countryName : countryName,
            countryCode : countryCode
        }
    }, {new:true});
    return response.status(200).json({code:200, message:'Country has been updated ....', data:updateData});

    }catch (e) {
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }
}
const deleteCountry =  async (requst, response) => { 
    try{   
    
    if (!requst.params.id ) {
        return response.status(400).json({code:400, message:'Some filelds are missing ....', data:null});
    }
    const deletedData = await CountrySchema.findOneAndDelete({'_id':requst.params.id });

    return response.status(204).json({code:204, message:'Country has been deleted ....', data:deletedData});

    }catch (e) {
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }
}
const findCountryById = async(requst, response) => { 
    try{   
    
        if (!requst.params.id ) {
            return response.status(400).json({code:400, message:'Some filelds are missing ....', data:null});
        }
        const countryData = await CountrySchema.findById({'_id':requst.params.id });

        if (countryData) {
        return response.status(200).json({code:200, message:'Country data ....', data:categoryData });
        }
        return response.status(404).json({code:404, message:'Country data not Found ....', data:null });

    }catch (e) {
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }
}
const findAllCountries = async (requst, response) => { 
    try{
        const {searchText, page=1, size=10}= requst.query;
        const pageIndex = parseInt(page);
        const pageSize = parseInt(size);
        
        const query = {};
        if (searchText) {
            query.$text = { $search: searchText };
        }
        const skip = (pageIndex -1 )* pageSize ;
        const countryList =await CategorySchema.find(query)
            .limit(pageSize)
            .skip(skip)
        const countryListCount =await CategorySchema.countDocuments(query)
        return response.status(200).json({code:200, message:'Country data  ....', data:{List: countryList, dataCount:countryListCount} });
    }catch (e) {
        console.log(e);
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }


}

module.exports = {
    createCountry, updateCountry, deleteCountry, findCountryById, findAllCountries
}