const CartSchema = require('../model/CartSchema');

const createCartRecord = async (request, response) => { 


try{   
    const {userID, prdouctId,qty, createdDate } = request.body;

    if (!userID || !prdouctId || !qty || !createdDate) {
        return response.status(400).json({code:400, message:'Some filelds are missing ....', data:null});
    }
    const cart = new CartSchema({
        userId: userID,
        productID: prdouctId,
        created_date: createdDate,
        qty: qty
    });
        

        const saveData = await category.save();
        return response.status(201).json({code:201, message:'Cart Record has been saved ....', data:saveData});

    }catch (e) {
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }
        
}
const updateCartRecord = async (requst, response) => { 
    
try{   
    const {userID, prdouctId, createdDate} = requst.body;

    if (!userID || !prdouctId || !createdDate) {
        return response.status(400).json({code:400, message:'Some filelds are missing ....', data:null});
    }
    const updateData = await CartSchema.findOneAndUpdate({'_id':requst.params.id },{
        $set: {
             userId: userID,
            productID: prdouctId,
            created_date: createdDate,
            qty: qty
        }
    }, {new:true});
    return response.status(200).json({code:200, message:'Cart Record has been updated ....', data:updateData});

    }catch (e) {
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }
}
const deleteCartRecord =  async (requst, response) => { 
    try{   
    
    if (!requst.params.id ) {
        return response.status(400).json({code:400, message:'Some filelds are missing ....', data:null});
    }
    const deletedData = await CartSchema.findOneAndDelete({'_id':requst.params.id });

    return response.status(204).json({code:204, message:'Cart Record has been deleted ....', data:deletedData});

    }catch (e) {
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }
}
const findCartRecordById = async(requst, response) => { 
    try{   
    
        if (!requst.params.id ) {
            return response.status(400).json({code:400, message:'Some filelds are missing ....', data:null});
        }
        const cartData = await CartSchema.findById({'_id':requst.params.id });

        if (cartData) {
        return response.status(200).json({code:200, message:'Cart data ....', data:cartData });
        }
        return response.status(404).json({code:404, message:'Cart data not Found ....', data:null });

    }catch (e) {
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }
}
const findAllCartRecords = async (requst, response) => { 
    try{
        const {page=1, size=10}= requst.query;
        const pageIndex = parseInt(page);
        const pageSize = parseInt(size);
        
        const skip = (pageIndex -1 )* pageSize ;
        const cartDataList =await CartSchema.find(query)
            .limit(pageSize)
            .skip(skip)
        const cartDataListCount =await CartSchema.countDocuments()
        return response.status(200).json({code:200, message:'Cart Record data  ....', data:{List: cartDataList, dataCount:cartDataListCount} });
    }catch (e) {
        console.log(e);
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }


}

module.exports = {
    createCartRecord, updateCartRecord, deleteCartRecord, findCartRecordById, findAllCartRecords
}