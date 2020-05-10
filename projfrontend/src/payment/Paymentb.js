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

    const {user,token} = isAuthenticated();

    const [info,setInfo] = useState({
        loading:false,
        success: false,
        clientToken:null,
        error:"",
        instance:{}
    });

    const getTheToken = (userId,token)=>{
        getToken(userId,token)
        .then(info=>{
            // console.log("......",info);
            if(info.error){
                setInfo({...info,error:info.error});
            }
            else{
                const clientToken =info.clientToken
                setInfo({clientToken})
            }
        })
    }

    const showbtdropIn = () =>{
        return(
            <div>
                {info.clientToken !== null && products.length > 0 ?
                  ( <div>
                   <DropIn
                     options={{ authorization: info.clientToken }}
                     onInstance={(instance) => (info.instance = instance)}
                   />
                   <button className=" btn btn-block btn-success"onClick={()=>{onPurchase()}}>Buy</button>
                 </div>
                  ):(<h3>Add in Some products..</h3>)}
            </div>
        );
    }

    useEffect(()=>{
        getTheToken(user._id,token);
    },[]);


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
                processPayment(user._id,token,paymentData)
                .then(response =>{
                    setInfo({
                        ...info,
                        success:response.success
                    });
                    console.log("Payment Success");
                    const orderData={
                        products: products,
                        transaction_id:response.transaction.id,
                        amount:response.transaction.amount
                    }
                    createOrder(user._id,token,orderData);
                    emptyCart(()=>{})
                    setReload(!reload);
                })
                .catch(err=>{
                    setInfo({
                        loading:false,
                        success:false
                    })
                    console.log("Payment failed");

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
            <div className="bg-secondary p-2"><h1 className="font-bold mb-3">Payment</h1></div>
            <div className="bg-secondary py-2"><h5><i style={{marginRight:"8px"}} class="fas fa-file-invoice font-italic">   Amount: </i> {getAmount()}</h5></div>
            {showbtdropIn()}
        </div>
    )
}

export default Paymentb;