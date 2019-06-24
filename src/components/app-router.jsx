import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Appointments from './appointments';
import Appointment from './appointment';
import AppHeader from './app-header';
import AppointmentForm from './appointment-form';

export default (props) => 
  <Router>
    <div>
      <Route path='/' component={AppHeader} />
      <Route exact path='/' component={Appointments} />
      <Route exact path='/appointments/:id' component={Appointment} />
      <Route path='/appointments/:id/edit' component={AppointmentForm} />
    </div>
  </Router>		
