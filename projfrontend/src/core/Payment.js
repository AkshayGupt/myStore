import React from 'react';
import Paymentb from '../payment/Paymentb';

const Payment = ( products,setReload = val=>val)=> {
    return (
        <div>
            <div class="card" style={{width: "100%"}}>
            <div class="card-body">
                <h1 class="card-text text-info">Payment</h1>
                <Paymentb
                products={products}
                setReload={setReload}
                />
            </div>
            </div>
        </div>
    )
}

export default Payment;
