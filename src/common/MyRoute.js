import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { customPageRoutes } from './CustomPageRoutersConfig';

import Login from '../components/Login';
import My from '../components/My';
import Home from '../components/Home';
import List from '../components/List';
import Add from '../components/Add';
import Edit from '../components/Edit';
import View from '../components/View';

export const MyRoute = () => {
  let otherRoutes = [];
  for (var i = 0; i < customPageRoutes.length; i++) {
    let customPageRoute = customPageRoutes[i];
    otherRoutes.push(<Route key={i} path={customPageRoute.path} component={customPageRoute.component} />)
  }
  //
  return (
    <main>
		<Switch>
		  <Route path='/Login' component={Login}/>
		  <Route path='/My' component={My}/>
		  <Route path='/Home' component={Home}/>
		  <Route path='/List/:objid/' component={List}/>
		  <Route path='/Add/:objid' component={Add}/>
		  <Route path='/Edit/:objid/:id' component={Edit}/>
		  <Route path='/View/:objid/:id' component={View}/>
          { otherRoutes }
		</Switch>
    </main>
  )
}
