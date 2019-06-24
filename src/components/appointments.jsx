import React from 'react';
import update from 'immutability-helper';
import $ from 'jquery';

import AppointmentForm from './appointment-form';
import { AppointmentsList } from './appointments-list';
import { Messages } from 'primereact/messages';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import './appointments.css';

export default class Appointments extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      appointments: []
    }

    this.base_address = 'http://localhost:3001/api/v1';
  }

  componentDidMount(){
    if(this.props.location 
       && this.props.location.state
       && this.props.location.state.severity){

         let severity = this.props.location.state.severity;
         let message = this.props.location.state.message;

         this.messagesComponent.show({
            severity: severity, 
            summary: severity[0].toUpperCase().concat(severity.slice(1)), 
            detail: message,
            closeable: false,
            sticky: true});
    }

    $.ajax({
      type: 'GET',
      url: `${this.base_address}/appointments`,
      dataType: 'JSON'
    })
    .done(data => {    
      this.setState({ appointments: data });
    });
  }
 
  handleNewAppointment = (appointment) => {
    const appointments = update(this.state.appointments, { $push: [appointment] });
    this.setState({ 
      appointments: appointments
    });
  }

  handleUpdateOnDelete = () => {

    this.messagesComponent.show({
            severity: 'success', 
            summary: 'Success', 
            detail: 'Appointment deleted succesfully',
            closeable: false,
            sticky: true});
            
    $.ajax({
      type: 'GET',
      url: `${this.base_address}/appointments`,
      dataType: 'JSON'
    })
    .done(data => {    
      this.setState({ appointments: data });
    });
  }

  render = () => {
    return (
      <div>
        <Messages ref={(el) => this.messagesComponent = el}></Messages>
        <AppointmentForm onAddNewAppointment={this.handleNewAppointment}/>

        <h2>Appointments</h2>                 
        <AppointmentsList appointments={ this.state.appointments.sort((a, b) => new Date(a.apt_time) - new Date(b.apt_time)) }
                          onDelete={this.handleUpdateOnDelete} />
      </div>
    );
  }
}
