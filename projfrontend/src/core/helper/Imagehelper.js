import React from 'react'
import {API} from '../../backend';


const Imagehelper = ({product})=> {
    let imageUrl= product?`${API}/product/photo/${product._id}`:`https://www.cottonking.com/1798-thickbox_default/tshirt-p26230-hsn-6109.jpg`;
    return (
        <div className="rounded border border-success p-2">
            <img
              src={imageUrl}
              alt="photo"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              className="mb-3 rounded"
            />
          </div>
    )
}

export default Imagehelper;