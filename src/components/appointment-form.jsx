import React from 'react';
import Datetime from 'react-datetime';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import moment from 'moment';
import $ from 'jquery';
import { Messages } from 'primereact/messages';

import { Label } from './label';

import 'react-datetime/css/react-datetime.css';

export default class AppointmentForm extends React.Component {

  static propTypes = {
    onAddNewAppointment: PropTypes.func
  }

  constructor(props){
    super(props);
    this.state = {
      title: { value: '', valid: false },
      appt_time: { value: '', valid: false },
      formValid: false,
      editing: false 
    };

    this.base_url = 'http://localhost:3001/api/v1/appointments';

    this.updateAppointment = this.updateAppointment.bind(this);
    this.addNewAppointment = this.addNewAppointment.bind(this);
  }

  componentDidMount() {
    if(this.props.match) {
      $.ajax({
        type: 'GET',
        url: `${this.base_url}/${this.props.match.params.id}`,
        dataType: 'JSON',
        headers: JSON.parse(sessionStorage.getItem('user')) 
      })
      .done( data => {
        this.setState({
          title: {
            value: data.title, 
            valid: true},
          appt_time: {
            value: moment(data.appt_time),
            valid: true},
          editing: this.props.match.path === '/appointments/:id/edit'
        });

        this.validateForm();
      });	  
    }
  }

  handleChange = (e) => {
    const fieldName = 'title';
    const fieldValue = e.target.value;
    this.handleUserInput(fieldName, fieldValue);
  }	

  handleApptTime = (e) => {
    const fieldName = 'appt_time';
    const fieldValue = e.toDate();
    this.handleUserInput(fieldName, fieldValue);
  }

  handleUserInput = (fieldName, fieldValue) => {

    const newFieldValue = update(this.state[fieldName], 
                                  { value: {$set: fieldValue},
                                    valid: {$set: this.isValidField(fieldName, fieldValue) }
                                  });

    this.setState({ [fieldName]: newFieldValue }, this.validateForm);
  }

  isValidField = (fieldName, fieldValue) => {
    let validField = false;

    switch(fieldName){
      case 'title':
        validField = (fieldValue !== null && fieldValue.trim().length > 2); 
      break;
      case 'appt_time':
        validField = (moment(fieldValue).isValid() && moment(fieldValue).isAfter());
      break;
      default:
      break;
    }
    
    return validField;
  }

  validateForm = () => {
    this.setState({ formValid: (this.state.title.valid && this.state.appt_time.valid) })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.state.editing ? this.updateAppointment() : this.addNewAppointment();
  }

  updateAppointment = () => {
    
    const appointment = {
      title: this.state.title.value,
      appt_time: this.state.appt_time.value
    };
    
    $.ajax({
      type: 'PUT',
      url: `${this.base_url}/${this.props.match.params.id}`, 
      data: { appointment: appointment },
      dataType: 'JSON',
      headers: JSON.parse(sessionStorage.getItem('user'))
    })
    .done( data => {
      this.setState({ 
        title: { value: '', valid: false },
        appt_time: { value: '', valid: false },
        formValid: false 
      });
      
      this.props.history.push('/', { severity: 'success', message: 'Appointment updated succesfully'});
    })
    .fail( response => { 
      
      const messages = [];
      
      const formErrors = response.responseJSON;
      console.log("formErrors: " + formErrors);
      Object.keys(formErrors)
            .each((formErrorField) => {
              formErrors[formErrorField].each((error) => {
                messages.push(formErrorField + ": " + error)    
              })
            });
      
      this.displayMessages(messages, 'error');
    });
  }

  addNewAppointment = () => {

    const appointment = {
      title: this.state.title.value,
      appt_time: this.state.appt_time.value
    };

    $.ajaxSetup({
      headers: JSON.parse(sessionStorage.getItem('user'))
    });

    $.post(`${this.base_url}`, { appointment: appointment })
    .done( (data) => {
      this.props.onAddNewAppointment(data);

      this.setState({ 
        title: { value: '', valid: false },
        appt_time: { value: '', valid: false },
        formValid: false 
      });

      this.displayMessages(['Appointment added succesfully'], 'success');
    })
    .fail( (response) => { 
      
      const messages = [];

      const formErrors = response.responseJSON;
      console.log("formErrors: " + formErrors);
      Object.keys(formErrors)
            .each((formErrorField) => {
              formErrors[formErrorField].each((error) => {
                messages.push(formErrorField + ": " + error)    
              })
            });

      this.displayMessages(messages, 'error');
    });
  }

  displayMessages = (messages, severity) => {
    for(let i in messages){
      
      this.messagesComponentForm.show({
        severity: severity, 
        summary: severity[0].toUpperCase().concat(severity.slice(1)), 
        detail: messages[i],
        closeable: false,
        sticky: true});
    }
  }

  render(){
    let inputProps = {
      name: 'appt_time'
    };

    return (
      <div>
        <h2>{this.state.editing ? 'Edit' : 'Make a new' } appointment</h2>
        <Messages ref={(el) => this.messagesComponentForm = el}></Messages>
        
	      <Label label='Enter a title, date and time' />    

        <form onSubmit={ this.handleSubmit } >
          <input name='title' 
                 type='text' 
                 placeholder='Appointment Title' 
                 value={this.state.title.value} 
                 onChange={ this.handleChange } />
          
          <Datetime input={false}
                    open={true}
                    inputProps={inputProps} 
                    value={this.state.appt_time.value}
                    onChange={ this.handleApptTime } />

          <input  type='submit' 
                  value= {this.state.editing ? 'Update Appointment' : 'Make Appointment'}
                  className='submit-button'
                  disabled={!this.state.formValid} />
        </form>	  
      </div>	  
    );
  }
}
