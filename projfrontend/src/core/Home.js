import React,{useState,useEffect} from 'react';
import '../styles.css';
import Base from './Base';
import Card from './Card';
import {getProducts} from './helper/coreapicalls';
import { isAuthenticated } from '../auth/helper';
const Home = ()=>{

    const [products,setProducts] = useState([]);
    const [error,setError] = useState(false);
    const {user, token} = isAuthenticated();

    const loadProducts = ()=>{
        getProducts()
        .then(data=>{
            if(data.error){
                setError(true);
            }
            else{
                setProducts(data);
            }
        })
    }

    useEffect(()=>{
        loadProducts();
    },[])

    return(
        <Base title="Home Page" description="Online shopping" children="" className=" text-white">   
            
            <div className="text-center">
               <h1 className="text-white text-warning font-weight-bolder font-italic mb-5">T-Shirts</h1>
               <div className="row">
                    {products.map((product,index)=>{
                        return(
                            <div key={index} className="col-md-4 col-sm-8 mb-4 m-auto">
                            <Card product={product}/>
                        </div>
                        );
                    })}
               </div>
            </div>
        </Base>
    )
}

export default Home;