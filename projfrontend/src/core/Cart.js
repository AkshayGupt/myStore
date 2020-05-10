import React,{useState,useEffect} from 'react';
import '../styles.css';
import Base from './Base';
import Card from './Card';
import {loadCart} from './helper/carthelper';
import { isAuthenticated } from '../auth/helper';
import Paymentb from '../payment/Paymentb';
const Cart = ()=>{

    const [products,setProducts] = useState([]);
    const [reload,setReload] = useState(false);
    useEffect(()=>{
        setProducts(loadCart())
    },[reload]);


    const loadAllProducts = (products) =>{
        return(
            <div>
                <div className="bg-info p-2"><h1>Your Cart</h1></div>
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
            <>
            <div>
                <Paymentb
                products={products}
                setReload={setReload}
                />
            </div>
            </>
        );
    }

    return(
        <Base title="Cart Page" description="Ready to checkout" children="" className=" text-white">   
            
            <div className="text-center">
               <div className="row">
                   <div className="col-md-6"> {products.length>0 ?loadAllProducts(products):<h3>No Products in the cart!</h3>}</div>
                   <div className="col-md-6"> {loadCheckout()}</div>
               </div>
            </div>
        </Base>
    )
}

export default Cart;