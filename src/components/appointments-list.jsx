import React from 'react';
import PropTypes from 'prop-types';

import Appointment from './appointment';

export const AppointmentsList = ({appointments, onDelete}) =>
  <div>
    { appointments.map(function(appointment, index){
        return (
          <Appointment key={index} appointment={appointment} onDelete={onDelete}/>
        );
    })}
  </div>

AppointmentsList.propTypes = {
  appointments: PropTypes.array,
  onDelete: PropTypes.func
}
