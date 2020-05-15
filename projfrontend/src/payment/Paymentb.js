import React,{useState,useEffect} from 'react'
import {loadCart,emptyCart} from '../core/helper/carthelper';
import {Link} from 'react-router-dom';
import {getToken,processPayment} from './helper/paymentHelper';
import {createOrder}from '../core/helper/orderhelper';
import {isAuthenticated} from '../auth/helper/index';

import DropIn from 'braintree-web-drop-in-react';


const Paymentb=({
    products,
    setReload=val=>val,
    reload=undefined
})=>{

    const [info,setInfo] = useState({
        loading:false,
        success: false,
        clientToken:null,
        error:"",
        instance:{}
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getTheToken = (userId,token)=>{
        getToken(userId,token)
        .then(info=>{
            if(info.error){
                setInfo({...info,error:info.error});
            }
            else{
                const clientToken =info.clientToken
                setInfo({clientToken})
            }
        })
    }
    useEffect(()=>{
        getTheToken(userId,token);
    },[]);

    const showbtdropIn = () =>{
        return(
            <div>
                {info.clientToken !== null && products.length > 0 ?
                  ( <div>
                   <DropIn
                     options={{ authorization: info.clientToken }}
                     onInstance={(instance) => (info.instance = instance)}
                   />
                   <button className=" btn btn-block btn-info"onClick={()=>{onPurchase()}}>Pay</button>
                 </div>
                  ):(<h3>Add in Some products..</h3>)}
            </div>
        );
    }


    const onPurchase = () =>{
        setInfo({loading:true})
        let nonce;
        let getNonce=info.instance
            .requestPaymentMethod()
            .then(data=>{
                nonce = data.nonce
                const paymentData = {
                    paymentMethodNonce:nonce,
                    amount:getAmount()
                };
                processPayment(userId,token,paymentData)
                .then(response =>{
                    setInfo({
                        ...info,
                        success:response.success
                    });
                    console.log("Payment Success",response);
                    const orderData={
                        products: products,
                        transaction_id:response.transaction.id,
                        amount:response.transaction.amount
                    }
                    createOrder(userId,token,orderData);
                    emptyCart(()=>{})
                    setReload(!reload);
                })
                .catch(err=>{
                    setInfo({
                        loading:false,
                        success:false
                    })
                    console.log(err);

                })
            })
    }

    const getAmount = ()=>{
        let amount = 0
        products.map(p=>{
            amount=amount+(p.price*p.count);
        })
        return amount;
    }

    return (
        <div>   
         
            <div className="bg-secondary py-2"><h5>Final: <i class="fas fa-rupee-sign"></i> {getAmount()}</h5></div>
            {showbtdropIn()}
        </div>
    )
}

export default Paymentb;