const CategorySchema = require('../model/CategorySchema');

const createCategory = async (request, response) => { 


try{   
    const {categoryName, file, countryId } = request.body;

    if (!categoryName || !file || !countryId) {
        return response.status(400).json({code:400, message:'Some filelds are missing ....', data:null});
    }
    const category = new CategorySchema({
        // client side must send the file resource
        // you must upload the icon into the S3 bucket and then you can get the response body


        // the client send the ids of all the available countries, and the system must find all the countries for the request

        categoryName: categoryName,
        icon:{
            hash:'Temp Hash' ,
            resourceUrl:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdogtime.com%2Fdog-breeds%2Fsiberian-husky&psig=AOvVaw3N8nxuyrS11BtBi2pY6n_W&ust=1747811271806000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPiVysO-sY0DFQAAAAAdAAAAABAL' ,
            filename:'Temp File Name',
            directroy:'Temp Directory'
        },  //asskume that you have send the image to the S3   
            availableCountries:[    
            {
                countryId:'Temp-Id-1',
                countryName:'Sri Lanka',
             },
            {
                countryId:'Temp-Id-2',
                countryName:'USA',
            }
        ],
    });

        const saveData = await category.save();
        return response.status(201).json({code:201, message:'Category has been saved ....', data:saveData});

    }catch (e) {
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }
        
}
const updateCategory = async (requst, response) => { 
    
try{   
    const {categoryName} = requst.body;

    if (!categoryName ) {
        return response.status(400).json({code:400, message:'Some filelds are missing ....', data:null});
    }
    const updateData = await CategorySchema.findOneAndUpdate({'_id':requst.params.id },{
        $set: {
            categoryName : categoryName
        }
    }, {new:true});
    return response.status(200).json({code:200, message:'Category has been updated ....', data:updateData});

    }catch (e) {
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }
}
const deleteCategory =  async (requst, response) => { 
    try{   
    
    if (!requst.params.id ) {
        return response.status(400).json({code:400, message:'Some filelds are missing ....', data:null});
    }
    const deletedData = await CategorySchema.findOneAndDelete({'_id':requst.params.id });

    return response.status(204).json({code:204, message:'Category has been deleted ....', data:deletedData});

    }catch (e) {
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }
}
const findCategoryById = async(requst, response) => { 
    try{   
    
        if (!requst.params.id ) {
            return response.status(400).json({code:400, message:'Some filelds are missing ....', data:null});
        }
        const categoryData = await CategorySchema.findById({'_id':requst.params.id });

        if (categoryData) {
        return response.status(200).json({code:200, message:'Category data ....', data:categoryData });
        }
        return response.status(404).json({code:404, message:'Category data not Found ....', data:null });

    }catch (e) {
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }
}
const findAllCategories = async (requst, response) => { 
    try{
        const {searchText, page=1, size=10}= requst.query;
        const pageIndex = parseInt(page);
        const pageSize = parseInt(size);
        
        const query = {};
        if (searchText) {
            query.$text = { $search: searchText };
        }
        const skip = (pageIndex -1 )* pageSize ;
        const categoryList =await CategorySchema.find(query)
            .limit(pageSize)
            .skip(skip)
        const categoryListCount =await CategorySchema.countDocuments(query)
        return response.status(200).json({code:200, message:'Category data  ....', data:{List: categoryList, dataCount:categoryListCount} });
    }catch (e) {
        console.log(e);
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }


}

module.exports = {
    createCategory, updateCategory, deleteCategory, findCategoryById, findAllCategories
}