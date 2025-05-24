const DiscountSchema = require('../model/DiscountSchema');

const createDiscount = async (request, response) => { 


try{   
    const {discountName, percentage, startDate, endDate, lastUpdate } = request.body;

    if (!discountName || !percentage || !startDate || !endDate || !lastUpdate) {
        return response.status(400).json({code:400, message:'Some filelds are missing ....', data:null});
    }
    const discount = new DiscountSchema({
        // client side must send the file resource
        // you must upload the icon into the S3 bucket and then you can get the response body


        // the client send the ids of all the available countries, and the system must find all the countries for the request

        discountName: discountName,
        percentage: percentage,  
        startDate: startDate,
        endDate: endDate,
        lastUpdate: lastUpdate
    });

        const saveData = await discount.save();
        return response.status(201).json({code:201, message:'discount has been saved ....', data:saveData});

    }catch (e) {
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }
        
}
const updateDiscount = async (requst, response) => { 
    
try{   
    const {discountName, percentage, startDate, endDate, lastUpdate } = request.body;

    if (!discountName || !percentage || !startDate || !endDate || !lastUpdate) {
        return response.status(400).json({code:400, message:'Some filelds are missing ....', data:null});
    }
    const updateData = await DiscountSchema.findOneAndUpdate({'_id':requst.params.id },{
        $set: {
            discountName : discountName,
            percentage : percentage,
            startDate : startDate,
            endDate : endDate,
            lastUpdate : lastUpdate
        }
    }, {new:true});
    return response.status(200).json({code:200, message:'Discount has been updated ....', data:updateData});

    }catch (e) {
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }
}
const deleteDiscount =  async (requst, response) => { 
    try{   
    
    if (!requst.params.id ) {
        return response.status(400).json({code:400, message:'Some filelds are missing ....', data:null});
    }
    const deletedData = await DiscountSchema.findOneAndDelete({'_id':requst.params.id });

    return response.status(204).json({code:204, message:'Discount has been deleted ....', data:deletedData});

    }catch (e) {
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }
}
const findDiscountById = async(requst, response) => { 
    try{   
    
        if (!requst.params.id ) {
            return response.status(400).json({code:400, message:'Some filelds are missing ....', data:null});
        }
        const discountData = await DiscountSchema.findById({'_id':requst.params.id });

        if (discountData) {
        return response.status(200).json({code:200, message:'Discount data ....', data:discountData });
        }
        return response.status(404).json({code:404, message:'Discount data not Found ....', data:null });

    }catch (e) {
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }
}
const findAllDiscounts = async (requst, response) => { 
    try{
        const {searchText, page=1, size=10}= requst.query;
        const pageIndex = parseInt(page);
        const pageSize = parseInt(size);
        
        const query = {};
        if (searchText) {
            query.$text = { $search: searchText };
        }
        const skip = (pageIndex -1 )* pageSize ;
        const categoryList =await DiscountSchema.find(query)
            .limit(pageSize)
            .skip(skip)
        const discountListCount =await DiscountSchema.countDocuments(query)
        return response.status(200).json({code:200, message:'Discount data  ....', data:{List: discountList, dataCount:discountListCount} });
    }catch (e) {
        console.log(e);
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }


}

module.exports = {
    createDiscount, updateDiscount, deleteDiscount, findDiscountById, findAllDiscounts
}