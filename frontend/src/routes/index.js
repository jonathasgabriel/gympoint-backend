import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Students from '../pages/Students';
import AddStudent from '../pages/Students/Add';
import EditStudent from '../pages/Students/Edit';
import Plans from '../pages/Plans';
import AddPlan from '../pages/Plans/Add';
import EditPlan from '../pages/Plans/Edit';
import Enrollments from '../pages/Enrollments';
import AddEnrollment from '../pages/Enrollments/Add';
import EditEnrollment from '../pages/Enrollments/Edit';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/students" isPrivate component={Students} />
      <Route path="/students/add" isPrivate component={AddStudent} />
      <Route path="/students/edit" isPrivate component={EditStudent} />
      <Route exact path="/plans" isPrivate component={Plans} />
      <Route path="/plans/add" isPrivate component={AddPlan} />
      <Route path="/plans/edit" isPrivate component={EditPlan} />
      <Route exact path="/enrollments" isPrivate component={Enrollments} />
      <Route path="/enrollments/add" isPrivate component={AddEnrollment} />
      <Route path="/enrollments/edit" isPrivate component={EditEnrollment} />
      <Route path="/" component={() => <h1>404 - Page not found</h1>} />
    </Switch>
  );
}
