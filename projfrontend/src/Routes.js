import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from './core/Home';
import Cart from './core/Cart';
import Signup from './user/Signup';
import Signin from './user/Signin';
import AdminRoute from './auth/helper/AdminRoute';
import PrivateRoute from './auth/helper/PrivateRoute';
import UserDashboard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategory';
import AddProduct from './admin/AddProduct';
import ManageProduct from './admin/ManageProduct';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategory';
export default function Routes(){
    return(
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/signup" exact component={Signup} />
                    <Route path="/signin" exact component={Signin} />
                    <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
                    <PrivateRoute path="/cart" exact component={Cart} />
                    <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
                    <AdminRoute path="/admin/create/category" exact component={AddCategory} />
                    <AdminRoute path="/admin/categories" exact component={ManageCategories} />
                    <AdminRoute path="/admin/create/products" exact component={AddProduct} />
                    <AdminRoute path="/admin/products" exact component={ManageProduct} />
                    <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
                    <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory} />
                </Switch>
            </Router>
        </div>
    )
};