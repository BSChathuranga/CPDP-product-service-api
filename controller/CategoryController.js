const CategorySchema = require('../model/CategorySchema');

const createCategory = (requst, response) => { 
    const category = new CategorySchema({
        // client side must send the file resource
        // you must upload the icon into the S3 bucket and then you can get the response body


        // the client send the ids of all the available countries, and the system must find all the countries for the request
    categoryName: requst.body.categoryName,
    icon:{hash:'Temp Hash' ,resourceUrl:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdogtime.com%2Fdog-breeds%2Fsiberian-husky&psig=AOvVaw3N8nxuyrS11BtBi2pY6n_W&ust=1747811271806000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPiVysO-sY0DFQAAAAAdAAAAABAL' ,
    filename:'Temp File Name', directroy:'Temp Directory'},  //asskume that you have send the image to the S3   
    availableCountries:[    
        {
            countryId:'Temp-Id-1',
            countryName:'Sri Lanka',
        },
        {
            countryId:'Temp-Id-2',
            countryName:'USA',
        },
    ],
    });
    category.save()
    .then(result => {
        console.log(result);
        response.status(201).json({code:201, message:'Customer has been saved ....', data:result});
                               
    }).catch(error => {
       
        response.status(500).json({code:201, message:'Something went wrong ....', data:err});
     })
}
const updateCategory = (requst, response) => { 
    console.log(requst.body);
}
const deleteCategory =  (requst, response) => { 
    console.log(requst.body);
}
const findCategoryById = (requst, response) => { 
    console.log(requst.body);
}
const findAllCategories = (requst, response) => { 
    console.log(requst.body);
}

module.exports = {
    createCategory, updateCategory, deleteCategory, findCategoryById, findAllCategories
}