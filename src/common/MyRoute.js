import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../Login';

export const MyRoute = () => (
  <main>
    <Switch>
      <Route path='/Login' component={Login}/>
    </Switch>
  </main>
);
