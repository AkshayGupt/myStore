import React,{useState} from 'react';
import Base from  '../core/Base';
import {isAuthenticated} from "../auth/helper/index";
import {Link} from 'react-router-dom';
import {addCategory} from './helper/adminapicall';
const AddCategory = ()=>{

    const [values,setValues] = useState({
        name:"",
        error:"",
        success:false
    });
    const {name,error,success} = values;
    const {user,token} = isAuthenticated();

    const handleChange = (event)=>{
        setValues({...values,name:event.target.value,error:"",success:false});
    }
    const onSubmit =(event) =>{
        event.preventDefault();
        setValues({...values,success:false,error:""})
        //Call the api
         addCategory(user._id, token, {name})
                .then(data=>{
                    if(data.error){
                        setValues({...values,error:data.error});
                    }
                    else{
                        setValues({...values,error:"",success:true,name:""});
                    }
                })
                .catch(err=>console.log(err));
    }

    const categoryForm = ()=>{
        return(
            <form>
            <div className="form-group">
              <p className="lead">Enter the Category</p>
              <input type="text" className="form-control my-3 mx-auto" autoFocus required placeholder="For ex. Summer" value={name} onChange={handleChange} />
               <button className="btn btn-outline-info btn-lg" onClick={onSubmit}> Create Category</button>
               </div>
           </form>   
        );
    }

    const successMessage=()=>{
        if(success){
            return(
                <h4 className="alert alert-success"> Category  Created Successfully!</h4>
            );
        }
    }
    const errorMessage=()=>{
        if(error){
            return(
                <h4 className="alert alert-danger"> Failed to Create Category!</h4>
                
            )
        }
    }
    return(
      <Base title="Create a category here" 
      description="Add a new Category for new tshirts"
      className="container bg-info p-4"
      >
          <div className="row bg-white rounded">
            <div className="col-md-8 offset-md-2">
                {errorMessage()}
                {successMessage()}
                {categoryForm()}    
                <div>
                    <Link className="btn btn-md btn-dark mt-4 mb-3 rounded" to="/admin/dashboard">Go Back</Link>
                </div>      
            
            </div>
          </div>
      </Base>
    )  
}


export default AddCategory;