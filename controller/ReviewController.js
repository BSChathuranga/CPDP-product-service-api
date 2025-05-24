const ReviewSchema = require('../model/ReviewSchema');

const createReview= async (request, response) => { 


try{   
    const {orderId, message, createdDate, userId, displayName, prdouctId, ratings  } = request.body;

    if (!orderId || !message || !createdDate ||!userId || !displayName ||!prdouctId ||! ratings ) {
        return response.status(400).json({code:400, message:'Some filelds are missing ....', data:null});
    }
    const review = new ReviewSchema({
        orderId: orderId,
        message: message,
        created_date: createdDate,
        userId: userId,
        displayName: displayName,
        productID: prdouctId,
        ratings: ratings        
    });
        

        const saveData = await review.save();
        return response.status(201).json({code:201, message:'Review has been saved ....', data:saveData});

    }catch (e) {
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }
        
}
const updateReview = async (requst, response) => { 
    
try{   
    const {orderId, message, createdDate, userId, displayName, prdouctId, ratings  } = request.body;

    if (!orderId || !message || !createdDate ||!userId || !displayName ||!prdouctId ||! ratings ) {
        return response.status(400).json({code:400, message:'Some filelds are missing ....', data:null});
    }
    const updateData = await CartSchema.findOneAndUpdate({'_id':requst.params.id },{
        $set: {
        orderId: orderId,
        message: message,
        created_date: createdDate,
        userId: userId,
        displayName: displayName,
        productID: prdouctId,
        ratings: ratings 
        }
    }, {new:true});
    return response.status(200).json({code:200, message:'RevieW has been updated ....', data:updateData});

    }catch (e) {
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }
}
const deleteReview =  async (requst, response) => { 
    try{   
    
    if (!requst.params.id ) {
        return response.status(400).json({code:400, message:'Some filelds are missing ....', data:null});
    }
    const deletedData = await ReviewSchema.findOneAndDelete({'_id':requst.params.id });

    return response.status(204).json({code:204, message:'Review has been deleted ....', data:deletedData});

    }catch (e) {
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }
}
const findReviewById = async(requst, response) => { 
    try{   
    
        if (!requst.params.id ) {
            return response.status(400).json({code:400, message:'Some filelds are missing ....', data:null});
        }
        const reviewData = await ReviewSchema.findById({'_id':requst.params.id });

        if (reviewData) {
        return response.status(200).json({code:200, message:'Review data ....', data:reviewData });
        }
        return response.status(404).json({code:404, message:'Review data not Found ....', data:null });

    }catch (e) {
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }
}
const findAllReviews = async (requst, response) => { 
    try{
        const {searchText, page=1, size=10}= requst.query;
        const pageIndex = parseInt(page);
        const pageSize = parseInt(size);
        
        const query = {};
        if (searchText) {
            query.$text = { $search: searchText };
        }        
        const skip = (pageIndex -1 )* pageSize ;
        const reviewDataList =await CartSchema.find(query)
            .limit(pageSize)
            .skip(skip)
        const reviewDataListCount =await ReviewSchema.countDocuments()
        return response.status(200).json({code:200, message:'Review Record data  ....', data:{List: reviewDataList, Count:reviewDataListCount} });
    }catch (e) {
        console.log(e);
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }


}

module.exports = {
    createReview, updateReview, deleteReview, findReviewById, findAllReviews
}