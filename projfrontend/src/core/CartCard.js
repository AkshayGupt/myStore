import React,{useState} from 'react';
import Imagehelper from './helper/Imagehelper';
import {Redirect} from 'react-router-dom';
import {addItemToCart, removeItemFromCart, addQuantity,decQuantity} from './helper/carthelper';

const CartCard = ({
    product,
    addToCart=true,
    removeFromCart=false,
    setReload = val =>val,
    reload = undefined
}) => {

  const [redirect,setRedirect] = useState(false);
  const [count,setCount] = useState(product.count);
    const title= product ?product.name : "A photo from pexels";
    const description= product ?product.description : "this photo looks great";
    const price= product ?product.price : "5";

    const getRedirect = ()=>{
        if(redirect){
          return <Redirect to="/cart" />
        }
    }

    const addItemsToCart =()=>{
      addItemToCart(product,()=> setRedirect(true))
    }


    const showAddToCart =() =>{
        return(
            <button
            onClick={() => {addItemsToCart()}}
            className="btn btn-block btn-outline-success mt-2 mb-2"
          >
            Add to Cart
          </button>
        );
    }
    const showRemoveFromCart =() =>{
        return(
            <button
            onClick={() => {
              removeItemFromCart(product._id);
              setReload(!reload);
            }}
            className="btn  btn-outline-danger mt-2 mb-2"
          >
            <i class="far fa-trash-alt"></i>
          </button>
        );
    };

    const showQuantity =(product)=>{
        return(
           setCount(product.count)
        )
    }
  
    return (
      <div className="card text-white bg-dark border border-secondary ">
        
        <div className="card-body">
                <div class="d-flex flex-row">
                        <div> <Imagehelper product={product} cart={true} /></div>
                        <div class="mx-auto font-italic py-5 ">{title}</div>
                        <div className="my-auto mr-5 ">  <i class="fas fa-rupee-sign"></i> {price}</div>

                        <div class="btn my-auto btn-lg" onClick={()=>{addQuantity(product._id);setReload(!reload);}}><i class="fas fa-plus-circle text-white"></i></div>
                        <div className="my-auto "> {product.count}</div>
                        <div class="btn btn-lg my-auto" onClick={()=>{decQuantity(product._id);setReload(!reload);}}><i class="fas fa-minus-circle text-white"></i></div>
                        <div class="my-auto"> 
                                <div className="row text-right">
                                    <div className="col-12">
                                        {addToCart && showAddToCart()}
                                    </div>
                                    <div className="col-12">
                                        {removeFromCart && showRemoveFromCart()}
                                    </div>
                                </div>
                        </div>
                </div>
            {getRedirect()}
        </div>
      </div>
    );
  };

  export default CartCard;