import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth/helper/index';

const activeTab =(history, path) =>{
    if(history.location.pathname === path){
        return {color:"#2ecc72"}
    }
    else{
        return {color:"#FFFFFF"}
    }
};


const Menu = ({history}) =>(
    <div>
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-brand">
                <Link style={activeTab(history,"/")} className="nav-link text-info disabled" >myStore</Link>
            </li>
            <li className="nav-item">
                <Link style={activeTab(history,"/")} className="nav-link" to="/">Home</Link>
            </li>
           
            {isAuthenticated() && isAuthenticated().user.role===0 &&(<li className="nav-item">
                <Link style={activeTab(history,"/user/dashboard")} className="nav-link" to="/user/dashboard">Dashboard</Link>
            </li>)}
            {isAuthenticated() && isAuthenticated().user.role === 1 &&(<li className="nav-item">
                <Link style={activeTab(history,"/admin/dashboard")} className="nav-link" to="/admin/dashboard">Admin. Dashboard</Link>
            </li>)}
           
            {!isAuthenticated() && (
                <>
                 <li className="nav-item">
                 <Link style={activeTab(history,"/signup")} className="nav-link" to="/signup">SignUp<i style={{marginLeft:"8px"}} class="fas fa-user-plus"></i></Link>
                </li>
                 <li className="nav-item">
                    <Link style={activeTab(history,"/signin")} className="nav-link" to="/signin">SignIn<i style={{marginLeft:"8px"}} class="fas fa-sign-in-alt"></i></Link>
                </li>
                </>
            )}
            {isAuthenticated() && (
                <>
                 <li className="nav-item">
                 <Link style={activeTab(history,"/cart")} className="nav-link" to="/cart">Cart<i style={{marginLeft:"8px"}} class="fas fa-shopping-cart"></i></Link>
                </li>
                <li className="nav-item">
                    <span
                    className="nav-link text-warning"
                    onClick={
                        ()=>{
                            signout(()=>{
                                history.push("/");
                            });
                        }}
                    >
                        SignOut <i style={{marginLeft:"8px"}} class="fas fa-sign-out-alt"></i>
                    </span>
                </li>
                </>
            )}
        </ul>
    </div>
)



export default withRouter(Menu);