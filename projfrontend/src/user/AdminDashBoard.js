import React from 'react';
import Base from '../core/Base';
import {isAuthenticated} from '../auth/helper/index';
import {Link} from 'react-router-dom';
const AdminDashBoard = ()=>{
    
    const {user:{name,email,role}}= isAuthenticated();

    const adminleftSide = ()=>{
        return(
            <div className="card">
                <h5 className="card-header bg-dark text-white">Admin Navigation</h5>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/create/category" className="nav-link text-success">
                        Create Categories
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/categories" className="nav-link text-success">
                        Manage Categories
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/create/products" className="nav-link text-success">
                        Create Products
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/products" className="nav-link text-success">
                        Manage Products
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/orders" className="nav-link text-success">
                        Manage Orders
                        </Link>
                    </li>
                   
                </ul>
            </div>
        );
    }
    const adminRightSide =() =>{
        return(
            <div className="card">
                <h5 className="card-header">Admin Information</h5>
                <ul className="list-group">
                    <li className="list-group-item">
                    <span className="badge badge-success">Name: </span> {name}     
                    </li>
                    <li className="list-group-item">
                    <span className="badge badge-success">Email: </span> {email}     
                    </li>
                    <li className="list-group-item">
                    <span className="badge badge-danger">Admin area</span>      
                    </li>
                </ul>
            </div>
        );
    }

    return(
        <Base title="Welcome to Admin Area" description="Manage your products here!" className="container bg-success py-4">
           <div className="row">
               <div className="col-md-3 ">
               {adminleftSide()}
               </div>
               <div className="col-md-9 ">
               {adminRightSide()}
               </div>
           </div>
        </Base>
    );
};

export default AdminDashBoard;