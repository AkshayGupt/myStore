import React,{useState} from 'react';
import Base from '../core/Base';
import { Link, Redirect} from 'react-router-dom';
import {signin,authenticate,isAuthenticated} from '../auth/helper/index';

const Signin =()=>{
    const [values,setValues] = useState({
        email:"om@gmail.com",
        password:"12345",
        error:"",
        loading:false,
        didRedirect:false
    })

    const {email,password,error,loading,didRedirect} = values;
   
    const handleChange = name=>event=>{
        setValues({...values,error:false,[name]:event.target.value});
    };

    const onSubmit =(event)=>{
        event.preventDefault();
        setValues({...values,error:false,loading:true});
        signin({email,password})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,loading:false});
            }
            else{
                authenticate(data,()=> {
                setValues({
                    ...values,
                    didRedirect:true
                });
            });
            }
        })
        .catch(console.log("Sign in failed"))
    };
    const performRedirect = ()=>{

        //TODO: ADD A REDIRECTION HERE
        if(didRedirect){
            if(isAuthenticated()!== false){
                const {user}= isAuthenticated();
                if(user && user.role === 1){
                    return <Redirect to="/admin/dashboard" />
                }
                else{
                    return <Redirect to="/user/dashboard" />
                }
            }
            
        }
        if(isAuthenticated()!== false){
            return <Redirect to="/" />;
        }
    }
    const loadingMessage = ()=>{   
        return(
                loading && (
                    <div className="alert alert-info">
                        <h2>Loading...</h2>
                    </div>
                )
           );   
    }
    const errorMessage = ()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-3">
                    <div className="alert alert-danger"
                     style={{display: error ? "":"none"}}>
                        {error}
                    </div>
                 </div>
            </div>
        ); 
    }

    const signInForm=()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input className="form-control" onChange={handleChange("email")} value={email} type="email"  />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control" onChange={handleChange("password")} value={password} type="password"  />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        );
    };
    
    return(
        <Base title="Sign in page" description="A page for user to sign in!">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
        </Base>
    )
}

export default Signin;
