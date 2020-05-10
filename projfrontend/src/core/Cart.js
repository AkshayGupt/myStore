import React,{useState,useEffect} from 'react';
import '../styles.css';
import Base from './Base';
import Card from './Card';
import {loadCart} from './helper/carthelper';
import { isAuthenticated } from '../auth/helper';
const Cart = ()=>{

    const [products,setProducts] = useState([]);
    const [reload,setReload] = useState(false);
    useEffect(()=>{
        setProducts(loadCart())
    },[reload]);


    const loadAllProducts = () =>{
        return(
            <div>
                <h2>Cart Section</h2>
                {products.map((product,index)=>(
                    <Card
                    key={index} 
                    product={product}
                    addToCart={false}
                    removeFromCart={true}
                    setReload ={setReload}
                    reload={reload}
                    />
                ))}
            </div>
        );
    };

    const loadCheckout = () =>{
        return(
            <div>
                <h2>Checkout Section</h2>
            </div>
        );
    }

    return(
        <Base title="Cart Page" description="Ready to checkout" children="" className=" text-white">   
            
            <div className="text-center">
               <div className="row">
                   <div className="col-md-6"> {loadAllProducts()}</div>
                   <div className="col-md-6"> {loadCheckout()}</div>
               </div>
            </div>
        </Base>
    )
}

export default Cart;