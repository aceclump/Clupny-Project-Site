import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import ProjectList from '../pages/ProjectList';
import Admin from '../pages/Admin';
import ProjectPage from '../pages/ProjectPage';
import NotFound from '../pages/NotFound'

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/projectlist' component={ProjectList}></Route>
      <Route exact path='/admin' component={Admin}></Route>
      <Route path='/projectpage/:id' component={ProjectPage}></Route>
      <Route component={NotFound} />
    </Switch>
  );
}

export default Main;