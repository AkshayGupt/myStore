export const addItemToCart = (item,next)=>{
    let cart=[];
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cart=JSON.parse(localStorage.getItem("cart"));
        }
        let flag=true
        cart.map((product,index)=>{
            if(product._id === item._id){
                if(product.stock > 0){
                    console.log("Found");
                    product.count=product.count+1;
                    flag=false
                    cart.splice(index,1,product);
                }

            }
        })
        if(flag && item.stock > 0){
            cart.push({
                ...item,
                count:1
            });
        }
        localStorage.setItem("cart",JSON.stringify(cart));
        next();
    }
};

export const loadCart = () =>{
    if(typeof window !== undefined){
        if(localStorage.getItem ("cart")){
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
};

export const removeItemFromCart = (productId) =>{
    let cart = [];
    if(typeof window !== undefined){
        if(localStorage.getItem("cart"))
        {
            cart=JSON.parse(localStorage.getItem("cart"));
        }
        cart.map((product,index)=>{
            if(product._id === productId){
                cart.splice(index,1);
            }
        });
        localStorage.setItem("cart",JSON.stringify(cart));
    }
    return cart;
};

export const emptyCart = (next) =>{
    if(typeof window !== undefined){
        localStorage.removeItem("cart");

        let cart=[]
        localStorage.setItem("cart",JSON.stringify(cart))
        next();
    }
};

export const addQuantity = (productId) =>{
    let cart = [];
    let cart2=[];
    if(typeof window !== undefined){
        if(localStorage.getItem("cart"))
        {
            cart=JSON.parse(localStorage.getItem("cart"));
        }
    
        cart.map((product,index)=>{
            if(product._id === productId){
                if(product.stock>= product.count+1)
                {product.count+=1;product.stock-=1;}
            }
            cart2.push(product);
        });
        // console.log(cart2);
        localStorage.setItem("cart",JSON.stringify(cart2));
    }
    return cart2;
};
export const decQuantity = (productId) =>{
    let cart = [];
    let cart2=[];
    if(typeof window !== undefined){
        if(localStorage.getItem("cart"))
        {
            cart=JSON.parse(localStorage.getItem("cart"));
        }
        
        cart.map((product,index)=>{
            if(product._id === productId && product.count >0){
                {
                    product.count-=1;product.stock+=1;
                
                }
            }
            cart2.push(product);
           
        });
        localStorage.setItem("cart",JSON.stringify(cart2));
    }
    return cart2;
};

export const addAddress = (address,next) =>{
    if(typeof window !== undefined){
        localStorage.setItem("address",JSON.stringify(address));
    }
    
};