import React from 'react'
import {API} from '../../backend';


const Imagehelper = ({product,cart=false})=> {
    let imageUrl= product?`${API}/product/photo/${product._id}`:`https://www.cottonking.com/1798-thickbox_default/tshirt-p26230-hsn-6109.jpg`;
    
    if(!cart){
      return (
        <div className="rounded border border-success p-2">
            <img
              src={imageUrl}
              alt="photo"
              // style={{ maxHeight: "100%", maxWidth: "100%" }}
              style={{height:"200px",width:"200px"}}
              className="mb-3 rounded"
            />
          </div>
    )
    }
    else{
      return (
        <div className="rounded border border-success p-2">
            <img
              src={imageUrl}
              alt="photo"
              style={{height:"100px",width:"120px"}}
              className=" rounded"
            />
          </div>
    )
    }
   
}

export default Imagehelper;