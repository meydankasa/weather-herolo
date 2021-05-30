import React from 'react';
import Layout from './Hoc/Layout';
import { Switch }  from 'react-router-dom';

import PrivateRoute from './Components/authRoutes/privateRoutes';
import PublicRoute from './Components/authRoutes/publicRoutes';

// components- public
import Home from './Components/home';
import SignIn from './Components/signin';
import NotFound from './Components/ui/not_found';

// privateRoute
import Favorite from './Components/admin/Favorite';

const Routes = (props) => {
  return(
    <Layout>
        <Switch>
            <PrivateRoute {...props} path="/favorite" exact component={Favorite}/>
            <PublicRoute {...props} restricted={true} path="/sign_in" exact component={SignIn}/>
            <PublicRoute {...props} restricted={false} path="/" exact component={Home}/>
            <PublicRoute {...props} restricted={false} component={NotFound}/>
        </Switch>
    </Layout>
  )
}

export default Routes;
