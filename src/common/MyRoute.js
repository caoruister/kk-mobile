import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../components/Login';
import My from '../components/My';
import Home from '../components/Home';
import List from '../components/List';
import Add from '../components/Add';
import Edit from '../components/Edit';
import View from '../components/View';

//import '../assets/weui.css';

export const MyRoute = () => (
  <main>
    <Switch>
      <Route path='/Login' component={Login}/>
      <Route path='/My' component={My}/>
      <Route path='/Home' component={Home}/>
      <Route path='/List' component={List}/>
      <Route path='/Add' component={Add}/>
      <Route path='/Edit' component={Edit}/>
      <Route path='/View' component={View}/>
    </Switch>
  </main>
);
