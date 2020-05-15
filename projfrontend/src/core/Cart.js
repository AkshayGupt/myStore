import React,{useState,useEffect} from 'react';
import '../styles.css';
import Base from './Base';
import Card from './Card';
import {loadCart,addAddress} from './helper/carthelper';
import { isAuthenticated } from '../auth/helper';
import Paymentb from '../payment/Paymentb';
import CartCard from './CartCard';
import {Redirect} from 'react-router-dom';
const Cart = ()=>{

    const [products,setProducts] = useState([]);
    const [reload,setReload] = useState(false);
    const [showAdd,setShowAdd] = useState(true);
    const [values,setValues] = useState({
        name:"",
        street:"",
        city:"",
        state:"",
        pincode:" ",
        phone:"",
        phone2:""
    })

    const {name,street,city,state,pincode,phone,phone2} = values;

    useEffect(()=>{
        setProducts(loadCart())
    },[reload]);

    const handleChange = name=>event=>{
        setValues({...values,[name]:event.target.value});
    };


    const loadAllProducts = (products) =>{
        return(
            <div>
                <div className="bg-info p-2"><h1>Your Cart</h1></div>
                {products.map((product,index)=>(
                    <CartCard
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
                 <div class="card" style={{width: "100%"}}>
                 <div class="card-body">
                     <h1 class="card-text text-info">Payment</h1>
                     <Paymentb
                     products={products}
                     setReload={setReload}
                     />
                 </div>
                 </div>
           
            </>
        );
    }
    const addTheAddress = () =>{
        let address =name+" "+street+", "+city+", "+state+"-"+pincode+" "+phone+" "+phone2;
        addAddress(address);
        setShowAdd(false);
        loadCheckout();
     
    }

    const loadAddress = ()=>{
        if(showAdd && products.length>0){
            return(
                <div className="container-fluid bg-light m-auto ">
                 
                 <div className="row">
                     
                 <div className="bg-secondary col-md-3  my-md-auto p-3 text-center rounded"><h1 className="py-auto ">Address <i class="fas fa-pencil-alt"></i></h1></div>
                    <div className="col-md-6 m-3 text-left">
                        <form>  
                            <div className="form-group">
                                <label className="text-dark">Name</label>
                                <input className="form-control" onChange={handleChange("name")} value={name} type="text" placeholder="e.g. Mukesh" required={true} />
                            </div>
                            <div className="form-group">
                                <label className="text-dark">Street</label>
                                <input className="form-control" onChange={handleChange("street")} value={street} type="text" placeholder="e.g. London Street" required={true} />
                            </div>
                            <div className="form-group">
                                <label className="text-dark">City</label>
                                <input className="form-control" onChange={handleChange("city")} value={city} type="text" placeholder="e.g. Ranchi" required={true} />
                            </div>
                            <div className="form-group">
                                <label className="text-dark">State</label>
                                <input className="form-control" onChange={handleChange("state")} value={state} type="text"  placeholder="e.g. Jharkhand" required={true}/>
                            </div>
                            <div className="form-group">
                                <label className="text-dark">Pin code</label>
                                <input className="form-control" onChange={handleChange("pincode")} value={pincode} type="number" required={true} />
                            </div>
                            <div className="form-group">
                                <label className="text-dark">Phone</label>
                                <input className="form-control" onChange={handleChange("phone")} value={phone} type="number" required={true} />
                            </div>
                            <div className="form-group">
                                <label className="text-dark">Phone 2:</label>
                                <input className="form-control" onChange={handleChange("phone2")} value={phone2} type="number"  />
                            </div>
                            <button onClick={()=>{addTheAddress();loadCheckout();}}className="btn btn-success btn-block mb-2">Ready To Pay</button>   
                        </form>
                    </div>
                </div>
                </div>
            )
        }
    }
    return(
        <Base title="Cart Page" description="Ready to checkout" children="" className=" text-white">   
            
            <div className="text-center">
               <div className="row">
                   <div className="col-md-6"> {products.length>0 ?loadAllProducts(products):<h3>No Products in the cart!</h3>}</div>
                   <div className="col-md-6"> { showAdd ? loadAddress():loadCheckout()}</div>
                 
               </div>
            </div>
        </Base>
    )
}

export default Cart;