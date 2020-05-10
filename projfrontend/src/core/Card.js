import React,{useState} from 'react';
import Imagehelper from './helper/Imagehelper';
import {Redirect} from 'react-router-dom';
import {addItemToCart, removeItemFromCart} from './helper/carthelper';

const Card = ({
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
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove from cart
          </button>
        );
    }
    return (
      <div className="card text-white bg-dark border border-secondary ">
        <div className="card-header lead font-italic">{title}</div>
        <div className="card-body">
            {getRedirect()}
             <Imagehelper product={product}/>
          <p className="lead bg-success font-weight-normal text-wrap">
            {description}
          </p>
          <span style={{height:"50px"}}></span><p className="btn btn-success rounded  btn-sm px-4"><i style={{marginRight:"10px"}} className="fas fa-tag"></i> {price} <i class="fas fa-rupee-sign"></i></p>
          <div className="row">
            <div className="col-12">
             {addToCart && showAddToCart()}
            </div>
            <div className="col-12">
             {removeFromCart && showRemoveFromCart()}
            </div>
          </div>
        </div>
      </div>
    );
  };


  export default Card;