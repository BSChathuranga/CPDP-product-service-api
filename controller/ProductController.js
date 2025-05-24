const ProductSchema = require('../model/ProductSchema');

const createProduct = async (request, response) => { 


try{   
    const {productName, file, actualPrice, oldPrice, qty, description, discount, categoryId } = request.body;

    if (!productName || !file || !actualPrice || !oldPrice || !qty || !description || !discount || !categoryId ) {
        return response.status(400).json({code:400, message:'Some filelds are missing ....', data:null});
    }
    const product = new ProductSchema({
       
        productName: productName,
        images:{
            hash:'Temp Hash' ,
            resourceUrl:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdogtime.com%2Fdog-breeds%2Fsiberian-husky&psig=AOvVaw3N8nxuyrS11BtBi2pY6n_W&ust=1747811271806000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPiVysO-sY0DFQAAAAAdAAAAABAL' ,
            filename:'Temp File Name',
            directroy:'Temp Directory'
        }, 
            actualPrice: actualPrice,
            oldPrice:oldPrice,
            qty : qty,
            description:description,
            discount:discount,
            categoryId:categoryId
    });

        const saveData = await product.save();
        return response.status(201).json({code:201, message:'Product has been saved ....', data:saveData});

    }catch (e) {
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }
        
}
const updateProduct = async (requst, response) => { 
    
try{   
    const {productName, actualPrice, oldPrice, qty, description, discount, categoryId } = request.body;

    if (!productName|| !actualPrice || !oldPrice || !qty || !description || !discount || !categoryId ) {
        return response.status(400).json({code:400, message:'Some filelds are missing ....', data:null});
    }
    const updateData = await CategorySchema.findOneAndUpdate({'_id':requst.params.id },{
        $set: {
            productName : productName,
            actualPrice: actualPrice,
            oldPrice:oldPrice,
            qty : qty,
            description:description,
            discount:discount,
            categoryId:categoryId
        }
    }, {new:true});
    return response.status(200).json({code:200, message:'PRoduct has been updated ....', data:updateData});

    }catch (e) {
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }
}
const deleteProduct =  async (requst, response) => { 
    try{   
    
    if (!requst.params.id ) {
        return response.status(400).json({code:400, message:'Some filelds are missing ....', data:null});
    }
    const deletedData = await ProductSchema.findOneAndDelete({'_id':requst.params.id });

    return response.status(204).json({code:204, message:'Product has been deleted ....', data:deletedData});

    }catch (e) {
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }
}
const findProductById = async(requst, response) => { 
    try{   
    
        if (!requst.params.id ) {
            return response.status(400).json({code:400, message:'Some filelds are missing ....', data:null});
        }
        const productData = await ProductSchema.findById({'_id':requst.params.id });

        if (productData) {
        return response.status(200).json({code:200, message:'Product data ....', data:productData });
        }
        return response.status(404).json({code:404, message:'Product data not Found ....', data:null });

    }catch (e) {
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }
}
const findAllProducts= async (requst, response) => { 
    try{
        const {searchText, page=1, size=10}= requst.query;
        const pageIndex = parseInt(page);
        const pageSize = parseInt(size);
        
        const query = {};
        if (searchText) {
            query.$text = { $search: searchText };
        }
        const skip = (pageIndex -1 )* pageSize ;
        const productList =await ProductSchema.find(query)
            .limit(pageSize)
            .skip(skip)
        const productListCount =await ProductSchema.countDocuments(query)
        return response.status(200).json({code:200, message:'Product data  ....', data:{List: productList, dataCount:productListCount} });
    }catch (e) {
        console.log(e);
        response.status(500).json({code:500, message:'Something went wrong ....', error:e });
    }


}

module.exports = {
    createProduct, updateProduct, deleteProduct, findProductById, findAllProducts
}