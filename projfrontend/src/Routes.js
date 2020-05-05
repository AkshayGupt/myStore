import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import AdminRoute from './auth/helper/AdminRoute';
import PrivateRoute from './auth/helper/PrivateRoute';
import UserDashboard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';
export default function Routes(){
    return(
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/signup" exact component={Signup} />
                    <Route path="/signin" exact component={Signin} />
                    <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
                    <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
                </Switch>
            </Router>
        </div>
    )
};