import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import ProjectList from '../pages/ProjectList';
import Admin from '../pages/Admin';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/ProjectList' component={ProjectList}></Route>
      <Route exact path='/admin' component={Admin}></Route>
    </Switch>
  );
}

export default Main;