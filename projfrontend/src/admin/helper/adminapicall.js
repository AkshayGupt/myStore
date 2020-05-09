const {API} = require("../../backend");


//Category Calls

//Create Category
export const addCategory = (userId,token,category) =>{
    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response=> {return response.json()})
    .catch(err => console.log(err));
};

export const getCategory = (categoryId) =>{ 
    return fetch(`${API}/category/${categoryId}`,{
        method:"GET",
    })
    .then(response=>{
        return response.json();
    })
    .catch(err => console.log(err))
}

export const getCategories= ()=>{
    return fetch(`${API}/categories`,{
        method:"GET",
    })
    .then(response=> {return response.json()})
    .catch(err =>  console.log(err));
};

export const updateCategory = (categoryId,userId,token,category) =>{
    console.log("category: ",JSON.stringify(category));
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response=> {
        return response.json()})
    .catch(err=> console.log(err));
};

export const deleteCategory = (categoryId,userId,token) =>{
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then(response=> {return response.json();})
    .catch(err=>console.log(err));
}

//Product calls

//Create a product
export const addProduct = (userId,token,product)=>{
    return fetch(`${API}/product/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body: product
    })
    .then(response=> {return response.json()})
    .catch(err=> console.log(err));
};

//all Products
export const getProducts= ()=>{
    console.log(`${API}/products`);
    return fetch(`${API}/products`,{
        method:"GET"
    })
    .then(response=>{ 
        return response.json();})
    .catch(err =>  console.log(err));
};

//get a product
export const getProduct = (productId)=>{
    return fetch(`${API}/product/${productId}`,{
        method:"GET"
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err))
}

//update Product
export const updateProduct = (productId,userId,token,product)=>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body: product
    })
    .then(response=> {
        console.log("RESPONSE",response);
        return response.json()})
    .catch(err=> console.log(err));
};

//delete Product
export const deleteProduct = (productId,userId,token)=>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then(response=> {return response.json();})
    .catch(err=>console.log(err));
}