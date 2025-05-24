const BookmarkSchemaSchema = require('../model/BookmarkSchema');

const createBookmark = async (request, response) => { 


try{   
    const {userId, productId, createdDate } = request.body;

    if (!userId || !productId|| !createdDate) {
        return response.status(400).json({code:400, message:'Some filelds are missing ....', data:null});
    }
    const bookmark = new BookmarkSchema({
        userId: userId,
        productId: productId,
        createdDate: createdDate
    });

        const saveData = await category.save();
        return response.status(201).json({code:201, message:'Bookmark record has been saved ....', data:saveData});

    }catch (e) {
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }
        
}
const updateBookmark = async (requst, response) => { 
    
try{   
    const {userId, productId, createdDate } = requst.body;

    if (!userId || !productId|| !createdDate) {
        return response.status(400).json({code:400, message:'Some filelds are missing ....', data:null});
    }
    const updateData = await CategorySchema.findOneAndUpdate({'_id':requst.params.id },{
        $set: {
             userId: userId,
             productId: productId,
             createdDate: createdDate
        }

    }, {new:true});
    return response.status(200).json({code:200, message:'Bookmark record has been updated ....', data:updateData});

    }catch (e) {
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }
}
const deleteBookmark  =  async (requst, response) => { 
    try{   
    
        if (!requst.params.id ) {
            return response.status(400).json({code:400, message:'Some filelds are missing ....', data:null});
        }
        const deletedData = await BookmarkSchema.findOneAndDelete({'_id':requst.params.id });

        return response.status(204).json({code:204, message:'Bookmark record has been deleted ....', data:deletedData});

        }catch (e) {
            response.status(500).json({code:500, message:'Something went wrong ....', error:e });
        }
}
const findBookmarkById = async(requst, response) => { 
    try{   
    
        if (!requst.params.id ) {
            return response.status(400).json({code:400, message:'Some filelds are missing ....', data:null});
        }
        const bookmarkData = await CategorySchema.findById({'_id':requst.params.id });

        if (bookmarkData) {
        return response.status(200).json({code:200, message:'Bookmark data ....', data:bookmarkData });
        }
        return response.status(404).json({code:404, message:'Bookmark data not Found ....', data:null });

    }catch (e) {
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }
}
const findAllBookmarks = async (requst, response) => { 
    try{
        const {page=1, size=10}= requst.query;
        const pageIndex = parseInt(page);
        const pageSize = parseInt(size);
             
        const skip = (pageIndex -1 )* pageSize ;
        const bookmarkList =await BookmarkSchema.find(query)
            .limit(pageSize)
            .skip(skip)
        const bookmarkListCount =await BookmarkSchemaSchema.countDocuments(query)
        return response.status(200).json({code:200, message:'Bookmark data  ....', data:{List: bookmarkList, dataCount:bookmarkListCount} });
    }catch (e) {
        console.log(e);
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }


}

module.exports = {
    createBookmark, updateBookmark, deleteBookmark, findBookmarkById, findAllBookmarks
}