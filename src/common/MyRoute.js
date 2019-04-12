import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../components/Login';
import My from '../components/My';
import Home from '../components/Home';

export const MyRoute = () => (
  <main>
    <Switch>
      <Route path='/Login' component={Login}/>
      <Route path='/My' component={My}/>
      <Route path='/Home' component={Home}/>
    </Switch>
  </main>
);
